import React, { useState } from 'react';
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
  MapPin,
  Mountain,
  Hand,
  Footprints,
  Lightbulb,
  Calculator,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Info
} from 'lucide-react';

const HeartPulseIcon = ({ className = "w-6 h-6", color = "#E63956" }) => (
  <div className="relative flex items-center justify-center">
    <Heart className={className} color={color} fill={color} />
    <Activity className="absolute inset-0 m-auto text-white" size={className.includes('w-8') ? 20 : 14} />
  </div>
);

type OximetriaProps = {
  onGoToReportes?: () => void;
  altitud: number | null;
  onBack: () => void;
  onNext: (pre: number, post: number) => void;
  onLogout: () => void;
};

export default function Oximetria({ altitud, onBack, onNext, onLogout , onGoToReportes }: OximetriaProps) {
  const [preductal, setPreductal] = useState('');
  const [postductal, setPostductal] = useState('');

  const handleClear = () => {
    setPreductal('');
    setPostductal('');
  };

  const formattedAltitud = altitud !== null ? altitud.toLocaleString('en-US') : '2,821';

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
          
          {/* Stepper (4 Pasos) */}
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
              <div className="w-7 h-7 rounded-full bg-[#E63956] flex items-center justify-center mb-1 shadow-sm">
                <span className="text-[12px] font-bold text-white">3</span>
              </div>
              <span className="text-[11px] font-bold text-[#E63956]">Captura de oximetría</span>
            </div>

            <div className="w-8 xl:w-12 h-px bg-[#E2E8F0] -mt-5"></div>
            
            {/* Paso 4 */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#E2E8F0] flex items-center justify-center mb-1">
                <span className="text-[12px] font-medium text-[#64748B]">4</span>
              </div>
              <span className="text-[11px] font-medium text-[#64748B]">Resultado</span>
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

        {/* 4. TARJETA PRINCIPAL (Formulario) */}
        <main className="flex-1 px-8 pb-8 flex flex-col items-center w-full max-w-[1100px] mx-auto mt-4">
          
          <div className="w-full bg-white rounded-[16px] shadow-[0_4px_24px_rgb(0,0,0,0.03)] p-8">
            
            {/* Encabezado Interno */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FDE8EC] flex items-center justify-center">
                <HeartPulseIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-[22px] font-bold text-[#0F1B36] uppercase tracking-wide">Captura de oximetría de pulso</h2>
                <p className="text-[14px] text-[#64748B] mt-1">
                  Registro de saturación (SpO2)
                </p>
              </div>
            </div>

            {/* Badge de Contexto del Paciente */}
            <div className="flex items-center w-max bg-[#EFF6FF] rounded-lg px-4 py-2.5 mb-8 border border-[#DBEAFE]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2563EB]" />
                <span className="text-[13px] font-bold text-[#1E3A8A]">Paciente: RN-10123</span>
              </div>
              <div className="w-px h-4 bg-[#CBD5E1] mx-4"></div>
              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-[#2563EB]" />
                <span className="text-[13px] font-bold text-[#1E3A8A]">Altitud del establecimiento: {formattedAltitud} msnm</span>
              </div>
            </div>

            {/* Sección Central Dividida */}
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Izquierda: Formulario de Medición 65% */}
              <div className="w-full lg:w-[65%] space-y-4">
                
                {/* Caja 1 (Mano derecha) */}
                <div className="flex items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] p-4 relative shadow-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
                    <div className="w-6 h-6 bg-[#0F1B36] text-white flex items-center justify-center rounded text-[13px] font-bold shadow-sm">
                      1
                    </div>
                  </div>
                  
                  <div className="ml-8 flex-shrink-0 w-14 h-14 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center mr-4">
                    <Hand className="w-7 h-7 text-[#0F1B36]" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-[15px] font-bold text-[#0F1B36]">Mano derecha (Preductal)</h3>
                    <p className="text-[12px] text-[#64748B] mt-0.5">Mida en la muñeca o palma derecha</p>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 shadow-sm">
                    <input 
                      type="text" 
                      value={preductal}
                      onChange={(e) => setPreductal(e.target.value)}
                      className="w-16 text-center text-[24px] font-bold text-[#0F1B36] focus:outline-none" 
                      placeholder="--"
                    />
                    <span className="text-[14px] font-medium text-[#64748B] border-l border-[#E2E8F0] pl-2">% SpO2</span>
                  </div>
                </div>

                {/* Caja 2 (Cualquiera de los pies) */}
                <div className="flex items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] p-4 relative shadow-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
                    <div className="w-6 h-6 bg-[#0F1B36] text-white flex items-center justify-center rounded text-[13px] font-bold shadow-sm">
                      2
                    </div>
                  </div>
                  
                  <div className="ml-8 flex-shrink-0 w-14 h-14 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center mr-4">
                    <Footprints className="w-7 h-7 text-[#0F1B36]" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-[15px] font-bold text-[#0F1B36]">Cualquiera de los pies (Postductal)</h3>
                    <p className="text-[12px] text-[#64748B] mt-0.5">Mida en la planta o empeine</p>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 shadow-sm">
                    <input 
                      type="text" 
                      value={postductal}
                      onChange={(e) => setPostductal(e.target.value)}
                      className="w-16 text-center text-[24px] font-bold text-[#0F1B36] focus:outline-none" 
                      placeholder="--"
                    />
                    <span className="text-[14px] font-medium text-[#64748B] border-l border-[#E2E8F0] pl-2">% SpO2</span>
                  </div>
                </div>

                {/* Botón Central Evaluar */}
                <div className="flex flex-col items-center justify-center pt-6">
                  <span className="text-[11px] font-bold tracking-wider text-[#64748B] mb-2 uppercase">Evaluar por algoritmo</span>
                  <button 
                    onClick={() => onNext(Number(preductal), Number(postductal))}
                    className="flex items-center justify-center gap-2 bg-[#0F1B36] hover:bg-[#1E293B] text-white py-3 px-8 rounded-lg font-bold text-[14px] transition-colors shadow-md"
                  >
                    <Calculator className="w-5 h-5" />
                    Evaluar por algoritmo
                  </button>
                </div>

              </div>

              {/* Derecha: Caja Informativa 35% */}
              <div className="w-full lg:w-[35%] flex flex-col">
                <div className="w-full bg-[#FFFBEB] border border-[#FDE68A] rounded-[12px] p-5 h-full flex flex-col shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-[#D97706]" />
                    <h4 className="text-[15px] font-bold text-[#92400E]">Recuerde</h4>
                  </div>
                  <p className="text-[13px] text-[#78350F] leading-relaxed mb-6">
                    Mantener el sensor estable por lo menos 30 segundos antes de anotar la lectura.
                  </p>
                  
                  {/* Vector Illustration Mockup */}
                  <div className="flex-1 w-full bg-white rounded-lg border border-[#FDE68A] flex flex-col items-center justify-center p-4 relative min-h-[160px] shadow-sm">
                     <div className="w-16 h-24 bg-[#2563EB] rounded-lg flex flex-col items-center p-2 relative z-10 shadow-md">
                        <div className="w-full h-8 bg-[#1E3A8A] rounded mt-1 flex items-center justify-center">
                          <span className="text-[#34D399] font-mono font-bold text-xl leading-none">98</span>
                        </div>
                        <div className="flex gap-1 mt-auto pb-1">
                          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                        </div>
                     </div>
                     <div className="absolute top-1/2 left-1/2 w-24 h-1 bg-[#475569] transform rotate-45 -translate-y-4 translate-x-2 -z-0 rounded-full"></div>
                     <Hand className="absolute top-1/2 left-[70%] w-12 h-12 text-[#FCA5A5] fill-[#FCA5A5] -translate-y-1/2 -z-10" />
                     <p className="absolute bottom-2 text-[10px] text-[#D97706] font-medium opacity-60">Ilustración: Oximetría</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Pie del Formulario (Botones) */}
            <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#E2E8F0] text-[#0F1B36] font-medium hover:bg-[#F8FAFC] transition-colors text-[14px]"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>

              <div className="flex items-center gap-4">
                <button 
                  onClick={handleClear}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#FECDD3] text-[#E63956] font-medium hover:bg-[#FFF1F2] transition-colors text-[14px]"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpiar
                </button>
                
                <button 
                  onClick={() => onNext(Number(preductal), Number(postductal))}
                  className="flex items-center gap-2 px-8 py-2.5 rounded-lg font-bold text-[14px] bg-[#E63956] hover:bg-[#D42B47] text-white transition-all shadow-md"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4" />
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
                Asegúrese de que el bebé esté en reposo, sin llorar ni lactar, y respirando aire ambiente.
              </p>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}
