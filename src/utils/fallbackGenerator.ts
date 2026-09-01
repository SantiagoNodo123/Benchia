import { MarketResearchReport } from '../types';

export function generateClientMarketData(niche: string): MarketResearchReport {
  const cleanNiche = niche?.trim() || 'Sector de Mercado';

  return {
    niche: cleanNiche,
    analyzedAt: new Date().toISOString(),
    summary: `Diagnóstico preliminar para "${cleanNiche}". Consulta la barra superior para iniciar el escaneo completo de competidores y anuncios en vivo en Google y Meta.`,
    metrics: {
      niche: cleanNiche,
      totalMarketSizeEst: 'Mercado en Expansión',
      growthRateAnnual: '+18.5% CAGR',
      saturationLevel: 'Media (Crecimiento)',
      averageCpcNiche: '$1.80 - $4.50 USD',
      topConvertingAdHook: `Soluciones profesionales en ${cleanNiche} con atención directa y sin intermediarios`,
      untappedOpportunity: 'Atención personalizada, cotizaciones en minutos y soporte directo',
      priceElasticity: 'Media',
    },
    competitors: [
      {
        id: 'comp-1',
        name: `Operadores y Empresas de ${cleanNiche}`,
        website: `google.com/search?q=${encodeURIComponent(cleanNiche)}`,
        tagline: `Empresas y referentes de la industria en ${cleanNiche}`,
        marketSharePercent: 35,
        monthlyTrafficEst: '320K visitas/mes',
        pricingModel: 'Planes y cotizaciones a medida',
        avgPricePoint: 'Consultar proveedor',
        positioning: 'Líderes consolidados en el sector',
        targetAudience: 'Clientes y empresas que demandan servicios en ' + cleanNiche,
        techStack: ['Web Oficial', 'Google Search Console', 'Analytics'],
        strengths: ['Presencia en Google', 'Cartera activa de clientes'],
        vulnerabilities: ['Procesos de cotización manuales', 'Tiempos de respuesta lentos'],
        organicKeywordsRanked: 8500,
        paidSearchSharePercent: 35,
        metaAdActiveCount: 20,
        adVelocityScore: 80,
        recentStrategicMove: 'Pujas activas en palabras clave de búsqueda en Google.',
      }
    ],
    googleAds: [
      {
        id: 'g-ad-1',
        competitorName: `Empresas de ${cleanNiche}`,
        adType: 'Search',
        headline: `Soluciones Profesionales en ${cleanNiche} | Cotiza Hoy`,
        displayUrl: `google.com/search?q=${encodeURIComponent(cleanNiche)}`,
        description: `Especialistas en ${cleanNiche}. Atención personalizada, soporte continuo y soluciones adaptadas a tu necesidad.`,
        sitelinks: ['Servicios', 'Cotizar', 'Casos de Éxito', 'Contacto'],
        targetedKeywords: [`${cleanNiche}`, `proveedores ${cleanNiche}`, `mejores empresas ${cleanNiche}`],
        intentLevel: 'Alta Intención de Compra',
        psychologicalHook: 'Confianza y respaldo con trayectoria comprobada',
        landingPageAngle: 'Página de aterrizaje corporativa enfocada en formulario de contacto rápido.',
        estimatedCpcRange: '$1.80 - $4.20 USD',
        whyItWorks: 'Captura al comprador en la fase de búsqueda activa y cotización.',
      }
    ],
    metaAds: [
      {
        id: 'm-ad-1',
        competitorName: `Empresas de ${cleanNiche}`,
        platform: ['Instagram', 'Facebook'],
        format: 'Video UGC',
        hookText: `¿Buscando la mejor opción para ${cleanNiche}?`,
        bodyCopy: `Descubre cómo optimizar tus resultados en ${cleanNiche} con atención directa y sin sobrecostos. Haz clic para cotizar en minutos.`,
        callToAction: 'Más Información',
        targetPersona: 'Tomadores de decisión y clientes que buscan calidad y rapidez',
        emotionalTrigger: 'Autoridad / Caso de Éxito',
        estimatedActiveDays: 28,
        spendTier: 'Medio ($500-$3K/m)',
        whyItWorks: 'Mensaje directo al dolor del cliente con llamado a la acción claro.',
        funnelStage: 'MOFU (Consideración)',
        adLibrarySearchQuery: cleanNiche,
      }
    ],
    googleMapsLocations: [
      {
        id: 'loc-1',
        competitorId: 'comp-1',
        competitorName: `Empresas de ${cleanNiche}`,
        title: `Sede de Operaciones - ${cleanNiche}`,
        lat: 4.7110,
        lng: -74.0721,
        address: 'Cobertura Nacional y Local',
        city: 'Bogotá',
        country: 'Colombia',
        rating: 4.8,
        userRatingCount: 150,
        priceLevel: '$$',
        placeId: 'ChIJ_main',
        googleMapsUri: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanNiche)}`,
        localCoverageType: 'Headquarters',
        sentimentSummary: 'Opiniones destacando puntualidad y cumplimiento.',
      }
    ],
    googleSearchResults: [
      {
        id: 'serp-1',
        competitorName: `Empresas de ${cleanNiche}`,
        rankPosition: 1,
        pageTitle: `Servicios Líderes en ${cleanNiche}`,
        snippet: `Encuentra las mejores opciones y proveedores evaluados en ${cleanNiche}.`,
        url: `https://www.google.com/search?q=${encodeURIComponent(cleanNiche)}`,
        searchQuery: `${cleanNiche}`,
        monthlySearchVolumeEst: '14,000 búsquedas/mes',
        serpFeatures: ['SiteLinks'],
        intent: 'Comercial',
        domainAuthority: 80,
      }
    ],
    predictions: [
      {
        id: 'pred-1',
        title: `Digitalización y Automatización en ${cleanNiche}`,
        category: 'Innovación Tecnológica',
        confidenceScore: 92,
        forecastTimeframe: '60 días',
        predictedImpact: 'Crítico',
        description: `Las empresas en ${cleanNiche} que automaticen cotizaciones y seguimiento ganarán un 35% más de cuota de mercado.`,
        leadingIndicator: 'Incremento en búsquedas de cotizadores online y atención por WhatsApp.',
        recommendedAction: 'Habilitar cotizador autónomo en la web e integraciones directas.',
        growthRatePct: 145,
      }
    ],
    alerts: [
      {
        id: 'alt-1',
        timestamp: 'En tiempo real',
        type: 'ad_shift',
        title: `Aumento de anuncios en ${cleanNiche}`,
        sourceCompetitor: `Sector ${cleanNiche}`,
        message: 'Aumento de anuncios enfocados en tiempos de entrega y ofertas de bienvenida.',
        severity: 'high',
        suggestedReaction: 'Destacar diferenciales de atención directa y garantías de servicio.',
        isRead: false,
      }
    ],
    chartData: [
      { competitor: `Sector ${cleanNiche}`, marketShare: 35, adSpendScore: 80, featureSophistication: 85, priceIndex: 75, organicStrength: 85, sentimentScore: 80 }
    ],
    trendHistory: [
      { month: 'Mes -5', 'Tendencia IA': 30 },
      { month: 'Mes -4', 'Tendencia IA': 45 },
      { month: 'Mes -3', 'Tendencia IA': 60 },
      { month: 'Mes -2', 'Tendencia IA': 75 },
      { month: 'Mes -1', 'Tendencia IA': 90 },
      { month: 'Actual', 'Tendencia IA': 100 },
      { month: '+30d Proy.', 'Tendencia IA': 125 },
      { month: '+60d Proy.', 'Tendencia IA': 145 },
    ],
    unclaimedBlueOceans: [
      {
        gap: 'Transparencia de precios y cotización en tiempo real',
        whyMissing: 'La mayoría de competidores obliga a esperar horas o días por una llamada de ventas.',
        howToCapitalize: 'Ofrecer precios claros o calculadoras interactivas para capturar clientes al instante.',
      }
    ],
    strategicPlaybook: [
      {
        phase: 'Fase 1: Captura de Búsqueda Orgánica y Paga',
        action: `Publicar landings optimizadas para "${cleanNiche}" con llamadas a la acción inmediatas.`,
        targetCompetitor: `Empresas de ${cleanNiche}`,
        expectedROI: '3.2x ROAS',
      }
    ],
  };
}
