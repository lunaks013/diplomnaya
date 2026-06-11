import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AcademicFigure } from "../components/AcademicFigure";
import { MechanismCompare } from "../components/MechanismCompare";
import { PageHeader } from "../components/PageHeader";
import { IMAGES } from "../lib/images";
import { PsychLog } from "../components/lab/PsychLog";
import { StatCard } from "../components/StatCard";
import { useTelemetry, MONTE_CARLO_PATHWAYS } from "../context/TelemetryContext";
import { compareAllMechanisms } from "../math/monteCarlo";
import { ALL_MECHANISM_IDS, MECHANISMS } from "../math/mechanisms";
import type { MechanismComparison } from "../math/monteCarlo";
import type { MechanismId } from "../types";

function formatMoney(n: number): string {
  return n.toLocaleString("ru-RU", { maximumFractionDigits: 0 }) + " ₽";
}

function formatProfit(n: number): string {
  const sign = n >= 0 ? "+" : "−";
  return sign + formatMoney(Math.abs(n)).replace(" ₽", "") + " ₽";
}

const MODULE_NAMES: Record<MechanismId, string> = {
  lcg: "Рулетка",
  csprng: "Кости",
  provablyFair: "Карты",
  weightedWheel: "Слот",
};

export function ResultsPage() {
  const { params, mcResult, activeMechanism, sessions, customRules } = useTelemetry();
  const [comparison, setComparison] = useState<MechanismComparison[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => {
      setComparison(compareAllMechanisms(params, customRules));
      setLoading(false);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [params, customRules]);

  const stats = mcResult?.stats;
  const info = MECHANISMS[activeMechanism];

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
        description="Сравнительная таблица по четырём механизмам RNG. Независимо от алгоритма средний профит остаётся отрицательным."
      />

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
          Эти данные обновляются после обычной игры в разделах «Рулетка», «Кости», «Карты» и «Слот».
        </p>

        {!hasGameplay && (
          <div className="glass mb-5 p-6 text-center">
            <p className="text-sm text-slate-600">
              Пока нет сыгранных ставок. Перейдите в программу, сыграйте хотя бы один раз в любом модуле,
              и здесь появится фактическая сводка.
            </p>
            <Link to="/games" className="btn-primary mt-4 inline-flex">
              Открыть программу
            </Link>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {sessionRows.map((row) => (
            <article key={row.id} className="glass p-5">
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
            </article>
          ))}
        </div>
      </section>

      {mcResult ? (
        <>
          <p className="mb-4 text-sm text-slate-600">
            Последний расчёт: <strong className="text-slate-900">{info.gameShell}</strong> ({info.label})
          </p>
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Средний остаток"
              value={formatMoney(stats!.averageFinalBalance)}
              hint={`старт ${formatMoney(params.initialBalance)}`}
            />
            <StatCard
              title="Средний Δ"
              value={formatProfit(stats!.averageProfit)}
              valueClassName={stats!.averageProfit >= 0 ? "text-pos" : "text-neg"}
            />
            <StatCard
              title="Исчерпание капитала"
              value={`${stats!.bankruptcyRate.toFixed(1)}%`}
              valueClassName={stats!.bankruptcyRate > 20 ? "text-neg" : ""}
            />
            <StatCard
              title="Доля положит. исходов"
              value={`${stats!.winRate.toFixed(1)}%`}
              hint={`теория ${stats!.theoreticalWinRate.toFixed(1)}%`}
            />
          </div>
        </>
      ) : (
        <div className="glass mb-10 p-10 text-center">
          <p className="text-slate-600">Расчёт Монте-Карло ещё не выполнялся.</p>
          <Link to="/games" className="btn-primary mt-4 inline-flex">
            Открыть программу
          </Link>
        </div>
      )}

      <AcademicFigure
        src={IMAGES.analytics}
        alt="Сводная визуализация результатов моделирования"
        caption="Рис. 1 — Сравнительный анализ траекторий капитала по механизмам RNG"
        className="mb-8"
      />

      <section className="mb-10">
        <h2 className="heading-lg mb-1">Сравнение механизмов</h2>
        <p className="mb-5 text-sm text-slate-600">
          Капитал {formatMoney(params.initialBalance)} · ставка {formatMoney(params.baseBet)} ·{" "}
          {MONTE_CARLO_PATHWAYS} траекторий Монте-Карло
        </p>
        {loading || !comparison ? (
          <div className="glass p-12 text-center text-slate-500">Выполняется расчёт…</div>
        ) : (
          <MechanismCompare data={comparison} />
        )}
      </section>

      {comparison && (
        <div className="glass mb-10 overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Механизм</th>
                <th>Модуль</th>
                <th className="text-right">Edge</th>
                <th className="text-right">Средний Δ</th>
                <th className="hidden text-right sm:table-cell">Исчерпание</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => {
                const m = MECHANISMS[row.mechanism];
                return (
                  <tr key={row.mechanism}>
                    <td className="font-medium text-slate-900">{row.label}</td>
                    <td className="text-slate-600">{row.gameShell}</td>
                    <td className="text-right text-neg">−{m.houseEdge}%</td>
                    <td
                      className={`text-right font-medium ${row.stats.averageProfit >= 0 ? "text-pos" : "text-neg"}`}
                    >
                      {formatProfit(row.stats.averageProfit)}
                    </td>
                    <td className="hidden text-right text-slate-600 sm:table-cell">
                      {row.stats.bankruptcyRate.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <PsychLog />

      <div className="mt-8 flex gap-4">
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
