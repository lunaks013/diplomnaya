import { Link, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MonteCarloPanel, type MonteCarloSummary } from "../components/MonteCarloPanel";
import { PageHeader } from "../components/PageHeader";
import { PsychLog } from "../components/lab/PsychLog";
import { StatCard } from "../components/StatCard";
import { useTelemetry } from "../context/TelemetryContext";
import { compareAllMechanisms, MONTE_CARLO_BETS, MONTE_CARLO_PATHWAYS } from "../math/monteCarlo";
import { ALL_MECHANISM_IDS, MECHANISMS } from "../math/mechanisms";
import type { MechanismComparison } from "../math/monteCarlo";
import type { MechanismId } from "../types";

type ResultsTab = "games" | "monte-carlo";

function formatMoney(n: number): string {
  return n.toLocaleString("ru-RU", { maximumFractionDigits: 0 }) + " ₽";
}

function formatProfit(n: number): string {
  const sign = n >= 0 ? "+" : "−";
  return sign + formatMoney(Math.abs(n)).replace(" ₽", "") + " ₽";
}

function aggregateMonteCarloBalances(data: MechanismComparison[]): number[] {
  if (data.length === 0) return [];
  const maxLen = Math.max(...data.map((row) => row.averageBalances.length));
  return Array.from({ length: maxLen }, (_, index) => {
    const values = data
      .map((row) => row.averageBalances[index])
      .filter((value): value is number => typeof value === "number");
    if (values.length === 0) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  });
}

function buildSummary(comparison: MechanismComparison[]): MonteCarloSummary {
  const avgProfit =
    comparison.reduce((sum, row) => sum + row.stats.averageProfit, 0) / comparison.length;
  const avgBankruptcy =
    comparison.reduce((sum, row) => sum + row.stats.bankruptcyRate, 0) / comparison.length;
  const maxBankruptcy = comparison.reduce(
    (worst, row) => (row.stats.bankruptcyRate > worst.stats.bankruptcyRate ? row : worst),
    comparison[0],
  );
  const avgFinal =
    comparison.reduce((sum, row) => sum + row.stats.averageFinalBalance, 0) / comparison.length;

  return { avgProfit, avgBankruptcy, maxBankruptcy, avgFinal };
}

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

const TAB_ITEMS: Array<{ id: ResultsTab; label: string; hint: string }> = [
  { id: "games", label: "Мои игры", hint: "факт после программы" },
  { id: "monte-carlo", label: "Монте-Карло", hint: "математический прогноз" },
];

export function ResultsPage() {
  const { params, sessions, customRules } = useTelemetry();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab: ResultsTab = searchParams.get("tab") === "monte-carlo" ? "monte-carlo" : "games";

  const [comparison, setComparison] = useState<MechanismComparison[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [calculationKey, setCalculationKey] = useState(0);
  const [lastCalculatedAt, setLastCalculatedAt] = useState<Date | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [simulationBalance, setSimulationBalance] = useState(1000);
  const [simulationBet, setSimulationBet] = useState(10);
  const [monteCarloBootstrapped, setMonteCarloBootstrapped] = useState(false);

  const runComparison = useCallback(
    (balance: number, bet: number, manual = false) => {
      setSimulationBalance(balance);
      setSimulationBet(bet);
      setLoading(true);
      if (manual) setStatusMessage(null);

      const newSeed = Date.now();
      const startedAt = performance.now();
      const simulationParams = { ...params, initialBalance: balance, baseBet: bet };

      window.setTimeout(() => {
        const result = compareAllMechanisms(
          simulationParams,
          customRules,
          MONTE_CARLO_PATHWAYS,
          MONTE_CARLO_BETS,
          newSeed,
        );
        const elapsed = performance.now() - startedAt;
        const minVisibleMs = manual ? 650 : 0;
        const waitMs = Math.max(0, minVisibleMs - elapsed);

        window.setTimeout(() => {
          setComparison(result);
          setCalculationKey(newSeed);
          setLastCalculatedAt(new Date());
          setLoading(false);
          if (manual) {
            setStatusMessage(
              `Расчёт обновлён: баланс ${balance.toLocaleString("ru-RU")} ₽, ставка ${bet.toLocaleString("ru-RU")} ₽.`,
            );
          }
        }, waitMs);
      }, 16);
    },
    [params, customRules],
  );

  useEffect(() => {
    if (activeTab !== "monte-carlo" || monteCarloBootstrapped) return;
    setMonteCarloBootstrapped(true);
    runComparison(1000, 10, false);
  }, [activeTab, monteCarloBootstrapped, runComparison]);

  const monteCarloSummary = useMemo(
    () => (comparison?.length ? buildSummary(comparison) : null),
    [comparison],
  );

  const monteCarloAverageBalances = useMemo(
    () => (comparison ? aggregateMonteCarloBalances(comparison) : []),
    [comparison],
  );

  const setTab = (tab: ResultsTab) => {
    if (tab === "games") {
      searchParams.delete("tab");
      setSearchParams(searchParams, { replace: true });
      return;
    }
    setSearchParams({ tab }, { replace: true });
  };

  const sessionRows = ALL_MECHANISM_IDS.map((id) => {
    const session = sessions[id];
    const netProfit = session.balance - session.totalDeposited;
    return {
      id,
      session,
      netProfit,
      winRate: session.betsPlayed > 0 ? (session.wins / session.betsPlayed) * 100 : 0,
    };
  });

  const totalBets = sessionRows.reduce((sum, row) => sum + row.session.betsPlayed, 0);
  const totalWins = sessionRows.reduce((sum, row) => sum + row.session.wins, 0);
  const totalLosses = sessionRows.reduce((sum, row) => sum + row.session.losses, 0);
  const totalNetProfit = sessionRows.reduce((sum, row) => sum + row.netProfit, 0);
  const totalTopUps = Object.values(sessions).reduce((s, sess) => s + sess.topUpCount, 0);
  const totalExtraDeposited = Object.values(sessions).reduce(
    (s, sess) => s + Math.max(0, sess.totalDeposited - sess.initialBalance),
    0,
  );
  const hasGameplay = totalBets > 0 || totalTopUps > 0;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-[74px] md:px-6">
      <PageHeader
        label="Сводка результатов"
        title="Итоги анализа"
        description={
          activeTab === "games"
            ? "Фактические данные после вашей игры в программе."
            : "Математический прогноз: что в среднем происходит при вашей ставке и балансе."
        }
      />

      <div className="tab-bar mb-8">
        {TAB_ITEMS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setTab(tab.id)}
            className={`tab-btn flex flex-col items-center gap-0.5 py-2 ${
              activeTab === tab.id ? "tab-btn-active" : "tab-btn-inactive"
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[10px] font-normal opacity-70">{tab.hint}</span>
          </button>
        ))}
      </div>

      {activeTab === "games" ? (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Ставок сыграно" value={String(totalBets)} hint="по всем вкладкам" />
            <StatCard title="Победы / проигрыши" value={`${totalWins} / ${totalLosses}`} hint="фактические исходы" />
            <StatCard
              title="Чистый итог"
              value={formatProfit(totalNetProfit)}
              valueClassName={totalNetProfit >= 0 ? "text-pos" : "text-neg"}
            />
            <StatCard title="Пополнений" value={String(totalTopUps)} hint={`добавлено ${formatMoney(totalExtraDeposited)}`} />
          </div>

          <section className="mb-10">
            <h2 className="heading-lg mb-1">Сведения по игровым вкладкам</h2>
            <p className="mb-5 text-sm text-slate-600">
              Эти данные появляются после игры в разделе «Программа». Для прогноза на длинной серии
              перейдите на вкладку{" "}
              <button type="button" className="font-semibold text-[#1e3a5f] underline" onClick={() => setTab("monte-carlo")}>
                Монте-Карло
              </button>
              .
            </p>

            {!hasGameplay && (
              <div className="glass mb-5 p-6 text-center">
                <p className="text-sm text-slate-600">
                  Пока нет сыгранных ставок. Сыграйте хотя бы один раз в программе — здесь появится ваша реальная статистика.
                </p>
                <Link to="/games" className="btn-primary mt-4 inline-flex">
                  Открыть программу
                </Link>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {sessionRows.map((row) => (
                <article key={row.id} className="glass overflow-hidden">
                  <div className="h-1" style={{ background: MODULE_COLORS[row.id] }} />
                  <div className="p-5">
                    <div className="mb-4 flex items-start justify-between gap-3 border-b border-ozon-border pb-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{MODULE_NAMES[row.id]}</h3>
                        <p className="mt-1 text-xs text-slate-500">{MECHANISMS[row.id].label}</p>
                      </div>
                      <p className={`text-right text-lg font-bold ${row.netProfit >= 0 ? "text-pos" : "text-neg"}`}>
                        {formatProfit(row.netProfit)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-card bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">Баланс</p>
                        <p className="mt-1 font-bold text-slate-900">{formatMoney(row.session.balance)}</p>
                      </div>
                      <div className="rounded-card bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">Ставок</p>
                        <p className="mt-1 font-bold text-slate-900">{row.session.betsPlayed}</p>
                      </div>
                      <div className="rounded-card bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">Победы / проигрыши</p>
                        <p className="mt-1 font-bold text-slate-900">
                          {row.session.wins} / {row.session.losses}
                        </p>
                      </div>
                      <div className="rounded-card bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">Винрейт</p>
                        <p className="mt-1 font-bold text-slate-900">{row.winRate.toFixed(1)}%</p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-slate-500">
                      {row.session.lastResult ?? "В этом модуле ещё не было игровых действий."}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        <MonteCarloPanel
          sessions={sessions}
          comparison={comparison}
          summary={monteCarloSummary}
          monteCarloAverageBalances={monteCarloAverageBalances}
          simulationBalance={simulationBalance}
          simulationBet={simulationBet}
          loading={loading}
          lastCalculatedAt={lastCalculatedAt}
          calculationKey={calculationKey}
          statusMessage={statusMessage}
          onRunSimulation={(balance, bet) => runComparison(balance, bet, true)}
        />
      )}

      <PsychLog />

      <div className="mt-8 flex flex-wrap gap-4">
        <Link to="/games" className="btn-primary">
          Программа
        </Link>
        <Link to="/theory" className="btn-outline">
          Теория
        </Link>
      </div>
    </div>
  );
}
