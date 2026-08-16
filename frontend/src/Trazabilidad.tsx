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
  LogOut,
  Info,
  Clock,
  Wifi,
  BatteryMedium,
  Menu,
  AlertTriangle,
  BarChart,
  Send
} from 'lucide-react';

const HeartPulseIcon = ({ className = "w-6 h-6", color = "#E63956" }) => (
  <div className="relative flex items-center justify-center">
    <Heart className={className} color={color} fill={color} />
    <Activity className="absolute inset-0 m-auto text-white" size={className.includes('w-8') ? 20 : 14} />
  </div>
);

type TrazabilidadProps = {
  onGoToReportes?: () => void;
  onLogout: () => void;
  onGoToReportes: () => void;
};

export default function Trazabilidad({ onLogout, onGoToReportes }: TrazabilidadProps) {
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
          <button onClick={onGoToReportes} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:bg-[#F1F5F9] transition-colors">
            <BarChart className="w-5 h-5" />
            Panel de Estadísticas
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
        
        {/* 3. CABECERA SUPERIOR Y BARRA DE ESTADO DEL DISPOSITIVO */}
        <header className="w-full px-8 py-4 bg-transparent flex flex-col gap-4">
          
          <div className="flex justify-between items-start w-full">
            <div className="flex-1"></div> {/* Spacer */}
            
            {/* Status Bar Container */}
            <div className="flex flex-col gap-3 items-end">
              <div className="flex items-center justify-center bg-white border border-[#E2E8F0] rounded-[10px] px-4 py-1.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                  <span className="text-[13px] font-medium text-[#1E293B]">10:15</span>
                  <div className="w-px h-3 bg-[#E2E8F0] mx-1"></div>
                  <Wifi className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span className="text-[13px] font-medium text-[#1E3A8A]">En línea 3G</span>
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-4">
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
            </div>
          </div>

          {/* Barra Secundaria de Navegación Rápida */}
          <div className="flex items-center justify-between mt-2">
            <Menu className="w-6 h-6 text-[#475569] cursor-pointer" />
            <h1 className="text-[16px] font-bold text-[#0F1B36]">LATIDO AI</h1>
            <div className="flex items-center gap-1.5 text-[#D97706]">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-bold text-[14px]">Alerta (1)</span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-8 pb-8 flex flex-col items-center w-full max-w-[900px] mx-auto mt-2">
          
          {/* 4. TARJETA PRINCIPAL 1: TRAZABILIDAD DEL TRASLADO */}
          <div className="w-full bg-white rounded-[16px] shadow-[0_4px_24px_rgb(0,0,0,0.03)] p-6 mb-6">
            
            {/* Encabezado Interno */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                <BarChart className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h2 className="text-[18px] font-bold text-[#0F1B36]">TRAZABILIDAD DEL TRASLADO</h2>
                <p className="text-[14px] text-[#475569] mt-0.5">
                  Paciente: <span className="font-bold">RN-2026-0814</span> | Origen: <span className="font-bold">Puno</span>
                </p>
              </div>
            </div>

            {/* Línea de Tiempo Cronológica */}
            <div className="relative pl-3 space-y-6">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-[#E2E8F0]"></div>
              
              {/* Evento 1 */}
              <div className="relative flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] z-10"></div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-[#1E293B] w-[60px]">09:42 h</span>
                  <span className="text-[#94A3B8]">-</span>
                  <p className="text-[14px] text-[#1E293B]">
                    Tamizaje Realizado <span className="font-bold text-[#E63956]">(Falla Detectada)</span>
                  </p>
                </div>
              </div>

              {/* Evento 2 */}
              <div className="relative flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] z-10"></div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-[#1E293B] w-[60px]">09:45 h</span>
                  <span className="text-[#94A3B8]">-</span>
                  <p className="text-[14px] text-[#1E293B]">Alerta Recibida en Central INSN-SB</p>
                </div>
              </div>

              {/* Evento 3 */}
              <div className="relative flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] z-10 shadow-[0_0_0_3px_#DBEAFE]"></div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-[#1E293B] w-[60px]">10:00 h</span>
                  <span className="text-[#94A3B8]">-</span>
                  <p className="text-[14px] text-[#1E293B]">Telemedicina Aprobada por Cardiólogo</p>
                </div>
              </div>

              {/* Evento 4 */}
              <div className="relative flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] z-10 shadow-[0_0_0_3px_#FEF3C7]"></div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-[#1E293B] w-[60px]">10:15 h</span>
                  <span className="text-[#94A3B8]">-</span>
                  <p className="text-[14px] text-[#1E293B]">Unidad de Evacuación en Camino a Posta</p>
                </div>
              </div>

              {/* Evento 5 */}
              <div className="relative flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1] z-10"></div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-[#94A3B8] w-[60px]">--:-- h</span>
                  <span className="text-[#94A3B8]">-</span>
                  <p className="text-[14px] text-[#94A3B8]">Recepción en INSN San Borja (Lima)</p>
                </div>
              </div>

            </div>
          </div>

          {/* 5. TARJETA PRINCIPAL 2: CHAT SEGURO CON ESPECIALISTA */}
          <div className="w-full bg-white rounded-[16px] shadow-[0_4px_24px_rgb(0,0,0,0.03)] p-6 mb-6">
            
            {/* Encabezado de Chat */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-[#1E3A8A] fill-current" />
              </div>
              <h2 className="text-[16px] font-bold text-[#0F1B36]">CHAT SEGURO CON ESPECIALISTA DE GUARDIA</h2>
            </div>

            {/* Área de Mensajes */}
            <div className="w-full bg-[#F0F7FF] border border-[#BFDBFE] rounded-[12px] p-4 mb-4">
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-bold text-[#1E3A8A]">Dr. Vargas (INSN-SB):</span>
                <p className="text-[14px] text-[#334155] italic">
                  "Mantener al neonato abrigado y con oxígeno a flujo libre. La ambulancia llega en 45 min."
                </p>
              </div>
            </div>

            {/* Campo de Entrada y Botón de Envío */}
            <div className="flex items-center gap-3">
              <input 
                type="text" 
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-white border border-[#E2E8F0] rounded-[8px] px-3 py-2.5 text-[14px] text-[#0F1B36] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              />
              <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-[8px] bg-[#0F1B36] hover:bg-[#1E293B] text-white font-bold text-[14px] transition-colors shadow-md">
                <Send className="w-4 h-4" />
                Enviar
              </button>
            </div>

          </div>

          {/* 6. BANNER INFORMATIVO INFERIOR */}
          <div className="w-full bg-[#EFF6FF] rounded-[10px] p-4 flex items-center gap-3 shadow-sm">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[13px] text-[#1E3A8A]">
                Todos los eventos de trazabilidad se guardan automáticamente y se sincronizan cuando haya conexión.
              </p>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}
