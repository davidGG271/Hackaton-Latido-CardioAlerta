import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  LogOut, 
  Building2, 
  Map, 
  MapPin, 
  Hospital,
  ChevronDown,
  CheckCircle2,
  Info
} from 'lucide-react';

const HeartPulseIcon = ({ className = "w-6 h-6", color = "#E63956" }) => (
  <div className="relative flex items-center justify-center">
    <Heart className={className} color={color} fill={color} />
    <Activity className="absolute inset-0 m-auto text-white" size={className.includes('w-8') ? 20 : 14} />
  </div>
);

const CustomSelect = ({ 
  label, 
  icon: Icon, 
  options, 
  value, 
  onChange, 
  disabled, 
  placeholder 
}: {
  label: string;
  icon: any;
  options: { label: string; value: string | number }[];
  value: string | number;
  onChange: (val: string | number) => void;
  disabled: boolean;
  placeholder: string;
}) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find(o => String(o.value) === String(value));

  return (
    <div className="space-y-1.5 flex flex-col relative">
      <label className="block text-[13px] font-bold text-[#0F1B36]">{label}</label>
      <div 
        className={`relative flex-1 block w-full min-h-[42px] pl-10 pr-10 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm transition-colors ${disabled ? 'bg-[#F8FAFC] cursor-not-allowed text-[#94A3B8]' : 'cursor-pointer'} ${value ? 'text-[#0F1B36]' : 'text-[#94A3B8]'}`}
        onClick={() => !disabled && setOpen(!open)}
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-[#94A3B8] stroke-[1.5]" />
        </div>
        <div className="truncate">{selectedOption ? selectedOption.label : placeholder}</div>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown className={`h-5 w-5 text-[#94A3B8] stroke-[1.5] transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </div>
      
      {open && !disabled && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>
          <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_10px_15px_-3px_rgb(0,0,0,0.1),0_4px_6px_-4px_rgb(0,0,0,0.1)] z-50 max-h-60 overflow-y-auto">
            {options.length > 0 ? options.map(opt => (
              <div 
                key={opt.value}
                className={`px-4 py-2 hover:bg-[#F1F5F9] cursor-pointer text-[14px] text-[#0F1B36] ${String(opt.value) === String(value) ? 'bg-[#EFF6FF] font-bold text-[#1E3A8A]' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </div>
            )) : (
              <div className="px-4 py-3 text-[13px] text-[#94A3B8] italic text-center">Sin opciones</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};


type IpressData = {
  codigo: number;
  nombre: string;
  distrito: string;
  provincia: string;
  departamento: string;
  latitud: number;
  longitud: number;
  altitud_m: number;
  banda_altitud: string;
  banda_descripcion: string;
};

type LocationSelectorProps = {
  onConfirm: (centroData: IpressData | null) => void;
  onLogout: () => void;
};

export default function LocationSelector({ onConfirm, onLogout }: LocationSelectorProps) {
  const [data, setData] = useState<IpressData[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [selectedDistrito, setSelectedDistrito] = useState("");
  const [selectedCentro, setSelectedCentro] = useState("");

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then((json: IpressData[]) => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  const departamentos = Array.from(new Set(data.map(item => item.departamento))).sort();
  
  const provincias = Array.from(
    new Set(data.filter(item => item.departamento === selectedDepartamento).map(item => item.provincia))
  ).sort();

  const distritos = Array.from(
    new Set(data.filter(item => item.provincia === selectedProvincia && item.departamento === selectedDepartamento).map(item => item.distrito))
  ).sort();

  const centros = data
    .filter(item => item.distrito === selectedDistrito && item.provincia === selectedProvincia && item.departamento === selectedDepartamento)
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  const handleDepartamentoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartamento(e.target.value);
    setSelectedProvincia("");
    setSelectedDistrito("");
    setSelectedCentro("");
  };

  const handleProvinciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvincia(e.target.value);
    setSelectedDistrito("");
    setSelectedCentro("");
  };

  const handleDistritoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrito(e.target.value);
    setSelectedCentro("");
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] font-sans">
      
      {/* 2. BARRA DE NAVEGACIÓN SUPERIOR */}
      <nav className="w-full bg-white border-b border-[#E2E8F0] shadow-sm">
        <div className="w-full px-6 lg:px-8 py-4 flex justify-between items-center">
          
          {/* Lado Izquierdo (Branding) */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <HeartPulseIcon className="w-7 h-7" />
              <span className="text-[24px] font-bold text-[#0F1B36] tracking-tight leading-none">LATIDO</span>
            </div>
            <div className="h-6 w-px bg-[#E2E8F0] mx-1"></div>
            <span className="text-[13px] text-[#0F1B36] hidden sm:block">
              De la detección a la <span className="text-[#E63956] font-medium">acción</span>
            </span>
          </div>

          {/* Lado Derecho (Perfil y Logout) */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[14px] font-bold text-[#0F1B36] leading-tight">Dra. María Pérez</p>
                <p className="text-[13px] text-[#64748B] leading-tight">Personal de salud</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                alt="Dra. María Pérez" 
                className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
              />
            </div>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 text-[#475569] hover:text-[#0F1B36] transition-colors group"
            >
              <LogOut className="w-5 h-5 group-hover:stroke-[#E63956] transition-colors" />
              <span className="text-[14px] font-medium hidden sm:block">Salir</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center w-full px-4 pb-[300px]">
        
        {/* 3. PASO A PASO / STEPPER DE PROGRESO */}
        <div className="flex items-start justify-center w-full max-w-md my-8 relative">
          
          {/* Connecting Line */}
          <div className="absolute top-3.5 left-[calc(25%+14px)] right-[calc(25%+14px)] h-px bg-[#E2E8F0] -z-10"></div>
          
          {/* Step 1 */}
          <div className="flex flex-col items-center w-1/2">
            <div className="w-7 h-7 rounded-full bg-[#E2E8F0] flex items-center justify-center mb-2">
              <span className="text-[13px] font-medium text-[#64748B]">1</span>
            </div>
            <span className="text-[12px] text-[#64748B]">Inicio de sesión</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center w-1/2">
            <div className="w-7 h-7 rounded-full bg-[#E63956] flex items-center justify-center mb-2 shadow-sm">
              <span className="text-[13px] font-bold text-white">2</span>
            </div>
            <span className="text-[13px] font-bold text-[#E63956]">Seleccionar localidad</span>
          </div>
        </div>

        {/* 4. TARJETA PRINCIPAL (Formulario de Localidad) */}
        <div className="w-full max-w-[960px] bg-white rounded-[20px] shadow-[0_4px_24px_rgb(0,0,0,0.03)] p-8 md:p-12">
          
          {/* Encabezado Interno */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FDE8EC] flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#E63956]" />
            </div>
            <div>
              <h2 className="text-[22px] md:text-[24px] font-bold text-[#0F1B36]">Selecciona la localidad</h2>
              <p className="text-[14px] text-[#64748B] mt-1">
                Esta información nos permite contextualizar el tamizaje según la altitud.
              </p>
            </div>
          </div>
          {/* Selector de Ubicación Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 relative">
            
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#E63956] animate-pulse" />
              </div>
            )}

            <CustomSelect 
              label="Departamento"
              icon={Building2}
              placeholder="Seleccionar departamento"
              disabled={loading}
              value={selectedDepartamento}
              options={departamentos.map(d => ({ label: d, value: d }))}
              onChange={(val) => handleDepartamentoChange({ target: { value: val } } as any)}
            />

            <CustomSelect 
              label="Provincia"
              icon={Map}
              placeholder="Seleccionar provincia"
              disabled={!selectedDepartamento || loading}
              value={selectedProvincia}
              options={provincias.map(p => ({ label: p, value: p }))}
              onChange={(val) => handleProvinciaChange({ target: { value: val } } as any)}
            />

            <CustomSelect 
              label="Distrito"
              icon={MapPin}
              placeholder="Seleccionar distrito"
              disabled={!selectedProvincia || loading}
              value={selectedDistrito}
              options={distritos.map(d => ({ label: d, value: d }))}
              onChange={(val) => handleDistritoChange({ target: { value: val } } as any)}
            />

            <CustomSelect 
              label="Centro médico"
              icon={Hospital}
              placeholder="Seleccionar centro médico"
              disabled={!selectedDistrito || loading}
              value={selectedCentro}
              options={centros.map(c => ({ label: c.nombre, value: c.codigo }))}
              onChange={(val) => setSelectedCentro(String(val))}
            />
          </div>

          {/* Botón de Confirmación Centrado */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => {
                const selectedCentroData = centros.find(c => String(c.codigo) === selectedCentro);
                if (selectedCentroData) {
                  onConfirm(selectedCentroData);
                } else {
                  onConfirm(null);
                }
              }}
              disabled={!selectedCentro}
              className="flex items-center justify-center gap-2 bg-[#E63956] hover:bg-[#D42B47] disabled:bg-[#FDA4AF] disabled:cursor-not-allowed text-white py-3 px-8 rounded-lg font-bold text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E63956]"
            >
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              Confirmar y continuar
            </button>
          </div>

        </div>

        {/* 5. BANNER INFORMATIVO INFERIOR */}
        <div className="w-full max-w-[700px] mt-6 bg-[#EFF6FF] rounded-lg p-4 flex items-center gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center">
            <Info className="w-4 h-4 text-white stroke-[2.5]" />
          </div>
          <p className="text-[13px] text-[#1E3A8A] font-medium leading-snug">
            La altitud del establecimiento se utilizará para ajustar los criterios de evaluación del tamizaje.
          </p>
        </div>

      </main>
    </div>
  );
}
