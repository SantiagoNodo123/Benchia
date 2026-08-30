import React, { useState } from 'react';
import { 
  Search, 
  Globe, 
  ExternalLink, 
  TrendingUp, 
  Zap, 
  FileText, 
  ArrowUpRight, 
  RefreshCw,
  Target,
  BarChart2
} from 'lucide-react';
import { GoogleSearchResult, Competitor } from '../types';

interface GoogleSearchSERPSectionProps {
  searchResults?: GoogleSearchResult[];
  competitors: Competitor[];
  niche: string;
}

export const GoogleSearchSERPSection: React.FC<GoogleSearchSERPSectionProps> = ({
  searchResults = [],
  competitors,
  niche,
}) => {
  const [liveQuery, setLiveQuery] = useState<string>(`mejor software ${niche}`);
  const [resultsList, setResultsList] = useState<GoogleSearchResult[]>(searchResults);
  const [isSearchingLive, setIsSearchingLive] = useState<boolean>(false);
  const [selectedIntentFilter, setSelectedIntentFilter] = useState<string>('all');
  const [keywordOpportunities, setKeywordOpportunities] = useState<string[]>([
    `precio software ${niche} 2026`,
    `alternativa economica ${niche}`,
    `mejores herramientas para ${niche} opiniones`,
    `como implementar sistema ${niche} rapido`,
  ]);

  React.useEffect(() => {
    if (searchResults.length > 0) {
      setResultsList(searchResults);
    }
  }, [searchResults]);

  const handlePerformLiveSearch = async (queryToRun: string) => {
    setIsSearchingLive(true);
    setLiveQuery(queryToRun);

    try {
      const res = await fetch('/api/google-search-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryToRun,
          competitorName: competitors[0]?.name || 'Líder',
        }),
      });
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const formatted: GoogleSearchResult[] = data.results.map((r: any, idx: number) => ({
          id: `live-serp-${Date.now()}-${idx}`,
          competitorName: r.title?.split('|')[0]?.trim() || competitors[idx % competitors.length]?.name || 'Competidor',
          rankPosition: r.rank || (idx + 1),
          pageTitle: r.title,
          snippet: r.snippet,
          url: r.url,
          searchQuery: queryToRun,
          monthlySearchVolumeEst: data.searchVolume || '14,200 búsquedas/mes',
          serpFeatures: r.features || ['SiteLinks'],
          intent: idx === 0 ? 'Transaccional' : idx === 1 ? 'Comercial' : 'Informativa',
          domainAuthority: r.domainAuthority || (85 - idx * 6),
        }));
        setResultsList(formatted);
      }

      if (data.keywordOpportunities && data.keywordOpportunities.length > 0) {
        setKeywordOpportunities(data.keywordOpportunities);
      }
    } catch (err) {
      console.error('Error fetching live google search:', err);
    } finally {
      setIsSearchingLive(false);
    }
  };

  const filteredResults = resultsList.filter((res) => {
    if (selectedIntentFilter !== 'all' && res.intent !== selectedIntentFilter) {
      return false;
    }
    return true;
  });

  return (
    <section id="google-search-serp" className="space-y-4 mb-10">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-semibold text-slate-900">
              Posicionamiento Orgánico & SERP en Google
            </h2>
            <span className="px-2 py-0.2 text-[11px] bg-slate-100 text-slate-700 border border-slate-200 rounded font-mono">
              Live SERP Index
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Rastreo de posiciones orgánicas #1 a #10, intención de búsqueda y Domain Authority para {niche}.
          </p>
        </div>

        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(liveQuery)}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1 self-start sm:self-auto"
        >
          <span>Abrir Google Search</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>

      {/* Query Bar */}
      <div className="benchia-card p-3 space-y-2">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={liveQuery}
              onChange={(e) => setLiveQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePerformLiveSearch(liveQuery)}
              placeholder="Ingresa término a auditar en Google Search..."
              className="w-full bg-slate-50 text-slate-800 text-xs pl-8 pr-3 py-2 rounded border border-slate-200 outline-none focus:border-zinc-500"
            />
          </div>

          <button
            onClick={() => handlePerformLiveSearch(liveQuery)}
            disabled={isSearchingLive}
            className="w-full sm:w-auto px-4 py-2 rounded bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isSearchingLive ? 'animate-spin' : ''}`} />
            <span>{isSearchingLive ? 'Consultando...' : 'Consultar SERP'}</span>
          </button>
        </div>

        {/* Quick Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-1">
          <span className="text-[10px] text-slate-400 font-medium shrink-0">Sugerencias:</span>
          {[
            `mejor ${niche}`,
            `precios ${niche}`,
            `alternativa a ${competitors[0]?.name || 'líder'}`,
            `comparativa ${niche} 2026`
          ].map((q) => (
            <button
              key={q}
              onClick={() => handlePerformLiveSearch(q)}
              className="px-2 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-[10px] text-slate-500 hover:text-slate-800 border border-slate-200 whitespace-nowrap transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Main SERP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left SERP Result Stream */}
        <div className="lg:col-span-8 space-y-3">
          
          <div className="flex items-center justify-between benchia-card px-3 py-2 text-xs">
            <div className="text-[11px] text-slate-500">
              Ranking para: <span className="text-slate-800 font-mono">"{liveQuery}"</span>
            </div>
            
            {/* Intent Filter */}
            <div className="flex items-center space-x-1 text-xs">
              {['all', 'Transaccional', 'Comercial', 'Informativa'].map((intent) => (
                <button
                  key={intent}
                  onClick={() => setSelectedIntentFilter(intent)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                    selectedIntentFilter === intent
                      ? 'bg-zinc-100 text-zinc-950'
                      : 'bg-slate-50 text-slate-500 hover:text-slate-800 border border-slate-200'
                  }`}
                >
                  {intent === 'all' ? 'Todas' : intent}
                </button>
              ))}
            </div>
          </div>

          {/* SERP Result Cards */}
          <div className="space-y-2.5">
            {filteredResults.map((serp) => (
              <div
                key={serp.id}
                className="benchia-card benchia-card-hover p-4 space-y-2"
              >
                {/* Top Bar: Rank Position, URL breadcrumb, Intent */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold ${
                      serp.rankPosition === 1
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-slate-50 text-slate-500 border border-slate-200'
                    }`}>
                      #{serp.rankPosition}
                    </span>
                    <div className="text-[11px] text-slate-500 truncate font-mono flex items-center space-x-1">
                      <span className="text-slate-700 font-medium">{serp.competitorName}</span>
                      <span className="text-zinc-600">›</span>
                      <span className="truncate text-slate-400">{serp.url}</span>
                    </div>
                  </div>

                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-50 text-slate-700 border border-slate-200">
                    {serp.intent}
                  </span>
                </div>

                {/* Title */}
                <a
                  href={serp.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm font-semibold text-slate-900 hover:text-emerald-400 transition-colors leading-snug"
                >
                  {serp.pageTitle}
                </a>

                {/* Snippet */}
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {serp.snippet}
                </p>

                {/* Badges & Domain Authority */}
                <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                  <div className="flex flex-wrap items-center gap-1">
                    {serp.serpFeatures?.map((feature) => (
                      <span
                        key={feature}
                        className="px-1.5 py-0.2 rounded bg-slate-50 text-slate-500 border border-slate-200 font-mono"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2 text-slate-400 font-mono">
                    <span>DA: <strong className="text-slate-800">{serp.domainAuthority}</strong>/100</span>
                    <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full" 
                        style={{ width: `${serp.domainAuthority}%` }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Right Strategic Insights */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Traffic Share & Volume Card */}
          <div className="benchia-card p-4 space-y-3">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-800">
              <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Métricas de Búsqueda</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block">Volumen Mensual</span>
                <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">
                  {resultsList[0]?.monthlySearchVolumeEst || '18,500 búsquedas/mes'}
                </span>
                <span className="text-[10px] text-emerald-400 mt-0.5 block font-mono">
                  +22% crecimiento interanual
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 font-mono text-[11px]">
                <span className="text-[10px] text-slate-400 uppercase block mb-1">Estimación CTR por Posición</span>
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-700">
                    <span>#1 (Líder)</span>
                    <span className="text-slate-900 font-bold">32.8%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[33%]"></div>
                  </div>

                  <div className="flex justify-between text-slate-700 pt-1">
                    <span>#2</span>
                    <span className="text-slate-900 font-bold">16.4%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-zinc-400 h-full w-[16%]"></div>
                  </div>

                  <div className="flex justify-between text-slate-700 pt-1">
                    <span>#3</span>
                    <span className="text-slate-900 font-bold">10.2%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-zinc-600 h-full w-[10%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keyword Gaps */}
          <div className="benchia-card p-4 space-y-2.5">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-800">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>Brechas de Palabras Clave</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Términos con baja dificultad SEO donde tus competidores no dominan:
            </p>

            <div className="space-y-1.5">
              {keywordOpportunities.map((kw, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePerformLiveSearch(kw)}
                  className="w-full p-2 rounded bg-slate-50 hover:bg-slate-50 text-left border border-slate-200 transition-colors flex items-center justify-between group cursor-pointer text-xs"
                >
                  <span className="text-slate-700 group-hover:text-slate-900 truncate">
                    {kw}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};


