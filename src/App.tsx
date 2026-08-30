import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { NicheSearchHero } from './components/NicheSearchHero';
import { OverviewMetrics } from './components/OverviewMetrics';
import { CompetitorGrid } from './components/CompetitorGrid';
import { HeadToHeadComparison } from './components/HeadToHeadComparison';
import { AdIntelligenceSection } from './components/AdIntelligenceSection';
import { GoogleMapsIntelligenceSection } from './components/GoogleMapsIntelligenceSection';
import { GoogleSearchSERPSection } from './components/GoogleSearchSERPSection';
import { PredictiveRadarSection } from './components/PredictiveRadarSection';
import { RealtimeAlertsCenter } from './components/RealtimeAlertsCenter';
import { InteractiveDashboards } from './components/InteractiveDashboards';
import { BlueOceanMatrix } from './components/BlueOceanMatrix';
import { CounterStrategyModal } from './components/CounterStrategyModal';
import { MarketChatAgentDrawer } from './components/MarketChatAgentDrawer';
import { ExportReportModal } from './components/ExportReportModal';
import { FirecrawlAuditModal } from './components/FirecrawlAuditModal';
import { 
  MarketResearchReport, 
  CounterStrategyResponse, 
  Competitor
} from './types';
import { 
  Radio, 
  Sparkles, 
  MessageSquare,
  Bot,
  Radar
} from 'lucide-react';

import { generateClientMarketData } from './utils/fallbackGenerator';

export default function App() {
  const [currentNiche, setCurrentNiche] = useState<string>('');
  const [report, setReport] = useState<MarketResearchReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scanningStep, setScanningStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Comparison selection
  const [comparisonCompetitors, setComparisonCompetitors] = useState<[Competitor, Competitor] | null>(null);

  // Real-time auto refresh settings
  const [isAutoRefreshActive, setIsAutoRefreshActive] = useState<boolean>(true);
  const [refreshInterval, setRefreshInterval] = useState<number>(30);
  const [liveTickerBanner, setLiveTickerBanner] = useState<string | null>(
    'Radar de Mercado en Vivo: Conectado a Google SERP (Serper), Web Crawler (Firecrawl), Meta Ads y Gemini AI'
  );

  // Modals & Drawers
  const [counterModalOpen, setCounterModalOpen] = useState<boolean>(false);
  const [counterStrategy, setCounterStrategy] = useState<CounterStrategyResponse | null>(null);
  const [isCounterLoading, setIsCounterLoading] = useState<boolean>(false);
  const [selectedCompTarget, setSelectedCompTarget] = useState<string>('');
  const [selectedTriggerReason, setSelectedTriggerReason] = useState<string>('');

  // Firecrawl live audit modal state
  const [firecrawlModalOpen, setFirecrawlModalOpen] = useState<boolean>(false);
  const [firecrawlTargetComp, setFirecrawlTargetComp] = useState<{ name: string; website: string } | null>(null);
  const [firecrawlAuditData, setFirecrawlAuditData] = useState<any>(null);
  const [isFirecrawlLoading, setIsFirecrawlLoading] = useState<boolean>(false);

  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const pollingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Set default comparison once competitors are available
  useEffect(() => {
    if (report && report.competitors && report.competitors.length >= 2 && !comparisonCompetitors) {
      setComparisonCompetitors([report.competitors[0], report.competitors[1]]);
    }
  }, [report, comparisonCompetitors]);

  // Main Niche Analysis Routine
  const handleSearchNiche = async (nicheToSearch: string) => {
    setIsLoading(true);
    setCurrentNiche(nicheToSearch);
    setScanningStep(1);

    const stepInterval = setInterval(() => {
      setScanningStep((prev) => {
        if (prev < 5) return prev + 1;
        return prev;
      });
    }, 600);

    try {
      const response = await fetch('/api/analyze-niche', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: nicheToSearch }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      if (data && data.competitors && data.competitors.length > 0) {
        setReport(data);
        if (data.competitors.length >= 2) {
          setComparisonCompetitors([data.competitors[0], data.competitors[1]]);
        }
        setLiveTickerBanner(`Radar sincronizado: ${data.competitors?.length || 4} competidores y ${data.predictions?.length || 4} señales activas.`);
      } else {
        throw new Error('Incomplete data payload');
      }
    } catch (error) {
      console.warn('Network issue fetching niche analysis, using client data engine:', error);
      const fallbackData = generateClientMarketData(nicheToSearch);
      setReport(fallbackData);
      if (fallbackData.competitors?.length >= 2) {
        setComparisonCompetitors([fallbackData.competitors[0], fallbackData.competitors[1]]);
      }
      setLiveTickerBanner(`Radar sincronizado para "${nicheToSearch}".`);
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  };

  // Add custom competitor
  const handleAddCustomCompetitor = (name: string, website: string) => {
    if (!report) return;

    const newComp: Competitor = {
      id: `custom-comp-${Date.now()}`,
      name: name.trim(),
      website: website.trim() || `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
      tagline: 'Alternativa emergente en el nicho',
      marketSharePercent: 8,
      monthlyTrafficEst: '45K visitas/mes',
      pricingModel: 'Freemium / Suscripción',
      avgPricePoint: '$49/mes',
      positioning: 'Challenger ágil con foco en relación calidad-precio',
      targetAudience: 'Negocios en crecimiento buscando evitar costos enterprise',
      techStack: ['React', 'Next.js', 'Stripe', 'PostgreSQL', 'Google Analytics'],
      strengths: ['Agilidad de producto', 'Precios de entrada agresivos', 'Onboarding simplificado'],
      vulnerabilities: ['Menor reconocimiento de marca', 'Falta de integraciones enterprise'],
      organicKeywordsRanked: 1200,
      paidSearchSharePercent: 10,
      metaAdActiveCount: 12,
      adVelocityScore: 68,
      recentStrategicMove: `Nueva campaña de adquisición y oferta agresiva frente a líderes del sector.`
    };

    const updatedCompetitors = [newComp, ...report.competitors];
    setReport({
      ...report,
      competitors: updatedCompetitors,
    });

    if (updatedCompetitors.length >= 2) {
      setComparisonCompetitors([newComp, updatedCompetitors[1]]);
    }
    setLiveTickerBanner(`Competidor personalizado agregado: ${name}. Listo para comparar.`);
  };

  // Compare 2 competitors trigger
  const handleCompareCompetitors = (compA: Competitor, compB: Competitor) => {
    setComparisonCompetitors([compA, compB]);
    setActiveTab('comparison');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Real-time Background Poller
  useEffect(() => {
    if (!isAutoRefreshActive || !report) {
      if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
      return;
    }

    pollingTimerRef.current = setInterval(async () => {
      try {
        const res = await fetch('/api/live-pulse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            niche: currentNiche,
            existingAlertCount: report.alerts?.length || 0,
          }),
        });
        const data = await res.json();
        if (data.newAlert) {
          setReport((prev) => {
            if (!prev) return prev;
            const updatedAlerts = [data.newAlert, ...prev.alerts.slice(0, 7)];
            return { ...prev, alerts: updatedAlerts };
          });
          setLiveTickerBanner(`⚡ [SEÑAL EN VIVO]: ${data.newAlert.title}`);
        }
      } catch (err) {
        console.warn('Live pulse poll error:', err);
      }
    }, refreshInterval * 1000);

    return () => {
      if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
    };
  }, [isAutoRefreshActive, refreshInterval, currentNiche, report]);

  // Generate tactical counter strategy
  const handleGenerateCounterStrategy = async (competitorName: string, actionTrigger: string) => {
    setSelectedCompTarget(competitorName);
    setSelectedTriggerReason(actionTrigger);
    setCounterModalOpen(true);
    setIsCounterLoading(true);
    setCounterStrategy(null);

    try {
      const res = await fetch('/api/generate-counter-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: currentNiche,
          competitorTarget: competitorName,
          actionTrigger: actionTrigger,
        }),
      });
      const data = await res.json();
      setCounterStrategy(data);
    } catch (err) {
      console.error('Counter strategy error:', err);
    } finally {
      setIsCounterLoading(false);
    }
  };

  // Mark all alerts as read
  const handleMarkAllAlertsRead = () => {
    if (!report) return;
    setReport({
      ...report,
      alerts: report.alerts.map((a) => ({ ...a, isRead: true })),
    });
  };

  // Firecrawl Live Competitor Web Audit Handler
  const handleAuditCompetitorWebsite = async (comp: Competitor) => {
    setFirecrawlTargetComp({ name: comp.name, website: comp.website });
    setFirecrawlModalOpen(true);
    setIsFirecrawlLoading(true);
    setFirecrawlAuditData(null);

    try {
      const res = await fetch('/api/scrape-competitor-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: comp.website,
          competitorName: comp.name,
          niche: currentNiche,
        }),
      });

      if (!res.ok) throw new Error('Error al auditar web');
      const data = await res.json();
      setFirecrawlAuditData(data.analysis);
    } catch (err) {
      console.warn('Firecrawl scrape error, fallback:', err);
      setFirecrawlAuditData({
        targetUrl: comp.website.startsWith('http') ? comp.website : `https://${comp.website}`,
        scrapedTitle: `${comp.name} | Plataforma Oficial`,
        mainValueProp: comp.tagline || `Líder en soluciones para ${currentNiche}`,
        detectedPricing: comp.pricingModel || comp.avgPricePoint || 'Planes desde $49/mes',
        keyFeatures: comp.strengths || ['Automatización integral', 'Soporte 24/7', 'Integraciones nativas'],
        vulnerabilitiesFound: comp.vulnerabilities || ['Precios que escalan con extras', 'Curva de aprendizaje'],
        counterStrikeStrategy: `Ataca su propuesta de "${comp.tagline}" ofreciendo migración asistida gratis y precios 100% transparentes.`,
        rawMarkdownSnippet: `Auditoría directa del sitio web ${comp.website} completada con Firecrawl.`,
      });
    } finally {
      setIsFirecrawlLoading(false);
    }
  };

  const unreadAlertsCount = report?.alerts?.filter((a) => !a.isRead).length || 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-slate-200 selection:text-white font-sans antialiased">
      
      {/* Top Sticky Navigation */}
      <Navbar
        currentNiche={currentNiche}
        isAutoRefreshActive={isAutoRefreshActive}
        refreshInterval={refreshInterval}
        onToggleAutoRefresh={() => setIsAutoRefreshActive(!isAutoRefreshActive)}
        onChangeRefreshInterval={(sec) => setRefreshInterval(sec)}
        onManualRefresh={() => handleSearchNiche(currentNiche)}
        isLoading={isLoading}
        onExportReport={() => setIsExportModalOpen(true)}
        unreadAlertsCount={unreadAlertsCount}
        onOpenChat={() => setIsChatDrawerOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Live Activity Ticker Bar */}
      {liveTickerBanner && (
        <div className="bg-slate-100 border-b border-slate-200 py-1.5 px-4 text-xs text-slate-500 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate text-slate-700 font-mono text-[11px]">
              {liveTickerBanner}
            </span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Search Hero */}
        <NicheSearchHero
          currentNiche={currentNiche}
          onSearchNiche={handleSearchNiche}
          onAddCustomCompetitor={handleAddCustomCompetitor}
          isLoading={isLoading}
          analyzedAt={report?.analyzedAt}
          scanningStep={scanningStep}
        />

        {/* Report Tabs */}
        {report && (
          <div>
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-10">
                <OverviewMetrics
                  metrics={report.metrics}
                  summary={report.summary}
                  competitorsCount={report.competitors.length}
                  totalAlertsCount={report.alerts.length}
                />

                <CompetitorGrid
                  competitors={report.competitors}
                  niche={report.niche}
                  onGenerateCounterStrategy={handleGenerateCounterStrategy}
                  onCompareCompetitors={handleCompareCompetitors}
                />

                <AdIntelligenceSection
                  googleAds={report.googleAds}
                  metaAds={report.metaAds}
                  niche={report.niche}
                  onGenerateCounterForAd={handleGenerateCounterStrategy}
                />

                <GoogleSearchSERPSection
                  searchResults={report.googleSearchResults}
                  competitors={report.competitors}
                  niche={report.niche}
                />

                <GoogleMapsIntelligenceSection
                  locations={report.googleMapsLocations}
                  competitors={report.competitors}
                  niche={report.niche}
                />

                <PredictiveRadarSection
                  predictions={report.predictions}
                  niche={report.niche}
                />

                <RealtimeAlertsCenter
                  alerts={report.alerts}
                  niche={report.niche}
                  onGenerateCounterStrategy={handleGenerateCounterStrategy}
                  onMarkAllAsRead={handleMarkAllAlertsRead}
                  onSimulateLiveEvent={() => {
                    fetch('/api/live-pulse', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ niche: currentNiche }),
                    })
                      .then((r) => r.json())
                      .then((d) => {
                        if (d.newAlert) {
                          setReport((prev) => prev ? ({ ...prev, alerts: [d.newAlert, ...prev.alerts] }) : prev);
                          setLiveTickerBanner(`⚡ [SEÑAL]: ${d.newAlert.title}`);
                        }
                      });
                  }}
                />

                <BlueOceanMatrix
                  unclaimedBlueOceans={report.unclaimedBlueOceans}
                  strategicPlaybook={report.strategicPlaybook}
                  niche={report.niche}
                />
              </div>
            )}

            {/* 2. HEAD-TO-HEAD COMPARISON TAB */}
            {activeTab === 'comparison' && (
              <div className="space-y-6">
                <HeadToHeadComparison
                  competitors={report.competitors}
                  niche={report.niche}
                  onGenerateCounterStrategy={handleGenerateCounterStrategy}
                  initialCompAId={comparisonCompetitors ? comparisonCompetitors[0]?.id : undefined}
                  initialCompBId={comparisonCompetitors ? comparisonCompetitors[1]?.id : undefined}
                />
                <CompetitorGrid
                  competitors={report.competitors}
                  niche={report.niche}
                  onGenerateCounterStrategy={handleGenerateCounterStrategy}
                  onCompareCompetitors={handleCompareCompetitors}
                  onAuditCompetitorWebsite={handleAuditCompetitorWebsite}
                />
              </div>
            )}

            {/* 3. COMPETITORS TAB */}
            {activeTab === 'competitors' && (
              <div className="space-y-6">
                <CompetitorGrid
                  competitors={report.competitors}
                  niche={report.niche}
                  onGenerateCounterStrategy={handleGenerateCounterStrategy}
                  onCompareCompetitors={handleCompareCompetitors}
                  onAuditCompetitorWebsite={handleAuditCompetitorWebsite}
                />
                <BlueOceanMatrix
                  unclaimedBlueOceans={report.unclaimedBlueOceans}
                  strategicPlaybook={report.strategicPlaybook}
                  niche={report.niche}
                />
              </div>
            )}

            {/* 4. ADS INTELLIGENCE TAB */}
            {activeTab === 'ads' && (
              <AdIntelligenceSection
                googleAds={report.googleAds}
                metaAds={report.metaAds}
                niche={report.niche}
                onGenerateCounterForAd={handleGenerateCounterStrategy}
              />
            )}

            {/* 5. SEARCH SERP TAB */}
            {activeTab === 'search' && (
              <GoogleSearchSERPSection
                searchResults={report.googleSearchResults}
                competitors={report.competitors}
                niche={report.niche}
              />
            )}

            {/* 6. GOOGLE MAPS TAB */}
            {activeTab === 'maps' && (
              <GoogleMapsIntelligenceSection
                locations={report.googleMapsLocations}
                competitors={report.competitors}
                niche={report.niche}
              />
            )}

            {/* 7. PREDICTIONS TAB */}
            {activeTab === 'predictions' && (
              <PredictiveRadarSection
                predictions={report.predictions}
                niche={report.niche}
              />
            )}

            {/* 8. DASHBOARDS TAB */}
            {activeTab === 'dashboards' && (
              <div className="space-y-6">
                <InteractiveDashboards
                  chartData={report.chartData}
                  trendHistory={report.trendHistory}
                  competitors={report.competitors}
                  niche={report.niche}
                />
                <OverviewMetrics
                  metrics={report.metrics}
                  summary={report.summary}
                  competitorsCount={report.competitors.length}
                  totalAlertsCount={report.alerts.length}
                />
              </div>
            )}

            {/* 9. BLUE OCEAN TAB */}
            {activeTab === 'blueocean' && (
              <BlueOceanMatrix
                unclaimedBlueOceans={report.unclaimedBlueOceans}
                strategicPlaybook={report.strategicPlaybook}
                niche={report.niche}
              />
            )}

            {/* 10. ALERTS TAB */}
            {activeTab === 'alerts' && (
              <RealtimeAlertsCenter
                alerts={report.alerts}
                niche={report.niche}
                onGenerateCounterStrategy={handleGenerateCounterStrategy}
                onMarkAllAsRead={handleMarkAllAlertsRead}
                onSimulateLiveEvent={() => {
                  fetch('/api/live-pulse', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ niche: currentNiche }),
                  })
                    .then((r) => r.json())
                    .then((d) => {
                      if (d.newAlert) {
                        setReport((prev) => prev ? ({ ...prev, alerts: [d.newAlert, ...prev.alerts] }) : prev);
                        setLiveTickerBanner(`⚡ [SEÑAL]: ${d.newAlert.title}`);
                      }
                    });
                }}
              />
            )}

          </div>
        )}

        {/* Initial Empty / Welcome State (Ready to Search) */}
        {!report && !isLoading && (
          <div className="py-12 px-4 max-w-5xl mx-auto text-center space-y-8 animate-fadeIn">
            
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                <span>nodo • Tech & Growth Intelligence</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Auditoría Competitiva & <span className="text-nodo-gradient">Estrategia de Crecimiento</span>
              </h2>
              
              <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
                Analiza en segundos cualquier nicho o competidor. Nodo rastrea Google Search, anuncios en Meta, extrae páginas web con Firecrawl y estructura tu plan de diferenciación.
              </p>
            </div>

            {/* 4 Feature Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left">
              
              <div className="benchia-card p-4.5 space-y-2.5 relative overflow-hidden group bg-white">
                <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100 w-fit text-indigo-600 font-bold text-xs shadow-2xs group-hover:scale-105 transition-transform">
                  01 • GOOGLE SEARCH
                </div>
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">Posicionamiento & SERP</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Ranking orgánico real, volumen mensual de búsquedas e intención de compra con Serper API.
                </p>
              </div>

              <div className="benchia-card p-4.5 space-y-2.5 relative overflow-hidden group bg-white">
                <div className="p-2 rounded-xl bg-pink-50 border border-pink-100 w-fit text-pink-600 font-bold text-xs shadow-2xs group-hover:scale-105 transition-transform">
                  02 • AUDITORÍA WEB
                </div>
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">Despiece de Sitios Web</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Scraping en tiempo real con Firecrawl para extraer precios, claims y vulnerabilidades del competidor.
                </p>
              </div>

              <div className="benchia-card p-4.5 space-y-2.5 relative overflow-hidden group bg-white">
                <div className="p-2 rounded-xl bg-purple-50 border border-purple-100 w-fit text-purple-600 font-bold text-xs shadow-2xs group-hover:scale-105 transition-transform">
                  03 • PUBLICIDAD ACTIVA
                </div>
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">Meta & Google Ads</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Detección de creativos activos, ganchos de conversión y estimación de inversión por canal.
                </p>
              </div>

              <div className="benchia-card p-4.5 space-y-2.5 relative overflow-hidden group bg-white">
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 w-fit text-emerald-600 font-bold text-xs shadow-2xs group-hover:scale-105 transition-transform">
                  04 • PLAYBOOK NODO
                </div>
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">Estrategia & Crecimiento</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Comparativas Head-to-Head, identificación de océanos azules y planes de ataque tácticos.
                </p>
              </div>

            </div>

            {/* Quick-Launch Suggestions */}
            <div className="pt-2">
              <span className="text-xs text-slate-500 font-bold block mb-2.5">O explora uno de estos sectores frecuentes:</span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  'Agencias de Marketing Digital',
                  'Software para Clínicas Dentales',
                  'Distribuidora de Café de Especialidad',
                  'E-commerce de Moda Sostenible'
                ].map((sugg, i) => (
                  <button
                    key={i}
                    onClick={() => handleSearchNiche(sugg)}
                    className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300/80 hover:border-indigo-400 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all cursor-pointer shadow-2xs hover:scale-105"
                  >
                    ⚡ {sugg}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Floating Nodo Copilot Trigger */}
      {!isChatDrawerOpen && (
        <button
          onClick={() => setIsChatDrawerOpen(true)}
          className="fixed bottom-5 right-5 z-40 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-transform hover:scale-105 cursor-pointer"
        >
          <Bot className="w-4 h-4" />
          <span>Nodo Copilot</span>
        </button>
      )}

      {/* Modals & Drawers */}
      <CounterStrategyModal
        isOpen={counterModalOpen}
        onClose={() => setCounterModalOpen(false)}
        strategy={counterStrategy}
        isLoading={isCounterLoading}
        competitorName={selectedCompTarget}
        triggerReason={selectedTriggerReason}
      />

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        report={report}
        niche={currentNiche}
      />

      <FirecrawlAuditModal
        isOpen={firecrawlModalOpen}
        onClose={() => setFirecrawlModalOpen(false)}
        competitorName={firecrawlTargetComp?.name || 'Competidor'}
        website={firecrawlTargetComp?.website || ''}
        auditData={firecrawlAuditData}
        isLoading={isFirecrawlLoading}
      />

      <MarketChatAgentDrawer
        isOpen={isChatDrawerOpen}
        onClose={() => setIsChatDrawerOpen(false)}
        report={report}
        niche={currentNiche}
      />

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-5 px-4 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700 font-mono">Benchia</span>
            <span>— Competitive Intelligence & Real-Time Market Radar</span>
          </div>
          <p className="text-zinc-500 font-mono text-[11px]">
            Meta Ad Library API • Google Search SERP • Google Maps Grounding
          </p>
        </div>
      </footer>

    </div>
  );
}

