import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Layers, 
  Target, 
  Zap, 
  Compass,
  FileText,
  AlertTriangle,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { MarketMetrics } from '../types';

interface OverviewMetricsProps {
  metrics: MarketMetrics;
  summary: string;
  competitorsCount: number;
  totalAlertsCount: number;
}

export const OverviewMetrics: React.FC<OverviewMetricsProps> = ({
  metrics,
  summary,
  competitorsCount = 4,
  totalAlertsCount = 0,
}) => {
  const safeMetrics = metrics || {
    niche: 'Mercado Analizado',
    totalMarketSizeEst: '$3.8B USD (Global) / $420M (Hispanoamérica)',
    growthRateAnnual: '+22.4% CAGR',
    saturationLevel: 'Media (Crecimiento)',
    averageCpcNiche: '$2.80 - $5.50 USD',
    topConvertingAdHook: 'Automatiza procesos repetitivos en menos de 7 días',
    untappedOpportunity: 'Integración y onboarding autónomo en 3 minutos',
    priceElasticity: 'Media',
  };

  const safeSummary = summary || 'Diagnóstico de inteligencia competitiva en tiempo real sobre el nicho seleccionado.';

  const getSaturationBadge = (level: string = '') => {
    if (level.includes('Baja')) return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    if (level.includes('Media')) return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
    if (level.includes('Alta')) return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
  };

  return (
    <div className="space-y-4 mb-8">
      
      {/* Executive Summary Card */}
      <div className="benchia-card p-5 sm:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center space-x-3 mb-3.5 relative z-10">
          <div className="p-2 rounded-xl bg-sky-950/60 border border-sky-500/30 text-sky-400 shadow-sm shadow-sky-500/10">
            <FileText className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Diagnóstico Ejecutivo del Mercado</span>
              <span className="text-[10px] font-mono text-sky-400 bg-sky-950/40 border border-sky-500/20 px-1.5 py-0.5 rounded">
                AI SYNTHESIS
              </span>
            </h2>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed font-normal relative z-10">
          {safeSummary}
        </p>
      </div>

      {/* Grid of Key Market Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Metric 1: TAM Market Size */}
        <div className="benchia-card benchia-card-hover p-4.5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">Tamaño de Mercado (TAM)</span>
            <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-white font-mono tracking-tight">
              {safeMetrics.totalMarketSizeEst}
            </div>
            <div className="mt-1.5 flex items-center text-[11px] text-emerald-400 font-bold font-mono">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>{safeMetrics.growthRateAnnual} CAGR</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Market Saturation */}
        <div className="benchia-card benchia-card-hover p-4.5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">Nivel de Saturación</span>
            <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="flex items-center mt-1">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getSaturationBadge(safeMetrics.saturationLevel)}`}>
                {safeMetrics.saturationLevel}
              </span>
            </div>
            <div className="mt-1.5 text-[11px] text-slate-400 font-medium">
              Basado en densidad de anunciantes y competidores
            </div>
          </div>
        </div>

        {/* Metric 3: Average CPC */}
        <div className="benchia-card benchia-card-hover p-4.5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">CPC Promedio (Google Ads)</span>
            <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-amber-300 font-mono tracking-tight">
              {safeMetrics.averageCpcNiche}
            </div>
            <div className="mt-1 text-[11px] text-zinc-400">
              Elasticidad de precio: <span className="text-zinc-200 font-medium">{safeMetrics.priceElasticity}</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Realtime Signals */}
        <div className="benchia-card benchia-card-hover p-4.5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">Señales & Alertas Activas</span>
            <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-white font-mono flex items-center">
              <span>{totalAlertsCount} eventos</span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                Live
              </span>
            </div>
            <div className="mt-1.5 text-[11px] text-slate-400 font-medium">
              Cambios de precios y campañas
            </div>
          </div>
        </div>

      </div>

      {/* Two Strategy Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        
        {/* Top Converting Ad Hook */}
        <div className="benchia-card p-4.5 flex items-start space-x-3.5 border-l-4 border-l-amber-500">
          <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 shrink-0 shadow-sm shadow-amber-500/10">
            <Flame className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="text-[11px] text-amber-300 font-bold uppercase tracking-wide mb-1">
              Gancho publicitario de mayor conversión en el nicho:
            </div>
            <p className="text-xs font-semibold text-slate-100 bg-slate-900/80 border border-slate-800 p-3 rounded-xl italic">
              "{safeMetrics.topConvertingAdHook}"
            </p>
          </div>
        </div>

        {/* Untapped Blue Ocean Opportunity */}
        <div className="benchia-card p-4.5 flex items-start space-x-3.5 border-l-4 border-l-sky-500">
          <div className="p-2 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-400 shrink-0 shadow-sm shadow-sky-500/10">
            <Compass className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="text-[11px] text-sky-300 font-bold uppercase tracking-wide mb-1">
              Mayor oportunidad desatendida del nicho (Océano Azul):
            </div>
            <p className="text-xs font-semibold text-slate-100 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              "{safeMetrics.untappedOpportunity}"
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
