import React from 'react';
import PeruMap from './PeruMap';
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
  Download,
  Filter,
  Calendar,
  PieChart
} from 'lucide-react';

const HeartPulseIcon = ({ className = "w-6 h-6", color = "#E63956" }) => (
  <div className="relative flex items-center justify-center">
    <Heart className={className} color={color} fill={color} />
    <Activity className="absolute inset-0 m-auto text-white" size={className.includes('w-8') ? 20 : 14} />
  </div>
);

type ReportesProps = {
  onNuevoTamizaje: () => void;
  onLogout: () => void;
};

export default function Reportes({ onNuevoTamizaje, onLogout }: ReportesProps) {
  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC] font-sans text-[#0F1B36]">
      
      {/* 2. BARRA LATERAL IZQUIERDA (Sidebar) */}
      <aside className="fixed inset-y-0 left-0 w-[260px] bg-white border-r border-[#E2E8F0] flex flex-col z-20">
        <div className="p-6 pb-8">
          <div className="flex items-center gap-2 mb-2">
            <HeartPulseIcon className="w-8 h-8" />
            <span className="text-[24px] font-bold tracking-tight leading-none">LATIDO</span>
          </div>
          <p className="text-[12px] text-[#64748B] font-medium">
            De la detección a la <span className="text-[#E63956]">acción</span>
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:bg-[#F1F5F9] transition-colors">
            <Home className="w-5 h-5" />
            Inicio
          </a>
          <button onClick={onNuevoTamizaje} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:bg-[#F1F5F9] transition-colors">
            <PlusCircle className="w-5 h-5" />
            Nuevo tamizaje
          </button>
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
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-bold text-[#1E3A8A] bg-[#EFF6FF]">
            <BarChart2 className="w-5 h-5 text-[#1E3A8A]" />
            Reportes
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:bg-[#F1F5F9] transition-colors mt-4">
            <Settings className="w-5 h-5" />
            Configuración
          </a>
        </nav>

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
        
        {/* Cabecera */}
        <header className="w-full px-8 py-6 bg-white border-b border-[#E2E8F0] flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-[24px] font-bold text-[#0F1B36]">Panel de Reportes y Estadísticas</h1>
            <p className="text-[14px] text-[#64748B] mt-1">Análisis general de tamizajes a nivel nacional</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2 cursor-pointer hover:bg-[#F1F5F9] transition-colors">
              <Calendar className="w-4 h-4 text-[#475569]" />
              <span className="text-[14px] font-medium text-[#475569]">Últimos 30 días</span>
              <ChevronRight className="w-4 h-4 text-[#94A3B8] ml-2 rotate-90" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0F1B36] hover:bg-[#1E293B] text-white font-bold text-[14px] transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <div className="w-px h-8 bg-[#E2E8F0] mx-2"></div>
            {/* User Profile */}
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                alt="Avatar" 
                className="w-9 h-9 rounded-full object-cover border border-[#E2E8F0]"
              />
              <button onClick={onLogout} className="text-[#475569] hover:text-[#E63956] transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          
          {/* Tarjetas de Resumen (KPIs) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E2E8F0]">
              <p className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Total Tamizajes</p>
              <h3 className="text-[32px] font-bold text-[#0F1B36]">4,285</h3>
              <p className="text-[13px] font-medium text-[#16A34A] flex items-center gap-1 mt-1">
                <span className="text-lg">↑</span> 12% vs mes anterior
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E2E8F0]">
              <p className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Resultados Normales</p>
              <h3 className="text-[32px] font-bold text-[#16A34A]">3,812</h3>
              <p className="text-[13px] font-medium text-[#64748B] mt-1">88.9% del total</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E2E8F0]">
              <p className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Dudosos (Repetición)</p>
              <h3 className="text-[32px] font-bold text-[#F59E0B]">384</h3>
              <p className="text-[13px] font-medium text-[#64748B] mt-1">9.0% del total</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E2E8F0] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFE4E6] rounded-bl-full z-0 opacity-50"></div>
              <p className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-2 relative z-10">Fallas / Alertas Rojas</p>
              <h3 className="text-[32px] font-bold text-[#E63956] relative z-10">89</h3>
              <p className="text-[13px] font-medium text-[#E63956] mt-1 relative z-10">2.1% del total</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            {/* Gráfico Circular: Resultados */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[16px] font-bold text-[#0F1B36]">Distribución de Resultados</h3>
                <PieChart className="w-5 h-5 text-[#94A3B8]" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-8">
                {/* CSS Donut Chart */}
                <div className="relative w-48 h-48 rounded-full flex items-center justify-center" 
                     style={{
                       background: 'conic-gradient(#16A34A 0% 89%, #F59E0B 89% 98%, #E63956 98% 100%)'
                     }}>
                  <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                    <span className="text-[28px] font-bold text-[#0F1B36]">4.2k</span>
                    <span className="text-[12px] text-[#64748B]">Tamizajes</span>
                  </div>
                </div>
                {/* Leyenda */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#16A34A]"></div>
                    <div>
                      <p className="text-[14px] font-bold text-[#0F1B36]">Normales (Pasa)</p>
                      <p className="text-[13px] text-[#64748B]">3,812 bebés</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#F59E0B]"></div>
                    <div>
                      <p className="text-[14px] font-bold text-[#0F1B36]">Dudosos (Amarillo)</p>
                      <p className="text-[13px] text-[#64748B]">384 bebés</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#E63956]"></div>
                    <div>
                      <p className="text-[14px] font-bold text-[#0F1B36]">Fallas (Sospecha)</p>
                      <p className="text-[13px] text-[#64748B]">89 bebés</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráfico de Barras Horizontales: Sexo & Altitud */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[16px] font-bold text-[#0F1B36]">Demografía y Entorno</h3>
                <Filter className="w-5 h-5 text-[#94A3B8]" />
              </div>
              
              <div className="space-y-6 flex-1">
                {/* Distribución por Sexo */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[14px] font-bold text-[#334155]">Distribución por Sexo</p>
                  </div>
                  <div className="h-4 w-full bg-[#F1F5F9] rounded-full overflow-hidden flex">
                    <div className="h-full bg-[#3B82F6]" style={{ width: '52%' }}></div>
                    <div className="h-full bg-[#EC4899]" style={{ width: '48%' }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[13px] font-medium text-[#3B82F6]">Niños (52%)</p>
                    <p className="text-[13px] font-medium text-[#EC4899]">Niñas (48%)</p>
                  </div>
                </div>

                {/* Distribución por Banda de Altitud */}
                <div>
                  <p className="text-[14px] font-bold text-[#334155] mb-3">Tamizajes por Banda de Altitud</p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[12px] mb-1">
                        <span className="text-[#475569]">Costa (0 - 2,499m)</span>
                        <span className="font-bold text-[#0F1B36]">2,150</span>
                      </div>
                      <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[12px] mb-1">
                        <span className="text-[#475569]">Sierra Media (2,500 - 3,599m)</span>
                        <span className="font-bold text-[#0F1B36]">1,300</span>
                      </div>
                      <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1E3A8A] rounded-full opacity-80" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[12px] mb-1">
                        <span className="text-[#475569]">Alto Andino (3,600m+)</span>
                        <span className="font-bold text-[#0F1B36]">835</span>
                      </div>
                      <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1E3A8A] rounded-full opacity-60" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Gráfico de Barras Verticales: Horas de Vida al momento del tamizaje */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6 mb-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-[16px] font-bold text-[#0F1B36]">Momento del Tamizaje (Horas de Vida)</h3>
                <p className="text-[13px] text-[#64748B] mt-0.5">El protocolo recomienda realizarlo entre las 24h y 48h de nacido.</p>
              </div>
            </div>
            
            <div className="h-[200px] w-full flex items-end justify-between gap-2 md:gap-4 px-2">
              {[
                { label: '< 24h', val: 15, color: '#94A3B8' },
                { label: '24-30h', val: 40, color: '#2563EB' },
                { label: '30-36h', val: 65, color: '#2563EB' },
                { label: '36-48h', val: 85, color: '#1E3A8A' },
                { label: '48-60h', val: 45, color: '#2563EB' },
                { label: '60-72h', val: 20, color: '#94A3B8' },
                { label: '> 72h', val: 8, color: '#94A3B8' },
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center flex-1 group">
                  <div className="relative w-full max-w-[40px] flex items-end justify-center h-[160px] bg-[#F1F5F9] rounded-t-md overflow-hidden">
                    <div 
                      className="w-full rounded-t-md transition-all duration-500 hover:opacity-80"
                      style={{ height: `${bar.val}%`, backgroundColor: bar.color }}
                    ></div>
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-[#0F1B36] text-white text-[11px] font-bold py-1 px-2 rounded whitespace-nowrap">
                      {bar.val * 42} tamizajes
                    </div>
                  </div>
                  <span className="text-[12px] font-medium text-[#475569] mt-3 whitespace-nowrap">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mapa Interactivo de Perú */}
          <div className="mb-6">
            <PeruMap />
          </div>

        </main>
      </div>
    </div>
  );
}
