import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Zap, 
  TrendingUp, 
  ShieldAlert, 
  Radio, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  Flame,
  Clock
} from 'lucide-react';
import { RealtimeAlert } from '../types';

interface RealtimeAlertsCenterProps {
  alerts: RealtimeAlert[];
  niche: string;
  onGenerateCounterStrategy: (competitorName: string, actionTrigger: string) => void;
  onMarkAllAsRead?: () => void;
  onSimulateLiveEvent?: () => void;
}

export const RealtimeAlertsCenter: React.FC<RealtimeAlertsCenterProps> = ({
  alerts,
  niche,
  onGenerateCounterStrategy,
  onMarkAllAsRead,
  onSimulateLiveEvent,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredAlerts = alerts.filter((a) => {
    if (filterType !== 'all' && a.type !== filterType) return false;
    return true;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'threat':
        return 'Amenaza';
      case 'opportunity':
        return 'Oportunidad';
      case 'ad_shift':
        return 'Cambio de Anuncios';
      case 'price_war':
        return 'Guerra de Precios';
      default:
        return 'Tendencia';
    }
  };

  const getSeverityBadge = (severity: string) => {
    if (severity === 'high') return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    if (severity === 'medium') return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
  };

  return (
    <section className="space-y-4 mb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-800">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-semibold text-zinc-100">
              Centro de Señales & Alertas en Tiempo Real
            </h2>
            <span className="px-2 py-0.2 text-[11px] bg-zinc-800 text-zinc-300 border border-zinc-700 rounded font-mono">
              Live Stream
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Detección de movimientos de precios, nuevos creativos en Meta y cambios de subastas en Google Search.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 text-xs">
          {onSimulateLiveEvent && (
            <button
              onClick={onSimulateLiveEvent}
              className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium border border-zinc-700 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sondear Señales</span>
            </button>
          )}

          {onMarkAllAsRead && (
            <button
              onClick={onMarkAllAsRead}
              className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors cursor-pointer"
            >
              Marcar leídas
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-1 overflow-x-auto py-1 text-xs">
        <span className="text-zinc-500 font-medium text-[11px] mr-1">Filtrar:</span>
        {['all', 'threat', 'opportunity', 'ad_shift', 'trend'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
              filterType === type
                ? 'bg-zinc-100 text-zinc-950'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            {type === 'all' ? 'Todas' : getTypeLabel(type)}
          </button>
        ))}
      </div>

      {/* Alerts Feed List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-6 text-center benchia-card text-zinc-400 text-xs">
            No hay alertas activas en este filtro.
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="benchia-card benchia-card-hover p-4 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="space-y-2 flex-1">
                
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-200">
                    {getTypeLabel(alert.type)}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded border font-mono ${getSeverityBadge(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono flex items-center">
                    <Clock className="w-2.5 h-2.5 mr-1" />
                    {alert.timestamp}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-sm font-semibold text-zinc-100">
                  {alert.title}
                </h4>

                {/* Message Body */}
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  {alert.message}
                </p>

                {/* Suggested Reaction */}
                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-start space-x-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-zinc-500 font-mono text-[10px] block">Acción Táctica Sugerida:</span>
                    <span className="text-zinc-200">{alert.suggestedReaction}</span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="shrink-0 flex sm:flex-col justify-end">
                <button
                  onClick={() => onGenerateCounterStrategy(alert.sourceCompetitor || 'Competidor Líder', alert.title)}
                  className="w-full sm:w-auto px-3.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-xs border border-zinc-700 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Diseñar Respuesta</span>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </section>
  );
};

