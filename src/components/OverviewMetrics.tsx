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
  competitorsCount,
  totalAlertsCount,
}) => {
  const getSaturationBadge = (level: string) => {
    if (level.includes('Baja')) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (level.includes('Media')) return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
    if (level.includes('Alta')) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  };

  return (
    <div className="space-y-4 mb-8">
      
      {/* Executive Summary Card */}
      <div className="benchia-card p-5 sm:p-6">
        <div className="flex items-center space-x-2.5 mb-3">
          <div className="p-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300">
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">
              Diagnóstico Ejecutivo del Nicho
            </h2>
          </div>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed font-normal">
          {summary}
        </p>
      </div>

      {/* Grid of Key Market Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Metric 1: TAM Market Size */}
        <div className="benchia-card benchia-card-hover p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-zinc-400">Tamaño de Mercado (TAM)</span>
            <DollarSign className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div>
            <div className="text-lg font-bold text-zinc-100 font-mono">
              {metrics.totalMarketSizeEst}
            </div>
            <div className="mt-1 flex items-center text-[11px] text-emerald-400 font-medium font-mono">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>{metrics.growthRateAnnual} CAGR</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Market Saturation */}
        <div className="benchia-card benchia-card-hover p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-zinc-400">Nivel de Saturación</span>
            <Layers className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div>
            <div className="flex items-center mt-0.5">
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${getSaturationBadge(metrics.saturationLevel)}`}>
                {metrics.saturationLevel}
              </span>
            </div>
            <div className="mt-2 text-[11px] text-zinc-500 font-mono">
              {competitorsCount} competidores monitoreados
            </div>
          </div>
        </div>

        {/* Metric 3: Avg CPC */}
        <div className="benchia-card benchia-card-hover p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-zinc-400">CPC Medio Google Ads</span>
            <Target className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div>
            <div className="text-lg font-bold text-zinc-100 font-mono">
              {metrics.averageCpcNiche}
            </div>
            <div className="mt-1 text-[11px] text-zinc-400">
              Elasticidad de precio: <span className="text-zinc-200 font-medium">{metrics.priceElasticity}</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Realtime Signals */}
        <div className="benchia-card benchia-card-hover p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-zinc-400">Señales & Alertas Activas</span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div>
            <div className="text-lg font-bold text-zinc-100 font-mono flex items-center">
              <span>{totalAlertsCount} eventos</span>
              <span className="ml-2 inline-flex items-center px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                Live
              </span>
            </div>
            <div className="mt-1 text-[11px] text-zinc-500">
              Cambios de precios y campañas
            </div>
          </div>
        </div>

      </div>

      {/* Two Strategy Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        
        {/* Top Converting Ad Hook */}
        <div className="benchia-card p-4 flex items-start space-x-3.5">
          <div className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-amber-400 shrink-0">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-zinc-400 font-medium mb-1">
              Gancho publicitario de mayor conversión en el nicho:
            </div>
            <p className="text-xs font-medium text-zinc-200 bg-zinc-900/90 border border-zinc-800 p-2.5 rounded-md">
              "{metrics.topConvertingAdHook}"
            </p>
          </div>
        </div>

        {/* Untapped Blue Ocean Opportunity */}
        <div className="benchia-card p-4 flex items-start space-x-3.5">
          <div className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-sky-400 shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-zinc-400 font-medium mb-1">
              Mayor oportunidad desatendida del nicho (Océano Azul):
            </div>
            <p className="text-xs font-medium text-sky-300 bg-sky-950/20 border border-sky-900/40 p-2.5 rounded-md">
              {metrics.untappedOpportunity}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

