import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from 'react-simple-maps';
import {
  ChevronRight,
  MapPin,
  Mountain,
  Activity,
  X,
  Loader2,
  ArrowLeft,
  Heart,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────
type DrillLevel = 'departamento' | 'provincia' | 'distrito';

type CentroMedico = {
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
  estado: 'normal' | 'dudoso' | 'alerta';
  total_tamizajes: number;
  alertas_activas: number;
};

type TooltipData = {
  name: string;
  x: number;
  y: number;
  totalTamizajes: number;
  normales: number;
  dudosos: number;
  alertas: number;
  centros: number;
  totalAlertas: number;
};

type SelectedCentro = CentroMedico | null;

// ─── Color Palette ──────────────────────────────────────────
const COLORS = {
  normal: '#16A34A',
  dudoso: '#F59E0B',
  alerta: '#E63956',
  stroke: '#CBD5E1',
  strokeHover: '#1E3A8A',
  accent: '#1E3A8A',
};

// ─── Seed-based pseudo-random for consistent demo data ───────
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// ─── Main Component ─────────────────────────────────────────
export default function PeruMap() {
  const [depGeo, setDepGeo] = useState<any>(null);
  const [provGeo, setProvGeo] = useState<any>(null);
  const [distGeo, setDistGeo] = useState<any>(null);
  const [centrosRaw, setCentrosRaw] = useState<any[]>([]);

  const [level, setLevel] = useState<DrillLevel>('departamento');
  const [selectedDep, setSelectedDep] = useState<string>('');
  const [selectedProv, setSelectedProv] = useState<string>('');

  const [center, setCenter] = useState<[number, number]>([-75.5, -9.5]);
  const [zoom, setZoom] = useState(1);

  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string>('');
  const [selectedCentro, setSelectedCentro] = useState<SelectedCentro>(null);
  const [loading, setLoading] = useState(true);

  // ─── Load data ────────────────────────────────────────────
  useEffect(() => {
    Promise.all([
      fetch('/geo/peru_departamentos.json').then(r => r.json()),
      fetch('/geo/peru_provincias.json').then(r => r.json()),
      fetch('/geo/peru_distritos.json').then(r => r.json()),
      fetch('/data.json').then(r => r.json()),
    ]).then(([dep, prov, dist, centros]) => {
      setDepGeo(dep);
      setProvGeo(prov);
      setDistGeo(dist);
      setCentrosRaw(centros);
      setLoading(false);
    }).catch(err => {
      console.error('Error loading map data:', err);
      setLoading(false);
    });
  }, []);

  // ─── Enrich centros with simulated data ───────────────────
  const centros: CentroMedico[] = useMemo(() => {
    return centrosRaw.map((c: any) => {
      const r = pseudoRandom(c.codigo);
      // Adjust simulation slightly to show more variety across Peru
      const isHighAltitude = c.altitud_m > 3000;
      const regionalRisk = (c.departamento.charCodeAt(0) % 5) / 5; // Variation per region
      
      const pNormal = isHighAltitude ? 0.6 + (regionalRisk * 0.2) : 0.85 + (regionalRisk * 0.1);
      const pDudoso = pNormal + 0.08;
      
      let estado: CentroMedico['estado'];
      if (r < pNormal) estado = 'normal';
      else if (r < pDudoso) estado = 'dudoso';
      else estado = 'alerta';
      
      const total = Math.floor(pseudoRandom(c.codigo + 1) * 150) + 20;
      return { ...c, estado, total_tamizajes: total, alertas_activas: estado === 'alerta' ? Math.floor(pseudoRandom(c.codigo + 2) * 10) + 2 : 0 };
    });
  }, [centrosRaw]);

  // ─── Aggregate stats ─────────────────────────────────────
  const getRegionStats = useCallback((filterFn: (c: CentroMedico) => boolean) => {
    const filtered = centros.filter(filterFn);
    const totalTamizajes = filtered.reduce((s, c) => s + c.total_tamizajes, 0);
    const totalAlertas = filtered.reduce((s, c) => s + c.alertas_activas, 0);
    return {
      centros: filtered.length,
      totalTamizajes,
      totalAlertas,
      normales: filtered.filter(c => c.estado === 'normal').length,
      dudosos: filtered.filter(c => c.estado === 'dudoso').length,
      alertas: filtered.filter(c => c.estado === 'alerta').length,
    };
  }, [centros]);

  // ─── Current features ─────────────────────────────────────
  const currentFeatures = useMemo(() => {
    if (level === 'departamento' && depGeo) return depGeo;
    if (level === 'provincia' && provGeo) {
      return { ...provGeo, features: provGeo.features.filter((f: any) => f.properties.FIRST_NOMB?.toUpperCase() === selectedDep.toUpperCase()) };
    }
    if (level === 'distrito' && distGeo) {
      return { ...distGeo, features: distGeo.features.filter((f: any) => f.properties.NOMBDEP?.toUpperCase() === selectedDep.toUpperCase() && f.properties.NOMBPROV?.toUpperCase() === selectedProv.toUpperCase()) };
    }
    return null;
  }, [level, depGeo, provGeo, distGeo, selectedDep, selectedProv]);

  // ─── Visible centros ──────────────────────────────────────
  const visibleCentros = useMemo(() => {
    if (level === 'distrito') {
      return centros.filter(c => c.departamento?.toUpperCase() === selectedDep.toUpperCase() && c.provincia?.toUpperCase() === selectedProv.toUpperCase());
    }
    return [];
  }, [level, centros, selectedDep, selectedProv]);

  // ─── Feature name ─────────────────────────────────────────
  const getFeatureName = (geo: any): string => {
    if (level === 'departamento') return geo.properties.NOMBDEP || '';
    if (level === 'provincia') return geo.properties.NOMBPROV || '';
    if (level === 'distrito') return geo.properties.NOMBDIST || '';
    return '';
  };

  // ─── Choropleth Color Logic (Blue Gradient) ───────────────
  const getChoroplethColor = (geo: any, isHovered: boolean) => {
    if (isHovered) return '#60A5FA'; // Highlight with bright blue on hover

    const name = getFeatureName(geo);
    const stats = getRegionStats(c => {
      if (level === 'departamento') return c.departamento?.toUpperCase() === name.toUpperCase();
      if (level === 'provincia') return c.departamento?.toUpperCase() === selectedDep.toUpperCase() && c.provincia?.toUpperCase() === name.toUpperCase();
      if (level === 'distrito') return c.departamento?.toUpperCase() === selectedDep.toUpperCase() && c.provincia?.toUpperCase() === selectedProv.toUpperCase() && c.distrito?.toUpperCase() === name.toUpperCase();
      return false;
    });

    if (stats.centros === 0 || stats.totalTamizajes === 0) return '#F8FAFC'; // No data (very light gray)

    // Metric: Tasa de alertas por paciente (Peor estado = mayor tasa)
    const riskRatio = stats.totalAlertas / stats.totalTamizajes;

    // Gradient from Light Blue (Best) to Dark Blue (Worst)
    // Thresholds tuned precisely to the data distribution to ensure full color dispersion
    if (riskRatio >= 0.015) return '#1E3A8A'; // Blue 900 (Peor estado)
    if (riskRatio >= 0.010) return '#1D4ED8'; // Blue 700 
    if (riskRatio >= 0.005) return '#3B82F6'; // Blue 500
    if (riskRatio >= 0.002) return '#93C5FD'; // Blue 300
    
    return '#DBEAFE'; // Blue 100 (Mejor estado, muy bajas alertas)
  };

  // ─── Bounds calculation ───────────────────────────────────
  const getBounds = (features: any[]): { center: [number, number]; zoom: number } | null => {
    if (!features || features.length === 0) return null;
    let minLng = 180, maxLng = -180, minLat = 90, maxLat = -90;
    features.forEach((f: any) => {
      const coords = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
      coords.forEach((polygon: any) => {
        polygon.forEach((ring: any) => {
          ring.forEach((coord: any) => {
            if (coord[0] < minLng) minLng = coord[0];
            if (coord[0] > maxLng) maxLng = coord[0];
            if (coord[1] < minLat) minLat = coord[1];
            if (coord[1] > maxLat) maxLat = coord[1];
          });
        });
      });
    });
    const cLng = (minLng + maxLng) / 2;
    const cLat = (minLat + maxLat) / 2;
    const span = Math.max(maxLng - minLng, maxLat - minLat);
    // Adjusted zoom logic so it doesn't zoom in too aggressively
    const z = Math.min(Math.max(12 / span, 1), 25);
    return { center: [cLng, cLat], zoom: z };
  };

  // ─── Click handlers ───────────────────────────────────────
  const handleRegionClick = (geo: any) => {
    if (level === 'departamento') {
      const dep = geo.properties.NOMBDEP;
      if (!dep) return;
      setSelectedDep(dep);
      setLevel('provincia');
      const bounds = getBounds(provGeo?.features?.filter((f: any) => f.properties.FIRST_NOMB?.toUpperCase() === dep.toUpperCase()) || []);
      if (bounds) { setCenter(bounds.center); setZoom(bounds.zoom); }
    } else if (level === 'provincia') {
      const prov = geo.properties.NOMBPROV;
      if (!prov) return;
      setSelectedProv(prov);
      setLevel('distrito');
      const bounds = getBounds(distGeo?.features?.filter((f: any) => f.properties.NOMBDEP?.toUpperCase() === selectedDep.toUpperCase() && f.properties.NOMBPROV?.toUpperCase() === prov.toUpperCase()) || []);
      if (bounds) { setCenter(bounds.center); setZoom(bounds.zoom); }
    }
    setTooltip(null);
    setHoveredRegion('');
  };

  const goBack = (targetLevel: DrillLevel) => {
    if (targetLevel === 'departamento') {
      setLevel('departamento'); setSelectedDep(''); setSelectedProv('');
      setCenter([-75.5, -9.5]); setZoom(1);
    } else if (targetLevel === 'provincia') {
      setLevel('provincia'); setSelectedProv('');
      const bounds = getBounds(provGeo?.features?.filter((f: any) => f.properties.FIRST_NOMB?.toUpperCase() === selectedDep.toUpperCase()) || []);
      if (bounds) { setCenter(bounds.center); setZoom(bounds.zoom); }
    }
    setTooltip(null); setSelectedCentro(null); setHoveredRegion('');
  };

  // ─── Hover ────────────────────────────────────────────────
  const handleHover = (geo: any, event: React.MouseEvent) => {
    const name = getFeatureName(geo);
    setHoveredRegion(name);
    const stats = getRegionStats(c => {
      if (level === 'departamento') return c.departamento?.toUpperCase() === name.toUpperCase();
      if (level === 'provincia') return c.departamento?.toUpperCase() === selectedDep.toUpperCase() && c.provincia?.toUpperCase() === name.toUpperCase();
      if (level === 'distrito') return c.departamento?.toUpperCase() === selectedDep.toUpperCase() && c.provincia?.toUpperCase() === selectedProv.toUpperCase() && c.distrito?.toUpperCase() === name.toUpperCase();
      return false;
    });
    setTooltip({ name, x: event.clientX, y: event.clientY, ...stats });
  };

  const markerColor = (estado: string) => {
    switch (estado) {
      case 'normal': return COLORS.normal;
      case 'dudoso': return COLORS.dudoso;
      case 'alerta': return COLORS.alerta;
      default: return '#CBD5E1';
    }
  };

  // ─── Zoom controls ────────────────────────────────────────
  const handleZoomIn = () => setZoom(z => Math.min(z * 1.5, 60));
  const handleZoomOut = () => setZoom(z => Math.max(z / 1.5, 1));
  const handleResetView = () => {
    goBack('departamento');
  };

  // ─── Loading ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full h-[600px] bg-white rounded-xl border border-[#E2E8F0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-[#E2E8F0] border-t-[#1E3A8A] animate-spin"></div>
            <MapPin className="w-6 h-6 text-[#1E3A8A] absolute inset-0 m-auto" />
          </div>
          <p className="text-[14px] text-[#64748B] font-medium mt-2">Cargando mapa interactivo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
      {/* ─── Header ────────────────────────────────────────── */}
      <div className="px-6 pt-5 pb-4 bg-white border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] flex items-center justify-center border border-[#BFDBFE]">
              <MapPin className="w-5 h-5 text-[#1E3A8A]" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#0F1B36]">Mapa Epidemiológico</h3>
              <p className="text-[12px] text-[#64748B]">
                Haz click para explorar: Departamento → Provincia → Distrito
              </p>
            </div>
          </div>
          {/* Choropleth Legend */}
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider">Tasa de Alertas (Peor Estado)</span>
            <div className="flex items-center">
              <span className="text-[11px] text-[#64748B] mr-2">Mejor</span>
              <div className="flex h-3 rounded-full overflow-hidden border border-[#E2E8F0] shadow-sm">
                <div className="w-8 bg-[#DBEAFE]"></div>
                <div className="w-8 bg-[#93C5FD]"></div>
                <div className="w-8 bg-[#3B82F6]"></div>
                <div className="w-8 bg-[#1D4ED8]"></div>
                <div className="w-8 bg-[#1E3A8A]"></div>
              </div>
              <span className="text-[11px] text-[#64748B] ml-2">Peor</span>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[13px] mt-2">
          <button onClick={() => goBack('departamento')} className={`font-medium transition-colors ${level === 'departamento' ? 'text-[#0F1B36] font-bold' : 'text-[#3B82F6] hover:text-[#1E3A8A] cursor-pointer underline underline-offset-2'}`}>
            🇵🇪 Perú
          </button>
          {selectedDep && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
              <button onClick={() => goBack('provincia')} className={`font-medium transition-colors ${level === 'provincia' ? 'text-[#0F1B36] font-bold' : level === 'distrito' ? 'text-[#3B82F6] hover:text-[#1E3A8A] cursor-pointer underline underline-offset-2' : 'text-[#0F1B36] font-bold'}`}>
                {selectedDep}
              </button>
            </>
          )}
          {selectedProv && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span className="text-[#0F1B36] font-bold">{selectedProv}</span>
            </>
          )}
          {level !== 'departamento' && (
            <button onClick={() => level === 'distrito' ? goBack('provincia') : goBack('departamento')} className="ml-4 flex items-center gap-1 text-[12px] text-[#475569] hover:text-[#0F1B36] transition-colors font-medium bg-[#F1F5F9] hover:bg-[#E2E8F0] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
              <ArrowLeft className="w-3 h-3" />
              Volver
            </button>
          )}
        </div>
      </div>

      {/* ─── Map + Side Panel ────────────────────────────── */}
      <div className="flex relative">
        {/* Map Container */}
        <div className={`transition-all duration-300 ${selectedCentro ? 'w-[65%]' : 'w-full'}`}>
          <div className="h-[600px] bg-[#F8FAFC] relative overflow-hidden">
            
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 1200, center: [-75.5, -9.5] }}
              width={800}
              height={600}
              style={{ width: '100%', height: '100%' }}
            >
              <ZoomableGroup
                center={center}
                zoom={zoom}
                onMoveEnd={({ coordinates, zoom: z }) => {
                  setCenter(coordinates as [number, number]);
                  setZoom(z);
                }}
                translateExtent={[[-300, -300], [1100, 1000]]}
              >
                {currentFeatures && (
                  <Geographies geography={currentFeatures}>
                    {({ geographies }) =>
                      geographies.map((geo, index) => {
                        const name = getFeatureName(geo);
                        const isHovered = hoveredRegion === name;
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={(e) => handleHover(geo, e as any)}
                            onMouseMove={(e) => { if (tooltip) setTooltip(prev => prev ? { ...prev, x: (e as any).clientX, y: (e as any).clientY } : null); }}
                            onMouseLeave={() => { setTooltip(null); setHoveredRegion(''); }}
                            onClick={() => handleRegionClick(geo)}
                            tabIndex={0}
                            style={{
                              default: {
                                fill: getChoroplethColor(geo, false),
                                stroke: COLORS.stroke,
                                strokeWidth: level === 'departamento' ? 0.6 : 0.4,
                                outline: 'none',
                                cursor: level !== 'distrito' ? 'pointer' : 'default',
                                transition: 'fill 200ms ease',
                              },
                              hover: {
                                fill: getChoroplethColor(geo, true),
                                stroke: COLORS.strokeHover,
                                strokeWidth: 1,
                                outline: 'none',
                                cursor: level !== 'distrito' ? 'pointer' : 'default',
                              },
                              pressed: {
                                fill: '#BFDBFE',
                                stroke: COLORS.strokeHover,
                                strokeWidth: 1.5,
                                outline: 'none',
                              },
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                )}

                {/* Medical center markers */}
                {level === 'distrito' && visibleCentros.map((centro) => (
                  <Marker key={centro.codigo} coordinates={[centro.longitud, centro.latitud]} onClick={() => setSelectedCentro(centro)}>
                    <circle
                      r={4 / zoom}
                      fill={markerColor(centro.estado)}
                      stroke="#fff"
                      strokeWidth={1.5 / zoom}
                      style={{ cursor: 'pointer', transition: 'all 150ms ease', filter: `drop-shadow(0 1px 2px ${markerColor(centro.estado)}66)` }}
                      onMouseEnter={(e) => (e.target as SVGCircleElement).setAttribute('r', String(6 / zoom))}
                      onMouseLeave={(e) => (e.target as SVGCircleElement).setAttribute('r', String(4 / zoom))}
                    />
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>

            {/* Zoom controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
              <button onClick={handleZoomIn} className="w-9 h-9 bg-white hover:bg-[#F1F5F9] rounded-lg shadow-sm border border-[#E2E8F0] flex items-center justify-center transition-colors" title="Acercar">
                <ZoomIn className="w-4 h-4 text-[#475569]" />
              </button>
              <button onClick={handleZoomOut} className="w-9 h-9 bg-white hover:bg-[#F1F5F9] rounded-lg shadow-sm border border-[#E2E8F0] flex items-center justify-center transition-colors" title="Alejar">
                <ZoomOut className="w-4 h-4 text-[#475569]" />
              </button>
              <button onClick={handleResetView} className="w-9 h-9 bg-white hover:bg-[#F1F5F9] rounded-lg shadow-sm border border-[#E2E8F0] flex items-center justify-center transition-colors" title="Vista completa">
                <Maximize2 className="w-4 h-4 text-[#475569]" />
              </button>
            </div>

            {/* Empty state */}
            {level === 'distrito' && visibleCentros.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] z-10 pointer-events-none">
                <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
                  <MapPin className="w-8 h-8 text-[#94A3B8] mx-auto mb-3" />
                  <p className="text-[14px] text-[#475569] font-bold">No hay centros médicos</p>
                  <p className="text-[12px] text-[#94A3B8] mt-1">No se encontraron registros en esta provincia</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── Side Panel ────────────────────────────────── */}
        {selectedCentro && (
          <div className="w-[35%] border-l border-[#E2E8F0] bg-white h-[600px] overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Detalle del Centro</span>
                <button onClick={() => setSelectedCentro(null)} className="w-7 h-7 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-[#475569]" />
                </button>
              </div>

              {/* Estado badge */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold mb-4 ${
                selectedCentro.estado === 'normal' ? 'bg-[#DCFCE7] text-[#166534]' :
                selectedCentro.estado === 'dudoso' ? 'bg-[#FEF3C7] text-[#92400E]' :
                'bg-[#FFE4E6] text-[#9F1239]'
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full ${
                  selectedCentro.estado === 'normal' ? 'bg-[#16A34A]' :
                  selectedCentro.estado === 'dudoso' ? 'bg-[#F59E0B]' :
                  'bg-[#E63956]'
                }`}></div>
                {selectedCentro.estado === 'normal' ? 'Normal' : selectedCentro.estado === 'dudoso' ? 'Dudoso' : 'Alerta'}
              </div>

              <h4 className="text-[16px] font-bold text-[#0F1B36] mb-1 leading-snug">{selectedCentro.nombre}</h4>
              <p className="text-[12px] text-[#64748B] mb-5">{selectedCentro.distrito}, {selectedCentro.provincia}</p>

              {/* Info cards */}
              <div className="space-y-3">
                <div className="bg-[#F8FAFC] rounded-lg p-3.5 border border-[#F1F5F9]">
                  <div className="flex items-center gap-2 mb-2">
                    <Mountain className="w-4 h-4 text-[#1E3A8A]" />
                    <span className="text-[12px] font-bold text-[#1E3A8A]">Altitud</span>
                  </div>
                  <p className="text-[20px] font-bold text-[#0F1B36]">{selectedCentro.altitud_m.toLocaleString()} <span className="text-[13px] font-medium text-[#64748B]">m.s.n.m.</span></p>
                  <p className="text-[12px] text-[#64748B] mt-0.5">{selectedCentro.banda_descripcion}</p>
                </div>

                <div className="bg-[#F8FAFC] rounded-lg p-3.5 border border-[#F1F5F9]">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-[#1E3A8A]" />
                    <span className="text-[12px] font-bold text-[#1E3A8A]">Tamizajes</span>
                  </div>
                  <p className="text-[20px] font-bold text-[#0F1B36]">{selectedCentro.total_tamizajes}</p>
                  <p className="text-[12px] text-[#64748B] mt-0.5">Total realizados</p>
                </div>

                {selectedCentro.alertas_activas > 0 && (
                  <div className="bg-[#FFF1F2] rounded-lg p-3.5 border border-[#FECDD3]">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-[#E63956]" />
                      <span className="text-[12px] font-bold text-[#9F1239]">Alertas Activas</span>
                    </div>
                    <p className="text-[20px] font-bold text-[#E63956]">{selectedCentro.alertas_activas}</p>
                    <p className="text-[12px] text-[#881337] mt-0.5">Requieren seguimiento</p>
                  </div>
                )}

                <div className="bg-[#F8FAFC] rounded-lg p-3.5 border border-[#F1F5F9]">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#1E3A8A]" />
                    <span className="text-[12px] font-bold text-[#1E3A8A]">Coordenadas</span>
                  </div>
                  <p className="text-[13px] text-[#475569] font-mono">{selectedCentro.latitud.toFixed(6)}, {selectedCentro.longitud.toFixed(6)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── Tooltip ─────────────────────────────────────── */}
      {tooltip && (
        <div className="fixed z-[9999] pointer-events-none" style={{ left: tooltip.x + 14, top: tooltip.y - 14 }}>
          <div className="bg-[#0F1B36] text-white rounded-lg px-4 py-3 shadow-xl min-w-[200px] border border-[#1E293B]">
            <p className="text-[13px] font-bold mb-2 border-b border-white/10 pb-1.5">{tooltip.name}</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[12px]"><span className="text-white/60">Centros médicos:</span><span className="font-bold">{tooltip.centros}</span></div>
              <div className="flex justify-between text-[12px]"><span className="text-white/60">Total tamizajes:</span><span className="font-bold">{tooltip.totalTamizajes.toLocaleString()}</span></div>
              <div className="flex justify-between text-[12px]">
                <span className="text-white/60">Tasa de alertas:</span>
                <span className="font-bold text-[#93C5FD]">
                  {tooltip.totalTamizajes > 0 ? ((tooltip.totalAlertas / tooltip.totalTamizajes) * 100).toFixed(2) : 0}%
                </span>
              </div>
              <div className="flex gap-2 pt-1 border-t border-white/10 mt-1">
                <span className="flex items-center gap-1 text-[11px]"><div className="w-2 h-2 rounded-full bg-[#16A34A]"></div><span className="font-medium">{tooltip.normales}</span></span>
                <span className="flex items-center gap-1 text-[11px]"><div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div><span className="font-medium">{tooltip.dudosos}</span></span>
                <span className="flex items-center gap-1 text-[11px]"><div className="w-2 h-2 rounded-full bg-[#E63956]"></div><span className="font-medium">{tooltip.alertas}</span></span>
              </div>
            </div>
            {level !== 'distrito' && <p className="text-[10px] text-white/40 mt-2 text-center">Click para explorar →</p>}
          </div>
        </div>
      )}
    </div>
  );
}
