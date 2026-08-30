import React, { useState } from 'react';
import { 
  Radar, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  Zap,
  Target,
  ArrowRight
} from 'lucide-react';
import { MarketTrendPrediction } from '../types';

interface PredictiveRadarSectionProps {
  predictions: MarketTrendPrediction[];
  niche: string;
  onExecuteActionPlan?: (prediction: MarketTrendPrediction) => void;
}

export const PredictiveRadarSection: React.FC<PredictiveRadarSectionProps> = ({
  predictions = [],
  niche,
  onExecuteActionPlan,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Innovación Tecnológica', 'Canal de Adquisición', 'Guerra de Precios', 'Comportamiento de Usuario'];

  const safePredictions = Array.isArray(predictions) ? predictions : [];

  const filtered = safePredictions.filter((p) => {
    if (!p) return false;
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    return true;
  });

  const getImpactBadge = (impact: string = '') => {
    if (impact === 'Crítico') return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    if (impact === 'Alto') return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
  };

  return (
    <section className="space-y-4 mb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-800">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-semibold text-zinc-100">
              Radar Predictivo de Tendencias & Señales
            </h2>
            <span className="px-2 py-0.2 text-[11px] bg-zinc-800 text-zinc-300 border border-zinc-700 rounded font-mono">
              Horizonte 30-180d
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Proyecciones de demanda, cambios de canales de pauta y movimientos de precios antes de su consolidación.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-1 overflow-x-auto py-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-zinc-100 text-zinc-950'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat === 'all' ? 'Todas' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Predictions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((pred) => (
          <div
            key={pred.id}
            className="benchia-card benchia-card-hover p-4 flex flex-col justify-between"
          >
            <div>
              
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono">
                  {pred.category}
                </span>

                <div className="flex items-center space-x-1.5">
                  <span className={`text-[10px] px-1.5 py-0.2 rounded border font-mono ${getImpactBadge(pred.predictedImpact)}`}>
                    {pred.predictedImpact}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono flex items-center">
                    <Clock className="w-2.5 h-2.5 mr-1 text-zinc-500" />
                    {pred.forecastTimeframe}
                  </span>
                </div>
              </div>

              {/* Title & Growth Velocity */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-semibold text-zinc-100 leading-snug">
                  {pred.title}
                </h3>
                <div className="shrink-0 px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-medium flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+{pred.growthRatePct}%</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                {pred.description}
              </p>

              {/* Leading Indicator Signal */}
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800/80 text-xs mb-2.5">
                <span className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">
                  Indicador Temprano Detectado:
                </span>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  {pred.leadingIndicator}
                </p>
              </div>

              {/* Proactive Recommended Action */}
              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-xs mb-3">
                <span className="text-[10px] text-emerald-400 uppercase font-mono block mb-1 font-semibold">
                  Acción Táctica Recomendada:
                </span>
                <p className="text-zinc-200 text-xs font-normal leading-relaxed">
                  {pred.recommendedAction}
                </p>
              </div>

            </div>

            {/* Bottom Confidence Level Meter */}
            <div className="pt-2.5 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-1.5 text-[11px] text-zinc-400">
                <span>Confianza estadística:</span>
                <strong className="text-zinc-100">{pred.confidenceScore}%</strong>
              </div>

              <div className="w-24 bg-zinc-950 border border-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${pred.confidenceScore}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

