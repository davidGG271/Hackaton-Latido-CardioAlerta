const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/ASUS/Downloads/hakcotn/frontend/src';
const files = [
  'PreTamizaje.tsx',
  'Oximetria.tsx',
  'Resultado.tsx',
  'ResultadoDudoso.tsx',
  'ResultadoFalla.tsx',
  'FichaReferencia.tsx',
  'Trazabilidad.tsx'
];

files.forEach(file => {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix the destructuring:
  // It looks like: export default function PreTamizaje({ onBack, onNext, onLogout }: PreTamizajeProps) {
  // We want to add onGoToReportes inside the curly braces.

  content = content.replace(
    /export default function (\w+)\(\{\s*([^}]+)\s*\}\s*:\s*\w+Props\)/g,
    (match, compName, propsInner) => {
      if (!propsInner.includes('onGoToReportes')) {
        return `export default function ${compName}({ ${propsInner}, onGoToReportes }: ${compName}Props)`;
      }
      return match;
    }
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed destructuring in ' + file);
});
