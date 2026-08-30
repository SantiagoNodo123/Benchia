import React, { useState } from 'react';
import { 
  Megaphone, 
  ExternalLink, 
  Instagram, 
  Facebook, 
  Search, 
  Clock, 
  DollarSign,
  Compass,
  Zap,
  Target,
  FileCode,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { GoogleAdSample, MetaAdSample } from '../types';

interface AdIntelligenceSectionProps {
  googleAds: GoogleAdSample[];
  metaAds: MetaAdSample[];
  niche: string;
  onGenerateCounterForAd?: (competitorName: string, hook: string) => void;
}

export const AdIntelligenceSection: React.FC<AdIntelligenceSectionProps> = ({
  googleAds = [],
  metaAds = [],
  niche,
  onGenerateCounterForAd,
}) => {
  const [adSubTab, setAdSubTab] = useState<'meta' | 'google' | 'angles'>('meta');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [filterCompetitor, setFilterCompetitor] = useState<string>('all');

  const safeMetaAds = Array.isArray(metaAds) ? metaAds : [];
  const safeGoogleAds = Array.isArray(googleAds) ? googleAds : [];

  const competitorsList = Array.from(
    new Set([
      ...safeMetaAds.map((m) => m?.competitorName).filter(Boolean),
      ...safeGoogleAds.map((g) => g?.competitorName).filter(Boolean),
    ])
  );

  const filteredMetaAds = safeMetaAds.filter((ad) => {
    if (!ad) return false;
    if (selectedFormat !== 'all' && ad.format !== selectedFormat) return false;
    if (filterCompetitor !== 'all' && ad.competitorName !== filterCompetitor) return false;
    return true;
  });

  const filteredGoogleAds = safeGoogleAds.filter((ad) => {
    if (!ad) return false;
    if (filterCompetitor !== 'all' && ad.competitorName !== filterCompetitor) return false;
    return true;
  });

  return (
    <section className="space-y-4 mb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-semibold text-slate-900">
              Inteligencia Publicitaria: Meta Ad Library & Google Ads
            </h2>
            <span className="px-2 py-0.2 text-[11px] bg-slate-100 text-slate-700 border border-slate-200 rounded font-mono">
              Live Ads Radar
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Creativos activos, longevidad en pauta, intención de subasta y ángulos ganadores.
          </p>
        </div>

        {/* Sub Navigation Switcher */}
        <div className="flex items-center space-x-1 bg-slate-50 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setAdSubTab('meta')}
            className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              adSubTab === 'meta'
                ? 'bg-slate-100 text-slate-900 border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Meta Ad Library ({safeMetaAds.length})
          </button>

          <button
            onClick={() => setAdSubTab('google')}
            className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              adSubTab === 'google'
                ? 'bg-slate-100 text-slate-900 border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Google Ads ({safeGoogleAds.length})
          </button>

          <button
            onClick={() => setAdSubTab('angles')}
            className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              adSubTab === 'angles'
                ? 'bg-slate-100 text-slate-900 border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Matriz de Ángulos
          </button>
        </div>
      </div>

      {/* 1. META AD LIBRARY VIEW */}
      {adSubTab === 'meta' && (
        <div className="space-y-4">
          
          {/* Quick Filters */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs benchia-card p-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-400 font-medium text-[11px] mr-1">Formato:</span>
              {['all', 'Video UGC', 'Carrusel', 'Imagen Estática', 'Reel / Story'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    selectedFormat === fmt
                      ? 'bg-zinc-100 text-zinc-950'
                      : 'bg-slate-50 text-slate-500 hover:text-slate-800 border border-slate-200'
                  }`}
                >
                  {fmt === 'all' ? 'Todos' : fmt}
                </button>
              ))}

              {competitorsList.length > 0 && (
                <select
                  value={filterCompetitor}
                  onChange={(e) => setFilterCompetitor(e.target.value)}
                  className="ml-2 bg-slate-50 border border-slate-200 text-slate-700 text-[11px] rounded px-2 py-0.5 outline-none cursor-pointer"
                >
                  <option value="all">Todos los competidores</option>
                  {competitorsList.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}
            </div>

            <a
              href={`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=${encodeURIComponent(niche)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-700 hover:text-slate-900 flex items-center space-x-1 font-medium bg-slate-50 border border-slate-200 px-3 py-1 rounded transition-colors"
            >
              <span>Buscar en Meta Library oficial</span>
              <ExternalLink className="w-3 h-3 text-slate-500 ml-0.5" />
            </a>
          </div>

          {/* Meta Ads Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMetaAds.map((ad) => (
              <div
                key={ad.id}
                className="benchia-card benchia-card-hover p-4 flex flex-col justify-between"
              >
                <div>
                  
                  {/* Meta Ad Header */}
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 font-bold text-[10px]">
                        {ad.competitorName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900">
                          {ad.competitorName}
                        </h4>
                        <div className="flex items-center space-x-1 text-[10px] text-slate-400 font-mono">
                          <span className="text-emerald-400">{ad.estimatedActiveDays} días activo</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 text-slate-400">
                      <Instagram className="w-3.5 h-3.5 text-slate-500" />
                      <Facebook className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-50 text-slate-700 border border-slate-200 font-mono">
                      {ad.format}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-50 text-rose-300 border border-slate-200 font-mono">
                      {ad.emotionalTrigger}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-50 text-amber-300 border border-slate-200 font-mono">
                      {ad.spendTier}
                    </span>
                  </div>

                  {/* Hook Quote Box */}
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 mb-2.5">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                      Gancho Primeros 3 Segundos:
                    </span>
                    <p className="text-xs font-medium text-slate-800 italic">
                      "{ad.hookText}"
                    </p>
                  </div>

                  {/* Ad Body Copy */}
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-700 leading-relaxed mb-2.5 whitespace-pre-line font-normal max-h-28 overflow-y-auto">
                    {ad.bodyCopy}
                  </div>

                  {/* CTA Button Mock */}
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between text-xs mb-3">
                    <span className="text-slate-400 text-[11px]">CTA:</span>
                    <span className="px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-medium">
                      {ad.callToAction}
                    </span>
                  </div>

                  {/* Why it Works */}
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] space-y-1 mb-3">
                    <span className="text-emerald-400 font-medium block text-[10px] uppercase">
                      Desglose de Conversión:
                    </span>
                    <p className="text-slate-500 text-[11px] leading-tight">
                      {ad.whyItWorks}
                    </p>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200 font-mono">
                      ICP: {ad.targetPersona}
                    </div>
                  </div>

                </div>

                {/* Bottom Action Trigger */}
                <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
                  <a
                    href={`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=${encodeURIComponent(
                      ad.adLibrarySearchQuery || ad.competitorName
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center space-x-1"
                  >
                    <span>Meta Library</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>

                  {onGenerateCounterForAd && (
                    <button
                      onClick={() => onGenerateCounterForAd(ad.competitorName, ad.hookText)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-medium border border-slate-200 transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>Neutralizar</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* 2. GOOGLE ADS VIEW */}
      {adSubTab === 'google' && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between text-xs benchia-card p-3">
            <span className="text-slate-500 text-[11px]">
              Subastas activas en Google Search y Performance Max con intención de compra directa.
            </span>
            <a
              href={`https://adstransparency.google.com/?region=anywhere&query=${encodeURIComponent(niche)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-700 hover:text-slate-900 flex items-center space-x-1 font-medium bg-slate-50 border border-slate-200 px-3 py-1 rounded transition-colors"
            >
              <span>Google Transparency Center</span>
              <ExternalLink className="w-3 h-3 text-slate-500 ml-0.5" />
            </a>
          </div>

          {/* Google Ads Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredGoogleAds.map((ad) => (
              <div
                key={ad.id}
                className="benchia-card benchia-card-hover p-4 flex flex-col justify-between"
              >
                <div>
                  
                  {/* Google Ad Meta Bar */}
                  <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                      <span className="px-1.5 py-0.2 rounded bg-slate-50 text-slate-700 border border-slate-200 text-[10px] font-mono">
                        Google {ad.adType}
                      </span>
                      <span className="text-xs font-semibold text-slate-900">
                        {ad.competitorName}
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-500 font-mono">
                      CPC: {ad.estimatedCpcRange}
                    </span>
                  </div>

                  {/* Realistic Google Search Ad Box */}
                  <div className="p-3 rounded bg-slate-50 border border-slate-200 mb-3">
                    <div className="flex items-center space-x-1 text-[11px] mb-1">
                      <span className="text-slate-500 font-medium">Patrocinado</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-emerald-400 font-mono text-[11px] truncate">
                        https://{ad.displayUrl}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 hover:underline cursor-pointer mb-1">
                      {ad.headline}
                    </h3>

                    <p className="text-xs text-slate-700 leading-relaxed mb-2.5">
                      {ad.description}
                    </p>

                    {/* Sitelinks Extensions */}
                    <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-200">
                      {ad.sitelinks.map((link, idx) => (
                        <div key={idx} className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center space-x-1 cursor-pointer">
                          <span className="text-zinc-600">›</span>
                          <span>{link}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Keywords Targeted */}
                  <div className="mb-2.5">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">
                      Palabras Clave Pujadas:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {ad.targetedKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-1.5 py-0.2 rounded bg-slate-50 text-slate-700 border border-slate-200 font-mono"
                        >
                          "{kw}"
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Psychological Hook & Landing Angle */}
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] space-y-1 mb-3">
                    <div>
                      <span className="text-slate-400">Gatillo Psicológico: </span>
                      <span className="text-slate-800 font-medium">{ad.psychologicalHook}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Ángulo Landing: </span>
                      <span className="text-slate-700">{ad.landingPageAngle}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Factor de Conversión: </span>
                      <span className="text-emerald-400">{ad.whyItWorks}</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Action */}
                <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Intención: {ad.intentLevel}
                  </span>

                  {onGenerateCounterForAd && (
                    <button
                      onClick={() => onGenerateCounterForAd(ad.competitorName, ad.headline)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-medium border border-slate-200 transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>Crear Contra-Ad</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* 3. PSYCHOLOGICAL ANGLES MATRIX */}
      {adSubTab === 'angles' && (
        <div className="benchia-card p-5 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-0.5">
              Matriz de Ángulos y Saturación Psicológica en "{niche}"
            </h3>
            <p className="text-xs text-slate-500">
              Diferencia entre mensajes sobrecargados y oportunidades de posicionamiento en pauta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Saturados */}
            <div className="p-4 rounded bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-1.5 text-rose-400 text-xs font-semibold mb-2">
                <Flame className="w-3.5 h-3.5" />
                <span>Ángulos Saturados (Fatiga de Anuncios)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-rose-300 block text-[11px] mb-0.5">"La plataforma todo-en-uno definitiva"</strong>
                  <span className="text-slate-500 text-[11px]">Promesa genérica con alta tasa de rebote y baja diferenciación.</span>
                </li>
                <li className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-rose-300 block text-[11px] mb-0.5">"Prueba gratis 14 días sin tarjeta"</strong>
                  <span className="text-slate-500 text-[11px]">Estándar de la industria; ya no genera urgencia por sí solo.</span>
                </li>
              </ul>
            </div>

            {/* Máxima Conversión Hoy */}
            <div className="p-4 rounded bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-semibold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mayor Conversión Actual</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-emerald-300 block text-[11px] mb-0.5">Video UGC "Día en la vida" con dolor real</strong>
                  <span className="text-slate-500 text-[11px]">Muestra el proceso caótico manual vs la resolución en 3 clics.</span>
                </li>
                <li className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-emerald-300 block text-[11px] mb-0.5">Campañas de Comparativa Frontal "Vs Líder"</strong>
                  <span className="text-slate-500 text-[11px]">Captura tráfico de alta intención que busca reemplazar software antiguo.</span>
                </li>
              </ul>
            </div>

            {/* Océano Azul */}
            <div className="p-4 rounded bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-1.5 text-sky-400 text-xs font-semibold mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Océanos Azules Desatendidos</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-sky-300 block text-[11px] mb-0.5">Garantía Cuantificable en Menos de 14 Días</strong>
                  <span className="text-slate-500 text-[11px]">"Ahorra 8 horas semanales o el primer mes es 100% gratuito."</span>
                </li>
                <li className="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-sky-300 block text-[11px] mb-0.5">Migración de Datos Automatizada en 90s</strong>
                  <span className="text-slate-500 text-[11px]">Elimina la mayor barrera de cambio de proveedor sin intervención manual.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      )}

    </section>
  );
};

