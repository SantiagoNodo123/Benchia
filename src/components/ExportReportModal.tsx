import React, { useState } from 'react';
import { X, Download, FileText, Check, Copy, FileSpreadsheet, Code } from 'lucide-react';
import { MarketResearchReport } from '../types';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: MarketResearchReport | null;
  niche: string;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  report,
  niche,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !report) return null;

  const downloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `benchia-report-${niche.replace(/\s+/g, '-').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const downloadCSV = () => {
    const headers = ['Competidor', 'Cuota Mercado %', 'Score Velocidad Ads', 'Trafico Mensual Est.', 'Anuncios Meta Activos', 'Posicionamiento', 'Fortalezas', 'Vulnerabilidades'];
    const rows = report.competitors.map((c) => [
      `"${c.name}"`,
      c.marketSharePercent,
      `"${c.adVelocityScore}/100"`,
      `"${c.monthlyTrafficEst}"`,
      c.metaAdActiveCount,
      `"${c.positioning}"`,
      `"${c.strengths.join('; ')}"`,
      `"${c.vulnerabilities.join('; ')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `benchia-competitors-${niche.replace(/\s+/g, '-').toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const copyMarkdown = () => {
    const md = `# Benchia Intelligence Report: ${niche}
**Generado**: ${new Date().toLocaleDateString()}
**TAM Estimado**: ${report.metrics?.totalMarketSizeEst || 'N/A'} | **CAGR**: ${report.metrics?.growthRateAnnual || 'N/A'}
**Competidores Auditados**: ${report.competitors.length}

## Competidores
${report.competitors.map(c => `### ${c.name} (${c.positioning})
- **Cuota**: ${c.marketSharePercent}% | **Velocidad Ads**: ${c.adVelocityScore}/100 | **Tráfico Est.**: ${c.monthlyTrafficEst}
- **Fortalezas**: ${c.strengths.join(', ')}
- **Vulnerabilidades**: ${c.vulnerabilities.join(', ')}
- **Movimiento Estratégico**: ${c.recentStrategicMove}
`).join('\n')}

## Océanos Azules
${report.unclaimedBlueOceans.map((o, idx) => `### ${idx + 1}. ${o.gap}
- **Causa**: ${o.whyMissing}
- **Estrategia**: ${o.howToCapitalize}
`).join('\n')}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-100/30 backdrop-blur-sm">
      <div className="relative w-full max-w-lg benchia-card p-6 border border-slate-200 shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Exportar Informe de Inteligencia
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Nicho: <span className="text-slate-800">{niche}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          <button
            onClick={downloadCSV}
            className="w-full p-3 rounded bg-slate-50 hover:bg-slate-50 border border-slate-200 text-left flex items-center justify-between group transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-emerald-400 group-hover:border-slate-300">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-800 block">Dataset CSV (Excel / Sheets)</span>
                <span className="text-[11px] text-slate-500 block">Tabla completa de competidores, métricas y debilidades.</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-800 shrink-0" />
          </button>

          <button
            onClick={downloadJSON}
            className="w-full p-3 rounded bg-slate-50 hover:bg-slate-50 border border-slate-200 text-left flex items-center justify-between group transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-sky-400 group-hover:border-slate-300">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-800 block">Archivo JSON Completo</span>
                <span className="text-[11px] text-slate-500 block">Estructura cruda para integración con APIs o pipelines.</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-800 shrink-0" />
          </button>

          <button
            onClick={copyMarkdown}
            className="w-full p-3 rounded bg-slate-50 hover:bg-slate-50 border border-slate-200 text-left flex items-center justify-between group transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-amber-400 group-hover:border-slate-300">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-800 block">Copiar Resumen Markdown</span>
                <span className="text-[11px] text-slate-500 block">Listo para Notion, Obsidian, Slack o correo ejecutivo.</span>
              </div>
            </div>
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-800 shrink-0" />
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
