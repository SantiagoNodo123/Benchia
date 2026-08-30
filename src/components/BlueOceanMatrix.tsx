import React from 'react';
import { 
  Compass, 
  Target, 
  ArrowRight, 
  Award,
  Zap,
  Sparkles
} from 'lucide-react';

interface BlueOceanMatrixProps {
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
  niche: string;
}

export const BlueOceanMatrix: React.FC<BlueOceanMatrixProps> = ({
  unclaimedBlueOceans = [],
  strategicPlaybook = [],
  niche,
}) => {
  const safeOceans = Array.isArray(unclaimedBlueOceans) ? unclaimedBlueOceans : [];
  const safePlaybook = Array.isArray(strategicPlaybook) ? strategicPlaybook : [];

  return (
    <section className="space-y-6 mb-10">
      
      {/* Unclaimed Gaps */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-semibold text-zinc-100">
                Océanos Azules & Oportunidades No Atendidas
              </h2>
              <span className="px-2 py-0.2 text-[11px] bg-zinc-800 text-zinc-300 border border-zinc-700 rounded font-mono">
                Ventaja Competitiva
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Vacíos estructurales en {niche} donde la competencia es débil o inexistente.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {safeOceans.map((ocean, idx) => (
            <div
              key={idx}
              className="benchia-card benchia-card-hover p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1 text-[11px] font-mono text-emerald-400 mb-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Oportunidad 0{idx + 1}</span>
                </div>

                <h3 className="text-sm font-semibold text-zinc-100 mb-2 leading-snug">
                  {ocean.gap}
                </h3>

                <div className="space-y-2 text-xs mb-3">
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-500 font-mono text-[10px] uppercase block mb-0.5">
                      Razón de abandono de los líderes:
                    </span>
                    <span className="text-zinc-300 leading-relaxed">{ocean.whyMissing}</span>
                  </div>

                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-200">
                    <span className="text-emerald-400 font-mono text-[10px] uppercase block mb-0.5 font-semibold">
                      Cómo capturar este segmento:
                    </span>
                    <span className="leading-relaxed">{ocean.howToCapitalize}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="font-mono">Barrera de entrada: Baja</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Playbook */}
      <div className="benchia-card p-5 space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100">
            Hoja de Ruta Táctica de Entrada al Mercado (30-60 Días)
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Secuencia estructurada de captura de clientes y posicionamiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {safePlaybook.map((play, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-zinc-800/80">
                  <span className="text-xs font-semibold text-zinc-200 font-mono">
                    {play.phase}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                    {play.expectedROI}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  {play.action}
                </p>
              </div>

              <div className="text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80 flex items-center space-x-1">
                <Target className="w-3 h-3 text-zinc-500" />
                <span>Objetivo: <strong className="text-zinc-200 font-normal">{play.targetCompetitor}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

