import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  ChevronRight,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { MarketChatMessage, MarketResearchReport } from '../types';

interface MarketChatAgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  report: MarketResearchReport | null;
  niche: string;
}

export const MarketChatAgentDrawer: React.FC<MarketChatAgentDrawerProps> = ({
  isOpen,
  onClose,
  report,
  niche,
}) => {
  const [messages, setMessages] = useState<MarketChatMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: `Benchia Copilot activo para "${niche}". Conozco la huella publicitaria, puntos vulnerables y estrategia de precios de tus competidores. ¿Qué análisis específico necesitas?`,
      timestamp: 'Ahora',
      suggestions: [
        '¿Cuál es la debilidad principal del líder en anuncios?',
        'Guión de 15s para Reels atacando sus precios',
        'Estrategia de Google Search de bajo CPC',
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: MarketChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/market-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche,
          message: query,
          currentReport: report,
        }),
      });
      const data = await res.json();

      const agentMsg: MarketChatMessage = {
        id: 'agent-' + Date.now(),
        sender: 'agent',
        text: data.reply || 'He analizado tu consulta y te sugiero priorizar canales donde la competencia tiene menor presencia.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: data.suggestions || [
          '¿Cómo optimizar mi CTR frente al líder?',
          '¿Qué modelo de suscripción convendría implementar?',
        ],
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: MarketChatMessage = {
        id: 'agent-err-' + Date.now(),
        sender: 'agent',
        text: 'Hubo una interrupción de conexión con el agente. Por favor intenta de nuevo.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-slate-50/98 backdrop-blur-lg border-l border-slate-200 shadow-2xl flex flex-col justify-between">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-emerald-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-900 flex items-center space-x-1.5">
              <span>Benchia Copilot</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </h3>
            <p className="text-[10px] text-slate-500 truncate max-w-[220px] font-mono">
              Auditoría en vivo: {niche}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] p-3 rounded text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-zinc-100 text-zinc-950 font-medium'
                  : 'bg-slate-50 border border-slate-200 text-slate-800'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>
            <span className="text-[9px] text-slate-400 mt-1 font-mono px-1">
              {msg.timestamp}
            </span>

            {/* Suggestions */}
            {msg.suggestions && msg.suggestions.length > 0 && (
              <div className="mt-2 space-y-1 w-full max-w-[88%]">
                <span className="text-[10px] text-slate-400 font-mono block">Preguntas sugeridas:</span>
                {msg.suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(sug)}
                    className="w-full text-left text-[11px] px-2.5 py-1.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate">{sug}</span>
                    <ChevronRight className="w-3 h-3 shrink-0 ml-1 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 p-2.5 bg-slate-50 rounded border border-slate-200 text-slate-500 text-xs">
            <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
            <span>Consultando inteligencia de mercado...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t border-slate-200 bg-slate-50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pregunta sobre competidores, copies o precios..."
            disabled={isLoading}
            className="w-full pl-3 pr-10 py-2 rounded bg-slate-50 border border-slate-200 text-slate-800 placeholder-zinc-500 text-xs focus:outline-none focus:border-zinc-500 transition-colors disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="absolute right-1 p-1.5 rounded bg-zinc-100 hover:bg-white text-zinc-950 disabled:opacity-30 transition-colors cursor-pointer"
          >
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>

    </div>
  );
};

