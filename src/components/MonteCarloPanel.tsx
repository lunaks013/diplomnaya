import { BarChart3, Play, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { LiveMonteCarloChart } from "./LiveMonteCarloChart";
import { MechanismCompare } from "./MechanismCompare";
import { MechanismSummaryTable } from "./MechanismSummaryTable";
import { StatCard } from "./StatCard";
import { MONTE_CARLO_BETS, MONTE_CARLO_PATHWAYS } from "../math/monteCarlo";
import type { MechanismComparison } from "../math/monteCarlo";
import type { GameSession, MechanismId } from "../types";

const DEFAULT_BALANCE = 1000;
const DEFAULT_BET = 10;

const MODULE_NAMES: Record<MechanismId, string> = {
  lcg: "Слот",
  csprng: "Кости",
  weightedWheel: "Рулетка",
  provablyFair: "Карты",
};

const MODULE_COLORS: Record<MechanismId, string> = {
  lcg: "#1e3a5f",
  csprng: "#2563eb",
  provablyFair: "#0f766e",
  weightedWheel: "#7c3aed",
};

function formatMoney(n: number): string {
  return n.toLocaleString("ru-RU", { maximumFractionDigits: 0 }) + " ₽";
}

function formatProfit(n: number): string {
  const sign = n >= 0 ? "+" : "−";
  return sign + formatMoney(Math.abs(n)).replace(" ₽", "") + " ₽";
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function parseAmount(value: string): number | null {
  const parsed = Number.parseInt(value.replace(/\s/g, ""), 10);
  if (!Number.isFinite(parsed) || parsed < 1) return null;
  return parsed;
}

export interface MonteCarloSummary {
  avgProfit: number;
  avgBankruptcy: number;
  maxBankruptcy: MechanismComparison;
  avgFinal: number;
}

interface MonteCarloPanelProps {
  sessions: Record<MechanismId, GameSession>;
  comparison: MechanismComparison[] | null;
  summary: MonteCarloSummary | null;
  monteCarloAverageBalances: number[];
  simulationBalance: number;
  simulationBet: number;
  loading: boolean;
  lastCalculatedAt: Date | null;
  calculationKey: number;
  statusMessage: string | null;
  onRunSimulation: (balance: number, bet: number) => void;
}

export function MonteCarloPanel({
  sessions,
  comparison,
  summary,
  monteCarloAverageBalances,
  simulationBalance,
  simulationBet,
  loading,
  lastCalculatedAt,
  calculationKey,
  statusMessage,
  onRunSimulation,
}: MonteCarloPanelProps) {
  const [balanceDraft, setBalanceDraft] = useState(String(DEFAULT_BALANCE));
  const [betDraft, setBetDraft] = useState(String(DEFAULT_BET));

  useEffect(() => {
    setBalanceDraft(String(simulationBalance));
    setBetDraft(String(simulationBet));
  }, [simulationBalance, simulationBet]);

  const previewBalance = useMemo(() => parseAmount(balanceDraft) ?? simulationBalance, [balanceDraft, simulationBalance]);
  const previewBet = useMemo(() => parseAmount(betDraft) ?? simulationBet, [betDraft, simulationBet]);

  const handleRecalculate = () => {
    const balance = parseAmount(balanceDraft);
    const bet = parseAmount(betDraft);

    if (balance === null) {
      setBalanceDraft(String(simulationBalance));
    }
    if (bet === null) {
      setBetDraft(String(simulationBet));
    }
    if (balance === null || bet === null) return;

    if (bet > balance) {
      setBetDraft(String(balance));
      onRunSimulation(balance, balance);
      return;
    }

    onRunSimulation(balance, bet);
  };

  return (
    <div className="space-y-6">
      <div className="mc-panel-hero">
        <div className="mc-panel-hero-top">
          <div>
            <p className="mc-panel-eyebrow">Математический прогноз</p>
            <h2 className="mc-panel-title">Монте-Карло</h2>
            <p className="mc-panel-params">
              {formatMoney(previewBalance)} · ставка {formatMoney(previewBet)}
              {lastCalculatedAt && !loading && (
                <span className="mc-panel-time"> · {formatTime(lastCalculatedAt)}</span>
              )}
            </p>
          </div>
          <button
            type="button"
            className="btn-primary inline-flex shrink-0 items-center gap-2"
            onClick={handleRecalculate}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Считаем…" : "Пересчитать"}
          </button>
        </div>

        <div className="mc-panel-flow">
          <div className="mc-panel-flow-item mc-panel-flow-form">
            <div className="mc-panel-flow-form-head">
              <div className="mc-panel-flow-icon">
                <BarChart3 className="h-4 w-4" strokeWidth={2} />
              </div>
              <div>
                <p className="mc-panel-flow-label">Ваши условия</p>
                <p className="mc-panel-flow-sub">баланс и ставка</p>
              </div>
            </div>
            <div className="mc-panel-inputs">
              <label className="mc-panel-field">
                <span className="mc-panel-field-label">Баланс (₽)</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={balanceDraft}
                  onChange={(event) => setBalanceDraft(event.target.value.replace(/[^\d]/g, ""))}
                  className="mc-panel-input"
                  placeholder="1000"
                />
              </label>
              <label className="mc-panel-field">
                <span className="mc-panel-field-label">Ставка (₽)</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={betDraft}
                  onChange={(event) => setBetDraft(event.target.value.replace(/[^\d]/g, ""))}
                  className="mc-panel-input"
                  placeholder="10"
                />
              </label>
            </div>
          </div>

          <div className="mc-panel-flow-item">
            <div className="mc-panel-flow-icon">
              <Play className="h-4 w-4" strokeWidth={2} />
            </div>
            <div>
              <p className="mc-panel-flow-label">{MONTE_CARLO_PATHWAYS}×{MONTE_CARLO_BETS} раундов</p>
              <p className="mc-panel-flow-sub">виртуальная игра</p>
            </div>
            <span className="mc-panel-flow-arrow" aria-hidden>→</span>
          </div>

          <div className="mc-panel-flow-item">
            <div className="mc-panel-flow-icon">
              <BarChart3 className="h-4 w-4" strokeWidth={2} />
            </div>
            <div>
              <p className="mc-panel-flow-label">Средний итог</p>
              <p className="mc-panel-flow-sub">прогноз</p>
            </div>
          </div>
        </div>
      </div>

      {statusMessage && <div className="mc-panel-toast">{statusMessage}</div>}

      {loading || !summary || !comparison ? (
        <div className="mc-panel-loading">
          <RefreshCw className="h-7 w-7 animate-spin text-slate-400" />
          <p>Моделирование…</p>
        </div>
      ) : (
        <div key={calculationKey} className="mc-results-enter space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Средний остаток" value={formatMoney(summary.avgFinal)} />
            <StatCard
              title="Средний итог"
              value={formatProfit(summary.avgProfit)}
              valueClassName={summary.avgProfit >= 0 ? "text-pos" : "text-neg"}
            />
            <StatCard
              title="Риск обнуления"
              value={`${summary.avgBankruptcy.toFixed(1)}%`}
              valueClassName={summary.avgBankruptcy > 20 ? "text-neg" : ""}
            />
            <StatCard
              title="Рискованнее всего"
              value={MODULE_NAMES[summary.maxBankruptcy.mechanism]}
              hint={`${summary.maxBankruptcy.stats.bankruptcyRate.toFixed(1)}% сессий`}
            />
          </div>

          <div className="mc-game-grid">
            {comparison.map((row) => (
              <article key={row.mechanism} className="mc-game-card">
                <div className="mc-game-card-head">
                  <span className="mc-game-dot" style={{ background: MODULE_COLORS[row.mechanism] }} />
                  <span className="mc-game-name">{MODULE_NAMES[row.mechanism]}</span>
                </div>
                <p className={`mc-game-profit ${row.stats.averageProfit >= 0 ? "text-pos" : "text-neg"}`}>
                  {formatProfit(row.stats.averageProfit)}
                </p>
                <p className="mc-game-meta">
                  обнуление {row.stats.bankruptcyRate.toFixed(0)}% · победы {row.stats.winRate.toFixed(0)}%
                </p>
              </article>
            ))}
          </div>
        </div>
      )}

      <LiveMonteCarloChart
        key={`chart-${calculationKey}`}
        sessions={sessions}
        mcResult={null}
        monteCarloAverageBalances={monteCarloAverageBalances}
        startingBalance={simulationBalance}
        compact
      />

      {!loading && comparison && (
        <div key={`tables-${calculationKey}`} className="mc-results-enter space-y-4">
          <MechanismSummaryTable data={comparison} />
          <MechanismCompare data={comparison} />
        </div>
      )}
    </div>
  );
}
