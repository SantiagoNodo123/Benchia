import React from 'react';
import { 
  Flame, 
  Globe, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  DollarSign, 
  Zap, 
  CheckCircle2, 
  X,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface FirecrawlAuditData {
  targetUrl: string;
  scrapedTitle: string;
  mainValueProp: string;
  detectedPricing: string;
  keyFeatures: string[];
  vulnerabilitiesFound: string[];
  counterStrikeStrategy: string;
  rawMarkdownSnippet?: string;
}

interface FirecrawlAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  competitorName: string;
  website: string;
  auditData: FirecrawlAuditData | null;
  isLoading: boolean;
}

export const FirecrawlAuditModal: React.FC<FirecrawlAuditModalProps> = ({
  isOpen,
  onClose,
  competitorName,
  website,
  auditData,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden text-zinc-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-zinc-100">
                  Auditoría Web en Vivo: {competitorName}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded">
                  Powered by Firecrawl.dev
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Extracción y despiece del sitio web oficial en tiempo real.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
                <Flame className="w-5 h-5 text-orange-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-zinc-200 font-mono">
                  Firecrawl rastreando {website}...
                </p>
                <p className="text-xs text-zinc-500">
                  Descargando DOM limpio, saltando JavaScript y procesando con Gemini AI...
                </p>
              </div>
            </div>
          ) : auditData ? (
            <div className="space-y-4">
              
              {/* Target Web & Title Card */}
              <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs">
                  <Globe className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-400 font-medium">Sitio auditado:</span>
                  <strong className="text-zinc-200 font-mono">{auditData.targetUrl}</strong>
                </div>
                <a
                  href={auditData.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center space-x-1 font-medium"
                >
                  <span>Visitar web</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>

              {/* Main Hook & Pricing Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Value Proposition */}
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1.5">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase block">
                    Propuesta de Valor Extraída
                  </span>
                  <p className="text-xs text-zinc-200 font-medium leading-relaxed">
                    "{auditData.mainValueProp}"
                  </p>
                </div>

                {/* Detected Pricing */}
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1.5">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase block flex items-center">
                    <DollarSign className="w-3.5 h-3.5 mr-1" /> Precios / Modelo Tarifario
                  </span>
                  <p className="text-xs text-zinc-200 font-medium leading-relaxed font-mono">
                    {auditData.detectedPricing}
                  </p>
                </div>

              </div>

              {/* Key Features Extracted */}
              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2.5">
                <span className="text-xs font-semibold text-zinc-300 flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>Capacidades & Servicios Destacados en su Web</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {auditData.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vulnerabilities Found in Copy/Offer */}
              <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-2">
                <span className="text-xs font-semibold text-rose-300 flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Vulnerabilidades & Brechas Detectadas</span>
                </span>
                <ul className="space-y-1.5">
                  {auditData.vulnerabilitiesFound.map((vuln, idx) => (
                    <li key={idx} className="text-xs text-zinc-300 flex items-start space-x-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{vuln}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tactical Counter-Strike Playbook */}
              <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1.5">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>Contra-Estrategia Recomendada para Superarlos</span>
                </span>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  {auditData.counterStrikeStrategy}
                </p>
              </div>

            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center space-x-1.5 font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Crawler inteligente con renderizado headless</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
