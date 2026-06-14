import { useMemo } from "react";
import { GamePlayArea } from "../components/games/GamePlayArea";
import { useTelemetry } from "../context/TelemetryContext";
import type { MechanismId } from "../types";

function formatMoney(n: number): string {
  return `${Math.round(n).toLocaleString("ru-RU")} ₽`;
}

export function GamesPage() {
  const {
    activeMechanism,
    setActiveMechanism,
    sessions,
    params,
    setParams,
    playGame,
    topUp,
    isPlaying,
  } = useTelemetry();

  const tabs = useMemo(
    () =>
      [
        { id: "lcg", label: "Рулетка" },
        { id: "csprng", label: "Кости" },
        { id: "provablyFair", label: "Карты" },
        { id: "weightedWheel", label: "Слот" },
      ] satisfies Array<{ id: MechanismId; label: string }>,
    [],
  );

  const session = sessions[activeMechanism];
  const netProfit = session.balance - session.totalDeposited;
  const winRate = session.betsPlayed > 0 ? (session.wins / session.betsPlayed) * 100 : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-[74px] md:px-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-ozon-text md:text-3xl">Программа</h1>
        <div className="text-right">
          <p className="text-xs text-ozon-muted">Баланс</p>
          <p className="text-2xl font-black text-ozon-text">{formatMoney(session.balance)}</p>
          <p className={`text-sm font-semibold ${netProfit >= 0 ? "text-pos" : "text-neg"}`}>
            {netProfit >= 0 ? "+" : "−"}
            {formatMoney(Math.abs(netProfit))}
          </p>
        </div>
      </div>

      <div className="tab-bar mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveMechanism(tab.id)}
            className={`tab-btn ${activeMechanism === tab.id ? "tab-btn-active" : "tab-btn-inactive"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="glass overflow-hidden">
        <div className="grid grid-cols-4 gap-2 border-b border-ozon-border bg-slate-50 px-4 py-3">
          {[
            { label: "Ставок", val: session.betsPlayed },
            { label: "Побед", val: session.wins },
            { label: "Проигрышей", val: session.losses },
            { label: "Винрейт", val: `${winRate.toFixed(0)}%` },
          ].map((item) => (
            <div key={item.label} className="game-hud-stat">
              <p className="text-[10px] uppercase tracking-wide text-ozon-muted">{item.label}</p>
              <p className="font-bold text-ozon-text">{item.val}</p>
            </div>
          ))}
        </div>

        <div className="p-4 md:p-6">
          <GamePlayArea
            mechanism={activeMechanism}
            lastResult={session.lastResult}
            lastRoundMeta={session.lastRoundMeta}
            crashTarget={params.crashTarget}
            isPlaying={isPlaying}
          />
        </div>

        <div className="flex flex-wrap items-end justify-center gap-3 border-t border-ozon-border bg-white px-4 py-5 md:px-6">
          <label>
            <span className="mb-1 block text-center text-xs font-medium text-ozon-muted">Ставка</span>
            <input
              type="number"
              min={1}
              value={params.baseBet}
              onChange={(event) => setParams({ baseBet: Math.max(1, Number(event.target.value) || 1) })}
              className="input-field w-28 text-center"
            />
          </label>
          <button
            type="button"
            disabled={isPlaying || session.balance <= 0}
            onClick={() => void playGame()}
            className="btn-primary game-play-btn disabled:opacity-40"
          >
            {isPlaying ? "…" : "Играть"}
          </button>
          <button type="button" onClick={topUp} className="btn-outline">
            +{params.initialBalance.toLocaleString("ru-RU")} ₽
          </button>
        </div>
      </section>
    </div>
  );
}
