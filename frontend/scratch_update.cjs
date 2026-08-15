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

  // 1. Add onGoToReportes?: () => void; to the Props type
  const propMatch = content.match(/type\s+\w+Props\s*=\s*{/);
  if (propMatch) {
    if (!content.includes('onGoToReportes?: () => void;')) {
      content = content.replace(propMatch[0], propMatch[0] + '\n  onGoToReportes?: () => void;');
    }
  }

  // 2. Add onGoToReportes to destructured props
  const compMatch = content.match(/export default function \w+\(({\s*[^}]+})\)/);
  if (compMatch) {
    let propsObj = compMatch[1];
    if (!propsObj.includes('onGoToReportes')) {
       let newPropsObj = propsObj.replace(/}\s*$/, ', onGoToReportes }');
       content = content.replace(propsObj, newPropsObj);
    }
  }

  // 3. Replace the Reportes anchor with button
  const reportesAnchor = /<a href=\"#\" className=\"flex items-center gap-3 px-3 py-2\.5 rounded-lg text-\[14px\] text-\[#475569\] hover:bg-\[#F1F5F9\] transition-colors\">\s*<BarChart2 className=\"w-5 h-5\" \/>\s*Reportes\s*<\/a>/g;
  
  const reportesButton = `<button onClick={onGoToReportes} className=\"w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:bg-[#F1F5F9] transition-colors\">
            <BarChart2 className=\"w-5 h-5\" />
            Reportes
          </button>`;

  content = content.replace(reportesAnchor, reportesButton);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file);
});
