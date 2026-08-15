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
  ArrowLeft,
  Info,
  Download,
  Save,
  CheckSquare,
  SignalHigh,
  Hourglass,
  Phone,
  MessageCircle
} from 'lucide-react';

const HeartPulseIcon = ({ className = "w-6 h-6", color = "#E63956" }) => (
  <div className="relative flex items-center justify-center">
    <Heart className={className} color={color} fill={color} />
    <Activity className="absolute inset-0 m-auto text-white" size={className.includes('w-8') ? 20 : 14} />
  </div>
);

type FichaReferenciaProps = {
  onGoToReportes?: () => void;
  onBack: () => void;
  onLogout: () => void;
  onGoToChat: () => void;
};

export default function FichaReferencia({ onBack, onLogout, onGoToChat , onGoToReportes }: FichaReferenciaProps) {
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
          
          {/* Stepper */}
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
              <div className="w-7 h-7 rounded-full bg-[#F1F5F9] flex items-center justify-center mb-1 border border-[#E2E8F0]">
                <span className="text-[12px] font-bold text-[#94A3B8]">2</span>
              </div>
              <span className="text-[11px] font-medium text-[#94A3B8]">Verificación del bebé</span>
            </div>
            
            <div className="w-8 xl:w-12 h-px bg-[#E2E8F0] -mt-5"></div>

            {/* Paso 3 */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#F1F5F9] flex items-center justify-center mb-1 border border-[#E2E8F0]">
                <span className="text-[12px] font-bold text-[#94A3B8]">3</span>
              </div>
              <span className="text-[11px] font-medium text-[#94A3B8]">Captura de oximetría</span>
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

        {/* 4. TARJETA PRINCIPAL (Main Form Card) */}
        <main className="flex-1 px-8 pb-8 flex flex-col items-center w-full max-w-[900px] mx-auto mt-4">
          
          <div className="w-full bg-white rounded-[16px] shadow-[0_4px_24px_rgb(0,0,0,0.03)] p-8">
            
            {/* Encabezado Interno */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h2 className="text-[22px] font-bold text-[#0F1B36]">FICHA DE REFERENCIA F300 (SIS)</h2>
                <p className="text-[14px] text-[#1E293B] mt-0.5">
                  Destino: <span className="font-bold">INSN San Borja – Lima (Cardiología)</span>
                </p>
              </div>
            </div>

            {/* Lista de Verificación de Contenido F300 */}
            <div className="w-full mb-8 space-y-4">
              <div className="flex items-center gap-3">
                <CheckSquare className="w-5 h-5 text-[#16A34A] fill-[#DCFCE7]" />
                <span className="text-[15px] font-medium text-[#0F1B36]">Datos del Paciente e Historia Clínica</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckSquare className="w-5 h-5 text-[#16A34A] fill-[#DCFCE7]" />
                <span className="text-[15px] font-medium text-[#0F1B36]">Resumen Ejecutivo del Copiloto IA</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckSquare className="w-5 h-5 text-[#16A34A] fill-[#DCFCE7]" />
                <span className="text-[15px] font-medium text-[#0F1B36]">Coordenadas GPS y Contacto de la Posta</span>
              </div>
            </div>

            {/* Estado de Conexión y Notificación de Almacenamiento Offline */}
            <div className="w-full bg-[#F0F7FF] border border-[#BFDBFE] rounded-[12px] p-5 mb-8">
              {/* Encabezado de estado */}
              <div className="flex items-center gap-2 mb-4">
                <SignalHigh className="w-5 h-5 text-[#1E3A8A]" />
                <h3 className="text-[14px] font-bold text-[#1E3A8A]">ESTADO DE CONEXIÓN: SIN COBERTURA 4G</h3>
              </div>

              {/* Tarjeta interior de almacenamiento */}
              <div className="bg-white border border-dashed border-[#BFDBFE] rounded-[8px] p-4 flex items-start gap-3">
                <Hourglass className="w-5 h-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                <p className="text-[13px] text-[#334155] leading-relaxed">
                  La Ficha está <span className="font-bold italic">GUARDADA</span> de forma segura. Se transmitirá <span className="font-bold italic">AUTOMÁTICAMENTE</span> a Lima por datos o SMS cifrado apenas detecte señal básica.
                </p>
              </div>
            </div>

            {/* Bloque de Teleorientación de Emergencia por SMS */}
            <div className="w-full bg-[#FFF1F2] border border-[#FECDD3] rounded-[12px] p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FFE4E6] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#E63956] fill-current" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#0F1B36]">TELEORIENTACIÓN DE EMERGENCIA (SMS)</h4>
                  <p className="text-[12px] text-[#475569] mt-0.5">Comunícate con el especialista de guardia para orientación inmediata mientras se restablece la conexión.</p>
                </div>
              </div>
              <button 
                onClick={onGoToChat}
                className="whitespace-nowrap flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-[14px] bg-[#E63956] hover:bg-[#BE123C] text-white transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Enviar SMS de emergencia
              </button>
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
                  <Download className="w-4 h-4" />
                  Descargar ficha (PDF)
                </button>
                
                <button 
                  onClick={onGoToChat}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold text-[14px] bg-[#0F1B36] hover:bg-[#1E293B] text-white transition-colors shadow-md"
                >
                  <Save className="w-4 h-4" />
                  Finalizar y guardar
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
                La ficha se almacenará en el historial local y se sincronizará automáticamente cuando haya conexión.
              </p>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}
