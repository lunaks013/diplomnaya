import { ArrowRight, Binary, Fingerprint, PieChart, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { MechanismId, MechanismInfo } from "../types";

const MECHANISM_ICON: Record<MechanismId, typeof Binary> = {
  lcg: Binary,
  csprng: ShieldCheck,
  weightedWheel: PieChart,
  provablyFair: Fingerprint,
};

const GAME_NAMES: Record<MechanismId, string> = {
  lcg: "Слот",
  csprng: "Кости",
  weightedWheel: "Рулетка",
  provablyFair: "Карты",
};

interface MechanismCardProps {
  mechanism: MechanismInfo;
}

export function MechanismCard({ mechanism }: MechanismCardProps) {
  const Icon = MECHANISM_ICON[mechanism.id];
  const shortLabel = mechanism.label.replace(/^Механизм [IVX]+ — /i, "");

  return (
    <Link to="/games" className="mechanism-card group no-underline">
      <div className="mechanism-card-body">
        <div className="flex items-center gap-4">
          <div className="mechanism-card-icon">
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-slate-900">{GAME_NAMES[mechanism.id]}</h3>
              <span className="shrink-0 text-xs text-slate-500">{mechanism.houseEdge}%</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{shortLabel}</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#1e3a5f]" />
        </div>
      </div>
    </Link>
  );
}
