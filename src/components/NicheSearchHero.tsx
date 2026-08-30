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
    <div className="benchia-card p-5 sm:p-6 mb-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                Radar de Inteligencia Competitiva
              </h1>
              <span className="text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded">
                Tiempo Real
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Monitorea competidores, analiza campañas de Meta & Google Ads, y detecta oportunidades en cualquier nicho.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setShowAddCustom(!showAddCustom)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-medium transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-zinc-400" />
              <span>Añadir Competidor</span>
            </button>
          </div>
        </div>

        {/* Custom Competitor Quick Modal / Inset Form */}
        {showAddCustom && (
          <form onSubmit={handleCustomSubmit} className="mb-4 p-3.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-zinc-200">Añadir competidor específico al análisis en curso</span>
              <button 
                type="button" 
                onClick={() => setShowAddCustom(false)} 
                className="text-zinc-500 hover:text-zinc-300 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Nombre (ej: Acroflow Labs)"
                className="px-3 py-1.5 rounded bg-zinc-950 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                required
              />
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="Dominio / Web (ej: acroflow.com)"
                className="px-3 py-1.5 rounded bg-zinc-950 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                required
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-semibold cursor-pointer"
            >
              Incorporar al Radar
            </button>
          </form>
        )}

        {/* Main Search Command Bar */}
        <form onSubmit={handleSubmit} className="relative mb-4">
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-zinc-400 pointer-events-none">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ingresa un nicho de mercado (ej: SaaS CRM para Clínicas de Salud, Legaltech B2B, E-commerce Café...)"
              disabled={isLoading}
              className="w-full pl-10 pr-32 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-600 transition-all font-normal"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs flex items-center space-x-1 transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Escaneando...</span>
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
          <span className="text-[11px] text-zinc-500 font-medium mr-1 flex items-center">
            <Target className="w-3 h-3 mr-1 text-zinc-400" /> Nichos frecuentes:
          </span>
          {PRESET_NICHES.map((niche, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => handleSelectPreset(niche)}
              className="text-[11px] px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-700 transition-colors font-medium cursor-pointer disabled:opacity-50"
            >
              {niche}
            </button>
          ))}
        </div>

        {/* Loading Pipeline State Indicator */}
        {isLoading && (
          <div className="mt-4 p-3.5 rounded-lg bg-zinc-900 border border-zinc-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-zinc-200 font-mono">
                  Escaneo en Curso (Paso {scanningStep} de 5)
                </span>
              </div>
              <span className="text-xs text-zinc-500 font-mono">{scanningStep * 20}%</span>
            </div>

            <p className="text-xs text-zinc-400 mb-2">
              {scanningStages[Math.min(scanningStep - 1, scanningStages.length - 1)]}
            </p>

            <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-zinc-800">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${(scanningStep / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Current Active Niche Summary Bar */}
        {!isLoading && currentNiche && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-zinc-800/80 text-xs text-zinc-400">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-zinc-500 font-medium">Nicho auditado:</span>
              <strong className="text-zinc-200 font-semibold">{currentNiche}</strong>
            </div>
            {analyzedAt && (
              <div className="flex items-center space-x-1.5 text-zinc-500 font-mono text-[11px]">
                <Clock className="w-3 h-3" />
                <span>Actualizado: {new Date(analyzedAt).toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

