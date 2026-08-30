import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  ShieldCheck, 
  AlertCircle, 
  TrendingUp, 
  DollarSign, 
  ExternalLink,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';
import { Competitor } from '../types';

interface HeadToHeadComparisonProps {
  competitors: Competitor[];
  niche: string;
  onGenerateCounterStrategy: (competitorName: string, recentMove: string) => void;
  initialCompAId?: string;
  initialCompBId?: string;
}

export const HeadToHeadComparison: React.FC<HeadToHeadComparisonProps> = ({
  competitors,
  niche,
  onGenerateCounterStrategy,
  initialCompAId,
  initialCompBId,
}) => {
  if (!competitors || competitors.length < 2) {
    return (
      <div className="benchia-card p-8 text-center text-slate-500">
        Se requieren al menos 2 competidores para realizar una comparación cara a cara.
      </div>
    );
  }

  const [compAId, setCompAId] = useState<string>(initialCompAId || competitors[0]?.id || '');
  const [compBId, setCompBId] = useState<string>(initialCompBId || competitors[1]?.id || '');

  const compA = competitors.find(c => c.id === compAId) || competitors[0];
  const compB = competitors.find(c => c.id === compBId) || competitors[1];

  const handleSwap = () => {
    setCompAId(compB.id);
    setCompBId(compA.id);
  };

  return (
    <section className="space-y-6 mb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-semibold text-slate-900">
              Matriz Comparativa Cara a Cara (Head-to-Head)
            </h2>
            <span className="px-2 py-0.2 text-[11px] bg-slate-100 text-slate-700 border border-slate-200 rounded font-mono">
              Battle Cards
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Compara fortalezas, vulnerabilidades, precios y tácticas de dos competidores directos en {niche}.
          </p>
        </div>

        {/* Selectors Bar */}
        <div className="flex items-center space-x-2">
          <select
            value={compA.id}
            onChange={(e) => setCompAId(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded px-3 py-1.5 outline-none focus:border-zinc-500 font-medium"
          >
            {competitors.map(c => (
              <option key={c.id} value={c.id} disabled={c.id === compB.id}>
                {c.name} ({c.marketSharePercent}%)
              </option>
            ))}
          </select>

          <button
            onClick={handleSwap}
            title="Intercambiar orden"
            className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </button>

          <select
            value={compB.id}
            onChange={(e) => setCompBId(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded px-3 py-1.5 outline-none focus:border-zinc-500 font-medium"
          >
            {competitors.map(c => (
              <option key={c.id} value={c.id} disabled={c.id === compA.id}>
                {c.name} ({c.marketSharePercent}%)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Competitor A Card */}
        <div className="benchia-card p-5 border-slate-200">
          <div className="flex items-start justify-between mb-3 pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Competidor A</span>
              <h3 className="text-lg font-bold text-slate-900">{compA.name}</h3>
              <a 
                href={`https://${compA.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-slate-800 font-mono flex items-center space-x-1 mt-0.5"
              >
                <span>{compA.website}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase text-slate-400">Cuota</div>
              <div className="text-xl font-bold text-slate-900 font-mono">{compA.marketSharePercent}%</div>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 font-medium">Propuesta de Valor:</span>
              <p className="text-slate-700 italic mt-0.5">"{compA.tagline}"</p>
            </div>

            <div className="grid grid-cols-2 gap-2 p-2 rounded bg-slate-50 border border-slate-200 font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">Tráfico Est.</span>
                <span className="text-slate-800 font-medium">{compA.monthlyTrafficEst}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Precio / Ticket</span>
                <span className="text-emerald-400 font-medium">{compA.avgPricePoint}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Creativos Meta</span>
                <span className="text-slate-800 font-medium">{compA.metaAdActiveCount} ads</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Ad Velocity</span>
                <span className="text-amber-400 font-medium">{compA.adVelocityScore}/100</span>
              </div>
            </div>

            <div>
              <span className="text-slate-500 font-medium">Público Objetivo (ICP):</span>
              <p className="text-slate-700 mt-0.5">{compA.targetAudience}</p>
            </div>

            <div>
              <span className="text-slate-500 font-medium">Modelo de Monetización:</span>
              <p className="text-slate-700 mt-0.5">{compA.pricingModel}</p>
            </div>

            {/* Strengths */}
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-semibold mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Fortalezas Clave</span>
              </div>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                {(compA.strengths || []).map((s, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-emerald-500 mr-1.5">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vulnerabilities */}
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-1.5 text-rose-400 text-xs font-semibold mb-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Vulnerabilidades Explotables</span>
              </div>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                {(compA.vulnerabilities || []).map((v, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-rose-400 mr-1.5">•</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Stack Tecnológico:</span>
              <div className="flex flex-wrap gap-1">
                {(compA.techStack || []).map((t, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-50 border border-slate-200 font-mono text-slate-500">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={() => onGenerateCounterStrategy(compA.name, compA.recentStrategicMove)}
                className="w-full py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-medium border border-slate-200 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Diseñar Contra-Campaña vs {compA.name}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Competitor B Card */}
        <div className="benchia-card p-5 border-slate-200">
          <div className="flex items-start justify-between mb-3 pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Competidor B</span>
              <h3 className="text-lg font-bold text-slate-900">{compB.name}</h3>
              <a 
                href={`https://${compB.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-slate-800 font-mono flex items-center space-x-1 mt-0.5"
              >
                <span>{compB.website}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase text-slate-400">Cuota</div>
              <div className="text-xl font-bold text-slate-900 font-mono">{compB.marketSharePercent}%</div>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 font-medium">Propuesta de Valor:</span>
              <p className="text-slate-700 italic mt-0.5">"{compB.tagline}"</p>
            </div>

            <div className="grid grid-cols-2 gap-2 p-2 rounded bg-slate-50 border border-slate-200 font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">Tráfico Est.</span>
                <span className="text-slate-800 font-medium">{compB.monthlyTrafficEst}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Precio / Ticket</span>
                <span className="text-emerald-400 font-medium">{compB.avgPricePoint}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Creativos Meta</span>
                <span className="text-slate-800 font-medium">{compB.metaAdActiveCount} ads</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Ad Velocity</span>
                <span className="text-amber-400 font-medium">{compB.adVelocityScore}/100</span>
              </div>
            </div>

            <div>
              <span className="text-slate-500 font-medium">Público Objetivo (ICP):</span>
              <p className="text-slate-700 mt-0.5">{compB.targetAudience}</p>
            </div>

            <div>
              <span className="text-slate-500 font-medium">Modelo de Monetización:</span>
              <p className="text-slate-700 mt-0.5">{compB.pricingModel}</p>
            </div>

            {/* Strengths */}
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-semibold mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Fortalezas Clave</span>
              </div>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                {(compB.strengths || []).map((s, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-emerald-500 mr-1.5">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vulnerabilities */}
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-1.5 text-rose-400 text-xs font-semibold mb-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Vulnerabilidades Explotables</span>
              </div>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                {(compB.vulnerabilities || []).map((v, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-rose-400 mr-1.5">•</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Stack Tecnológico:</span>
              <div className="flex flex-wrap gap-1">
                {(compB.techStack || []).map((t, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-50 border border-slate-200 font-mono text-slate-500">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={() => onGenerateCounterStrategy(compB.name, compB.recentStrategicMove)}
                className="w-full py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-medium border border-slate-200 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Diseñar Contra-Campaña vs {compB.name}</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
