import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  Clock,
  Layers,
  Globe,
  PlusCircle,
  TrendingUp,
  Target
} from 'lucide-react';

interface NicheSearchHeroProps {
  currentNiche: string;
  onSearchNiche: (niche: string) => void;
  onAddCustomCompetitor?: (name: string, domain: string) => void;
  isLoading: boolean;
  analyzedAt?: string;
  scanningStep: number;
}

const PRESET_NICHES = [
  'SaaS CRM para Clínicas de Salud',
  'Fintech Microcréditos y BNPL LATAM',
  'E-commerce D2C Moda Sostenible',
  'Plataformas B2B de Automatización',
  'Legaltech & Gestión Contractual',
  'EdTech & Bootcamps Especializados'
];

export const NicheSearchHero: React.FC<NicheSearchHeroProps> = ({
  currentNiche,
  onSearchNiche,
  onAddCustomCompetitor,
  isLoading,
  analyzedAt,
  scanningStep,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customDomain, setCustomDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearchNiche(inputValue.trim());
    }
  };

  const handleSelectPreset = (preset: string) => {
    setInputValue(preset);
    onSearchNiche(preset);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customName.trim() && customDomain.trim() && onAddCustomCompetitor) {
      onAddCustomCompetitor(customName.trim(), customDomain.trim());
      setCustomName('');
      setCustomDomain('');
      setShowAddCustom(false);
    }
  };

  const scanningStages = [
    'Conectando al índice de mercado y mapeando competidores...',
    'Extrayendo cuotas de mercado, tráfico y tecnología de competidores...',
    'Analizando subastas en Google Ads y creativos activos en Meta Ad Library...',
    'Calculando brechas de mercado, oportunidades y proyecciones a 30-90 días...',
    'Estructurando matriz de benchmarking y dashboards en tiempo real...',
  ];

  return (
    <div className="benchia-card p-5 sm:p-7 mb-6 relative overflow-hidden bg-white/95 border border-slate-200/90 shadow-sm">
      
      {/* Subtle ambient Nodo glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Inteligencia de Mercado & Benchmark
              </h1>
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" />
                CANALES EN VIVO
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Rastreo de competidores, anuncios en Meta & Google, SEO orgánico y oportunidades de crecimiento.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setShowAddCustom(!showAddCustom)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-300/80 text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>Añadir Empresa</span>
            </button>
          </div>
        </div>

        {/* Custom Competitor Quick Inset Form */}
        {showAddCustom && (
          <form onSubmit={handleCustomSubmit} className="mb-4 p-4 rounded-xl bg-slate-50 border border-indigo-200 text-xs shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-slate-800 flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span>Incorporar competidor específico al análisis</span>
              </span>
              <button 
                type="button" 
                onClick={() => setShowAddCustom(false)} 
                className="text-slate-400 hover:text-slate-700 cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Nombre de la empresa (ej: Acroflow Labs)"
                className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-2xs"
                required
              />
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="Sitio web (ej: acroflow.com)"
                className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-2xs"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              Incorporar al Benchmark
            </button>
          </form>
        )}

        {/* Main Search Command Bar */}
        <form onSubmit={handleSubmit} className="relative mb-4">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-400 pointer-events-none">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe cualquier industria o producto (ej: agencias de marketing, software dental, distribuidora de cafe...)"
              disabled={isLoading}
              className="w-full pl-11 pr-36 py-3 rounded-xl bg-slate-50/80 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all font-semibold shadow-inner"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-indigo-500/20 transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Consultando...</span>
              ) : (
                <>
                  <span>Analizar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Preset Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-500 font-bold mr-1 flex items-center">
            <Target className="w-3 h-3 mr-1 text-indigo-600" /> Sugerencias de búsqueda:
          </span>
          {PRESET_NICHES.map((niche, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => handleSelectPreset(niche)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-indigo-300 transition-all font-medium cursor-pointer disabled:opacity-50"
            >
              {niche}
            </button>
          ))}
        </div>

        {/* Loading Pipeline State Indicator */}
        {isLoading && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-indigo-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
                </span>
                <span className="text-xs font-bold text-slate-800">
                  Extrayendo datos de mercado (Paso {scanningStep} de 5)
                </span>
              </div>
              <span className="text-xs text-indigo-600 font-mono font-bold">{scanningStep * 20}%</span>
            </div>

            <p className="text-xs text-slate-600 mb-2.5 font-medium">
              {scanningStages[Math.min(scanningStep - 1, scanningStages.length - 1)]}
            </p>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-full rounded-full transition-all duration-300 ease-out shadow-xs"
                style={{ width: `${(scanningStep / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Current Active Niche Summary Bar */}
        {!isLoading && currentNiche && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200 text-xs text-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-500 font-medium">Sector analizado:</span>
              <strong className="text-slate-900 font-bold">{currentNiche}</strong>
            </div>
            {analyzedAt && (
              <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
                <Clock className="w-3 h-3 text-indigo-600" />
                <span>Actualizado: {new Date(analyzedAt).toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

