import React, { useState } from 'react';
import { 
  Heart, 
  Mountain, 
  Bell, 
  Stethoscope, 
  FileText, 
  ShieldCheck, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Activity
} from 'lucide-react';

const HeartPulseIcon = ({ className = "w-6 h-6", color = "#E63956" }) => (
  <div className="relative flex items-center justify-center">
    <Heart className={className} color={color} fill={color} />
    <Activity className="absolute inset-0 m-auto text-white" size={className.includes('w-8') ? 20 : 14} />
  </div>
);

type LoginProps = {
  onLogin: () => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-[#F4F7FB] to-[#EBF2F8] font-sans">
      
      {/* LEFT COLUMN */}
      <div className="w-full md:w-[45%] p-8 lg:p-12 flex flex-col justify-between">
        <div className="space-y-12">
          
          {/* Header Branding */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <HeartPulseIcon className="w-8 h-8" />
              <h1 className="text-[32px] font-bold text-[#0F1B36] tracking-tight leading-none">LATIDO</h1>
            </div>
            <p className="text-[14px] text-[#0F1B36]">
              De la detección a la <span className="text-[#E63956] font-medium">acción</span>
            </p>
          </div>

          {/* Title */}
          <h2 className="text-[20px] lg:text-[22px] font-bold text-[#0F1B36] leading-snug max-w-md">
            Sistema inteligente de apoyo al tamizaje cardiológico neonatal y referencia especializada.
          </h2>

          {/* Features List */}
          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center">
                <Mountain className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[#0F1B36]">Contextualiza por altitud</h3>
                <p className="text-[13px] text-[#6B7280] mt-0.5">Algoritmo adaptado al entorno peruano.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FDE8EC] flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#E63956]" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[#0F1B36]">Alertas oportunas</h3>
                <p className="text-[13px] text-[#6B7280] mt-0.5">Detecta y prioriza casos críticos.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[#0F1B36]">Orientación especializada</h3>
                <p className="text-[13px] text-[#6B7280] mt-0.5">Conexión con especialistas en tiempo real.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#16A34A]" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[#0F1B36]">Referencia y seguimiento</h3>
                <p className="text-[13px] text-[#6B7280] mt-0.5">Flujo simplificado y trazabilidad del caso.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Image Area */}
        <div className="mt-12 relative rounded-2xl overflow-hidden h-48 lg:h-56 bg-gray-200">
          <img 
            src="https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=2070&auto=format&fit=crop" 
            alt="Bebé durmiendo placenteramente"
            className="w-full h-full object-cover object-center"
          />
          {/* Disclaimer Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E0F2FE] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#374151] leading-tight">Sistema de apoyo a la decisión clínica.</p>
              <p className="text-[12px] text-[#6B7280] leading-tight mt-0.5">No reemplaza el criterio profesional.</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full md:w-[55%] flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-10 relative flex flex-col h-auto">
          
          {/* Card Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#FDE8EC] flex items-center justify-center mb-4">
              <HeartPulseIcon className="w-6 h-6" />
            </div>
            <h2 className="text-[24px] font-bold text-[#0F1B36]">Iniciar sesión</h2>
            <p className="text-[14px] text-[#6B7280] mt-1">Accede a tu cuenta para continuar</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5 flex-grow">
            {/* Input 1 */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-bold text-[#0F1B36]">Usuario / DNI institucional</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#9CA3AF] stroke-[1.5]" />
                </div>
                <input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-2.5 bg-white border border-[#E5E7EB] rounded-lg text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#E63956] focus:border-[#E63956] transition-colors"
                  placeholder="Ej. 12345678"
                />
              </div>
            </div>

            {/* Input 2 */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-bold text-[#0F1B36]">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#9CA3AF] stroke-[1.5]" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="block w-full pl-10 pr-10 py-2.5 bg-white border border-[#E5E7EB] rounded-lg text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#E63956] focus:border-[#E63956] transition-colors"
                  placeholder="Ingresa tu contraseña"
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#9CA3AF] hover:text-[#6B7280] stroke-[1.5] transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#9CA3AF] hover:text-[#6B7280] stroke-[1.5] transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-[#E5E7EB] text-[#E63956] focus:ring-[#E63956] cursor-pointer"
                />
                <span className="text-[13px] text-[#374151] group-hover:text-[#0F1B36] transition-colors">Recordarme</span>
              </label>
              <a href="#" className="text-[13px] text-[#2563EB] hover:underline font-medium transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-2 bg-[#E63956] hover:bg-[#D42B47] text-white py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E63956]"
            >
              Ingresar a LATIDO
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Internal Footer */}
          <div className="mt-8 pt-6 border-t border-[#E5E7EB] relative">
            <div className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-white px-2">
              <ShieldCheck className="w-5 h-5 text-[#D1D5DB] stroke-[1.5]" />
            </div>
            <p className="text-center text-[12px] text-[#6B7280]">
              Acceso exclusivo para personal de salud autorizado
            </p>
          </div>
          
        </div>
        
        {/* General Footer */}
        <div className="mt-12 text-center">
          <p className="text-[12px] text-[#6B7280]">
            © 2025 LATIDO. Todos los derechos reservados.
          </p>
        </div>
      </div>

    </div>
  );
}
