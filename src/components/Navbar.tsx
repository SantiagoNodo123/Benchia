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
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand: NODO Tech & Growth */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none group" 
            onClick={() => setActiveTab('overview')}
          >
            {/* Nodo Brand Logo Asset */}
            <div className="relative w-9 h-9 rounded-xl bg-slate-950 overflow-hidden flex items-center justify-center shadow-md shadow-indigo-500/10 border border-slate-800 group-hover:scale-105 transition-all">
              <img 
                src="/nodo-logo.png" 
                alt="Nodo Tech & Growth" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to SVG orbital logo if image is loading
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs pointer-events-none">
                <span className="font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">nodo</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
                  nodo
                </span>
                <span className="text-[10px] font-bold text-pink-600 bg-pink-50 border border-pink-200/60 px-1.5 py-0.2 rounded-md">
                  GROWTH
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wide">
                Tech & Growth Intelligence
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center space-x-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/90 shadow-inner">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-pink-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {Boolean(tab.badge && tab.badge > 0) && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-pink-500 text-white">
                      {tab.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
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
              className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isAutoRefreshActive
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  : 'border-slate-200 bg-slate-100 text-slate-500 hover:text-slate-700'
              }`}
            >
              <Radio className={`w-3 h-3 ${isAutoRefreshActive ? 'text-emerald-500 animate-pulse' : 'text-slate-400'}`} />
              <span className="font-mono text-[11px]">{isAutoRefreshActive ? 'LIVE' : 'PAUSED'}</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={onManualRefresh}
              disabled={isLoading || !currentNiche}
              title="Actualizar datos del radar"
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-40 cursor-pointer shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
            </button>

            {/* Copilot Chat Trigger */}
            <button
              onClick={onOpenChat}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
              <span>Nodo Copilot</span>
            </button>

            {/* Export Report */}
            <button
              onClick={onExportReport}
              disabled={!currentNiche}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all disabled:opacity-40 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exportar</span>
            </button>

          </div>
        </div>

        {/* Secondary tab row for medium/small screens */}
        <div className="xl:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-200/80 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3 h-3 ${isActive ? 'text-pink-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="px-1 py-0.2 text-[9px] bg-pink-500 text-white rounded font-mono">
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

