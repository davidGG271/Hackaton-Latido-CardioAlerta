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
  Baby,
  DropletOff,
  Wind,
  Clock,
  Info,
  ShieldCheck,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const HeartPulseIcon = ({ className = "w-6 h-6", color = "#E63956" }) => (
  <div className="relative flex items-center justify-center">
    <Heart className={className} color={color} fill={color} />
    <Activity className="absolute inset-0 m-auto text-white" size={className.includes('w-8') ? 20 : 14} />
  </div>
);

type PreTamizajeProps = {
  onGoToReportes?: () => void;
  onBack: () => void;
  onNext: () => void;
  onLogout: () => void;
};

export default function PreTamizaje({ onBack, onNext, onLogout , onGoToReportes }: PreTamizajeProps) {
  const [cond1, setCond1] = useState(false);
  const [cond2, setCond2] = useState(false);
  const [cond3, setCond3] = useState(false);
  const [cond4, setCond4] = useState(false);

  const allChecked = cond1 && cond2 && cond3 && cond4;

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
              <div className="w-7 h-7 rounded-full bg-[#E63956] flex items-center justify-center mb-1 shadow-sm">
                <span className="text-[12px] font-bold text-white">2</span>
              </div>
              <span className="text-[11px] font-bold text-[#E63956]">Verificación del bebé</span>
            </div>
            
            <div className="w-8 xl:w-12 h-px bg-[#E2E8F0] -mt-5"></div>
            
            {/* Paso 3 */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#E2E8F0] flex items-center justify-center mb-1">
                <span className="text-[12px] font-medium text-[#64748B]">3</span>
              </div>
              <span className="text-[11px] font-medium text-[#64748B]">Captura de oximetría</span>
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
            <div className="flex items-start gap-4 mb-8 border-b border-[#F1F5F9] pb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FDE8EC] flex items-center justify-center">
                <Baby className="w-6 h-6 text-[#E63956]" />
              </div>
              <div>
                <h2 className="text-[22px] font-bold text-[#0F1B36]">Verificación previa al tamizaje</h2>
                <p className="text-[14px] text-[#64748B] mt-1">
                  Confirma que las condiciones del recién nacido permitan obtener una medición confiable.
                </p>
              </div>
            </div>

            {/* Campos Superiores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* SIS / ID */}
              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold">Código SIS / ID Paciente</label>
                <input 
                  type="text" 
                  placeholder="Ej. 12345678" 
                  className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-[14px] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#E63956] focus:border-[#E63956]"
                />
              </div>

              {/* Horas de vida */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <label className="block text-[13px] font-bold">Horas de vida del recién nacido</label>
                  <Info className="w-3.5 h-3.5 text-[#94A3B8]" />
                </div>
                <div className="flex">
                  <input 
                    type="number" 
                    placeholder="Ej. 24" 
                    className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] border-r-0 rounded-l-lg text-[14px] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#E63956] focus:border-[#E63956] z-10"
                  />
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-4 flex items-center rounded-r-lg text-[13px] text-[#64748B] whitespace-nowrap">
                    Rango: 12 - 48 hrs
                  </div>
                </div>
              </div>
            </div>

            {/* Sección Central Dividida */}
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Izquierda: Checkboxes 65% */}
              <div className="w-full lg:w-[65%]">
                <h3 className="text-[15px] font-bold mb-1">Condiciones para realizar la medición</h3>
                <p className="text-[13px] text-[#64748B] mb-5">Marca cada condición cuando esté cumplida.</p>

                <div className="space-y-3">
                  {/* Condición 1 */}
                  <label className={`flex items-center justify-between p-3.5 rounded-[10px] border cursor-pointer transition-colors ${cond1 ? 'border-[#E63956] bg-[#FFF5F7]' : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'}`}>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                        <Baby className="w-5 h-5 text-[#16A34A]" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold">¿El bebé está en reposo y tranquilo?</h4>
                        <p className="text-[12px] text-[#64748B] mt-0.5">No debe estar llorando ni agitado.</p>
                      </div>
                    </div>
                    <div className="pl-4">
                      <input 
                        type="checkbox" 
                        checked={cond1} 
                        onChange={(e) => setCond1(e.target.checked)}
                        className="w-5 h-5 rounded border-[#CBD5E1] text-[#E63956] focus:ring-[#E63956] cursor-pointer"
                      />
                    </div>
                  </label>

                  {/* Condición 2 */}
                  <label className={`flex items-center justify-between p-3.5 rounded-[10px] border cursor-pointer transition-colors ${cond2 ? 'border-[#E63956] bg-[#FFF5F7]' : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'}`}>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FEF9C3] flex items-center justify-center">
                        <DropletOff className="w-5 h-5 text-[#CA8A04]" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold">¿El bebé no está lactando en este momento?</h4>
                        <p className="text-[12px] text-[#64748B] mt-0.5">La lactancia puede alterar la medición.</p>
                      </div>
                    </div>
                    <div className="pl-4">
                      <input 
                        type="checkbox" 
                        checked={cond2} 
                        onChange={(e) => setCond2(e.target.checked)}
                        className="w-5 h-5 rounded border-[#CBD5E1] text-[#E63956] focus:ring-[#E63956] cursor-pointer"
                      />
                    </div>
                  </label>

                  {/* Condición 3 */}
                  <label className={`flex items-center justify-between p-3.5 rounded-[10px] border cursor-pointer transition-colors ${cond3 ? 'border-[#E63956] bg-[#FFF5F7]' : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'}`}>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center">
                        <Wind className="w-5 h-5 text-[#2563EB]" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold">¿El bebé está respirando aire ambiente?</h4>
                        <p className="text-[12px] text-[#64748B] mt-0.5">No debe estar con oxígeno suplementario.</p>
                      </div>
                    </div>
                    <div className="pl-4">
                      <input 
                        type="checkbox" 
                        checked={cond3} 
                        onChange={(e) => setCond3(e.target.checked)}
                        className="w-5 h-5 rounded border-[#CBD5E1] text-[#E63956] focus:ring-[#E63956] cursor-pointer"
                      />
                    </div>
                  </label>

                  {/* Condición 4 */}
                  <label className={`flex items-center justify-between p-3.5 rounded-[10px] border cursor-pointer transition-colors ${cond4 ? 'border-[#E63956] bg-[#FFF5F7]' : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'}`}>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center">
                        <Clock className="w-5 h-5 text-[#9333EA]" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold">¿El momento es el adecuado?</h4>
                        <p className="text-[12px] text-[#64748B] mt-0.5 max-w-[400px] leading-snug">Idealmente después de las 24 horas de vida, o antes del alta si se va antes de cumplir 24 h.</p>
                      </div>
                    </div>
                    <div className="pl-4">
                      <input 
                        type="checkbox" 
                        checked={cond4} 
                        onChange={(e) => setCond4(e.target.checked)}
                        className="w-5 h-5 rounded border-[#CBD5E1] text-[#E63956] focus:ring-[#E63956] cursor-pointer"
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Derecha: Ilustración e Info 35% */}
              <div className="w-full lg:w-[35%] flex flex-col items-center justify-center pt-6">
                
                {/* Ilustración (Mock with styling) */}
                <div className="relative w-full max-w-[220px] aspect-square bg-[#F8FAFC] rounded-2xl mb-6 flex items-center justify-center overflow-hidden border border-[#F1F5F9]">
                  {/* Decorative hearts and baby shape */}
                  <Heart className="absolute top-6 right-8 text-[#E63956] fill-[#E63956] opacity-20 w-8 h-8" />
                  <Heart className="absolute top-12 right-24 text-[#E63956] fill-[#E63956] opacity-10 w-4 h-4" />
                  <div className="w-32 h-32 bg-[#E2E8F0] rounded-full opacity-50 relative">
                     <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center border border-[#E2E8F0]">
                       <Activity className="w-5 h-5 text-[#E63956]" />
                     </div>
                  </div>
                  <p className="absolute bottom-4 text-[10px] text-[#94A3B8] font-medium">Ilustración: Sensor en pie</p>
                </div>

                {/* Tarjeta Informativa */}
                <div className="w-full bg-[#EFF6FF] rounded-[8px] p-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <Info className="w-4 h-4 text-[#2563EB]" />
                    <h5 className="text-[13px] font-bold text-[#1E3A8A]">Importante</h5>
                  </div>
                  <p className="text-[12px] text-[#334155] leading-relaxed">
                    Estas condiciones aseguran que el resultado sea confiable. La lectura de oximetría es sensible al llanto, movimiento o alimentación reciente.
                  </p>
                </div>

              </div>
            </div>

            {/* Pie del Formulario (Botones) */}
            <div className="mt-10 pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#E2E8F0] text-[#0F1B36] font-medium hover:bg-[#F8FAFC] transition-colors text-[14px]"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>

              <div className="flex flex-col items-end">
                <button 
                  onClick={onNext}
                  disabled={!allChecked}
                  className={`flex items-center gap-2 px-8 py-2.5 rounded-lg font-bold text-[14px] transition-all ${
                    allChecked 
                      ? 'bg-[#E63956] hover:bg-[#D42B47] text-white shadow-md' 
                      : 'bg-[#CBD5E1] text-white cursor-not-allowed'
                  }`}
                >
                  Iniciar tamizaje
                  <ArrowRight className="w-4 h-4" />
                </button>
                {!allChecked && (
                  <p className="text-[12px] text-[#64748B] mt-1.5">Completa todas las condiciones para continuar</p>
                )}
              </div>
            </div>

          </div>

          {/* 5. BANNER INFORMATIVO INFERIOR */}
          <div className="w-full bg-[#EFF6FF] rounded-[10px] p-4 mt-6 flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[13px] text-[#1E3A8A]">
                <span className="font-bold">Este paso es clave para garantizar un tamizaje confiable. </span>
                Si alguna condición no se cumple, espera y verifica nuevamente antes de continuar.
              </p>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}
