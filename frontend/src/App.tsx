import React, { useState } from 'react';
import Login from './Login';
import LocationSelector from './LocationSelector';
import PreTamizaje from './PreTamizaje';
import Oximetria from './Oximetria';
import Resultado from './Resultado';
import ResultadoDudoso from './ResultadoDudoso';
import ResultadoFalla from './ResultadoFalla';
import FichaReferencia from './FichaReferencia';
import Trazabilidad from './Trazabilidad';
import Reportes from './Reportes';

function evaluateANDESCHD(pre: number, post: number, altitud: number | null): 5 | 6 | 7 {
  const diff = Math.abs(pre - post);
  const alt = altitud !== null ? altitud : 0; // Default to sea level if unknown

  if (alt < 2500) {
    // Banda 1: 0 - 2,499
    if (pre >= 95 && post >= 95 && diff <= 3) return 5; // Normal
    if (pre < 90 || post < 90) return 7; // Falla
    return 6; // Dudoso
  } else if (alt < 3600) {
    // Banda 2: 2,500 - 3,599
    if (pre >= 90 && post >= 90 && diff <= 3) return 5; // Normal
    if (pre < 87 || post < 87) return 7; // Falla
    return 6; // Dudoso
  } else {
    // Banda 3: 3,600 - 4,500
    if (pre >= 89 && post >= 89 && diff <= 3) return 5; // Normal
    if (pre < 85 || post < 85) return 7; // Falla
    return 6; // Dudoso
  }
}

function App() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>(1);
  const [altitud, setAltitud] = useState<number | null>(null);
  const [preductal, setPreductal] = useState<number>(0);
  const [postductal, setPostductal] = useState<number>(0);

  return (
    <>
      {currentStep === 1 && (
        <Login onLogin={() => setCurrentStep(2)} />
      )}
      {currentStep === 2 && (
        <LocationSelector 
          onConfirm={(centroData) => {
            if (centroData) setAltitud(centroData.altitud_m);
            setCurrentStep(3);
          }} 
          onLogout={() => setCurrentStep(1)} 
        />
      )}
      {currentStep === 3 && (
        <PreTamizaje 
          onBack={() => setCurrentStep(2)}
          onNext={() => setCurrentStep(4)}
          onLogout={() => setCurrentStep(1)}
          onGoToReportes={() => setCurrentStep(10)}
        />
      )}
      {currentStep === 4 && (
        <Oximetria 
          altitud={altitud}
          onBack={() => setCurrentStep(3)}
          onNext={(pre, post) => {
            setPreductal(pre);
            setPostductal(post);
            const resultStep = evaluateANDESCHD(pre, post, altitud);
            setCurrentStep(resultStep);
          }}
          onLogout={() => setCurrentStep(1)}
          onGoToReportes={() => setCurrentStep(10)}
        />
      )}
      {currentStep === 5 && (
        <Resultado 
          altitud={altitud}
          onBack={() => setCurrentStep(4)}
          onLogout={() => setCurrentStep(1)}
          onGoToReportes={() => setCurrentStep(10)}
        />
      )}
      {currentStep === 6 && (
        <ResultadoDudoso 
          altitud={altitud}
          preductal={preductal}
          postductal={postductal}
          onBack={() => setCurrentStep(4)}
          onLogout={() => setCurrentStep(1)}
          onGoToReportes={() => setCurrentStep(10)}
        />
      )}
      {currentStep === 7 && (
        <ResultadoFalla 
          altitud={altitud}
          preductal={preductal}
          postductal={postductal}
          onBack={() => setCurrentStep(4)}
          onLogout={() => setCurrentStep(1)}
          onActivateReferencia={() => setCurrentStep(8)}
          onGoToReportes={() => setCurrentStep(10)}
        />
      )}
      {currentStep === 8 && (
        <FichaReferencia 
          onBack={() => setCurrentStep(7)}
          onLogout={() => setCurrentStep(1)}
          onGoToChat={() => setCurrentStep(9)}
          onGoToReportes={() => setCurrentStep(10)}
        />
      )}
      {currentStep === 9 && (
        <Trazabilidad 
          onLogout={() => setCurrentStep(1)}
          onGoToReportes={() => setCurrentStep(10)}
        />
      )}
      {currentStep === 10 && (
        <Reportes 
          onNuevoTamizaje={() => setCurrentStep(2)}
          onLogout={() => setCurrentStep(1)}
        />
      )}
    </>
  );
}

export default App;
