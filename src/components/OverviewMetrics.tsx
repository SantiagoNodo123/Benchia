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
    if (level.includes('Baja')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (level.includes('Media')) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    if (level.includes('Alta')) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

  return (
    <div className="space-y-4 mb-8">
      
      {/* Executive Summary Card */}
      <div className="benchia-card p-5 sm:p-6 relative overflow-hidden bg-white border border-slate-200/90 shadow-sm">
        <div className="flex items-center space-x-3 mb-3.5 relative z-10">
          <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-2xs">
            <FileText className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
              <span>Diagnóstico Ejecutivo del Mercado</span>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-2 py-0.2 rounded-md">
                NODO ANALYSIS
              </span>
            </h2>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed font-normal relative z-10">
          {safeSummary}
        </p>
      </div>

      {/* Grid of Key Market Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Metric 1: TAM Market Size */}
        <div className="benchia-card benchia-card-hover p-4.5 flex flex-col justify-between bg-white border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Tamaño de Mercado (TAM)</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 font-mono tracking-tight">
              {safeMetrics.totalMarketSizeEst}
            </div>
            <div className="mt-1.5 flex items-center text-[11px] text-emerald-600 font-bold font-mono">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>{safeMetrics.growthRateAnnual} CAGR</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Market Saturation */}
        <div className="benchia-card benchia-card-hover p-4.5 flex flex-col justify-between bg-white border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Nivel de Saturación</span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="flex items-center mt-1">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getSaturationBadge(safeMetrics.saturationLevel)}`}>
                {safeMetrics.saturationLevel}
              </span>
            </div>
            <div className="mt-1.5 text-[11px] text-slate-500 font-medium">
              Densidad de competidores y anuncios
            </div>
          </div>
        </div>

        {/* Metric 3: Average CPC */}
        <div className="benchia-card benchia-card-hover p-4.5 flex flex-col justify-between bg-white border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">CPC Promedio (Google Ads)</span>
            <div className="p-1.5 rounded-lg bg-pink-50 text-pink-600">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 font-mono tracking-tight">
              {safeMetrics.averageCpcNiche}
            </div>
            <div className="mt-1.5 text-[11px] text-slate-500 font-medium">
              Elasticidad: <span className="text-slate-800 font-semibold">{safeMetrics.priceElasticity || 'Media'}</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Realtime Signals */}
        <div className="benchia-card benchia-card-hover p-4.5 flex flex-col justify-between bg-white border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Empresas & Señales</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Target className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 font-mono flex items-center">
              <span>{competitorsCount} Principales</span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                Live
              </span>
            </div>
            <div className="mt-1.5 text-[11px] text-slate-500 font-medium">
              {totalAlertsCount} movimientos detectados
            </div>
          </div>
        </div>

      </div>

      {/* Two Strategy Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        
        {/* Top Converting Ad Hook */}
        <div className="benchia-card p-4.5 flex items-start space-x-3.5 border-l-4 border-l-pink-500 bg-white shadow-sm">
          <div className="p-2 rounded-xl bg-pink-50 border border-pink-200/70 text-pink-600 shrink-0 shadow-2xs">
            <Flame className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="text-[11px] text-pink-700 font-bold uppercase tracking-wide mb-1">
              Gancho publicitario de mayor impacto en el nicho:
            </div>
            <p className="text-xs font-semibold text-slate-800 bg-pink-50/50 border border-pink-100 p-3 rounded-xl italic">
              "{safeMetrics.topConvertingAdHook}"
            </p>
          </div>
        </div>

        {/* Untapped Blue Ocean Opportunity */}
        <div className="benchia-card p-4.5 flex items-start space-x-3.5 border-l-4 border-l-indigo-600 bg-white shadow-sm">
          <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-200/70 text-indigo-600 shrink-0 shadow-2xs">
            <Compass className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="text-[11px] text-indigo-700 font-bold uppercase tracking-wide mb-1">
              Mayor oportunidad de diferenciación detectada:
            </div>
            <p className="text-xs font-semibold text-slate-800 bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl">
              "{safeMetrics.untappedOpportunity}"
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
