export interface Competitor {
  id: string;
  name: string;
  website: string;
  tagline: string;
  marketSharePercent: number;
  monthlyTrafficEst: string;
  pricingModel: string;
  avgPricePoint: string;
  positioning: string;
  targetAudience: string;
  techStack: string[];
  strengths: string[];
  vulnerabilities: string[];
  organicKeywordsRanked: number;
  paidSearchSharePercent: number;
  metaAdActiveCount: number;
  adVelocityScore: number; // 1 to 100
  recentStrategicMove: string;
}

export interface GoogleAdSample {
  id: string;
  competitorName: string;
  adType: 'Search' | 'Performance Max' | 'Display' | 'YouTube';
  headline: string;
  displayUrl: string;
  description: string;
  sitelinks: string[];
  targetedKeywords: string[];
  intentLevel: 'Alta Intención de Compra' | 'Comparativa / Solución' | 'Educacional / TOFU';
  psychologicalHook: string;
  landingPageAngle: string;
  estimatedCpcRange: string;
  whyItWorks: string;
}

export interface MetaAdSample {
  id: string;
  competitorName: string;
  platform: ('Instagram' | 'Facebook' | 'Audience Network' | 'Messenger')[];
  format: 'Video UGC' | 'Carrusel' | 'Imagen Estática' | 'Reel / Story' | 'Fundador / Storytelling';
  hookText: string;
  bodyCopy: string;
  callToAction: string;
  targetPersona: string;
  emotionalTrigger: 'Dolor / Agitación' | 'Prueba Social Masiva' | 'FOMO / Oferta Limitada' | 'Autoridad / Caso de Éxito' | 'Demostración de Producto';
  estimatedActiveDays: number;
  spendTier: 'Bajo (<$500/m)' | 'Medio ($500-$3K/m)' | 'Agresivo ($3K-$15K/m)' | 'Escala Masiva (+$15K/m)';
  whyItWorks: string;
  funnelStage: 'TOFU (Atracción)' | 'MOFU (Consideración)' | 'BOFU (Conversión Directa)';
  adLibrarySearchQuery: string;
}

export interface MarketTrendPrediction {
  id: string;
  title: string;
  category: 'Comportamiento de Usuario' | 'Canal de Adquisición' | 'Innovación Tecnológica' | 'Guerra de Precios' | 'Brecha de Mercado';
  confidenceScore: number; // 0-100
  forecastTimeframe: '30 días' | '60 días' | '90 días' | '6 meses';
  predictedImpact: 'Crítico' | 'Alto' | 'Moderado';
  description: string;
  leadingIndicator: string;
  recommendedAction: string;
  growthRatePct: number; // e.g. +145%
}

export interface RealtimeAlert {
  id: string;
  timestamp: string;
  type: 'threat' | 'opportunity' | 'ad_shift' | 'trend' | 'price_war';
  title: string;
  sourceCompetitor?: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  suggestedReaction: string;
  isRead?: boolean;
}

export interface MarketMetrics {
  niche: string;
  totalMarketSizeEst: string;
  growthRateAnnual: string;
  saturationLevel: 'Baja (Océano Azul)' | 'Media (Crecimiento)' | 'Alta (Competida)' | 'Hiper-Saturada';
  averageCpcNiche: string;
  topConvertingAdHook: string;
  untappedOpportunity: string;
  priceElasticity: 'Alta' | 'Media' | 'Baja';
}

export interface ChartDataPoint {
  competitor: string;
  marketShare: number;
  adSpendScore: number;
  featureSophistication: number;
  priceIndex: number;
  organicStrength: number;
  sentimentScore: number;
}

export interface TrendTrajectoryPoint {
  month: string;
  [key: string]: number | string;
}

export interface GoogleMapsLocation {
  id: string;
  competitorId: string;
  competitorName: string;
  title: string;
  lat: number;
  lng: number;
  address: string;
  city: string;
  country: string;
  rating: number; // e.g. 4.8
  userRatingCount: number; // e.g. 142
  priceLevel?: string; // e.g. '$$$'
  placeId?: string;
  googleMapsUri?: string;
  localCoverageType: 'Headquarters' | 'Regional Hub' | 'Local Branch' | 'Service Center' | 'Flagship Store';
  sentimentSummary?: string;
}

export interface GoogleSearchResult {
  id: string;
  competitorName: string;
  rankPosition: number;
  pageTitle: string;
  snippet: string;
  url: string;
  searchQuery: string;
  monthlySearchVolumeEst?: string;
  serpFeatures: ('Featured Snippet' | 'SiteLinks' | 'Knowledge Panel' | 'Local Pack' | 'People Also Ask')[];
  intent: 'Informativa' | 'Transaccional' | 'Comercial' | 'Navegacional';
  domainAuthority: number; // 1-100
}

export interface MarketResearchReport {
  niche: string;
  analyzedAt: string;
  summary: string;
  metrics: MarketMetrics;
  competitors: Competitor[];
  googleAds: GoogleAdSample[];
  metaAds: MetaAdSample[];
  googleMapsLocations: GoogleMapsLocation[];
  googleSearchResults: GoogleSearchResult[];
  predictions: MarketTrendPrediction[];
  alerts: RealtimeAlert[];
  chartData: ChartDataPoint[];
  trendHistory: TrendTrajectoryPoint[];
  unclaimedBlueOceans: {
    gap: string;
    whyMissing: string;
    howToCapitalize: string;
  }[];
  strategicPlaybook: {
    phase: string;
    action: string;
    targetCompetitor: string;
    expectedROI: string;
  }[];
}

export interface CounterStrategyResponse {
  competitorTarget: string;
  actionTrigger: string;
  headlineCounter: string;
  metaAdScript: {
    hook: string;
    body: string;
    cta: string;
    visualDirection: string;
  };
  googleAdVariant: {
    headline: string;
    description: string;
    negativeKeywords: string[];
    angle: string;
  };
  pricingCounterMove: string;
  defensiveAction: string;
}

export interface MarketChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
