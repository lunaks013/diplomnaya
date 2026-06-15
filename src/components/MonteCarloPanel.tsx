import { RefreshCw } from "lucide-react";
import { LiveMonteCarloChart } from "./LiveMonteCarloChart";
import { MechanismCompare } from "./MechanismCompare";
import { MechanismSummaryTable } from "./MechanismSummaryTable";
import { StatCard } from "./StatCard";
import { MONTE_CARLO_BETS, MONTE_CARLO_PATHWAYS } from "../math/monteCarlo";
import { MECHANISMS } from "../math/mechanisms";
import type { MechanismComparison } from "../math/monteCarlo";
import type { GameSession, MechanismId, TelemetryParams } from "../types";

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

export interface MonteCarloSummary {
  avgProfit: number;
  avgBankruptcy: number;
  maxBankruptcy: MechanismComparison;
  avgFinal: number;
}

interface MonteCarloPanelProps {
  params: TelemetryParams;
  sessions: Record<MechanismId, GameSession>;
  comparison: MechanismComparison[] | null;
  summary: MonteCarloSummary | null;
  monteCarloAverageBalances: number[];
  loading: boolean;
  lastCalculatedAt: Date | null;
  calculationKey: number;
  statusMessage: string | null;
  onRecalculate: () => void;
}

const STEPS = [
  {
    title: "Берём ваши настройки",
    text: "Стартовый баланс и размер ставки из программы — как условия эксперимента.",
  },
  {
    title: "Компьютер играет за вас",
    text: `Для каждой из 4 игр запускается ${MONTE_CARLO_PATHWAYS} виртуальных сессий по ${MONTE_CARLO_BETS} раундов. Это не ваша реальная игра — только модель.`,
  },
  {
    title: "Считаем средний прогноз",
    text: "Из всех виртуальных сессий получаем средний остаток, риск обнуления баланса и сравнение игр.",
  },
];

export function MonteCarloPanel({
  params,
  sessions,
  comparison,
  summary,
  monteCarloAverageBalances,
  loading,
  lastCalculatedAt,
  calculationKey,
  statusMessage,
  onRecalculate,
}: MonteCarloPanelProps) {
  return (
    <div className="space-y-8">
      <div className="glass border-l-4 border-[#c9a227] p-5 md:p-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#9a7b1a]">Роль в проекте</p>
        <h2 className="heading-lg mb-3">Монте-Карло — математический прогноз на дистанции</h2>
        <div className="mb-4 grid gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-card bg-slate-50 p-3">
            <p className="font-semibold text-slate-900">Программа</p>
            <p className="mt-1 text-slate-600">Вы играете сами — один реальный путь баланса.</p>
          </div>
          <div className="rounded-card bg-amber-50 p-3 ring-1 ring-amber-200">
            <p className="font-semibold text-slate-900">Монте-Карло (эта вкладка)</p>
            <p className="mt-1 text-slate-600">Компьютер тысячи раз «проигрывает» те же правила и показывает средний исход.</p>
          </div>
          <div className="rounded-card bg-slate-50 p-3">
            <p className="font-semibold text-slate-900">Теория</p>
            <p className="mt-1 text-slate-600">Объясняет метод и зачем он нужен в дипломной работе.</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">
          <strong className="text-slate-800">Зачем это нужно:</strong> одна партия может закончиться удачно или неудачно.
          Монте-Карло отвечает на вопрос — <em>что в среднем происходит при такой ставке и балансе на длинной серии</em>.
        </p>
      </div>

      <section>
        <h3 className="mb-4 text-lg font-bold text-slate-900">Как работает расчёт</h3>
        <ol className="grid gap-3 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="glass flex gap-3 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-sm font-bold text-white">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Результаты моделирования</h3>
            <p className="mt-1 text-sm text-slate-600">
              Условия: капитал {formatMoney(params.initialBalance)}, ставка {formatMoney(params.baseBet)}
            </p>
            {lastCalculatedAt && !loading && (
              <p className="mt-1 text-xs text-slate-500">
                Последний расчёт: {formatTime(lastCalculatedAt)}
              </p>
            )}
          </div>
          <button
            type="button"
            className="btn-primary inline-flex items-center gap-2"
            onClick={onRecalculate}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Пересчитываем…" : "Пересчитать моделирование"}
          </button>
        </div>

        {statusMessage && (
          <div className="mb-4 rounded-card border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {statusMessage}
          </div>
        )}

        {loading || !summary || !comparison ? (
          <div className="glass flex flex-col items-center justify-center gap-3 p-12 text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
            <p className="text-slate-600">Выполняется моделирование Монте-Карло…</p>
            <p className="text-xs text-slate-500">
              {MONTE_CARLO_PATHWAYS} сессий × {MONTE_CARLO_BETS} раундов × 4 игры
            </p>
          </div>
        ) : (
          <div key={calculationKey} className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Средний остаток"
                value={formatMoney(summary.avgFinal)}
                hint="сколько в среднем остаётся после всех виртуальных игр"
              />
              <StatCard
                title="Средний итог"
                value={formatProfit(summary.avgProfit)}
                valueClassName={summary.avgProfit >= 0 ? "text-pos" : "text-neg"}
                hint="прибыль или убыток от стартового баланса"
              />
              <StatCard
                title="Риск исчерпания"
                value={`${summary.avgBankruptcy.toFixed(1)}%`}
                valueClassName={summary.avgBankruptcy > 20 ? "text-neg" : ""}
                hint="доля сессий, где баланс ушёл в ноль"
              />
              <StatCard
                title="Самый рискованный модуль"
                value={MODULE_NAMES[summary.maxBankruptcy.mechanism]}
                hint={`исчерпание ${summary.maxBankruptcy.stats.bankruptcyRate.toFixed(1)}%`}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {comparison.map((row) => (
                <article key={row.mechanism} className="rounded-card border border-ozon-border bg-white p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: MODULE_COLORS[row.mechanism] }} />
                    <h4 className="text-sm font-bold text-slate-900">{MODULE_NAMES[row.mechanism]}</h4>
                  </div>
                  <p className="text-xs text-slate-500">{MECHANISMS[row.mechanism].label}</p>
                  <p className="mt-2 text-xs text-slate-500">Средний итог</p>
                  <p className={`text-sm font-bold ${row.stats.averageProfit >= 0 ? "text-pos" : "text-neg"}`}>
                    {formatProfit(row.stats.averageProfit)}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Исчерпание: {row.stats.bankruptcyRate.toFixed(1)}% · победы: {row.stats.winRate.toFixed(1)}%
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      <LiveMonteCarloChart
        key={`chart-${calculationKey}`}
        sessions={sessions}
        mcResult={null}
        monteCarloAverageBalances={monteCarloAverageBalances}
        startingBalance={params.initialBalance}
      />

      <section>
        <h3 className="heading-lg mb-1">Сравнение механизмов</h3>
        <p className="mb-5 text-sm text-slate-600">
          Таблица и диаграмма ниже построены тем же методом Монте-Карло — для наглядного сравнения четырёх типов случайности.
        </p>
        {loading || !comparison ? (
          <div className="glass p-12 text-center text-slate-500">Выполняется расчёт…</div>
        ) : (
          <div className="space-y-5">
            <MechanismSummaryTable data={comparison} />
            <MechanismCompare data={comparison} />
          </div>
        )}
      </section>
    </div>
  );
}
