import React from 'react';
import { 
  Radar, 
  Activity, 
  Download, 
  RefreshCw, 
  Radio, 
  Layers, 
  Bell,
  MessageSquare,
  Zap,
  BarChart3,
  Search,
  MapPin,
  Flame,
  ShieldCheck,
  SplitSquareVertical
} from 'lucide-react';

interface NavbarProps {
  currentNiche: string;
  isAutoRefreshActive: boolean;
  refreshInterval: number;
  onToggleAutoRefresh: () => void;
  onChangeRefreshInterval: (seconds: number) => void;
  onManualRefresh: () => void;
  isLoading: boolean;
  onExportReport: () => void;
  unreadAlertsCount: number;
  onOpenChat: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentNiche,
  isAutoRefreshActive,
  refreshInterval,
  onToggleAutoRefresh,
  onChangeRefreshInterval,
  onManualRefresh,
  isLoading,
  onExportReport,
  unreadAlertsCount,
  onOpenChat,
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'competitors', label: 'Competidores', icon: Layers },
    { id: 'comparison', label: 'Comparativa', icon: SplitSquareVertical },
    { id: 'ads', label: 'Meta & Google Ads', icon: Zap },
    { id: 'search', label: 'SERP & SEO', icon: Search },
    { id: 'maps', label: 'Footprint Local', icon: MapPin },
    { id: 'predictions', label: 'Radar & Señales', icon: Radar },
    { id: 'blueocean', label: 'Océanos Azules', icon: ShieldCheck },
    { id: 'alerts', label: 'Alertas', icon: Bell, badge: unreadAlertsCount },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#07090e]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none group" 
            onClick={() => setActiveTab('overview')}
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-sky-500/30 flex items-center justify-center shadow-md shadow-sky-500/10 group-hover:border-sky-400/60 group-hover:shadow-sky-500/25 transition-all">
              <Radar className="w-4.5 h-4.5 text-sky-400 group-hover:text-sky-300 transition-colors animate-pulse-slow" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#07090e] animate-ping" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base bg-gradient-to-r from-white via-slate-100 to-sky-300 bg-clip-text text-transparent tracking-tight">
                  Benchia
                </span>
                <span className="text-[10px] font-mono font-medium text-sky-400/90 border border-sky-500/20 bg-sky-950/40 px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                  PRO AI
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center space-x-1 bg-slate-900/70 p-1 rounded-xl border border-slate-800/80 backdrop-blur-md shadow-inner">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-b from-slate-800 to-slate-850 text-white shadow-sm border border-sky-500/30 shadow-sky-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {Boolean(tab.badge && tab.badge > 0) && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {tab.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-2 shrink-0">
            
            {/* Live Polling Toggle */}
            <button
              onClick={onToggleAutoRefresh}
              title={`Monitoreo en Vivo: ${isAutoRefreshActive ? 'Activo' : 'Pausado'}`}
              className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                isAutoRefreshActive
                  ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/50'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radio className={`w-3 h-3 ${isAutoRefreshActive ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
              <span className="font-mono text-[11px]">{isAutoRefreshActive ? 'LIVE' : 'PAUSED'}</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={onManualRefresh}
              disabled={isLoading || !currentNiche}
              title="Actualizar datos del radar"
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors disabled:opacity-40 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-sky-400' : ''}`} />
            </button>

            {/* Copilot Chat Trigger */}
            <button
              onClick={onOpenChat}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-950/30 hover:bg-indigo-900/40 text-indigo-200 text-xs font-semibold transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span>Copilot</span>
            </button>

            {/* Export Report */}
            <button
              onClick={onExportReport}
              disabled={!currentNiche}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-sky-500/20 transition-all disabled:opacity-40 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exportar</span>
            </button>

          </div>
        </div>

        {/* Secondary tab row for medium/small screens */}
        <div className="xl:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-800/80 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white font-medium border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3 h-3 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="px-1 py-0.2 text-[9px] bg-rose-500/20 text-rose-300 rounded font-mono">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

