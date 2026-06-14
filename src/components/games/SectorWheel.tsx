import { motion } from "framer-motion";
import { useMemo } from "react";
import type { WheelSector } from "../../math/weightedWheel";

const CX = 120;
const CY = 120;
const RIM = 108;
const INNER = 34;

function polar(deg: number, radius: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

function sectorPath(startDeg: number, endDeg: number) {
  const start = polar(startDeg, RIM);
  const end = polar(endDeg, RIM);
  const sweep = endDeg - startDeg;
  const large = sweep > 180 ? 1 : 0;
  return `M ${CX} ${CY} L ${start.x} ${start.y} A ${RIM} ${RIM} 0 ${large} 1 ${end.x} ${end.y} Z`;
}

function displayColor(sector: WheelSector): string {
  if (sector.isJackpot) return "#9a7b1c";
  if (sector.multiplier === 0) return "#3d4f63";
  if (sector.multiplier < 1) return "#6b4e2e";
  return "#2f5d52";
}

function labelColor(sector: WheelSector): string {
  if (sector.isJackpot) return "#fff8e7";
  if (sector.multiplier === 0) return "#dbe4ef";
  return "#ecfdf5";
}

interface SectorWheelProps {
  sectors: WheelSector[];
  rotation: number;
  spinning: boolean;
  activeLabel: string;
}

export function SectorWheel({ sectors, rotation, spinning, activeLabel }: SectorWheelProps) {
  const slices = useMemo(() => {
    const step = 360 / sectors.length;
    return sectors.map((sector, index) => {
      const start = index * step;
      const end = start + step;
      const mid = start + step / 2;
      const labelPos = polar(mid, RIM * 0.62);
      return { sector, start, end, mid, labelPos };
    });
  }, [sectors]);

  return (
    <div className="slot-wheel-assembly">
      <div className="slot-wheel-pointer" aria-hidden>
        <span className="slot-wheel-pointer-cap" />
        <span className="slot-wheel-pointer-stem" />
      </div>

      <motion.div
        className="slot-wheel-rotor"
        animate={{ rotate: spinning ? 720 : rotation }}
        transition={
          spinning
            ? { repeat: Infinity, duration: 1.4, ease: "linear" }
            : { duration: 1.15, ease: [0.22, 0.85, 0.25, 1] }
        }
      >
        <svg viewBox="0 0 240 240" className="slot-wheel-svg" role="img" aria-label="Секторное колесо">
          <defs>
            <radialGradient id="wheelBezel" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#1a3050" />
              <stop offset="100%" stopColor="#0a1628" />
            </radialGradient>
            <filter id="wheelShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.35" />
            </filter>
          </defs>

          <circle cx={CX} cy={CY} r={RIM + 10} fill="url(#wheelBezel)" filter="url(#wheelShadow)" />
          <circle cx={CX} cy={CY} r={RIM + 10} fill="none" stroke="#c9a227" strokeWidth="2.5" opacity="0.85" />
          <circle cx={CX} cy={CY} r={RIM + 4} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

          {slices.map(({ sector, start, end, labelPos }) => (
            <g key={sector.id}>
              <path d={sectorPath(start, end)} fill={displayColor(sector)} stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={labelColor(sector)}
                fontSize={sector.label.length > 3 ? "11" : "13"}
                fontWeight="700"
                fontFamily="Arial, sans-serif"
              >
                {sector.label}
              </text>
            </g>
          ))}

          <circle cx={CX} cy={CY} r={INNER + 8} fill="#0a1628" stroke="#c9a227" strokeWidth="2" />
          <circle cx={CX} cy={CY} r={INNER} fill="#132238" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <text
            x={CX}
            y={CY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#f8fafc"
            fontSize="14"
            fontWeight="700"
            fontFamily="Arial, sans-serif"
          >
            {spinning ? "…" : activeLabel}
          </text>
        </svg>
      </motion.div>
    </div>
  );
}
