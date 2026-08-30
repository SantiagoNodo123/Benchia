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
    <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none group" 
            onClick={() => setActiveTab('overview')}
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-100 group-hover:border-zinc-500 transition-colors">
              <Radar className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-base text-zinc-100 tracking-tight">
                  Benchia
                </span>
                <span className="text-[11px] font-mono text-zinc-400 border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 rounded">
                  v2.0
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center space-x-0.5 bg-zinc-900/90 p-1 rounded-lg border border-zinc-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                  <span>{tab.label}</span>
                  {Boolean(tab.badge && tab.badge > 0) && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full font-mono">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-2 shrink-0">
            
            {/* Live Feed Status & Frequency */}
            <div className="hidden sm:flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 space-x-1 text-xs">
              <button
                onClick={onToggleAutoRefresh}
                title="Conexión de radar en tiempo real"
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                  isAutoRefreshActive 
                    ? 'text-emerald-400 bg-emerald-500/10' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isAutoRefreshActive ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
                <span>{isAutoRefreshActive ? 'Live' : 'Pausa'}</span>
              </button>

              {isAutoRefreshActive && (
                <select
                  value={refreshInterval}
                  onChange={(e) => onChangeRefreshInterval(Number(e.target.value))}
                  className="bg-zinc-950 text-zinc-300 text-[11px] rounded px-1.5 py-0.5 border border-zinc-800 outline-none focus:border-zinc-600 cursor-pointer font-mono"
                >
                  <option value={15}>15s</option>
                  <option value={30}>30s</option>
                  <option value={60}>60s</option>
                </select>
              )}
            </div>

            {/* Manual Refresh */}
            <button
              onClick={onManualRefresh}
              disabled={isLoading}
              title="Escanear señales de mercado ahora"
              className="flex items-center justify-center p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 border border-zinc-800 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
            </button>

            {/* Export Report */}
            <button
              onClick={onExportReport}
              title="Exportar informe de inteligencia"
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-medium transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-zinc-400" />
              <span>Exportar</span>
            </button>

            {/* Market Copilot */}
            <button
              onClick={onOpenChat}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-medium text-xs shadow-sm transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-zinc-950" />
              <span className="font-semibold">Copilot</span>
            </button>

          </div>
        </div>

        {/* Secondary tab row for medium/small screens */}
        <div className="xl:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-zinc-800/80 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800 text-zinc-100 font-medium border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon className={`w-3 h-3 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="px-1 py-0.2 text-[9px] bg-rose-500 text-white rounded font-mono">
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

