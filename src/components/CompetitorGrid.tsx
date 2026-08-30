import React, { useState } from 'react';
import { 
  Building2, 
  ExternalLink, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  AlertCircle, 
  Zap, 
  Search, 
  Sparkles,
  ArrowRightLeft,
  Check,
  Flame
} from 'lucide-react';
import { Competitor } from '../types';

interface CompetitorGridProps {
  competitors: Competitor[];
  niche: string;
  onGenerateCounterStrategy: (competitorName: string, recentMove: string) => void;
  onCompareCompetitors?: (compA: Competitor, compB: Competitor) => void;
  onAuditCompetitorWebsite?: (comp: Competitor) => void;
}

export const CompetitorGrid: React.FC<CompetitorGridProps> = ({
  competitors = [],
  niche,
  onGenerateCounterStrategy,
  onCompareCompetitors,
  onAuditCompetitorWebsite,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'marketShare' | 'adVelocity' | 'traffic'>('marketShare');
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);

  const safeCompetitors = Array.isArray(competitors) ? competitors : [];

  const toggleSelectForCompare = (id: string) => {
    if (selectedForComparison.includes(id)) {
      setSelectedForComparison(selectedForComparison.filter(i => i !== id));
    } else {
      if (selectedForComparison.length >= 2) {
        setSelectedForComparison([selectedForComparison[1], id]);
      } else {
        setSelectedForComparison([...selectedForComparison, id]);
      }
    }
  };

  const handleTriggerCompare = () => {
    if (selectedForComparison.length === 2 && onCompareCompetitors) {
      const compA = safeCompetitors.find(c => c.id === selectedForComparison[0]);
      const compB = safeCompetitors.find(c => c.id === selectedForComparison[1]);
      if (compA && compB) {
        onCompareCompetitors(compA, compB);
      }
    }
  };

  const filtered = safeCompetitors
    .filter((c) => 
      c?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c?.positioning?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c?.tagline?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'marketShare') return (b.marketSharePercent || 0) - (a.marketSharePercent || 0);
      if (sortBy === 'adVelocity') return (b.adVelocityScore || 0) - (a.adVelocityScore || 0);
      return parseInt((b.monthlyTrafficEst || '0').replace(/\D/g, '') || '0') - parseInt((a.monthlyTrafficEst || '0').replace(/\D/g, '') || '0');
    });

  return (
    <section className="space-y-4 mb-10">
      
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-800">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-semibold text-zinc-100">
              Directorio de Competidores del Nicho
            </h2>
            <span className="px-2 py-0.2 text-[11px] bg-zinc-800 text-zinc-300 border border-zinc-700 rounded font-mono">
              {competitors.length} entidades
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Métricas de penetración, volumen publicitario, stacks y flancos vulnerables.
          </p>
        </div>

        {/* Search & Sort Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedForComparison.length > 0 && (
            <button
              onClick={handleTriggerCompare}
              disabled={selectedForComparison.length !== 2}
              className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-medium flex items-center space-x-1.5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span>Comparar 2 ({selectedForComparison.length}/2)</span>
            </button>
          )}

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Filtrar competidor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 pr-2.5 py-1 text-xs rounded bg-zinc-900 border border-zinc-700 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-normal"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="text-xs bg-zinc-900 border border-zinc-700 text-zinc-300 rounded px-2.5 py-1 outline-none focus:border-zinc-500 cursor-pointer"
          >
            <option value="marketShare">Por Cuota de Mercado</option>
            <option value="adVelocity">Por Velocidad de Ads</option>
            <option value="traffic">Por Tráfico Estimado</option>
          </select>
        </div>
      </div>

      {/* Competitors Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((comp) => {
          const isSelected = selectedForComparison.includes(comp.id);
          return (
            <div
              key={comp.id}
              className={`benchia-card benchia-card-hover p-5 flex flex-col justify-between transition-all ${
                isSelected ? 'border-emerald-500/80 ring-1 ring-emerald-500/40 bg-zinc-900/60' : ''
              }`}
            >
              <div>
                {/* Header: Name, Website, Market Share */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleSelectForCompare(comp.id)}
                        title="Seleccionar para comparar cara a cara"
                        className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] cursor-pointer transition-colors ${
                          isSelected ? 'bg-emerald-500 border-emerald-500 text-zinc-950 font-bold' : 'border-zinc-700 bg-zinc-950 text-transparent hover:border-zinc-500'
                        }`}
                      >
                        ✓
                      </button>
                      <h3 className="text-base font-semibold text-zinc-100">
                        {comp.name}
                      </h3>
                      <a
                        href={`https://${comp.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center space-x-0.5 font-mono"
                      >
                        <span>{comp.website}</span>
                        <ExternalLink className="w-2.5 h-2.5 ml-0.5 text-zinc-500" />
                      </a>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 italic">
                      "{comp.tagline}"
                    </p>
                  </div>

                  {/* Market Share Badge */}
                  <div className="text-right">
                    <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Cuota</div>
                    <div className="text-base font-bold text-zinc-100 font-mono">
                      {comp.marketSharePercent}%
                    </div>
                  </div>
                </div>

                {/* Market Share Progress Line */}
                <div className="w-full bg-zinc-950 h-1 rounded-full overflow-hidden mb-3 border border-zinc-800">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${comp.marketSharePercent}%` }}
                  />
                </div>

                {/* Core Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 rounded bg-zinc-950 border border-zinc-800/80 text-xs mb-3 font-mono">
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase">Tráfico Est.</span>
                    <span className="font-medium text-zinc-200">{comp.monthlyTrafficEst}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase">Ticket Prom.</span>
                    <span className="font-medium text-emerald-400">{comp.avgPricePoint}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase">Meta Ads</span>
                    <span className="font-medium text-zinc-300">{comp.metaAdActiveCount} activos</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase">Velocidad</span>
                    <span className="font-medium text-amber-400">{comp.adVelocityScore}/100</span>
                  </div>
                </div>

                {/* Positioning & ICP */}
                <div className="space-y-1.5 mb-3 text-xs">
                  <div>
                    <span className="text-zinc-400 font-medium">Posicionamiento: </span>
                    <span className="text-zinc-300">{comp.positioning}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 font-medium">Público Objetivo: </span>
                    <span className="text-zinc-300">{comp.targetAudience}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 font-medium">Monetización: </span>
                    <span className="text-zinc-300">{comp.pricingModel}</span>
                  </div>
                </div>

                {/* Strengths & Vulnerabilities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-xs">
                  {/* Strengths */}
                  <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center space-x-1 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Fortalezas Clave</span>
                    </div>
                    <ul className="space-y-0.5 text-zinc-300 text-[11px]">
                      {comp.strengths.slice(0, 3).map((st, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-emerald-500 mr-1">•</span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Vulnerabilities */}
                  <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center space-x-1 text-rose-400 text-[10px] font-semibold uppercase tracking-wider mb-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Vulnerabilidades</span>
                    </div>
                    <ul className="space-y-0.5 text-zinc-300 text-[11px]">
                      {comp.vulnerabilities.slice(0, 3).map((vuln, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-rose-400 mr-1">•</span>
                          <span>{vuln}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-1 mb-3">
                  <span className="text-[10px] uppercase font-medium text-zinc-500 mr-1">Stack:</span>
                  {comp.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Recent Move Alert */}
                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-xs flex items-start space-x-2 mb-3">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-medium block">Movimiento Estratégico Reciente</span>
                    <span className="text-zinc-300 text-[11px]">{comp.recentStrategicMove}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <a
                  href={`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=${encodeURIComponent(
                    comp.name + ' ' + niche
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-200 flex items-center space-x-1 font-medium transition-colors"
                >
                  <span>Meta Library</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => onAuditCompetitorWebsite?.(comp)}
                    className="px-2.5 py-1.5 rounded bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-medium text-xs flex items-center space-x-1.5 border border-orange-500/30 transition-colors cursor-pointer"
                  >
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>Auditar Web (Firecrawl)</span>
                  </button>

                  <button
                    onClick={() => onGenerateCounterStrategy(comp.name, comp.recentStrategicMove)}
                    className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-xs flex items-center space-x-1.5 border border-zinc-700 transition-colors cursor-pointer"
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Contra-Campaña</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};

