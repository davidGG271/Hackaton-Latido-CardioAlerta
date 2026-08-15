import React from 'react';
import { 
  Heart, 
  Activity, 
  Home, 
  PlusCircle, 
  ClipboardList, 
  Bell, 
  MessageSquare, 
  FileText, 
  LineChart, 
  BarChart2, 
  Settings,
  HelpCircle,
  ChevronRight,
  Check,
  LogOut,
  Download,
  Printer,
  FileDown,
  ArrowLeft,
  Info
} from 'lucide-react';
import jsPDF from 'jspdf';

const HeartPulseIcon = ({ className = "w-6 h-6", color = "#E63956" }) => (
  <div className="relative flex items-center justify-center">
    <Heart className={className} color={color} fill={color} />
    <Activity className="absolute inset-0 m-auto text-white" size={className.includes('w-8') ? 20 : 14} />
  </div>
);

type ResultadoProps = {
  onGoToReportes?: () => void;
  altitud: number | null;
  onBack: () => void;
  onLogout: () => void;
};

export default function Resultado({ altitud, onBack, onLogout , onGoToReportes }: ResultadoProps) {
  const formattedAltitud = altitud !== null ? altitud.toLocaleString('en-US') : '2,821';

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    
    // Configuración general
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(15, 27, 54); // #0F1B36
    doc.text("LATIDO - Constancia de Alta", 20, 30);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139); // #64748B
    doc.text("Registro de Tamizaje Neonatal (SpO2)", 20, 40);

    // Datos del Paciente
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 27, 54);
    doc.text("Datos del Paciente:", 20, 60);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Paciente ID: RN-10123`, 20, 70);
    doc.text(`Altitud del establecimiento: ${formattedAltitud} m.s.n.m.`, 20, 80);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 90);

    // Resultados
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Resultados de Oximetría:", 20, 110);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Mano derecha (Preductal): 94% SpO2", 20, 120);
    doc.text("Pie (Postductal): 93% SpO2", 20, 130);

    // Conclusión
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 163, 74); // #16A34A (Verde)
    doc.text("RESULTADO: TAMIZAJE NORMAL (PASA)", 20, 150);

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 116, 139);
    doc.text("Documento generado automáticamente por LATIDO.", 20, 280);
    
    doc.save("constancia-alta-latido-rn-10123.pdf");
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC] font-sans text-[#0F1B36]">
      
      {/* 2. BARRA LATERAL IZQUIERDA (Sidebar) */}
      <aside className="fixed inset-y-0 left-0 w-[260px] bg-white border-r border-[#E2E8F0] flex flex-col z-20">
        
        {/* Branding */}
        <div className="p-6 pb-8">
          <div className="flex items-center gap-2 mb-2">
            <HeartPulseIcon className="w-8 h-8" />
            <span className="text-[24px] font-bold tracking-tight leading-none">LATIDO</span>
          </div>
          <p className="text-[12px] text-[#64748B] font-medium">
            De la detección a la <span className="text-[#E63956]">acción</span>
          </p>
        </div>

        {/* Menú de Navegación */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:bg-[#F1F5F9] transition-colors">
            <Home className="w-5 h-5" />
            Inicio
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-bold text-[#1E3A8A] bg-[#EFF6FF]">
            <PlusCircle className="w-5 h-5 text-[#1E3A8A]" />
            Nuevo tamizaje
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:bg-[#F1F5F9] transition-colors">
            <ClipboardList className="w-5 h-5" />
            Tamizajes
          </a>
          <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:bg-[#F1F5F9] transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5" />
              Alertar
            </div>
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E63956] text-white text-[11px] font-bold">2</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:bg-[#F1F5F9] transition-colors">
            <MessageSquare className="w-5 h-5" />
            Orientaciones
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:bg-[#F1F5F9] transition-colors">
            <FileText className="w-5 h-5" />
            Referencias
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:bg-[#F1F5F9] transition-colors">
            <LineChart className="w-5 h-5" />
            Seguimiento
          </a>
          <button onClick={onGoToReportes} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:bg-[#F1F5F9] transition-colors">
            <BarChart2 className="w-5 h-5" />
            Reportes
          </button>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:bg-[#F1F5F9] transition-colors mt-4">
            <Settings className="w-5 h-5" />
            Configuración
          </a>
        </nav>

        {/* Help Card */}
        <div className="p-4 mt-auto">
          <div className="bg-[#F0F7FF] rounded-[10px] p-3 flex items-start gap-3 cursor-pointer hover:bg-[#E0F2FE] transition-colors group">
            <HelpCircle className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-bold text-[#1E3A8A]">¿Necesitas ayuda?</h4>
              <p className="text-[11px] text-[#475569] leading-tight mt-0.5">Consulta el manual o contacta a soporte</p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#94A3B8] ml-auto mt-2 group-hover:text-[#2563EB]" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="ml-[260px] flex-1 flex flex-col min-h-screen">
        
        {/* 3. CABECERA Y NAVEGACIÓN SUPERIOR */}
        <header className="w-full px-8 py-4 flex justify-between items-center bg-transparent">
          
          {/* Stepper (4 Pasos Completados/Resultado) */}
          <div className="flex items-center gap-2 mx-auto">
            {/* Paso 1 */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#DCFCE7] flex items-center justify-center mb-1">
                <Check className="w-4 h-4 text-[#16A34A] stroke-[3]" />
              </div>
              <span className="text-[11px] font-medium text-[#64748B]">Localidad</span>
            </div>
            
            <div className="w-8 xl:w-12 h-px bg-[#E2E8F0] -mt-5"></div>
            
            {/* Paso 2 */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#DCFCE7] flex items-center justify-center mb-1">
                <Check className="w-4 h-4 text-[#16A34A] stroke-[3]" />
              </div>
              <span className="text-[11px] font-medium text-[#64748B]">Verificación del bebé</span>
            </div>
            
            <div className="w-8 xl:w-12 h-px bg-[#E2E8F0] -mt-5"></div>

            {/* Paso 3 */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#DCFCE7] flex items-center justify-center mb-1">
                <Check className="w-4 h-4 text-[#16A34A] stroke-[3]" />
              </div>
              <span className="text-[11px] font-medium text-[#64748B]">Captura de oximetría</span>
            </div>

            <div className="w-8 xl:w-12 h-px bg-[#E2E8F0] -mt-5"></div>
            
            {/* Paso 4 */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#E63956] flex items-center justify-center mb-1 shadow-sm">
                <span className="text-[12px] font-bold text-white">4</span>
              </div>
              <span className="text-[11px] font-bold text-[#E63956]">Resultado</span>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4 absolute right-8 top-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[13px] font-bold leading-tight">Dra. María Pérez</p>
                <p className="text-[12px] text-[#64748B] leading-tight">Personal de salud</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                alt="Avatar" 
                className="w-9 h-9 rounded-full object-cover border border-[#E2E8F0]"
              />
            </div>
            <div className="w-px h-6 bg-[#E2E8F0]"></div>
            <button onClick={onLogout} className="flex items-center gap-1.5 text-[#475569] hover:text-[#E63956] transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="text-[13px] font-medium">Salir</span>
            </button>
          </div>
        </header>

        {/* 4. TARJETA PRINCIPAL (Main Result Card) */}
        <main className="flex-1 px-8 pb-8 flex flex-col items-center w-full max-w-[900px] mx-auto mt-4">
          
          <div className="w-full bg-white rounded-[16px] shadow-[0_4px_24px_rgb(0,0,0,0.03)] p-8">
            
            {/* Encabezado de Resultado Verde */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                <Check className="w-7 h-7 text-[#16A34A] stroke-[3]" />
              </div>
              <div>
                <h2 className="text-[22px] font-bold text-[#0F1B36]">RESULTADO: TAMIZAJE NORMAL</h2>
                <p className="text-[15px] font-bold text-[#15803D] mt-0.5">
                  [ PASA – DENTRO DE RANGO PARA LA ALTITUD ]
                </p>
              </div>
            </div>

            {/* Tarjeta Contenedora de Valores de Saturación */}
            <div className="w-full bg-[#F0FDF4] border border-[#BBF7D0] rounded-[12px] p-6 mb-8">
              
              {/* Fila Superior (2 Columnas) */}
              <div className="flex flex-col sm:flex-row items-center justify-between pb-6">
                
                {/* Izquierda (Mano derecha) */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🖐️</span>
                    <span className="text-[14px] font-bold text-[#0F1B36]">Mano derecha (Preductal)</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[28px] font-bold text-[#16A34A]">94</span>
                    <span className="text-[14px] font-bold text-[#0F1B36]">% SpO2</span>
                  </div>
                </div>

                {/* Separador vertical */}
                <div className="hidden sm:block w-px h-16 border-r-2 border-dashed border-[#86EFAC] mx-8"></div>
                <div className="sm:hidden h-px w-full border-b-2 border-dashed border-[#86EFAC] my-6"></div>

                {/* Derecha (Pie) */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🦶</span>
                    <span className="text-[14px] font-bold text-[#0F1B36]">Pie (Postductal)</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[28px] font-bold text-[#16A34A]">93</span>
                    <span className="text-[14px] font-bold text-[#0F1B36]">% SpO2</span>
                  </div>
                </div>

              </div>

              {/* Fila Inferior (Validación de Altitud) */}
              <div className="border-t border-[#BBF7D0] pt-4 mt-2 flex items-center justify-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center shadow-sm">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
                <p className="text-[14px] text-[#1E293B]">
                  Valores fisiológicos normales para <span className="font-bold">{formattedAltitud} m.s.n.m.</span>
                </p>
              </div>

            </div>

            {/* Bloque de Constancia Digital */}
            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-6 mb-8 flex flex-col lg:flex-row gap-6">
              
              {/* Ícono y texto (Izquierda) */}
              <div className="flex-1 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-[10px] bg-[#DBEAFE] flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#2563EB]" />
                </div>
                <div className="mt-1">
                  <h3 className="text-[15px] font-bold text-[#0F1B36] mb-1">CONSTANCIA DIGITAL</h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    Se ha registrado el tamizaje de forma exitosa en el historial local del paciente.
                  </p>
                </div>
              </div>

              {/* Caja punteada de acción (Derecha) */}
              <div className="flex-1">
                <button 
                  onClick={handleGeneratePDF}
                  className="w-full h-full bg-white border-2 border-dashed border-[#93C5FD] hover:border-[#3B82F6] hover:bg-[#F0F7FF] rounded-[8px] p-4 flex flex-col items-center justify-center text-center transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Download className="w-5 h-5 text-[#1E3A8A] group-hover:text-[#2563EB]" />
                    <span className="text-[14px] font-bold text-[#1E3A8A] group-hover:text-[#2563EB]">GENERAR CONSTANCIA DE ALTA</span>
                  </div>
                  <p className="text-[12px] text-[#64748B]">
                    Se generará un documento en PDF con los resultados del tamizaje.
                  </p>
                </button>
              </div>
              
            </div>

            {/* Pie de Formulario (Botones) */}
            <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#E2E8F0] text-[#0F1B36] font-medium hover:bg-[#F8FAFC] transition-colors text-[14px]"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button 
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-[#1E3A8A] text-[#1E3A8A] font-bold hover:bg-[#F0F7FF] transition-colors text-[14px]"
                >
                  <Printer className="w-4 h-4" />
                  Imprimir resultado
                </button>
                
                <button 
                  onClick={handleGeneratePDF}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold text-[14px] bg-[#0F1B36] hover:bg-[#1E293B] text-white transition-colors shadow-md"
                >
                  <FileDown className="w-4 h-4" />
                  Generar constancia de alta
                </button>
              </div>
            </div>

          </div>

          {/* 5. BANNER INFORMATIVO INFERIOR */}
          <div className="w-full bg-[#EFF6FF] rounded-[10px] p-4 mt-6 flex items-center gap-3 shadow-sm">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[13px] text-[#1E3A8A]">
                El tamizaje debe realizarse entre las 24 y 48 horas de vida o antes del alta médica, según el protocolo.
              </p>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}
