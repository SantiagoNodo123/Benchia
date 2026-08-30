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
    <div className="benchia-card p-5 sm:p-7 mb-6 relative overflow-hidden">
      
      {/* Ambient background tech glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent tracking-tight">
                Radar de Inteligencia & Benchmark
              </h1>
              <span className="text-[10px] font-mono font-bold bg-sky-950/60 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1" />
                TIEMPO REAL
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Rastreo multi-canal con Serper (Google SERP), Firecrawl (Deep Web Scraping), Meta Ad Library y Gemini AI.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setShowAddCustom(!showAddCustom)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>Añadir Competidor</span>
            </button>
          </div>
        </div>

        {/* Custom Competitor Quick Inset Form */}
        {showAddCustom && (
          <form onSubmit={handleCustomSubmit} className="mb-4 p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 text-xs shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-slate-200 flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>Incorporar competidor específico al análisis</span>
              </span>
              <button 
                type="button" 
                onClick={() => setShowAddCustom(false)} 
                className="text-slate-400 hover:text-white cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Nombre (ej: Acroflow Labs)"
                className="px-3.5 py-2 rounded-lg bg-slate-950/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                required
              />
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="Dominio / Web (ej: acroflow.com)"
                className="px-3.5 py-2 rounded-lg bg-slate-950/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Incorporar al Radar
            </button>
          </form>
        )}

        {/* Main Search Command Bar */}
        <form onSubmit={handleSubmit} className="relative mb-4">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-sky-400 pointer-events-none">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ingresa cualquier nicho o industria (ej: agencias de marketing, software dental, distribuidora de cafe...)"
              disabled={isLoading}
              className="w-full pl-11 pr-36 py-3 rounded-xl bg-slate-950/90 border border-slate-700/90 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all font-medium shadow-inner"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-sky-500/20 transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Rastreando...</span>
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
          <span className="text-[11px] text-slate-400 font-semibold mr-1 flex items-center">
            <Target className="w-3 h-3 mr-1 text-sky-400" /> Ejemplos de prueba:
          </span>
          {PRESET_NICHES.map((niche, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => handleSelectPreset(niche)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-sky-500/40 transition-all font-medium cursor-pointer disabled:opacity-50"
            >
              {niche}
            </button>
          ))}
        </div>

        {/* Loading Pipeline State Indicator */}
        {isLoading && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950/90 border border-sky-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                </span>
                <span className="text-xs font-bold text-sky-300 font-mono">
                  Rastreo Multi-API en Curso (Paso {scanningStep} de 5)
                </span>
              </div>
              <span className="text-xs text-sky-400 font-mono font-bold">{scanningStep * 20}%</span>
            </div>

            <p className="text-xs text-slate-300 mb-2.5 font-medium">
              {scanningStages[Math.min(scanningStep - 1, scanningStages.length - 1)]}
            </p>

            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div 
                className="bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300 ease-out shadow-sm shadow-sky-400"
                style={{ width: `${(scanningStep / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Current Active Niche Summary Bar */}
        {!isLoading && currentNiche && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400 font-medium">Nicho auditado:</span>
              <strong className="text-white font-bold">{currentNiche}</strong>
            </div>
            {analyzedAt && (
              <div className="flex items-center space-x-1.5 text-slate-400 font-mono text-[11px]">
                <Clock className="w-3 h-3 text-sky-400" />
                <span>Actualizado: {new Date(analyzedAt).toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

