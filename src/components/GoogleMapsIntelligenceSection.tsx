import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  Star, 
  Navigation, 
  ExternalLink, 
  Compass, 
  ShieldCheck, 
  Filter,
  TrendingUp,
  Globe
} from 'lucide-react';
import { GoogleMapsLocation, Competitor } from '../types';

interface GoogleMapsIntelligenceSectionProps {
  locations?: GoogleMapsLocation[];
  competitors: Competitor[];
  niche: string;
}

export const GoogleMapsIntelligenceSection: React.FC<GoogleMapsIntelligenceSectionProps> = ({
  locations = [],
  competitors,
  niche,
}) => {
  const [selectedLocId, setSelectedLocId] = useState<string>(locations[0]?.id || 'loc-1');
  const [selectedCompetitorFilter, setSelectedCompetitorFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');

  const filteredLocations = locations.filter((loc) => {
    if (selectedCompetitorFilter !== 'all' && loc.competitorName !== selectedCompetitorFilter) {
      return false;
    }
    if (selectedTypeFilter !== 'all' && loc.localCoverageType !== selectedTypeFilter) {
      return false;
    }
    return true;
  });

  const activeLocation = locations.find((l) => l.id === selectedLocId) || filteredLocations[0] || locations[0];
  const competitorNames = Array.from(new Set(locations.map((l) => l.competitorName)));
  const coverageTypes = Array.from(new Set(locations.map((l) => l.localCoverageType)));

  return (
    <section id="google-maps-intelligence" className="space-y-4 mb-10">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-800">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-semibold text-zinc-100">
              Presencia Geográfica & Reputación en Google Maps
            </h2>
            <span className="px-2 py-0.2 text-[11px] bg-zinc-800 text-zinc-300 border border-zinc-700 rounded font-mono">
              Local Footprint
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Mapeo de sedes, centros regionales y calificación de usuarios en Google Maps para {niche}.
          </p>
        </div>

        {/* Global summary chips */}
        <div className="flex items-center gap-2 shrink-0 text-xs">
          <div className="bg-zinc-900 px-3 py-1 rounded border border-zinc-800 font-mono text-zinc-300">
            {locations.length} ubicaciones auditadas
          </div>
          <div className="bg-zinc-900 px-3 py-1 rounded border border-zinc-800 font-mono text-amber-400">
            ★ 4.7 prom.
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 benchia-card p-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-zinc-500 font-medium text-[11px]">Filtrar:</span>

          <select
            value={selectedCompetitorFilter}
            onChange={(e) => setSelectedCompetitorFilter(e.target.value)}
            className="bg-zinc-900 text-zinc-300 text-[11px] rounded px-2.5 py-1 border border-zinc-700 outline-none cursor-pointer"
          >
            <option value="all">Todos los competidores ({locations.length})</option>
            {competitorNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="bg-zinc-900 text-zinc-300 text-[11px] rounded px-2.5 py-1 border border-zinc-700 outline-none cursor-pointer"
          >
            <option value="all">Todos los tipos de sede</option>
            {coverageTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="text-[11px] text-zinc-500 font-mono">
          {filteredLocations.length} de {locations.length} sedes
        </div>
      </div>

      {/* Grid: Map Radar + Location Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Map Surface (7 cols) */}
        <div className="lg:col-span-7 benchia-card p-4 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-200">Radar de Cobertura Geográfica</span>
            <span className="text-[10px] text-zinc-500 font-mono">Coordenadas WGS84</span>
          </div>

          {/* Map Surface */}
          <div className="relative w-full h-[320px] bg-zinc-950 rounded border border-zinc-800 overflow-hidden flex items-center justify-center p-4 bg-grid-subtle">
            
            <div className="absolute top-2.5 left-3 text-[10px] font-mono text-zinc-600">
              Coordenadas de Competidores
            </div>
            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-zinc-500">
              Haz clic en cualquier punto para abrir el informe de reseñas
            </div>

            {/* Simulated Geographic Pins */}
            <div className="relative z-10 w-full h-full flex flex-wrap items-center justify-around p-4 gap-4">
              {filteredLocations.map((loc) => {
                const isSelected = activeLocation?.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocId(loc.id)}
                    className={`group relative flex flex-col items-center p-1.5 rounded transition-all cursor-pointer ${
                      isSelected ? 'scale-105 z-20' : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-transform ${
                      isSelected 
                        ? 'bg-emerald-500 text-zinc-950 ring-2 ring-emerald-400' 
                        : 'bg-zinc-800 text-zinc-200 group-hover:bg-zinc-700'
                    }`}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>

                    <div className={`mt-1 px-1.5 py-0.2 rounded text-[10px] font-medium font-mono whitespace-nowrap ${
                      isSelected 
                        ? 'bg-zinc-100 text-zinc-950 font-bold' 
                        : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
                    }`}>
                      {loc.city} • {loc.competitorName.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hub Selector Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pt-1">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocId(loc.id)}
                className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeLocation?.id === loc.id
                    ? 'bg-zinc-100 text-zinc-950'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                <span>{loc.city}</span>
                <span className="ml-1 text-[10px] font-mono text-zinc-500">({loc.rating}★)</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Location Detail Card (5 cols) */}
        <div className="lg:col-span-5 benchia-card p-4 flex flex-col justify-between space-y-3">
          {activeLocation ? (
            <div className="space-y-3 text-xs">
              
              {/* Header */}
              <div className="space-y-1 pb-2.5 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400">
                    {activeLocation.competitorName}
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800">
                    {activeLocation.localCoverageType}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-100 leading-snug">
                  {activeLocation.title}
                </h3>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <span>{activeLocation.city}, {activeLocation.country}</span>
                </p>
              </div>

              {/* Rating Box */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block">Google Rating</span>
                  <div className="flex items-center space-x-1 mt-0.5 font-mono">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-base font-bold text-zinc-100">{activeLocation.rating}</span>
                    <span className="text-xs text-zinc-500">/ 5.0</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-0.5 block font-mono">
                    {activeLocation.userRatingCount} reseñas
                  </span>
                </div>

                <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block">Gama de Precio</span>
                  <div className="text-base font-bold text-zinc-100 font-mono mt-0.5">
                    {activeLocation.priceLevel || '$$$'}
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-0.5 block">
                    Nivel de servicio local
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800 space-y-1.5">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {activeLocation.address}
                  </p>
                </div>
                <div className="pt-1.5 border-t border-zinc-800/80 text-[10px] text-zinc-500 font-mono">
                  GPS: {activeLocation.lat.toFixed(4)}, {activeLocation.lng.toFixed(4)}
                </div>
              </div>

              {/* Sentiment */}
              {activeLocation.sentimentSummary && (
                <div className="bg-zinc-950 border border-zinc-800 p-2.5 rounded space-y-1">
                  <span className="text-zinc-400 text-[10px] uppercase font-mono block">
                    Resumen de Opiniones Google Maps:
                  </span>
                  <p className="text-xs text-zinc-300 italic">
                    "{activeLocation.sentimentSummary}"
                  </p>
                </div>
              )}

              {/* Action Button */}
              <a
                href={activeLocation.googleMapsUri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeLocation.title + ' ' + activeLocation.address)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-medium flex items-center justify-center space-x-1.5 border border-zinc-700 transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Ver en Google Maps</span>
              </a>

            </div>
          ) : (
            <div className="text-center py-10 text-zinc-500 text-xs">
              No hay sedes con el filtro seleccionado.
            </div>
          )}
        </div>

      </div>

    </section>
  );
};

