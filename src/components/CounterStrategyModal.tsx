import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Video, 
  Search, 
  DollarSign, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { CounterStrategyResponse } from '../types';

interface CounterStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategy: CounterStrategyResponse | null;
  isLoading: boolean;
  competitorName: string;
  triggerReason: string;
}

export const CounterStrategyModal: React.FC<CounterStrategyModalProps> = ({
  isOpen,
  onClose,
  strategy,
  isLoading,
  competitorName,
  triggerReason,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-100/30 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl benchia-card p-6 max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Contra-Estrategia & Respuesta de Campaña
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Objetivo: <strong className="text-slate-800">{competitorName}</strong> • Disparador: {triggerReason}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="py-14 text-center space-y-3">
            <Zap className="w-6 h-6 text-slate-500 animate-spin mx-auto" />
            <p className="text-xs text-slate-500">
              Generando copy de anuncios, guión de video y táctica de mitigación...
            </p>
          </div>
        ) : strategy ? (
          <div className="space-y-4">
            
            {/* Headline Counter */}
            <div className="p-3 rounded bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">
                  Titular de Alto Impacto
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  "{strategy.headlineCounter}"
                </p>
              </div>
              <button
                onClick={() => handleCopy(strategy.headlineCounter, 'headline')}
                className="p-1.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors cursor-pointer shrink-0"
                title="Copiar"
              >
                {copiedKey === 'headline' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Video Script */}
            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <div className="flex items-center space-x-1.5 text-slate-700 font-semibold">
                  <Video className="w-3.5 h-3.5 text-slate-500" />
                  <span>Guión de Video UGC (Reels / TikTok)</span>
                </div>
                <button
                  onClick={() => handleCopy(
                    `HOOK: ${strategy.metaAdScript.hook}\nCUERPO: ${strategy.metaAdScript.body}\nCTA: ${strategy.metaAdScript.cta}\nDIRECCIÓN: ${strategy.metaAdScript.visualDirection}`,
                    'meta'
                  )}
                  className="text-[11px] text-slate-500 hover:text-slate-800 font-medium flex items-center space-x-1 cursor-pointer"
                >
                  {copiedKey === 'meta' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copiar</span>
                </button>
              </div>

              <div className="space-y-1 text-slate-700">
                <p><strong className="text-slate-900">Gancho: </strong>"{strategy.metaAdScript.hook}"</p>
                <p><strong className="text-slate-900">Cuerpo: </strong>{strategy.metaAdScript.body}</p>
                <p><strong className="text-slate-900">CTA: </strong>{strategy.metaAdScript.cta}</p>
                <p className="text-slate-400 italic"><strong className="text-slate-500 not-italic">Dirección: </strong>{strategy.metaAdScript.visualDirection}</p>
              </div>
            </div>

            {/* Google Search Ad Variant */}
            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <div className="flex items-center space-x-1.5 text-slate-700 font-semibold">
                  <Search className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copia de Anuncio Google Search</span>
                </div>
                <button
                  onClick={() => handleCopy(
                    `TITULAR: ${strategy.googleAdVariant.headline}\nDESCRIPCIÓN: ${strategy.googleAdVariant.description}`,
                    'google'
                  )}
                  className="text-[11px] text-slate-500 hover:text-slate-800 font-medium flex items-center space-x-1 cursor-pointer"
                >
                  {copiedKey === 'google' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copiar</span>
                </button>
              </div>

              <div className="space-y-1 text-slate-700">
                <p><strong className="text-slate-900">Titular: </strong>{strategy.googleAdVariant.headline}</p>
                <p><strong className="text-slate-900">Descripción: </strong>{strategy.googleAdVariant.description}</p>
                <p><strong className="text-slate-900">Ángulo: </strong>{strategy.googleAdVariant.angle}</p>
                {strategy.googleAdVariant.negativeKeywords && (
                  <div>
                    <span className="text-slate-500 block mb-0.5">Keywords Negativas:</span>
                    <div className="flex flex-wrap gap-1">
                      {strategy.googleAdVariant.negativeKeywords.map((kw, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-50 border border-slate-200 text-slate-500 font-mono">
                          -{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing & Defensive Moves */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center space-x-1 text-emerald-400 font-medium">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Oferta / Precios</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {strategy.pricingCounterMove}
                </p>
              </div>

              <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center space-x-1 text-amber-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Protección Defensiva</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {strategy.defensiveAction}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-3 border-t border-slate-200">
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
};

