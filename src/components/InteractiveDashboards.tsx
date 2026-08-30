import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ScatterChart, 
  Scatter, 
  ZAxis, 
  AreaChart, 
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  TrendingUp, 
  Layers, 
  Target
} from 'lucide-react';
import { ChartDataPoint, TrendTrajectoryPoint, Competitor } from '../types';

interface InteractiveDashboardsProps {
  chartData: ChartDataPoint[];
  trendHistory: TrendTrajectoryPoint[];
  competitors: Competitor[];
  niche: string;
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4'];

export const InteractiveDashboards: React.FC<InteractiveDashboardsProps> = ({
  chartData = [],
  trendHistory = [],
  competitors = [],
  niche,
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'share' | 'scatter' | 'radar' | 'trajectory'>('share');

  const safeCompetitors = Array.isArray(competitors) ? competitors : [];
  const safeChartData = Array.isArray(chartData) && chartData.length > 0
    ? chartData
    : safeCompetitors.map((c, i) => ({
        competitor: c.name,
        marketShare: c.marketSharePercent || 25,
        adSpendScore: c.adVelocityScore || 70,
        featureSophistication: 75 + i * 5,
        priceIndex: 50 + i * 10,
        organicStrength: 65 + i * 5,
        sentimentScore: 80,
      }));

  const safeTrendHistory = Array.isArray(trendHistory) && trendHistory.length > 0
    ? trendHistory
    : [
        { month: 'Mes -3', 'Tendencia IA': 50 },
        { month: 'Mes -2', 'Tendencia IA': 65 },
        { month: 'Mes -1', 'Tendencia IA': 82 },
        { month: 'Actual', 'Tendencia IA': 100 },
        { month: '+30d Proy.', 'Tendencia IA': 125 },
      ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-xs space-y-1 font-mono shadow-xl">
          <p className="font-semibold text-zinc-100 font-sans">{label || payload[0]?.name || payload[0]?.payload?.competitor}</p>
          {payload.map((item: any, idx: number) => (
            <p key={idx} style={{ color: item.color || '#10b981' }}>
              {item.name}: <span className="font-bold">{item.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const radarDimensions = [
    { subject: 'Gasto en Ads', key: 'adSpendScore' },
    { subject: 'Sofisticación Producto', key: 'featureSophistication' },
    { subject: 'Índice de Precio', key: 'priceIndex' },
    { subject: 'Fuerza SEO Orgánica', key: 'organicStrength' },
    { subject: 'Satisfacción Clientes', key: 'sentimentScore' },
  ];

  const formattedRadarData = radarDimensions.map((dim) => {
    const row: any = { subject: dim.subject };
    safeChartData.forEach((c) => {
      row[c.competitor] = (c as any)[dim.key] || 50;
    });
    return row;
  });

  return (
    <section className="space-y-4 mb-10">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-800">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-semibold text-zinc-100">
              Métricas Cuantitativas & Gráficos de Posicionamiento
            </h2>
            <span className="px-2 py-0.2 text-[11px] bg-zinc-800 text-zinc-300 border border-zinc-700 rounded font-mono">
              Visual Analytics
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Cuota de mercado, trayectoria proyectada y correlación entre precio y funcionalidad.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center space-x-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveChartTab('share')}
            className={`px-3 py-1 rounded font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeChartTab === 'share'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Cuota de Mercado
          </button>
          <button
            onClick={() => setActiveChartTab('trajectory')}
            className={`px-3 py-1 rounded font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeChartTab === 'trajectory'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Trayectoria (+60d)
          </button>
          <button
            onClick={() => setActiveChartTab('scatter')}
            className={`px-3 py-1 rounded font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeChartTab === 'scatter'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Precio vs Valor
          </button>
          <button
            onClick={() => setActiveChartTab('radar')}
            className={`px-3 py-1 rounded font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeChartTab === 'radar'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Radar Multiaxial
          </button>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="benchia-card p-5">
        
        {/* 1. MARKET SHARE */}
        {activeChartTab === 'share' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">
                Distribución de Cuota de Mercado & Pauta Publicitaria
              </h3>
              <p className="text-xs text-zinc-400">
                Participación estimada de ingresos y share of voice en {niche}.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
              {/* Pie Chart */}
              <div className="h-64 w-full p-2 rounded bg-zinc-950 border border-zinc-800">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={safeChartData}
                      dataKey="marketShare"
                      nameKey="competitor"
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      innerRadius={45}
                      paddingAngle={3}
                      label={({ name, percent }: any) => `${name?.substring(0, 10)} (${((percent || 0) * 100).toFixed(0)}%)`}
                      labelLine={false}
                    >
                      {safeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar comparison */}
              <div className="h-64 w-full p-2 rounded bg-zinc-950 border border-zinc-800">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={safeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis 
                      dataKey="competitor" 
                      stroke="#71717a" 
                      fontSize={10} 
                      tickFormatter={(v) => v.split(' ')[0]} 
                    />
                    <YAxis stroke="#71717a" fontSize={10} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Bar dataKey="marketShare" name="Cuota (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="adSpendScore" name="Gasto en Ads (1-100)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* 2. HISTORICAL & PREDICTIVE TRAJECTORY */}
        {activeChartTab === 'trajectory' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100">
                  Evolución Histórica & Demanda Proyectada (+60 Días)
                </h3>
                <p className="text-xs text-zinc-400">
                  Modelo de serie temporal derivado de tendencias de búsqueda y volumen de subastas.
                </p>
              </div>
            </div>

            <div className="h-72 w-full p-2 rounded bg-zinc-950 border border-zinc-800">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={safeTrendHistory} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="month" stroke="#71717a" fontSize={10} />
                  <YAxis stroke="#71717a" fontSize={10} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="Tendencia IA" name="Demanda Global del Nicho" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorAI)" />
                  {safeCompetitors.slice(0, 2).map((c, idx) => (
                    <Area 
                      key={c.id} 
                      type="monotone" 
                      dataKey={c.name.split(' ')[0]} 
                      name={c.name} 
                      stroke={idx === 0 ? '#3b82f6' : '#ec4899'} 
                      strokeWidth={1.5} 
                      fillOpacity={0.05} 
                      fill={idx === 0 ? '#3b82f6' : '#ec4899'} 
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 3. SCATTER MATRIX PRICE VS VALUE */}
        {activeChartTab === 'scatter' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">
                Matriz de Posicionamiento: Precio vs Sofisticación
              </h3>
              <p className="text-xs text-zinc-400">
                Espacios de oportunidad: precio competitivo con alta capacidad de producto.
              </p>
            </div>

            <div className="h-72 w-full p-2 rounded bg-zinc-950 border border-zinc-800">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis 
                    type="number" 
                    dataKey="priceIndex" 
                    name="Índice de Precio" 
                    unit="/100" 
                    stroke="#71717a" 
                    fontSize={10} 
                  />
                  <YAxis 
                    type="number" 
                    dataKey="featureSophistication" 
                    name="Sofisticación de Funciones" 
                    unit="/100" 
                    stroke="#71717a" 
                    fontSize={10} 
                  />
                  <ZAxis type="number" dataKey="marketShare" range={[80, 400]} name="Cuota" />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter name="Competidores" data={safeChartData} fill="#10b981">
                    {safeChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 4. RADAR CHART */}
        {activeChartTab === 'radar' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">
                Evaluación Multidimensional de Competidores
              </h3>
              <p className="text-xs text-zinc-400">
                Comparación simultánea en gasto de ads, producto, pricing, SEO y sentimiento.
              </p>
            </div>

            <div className="h-72 w-full p-2 rounded bg-zinc-950 border border-zinc-800">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={formattedRadarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                  <PolarGrid stroke="#27272a" />
                  <PolarAngleAxis dataKey="subject" stroke="#a1a1aa" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#52525b" fontSize={9} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  {chartData.slice(0, 3).map((c, idx) => (
                    <Radar
                      key={c.competitor}
                      name={c.competitor}
                      dataKey={c.competitor}
                      stroke={COLORS[idx]}
                      fill={COLORS[idx]}
                      fillOpacity={0.15}
                    />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};

