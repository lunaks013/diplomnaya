import { useEffect, useMemo, useState } from "react";
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
        { id: "lcg", label: "Слот" },
        { id: "csprng", label: "Кости" },
        { id: "provablyFair", label: "Карты" },
        { id: "weightedWheel", label: "Рулетка" },
      ] satisfies Array<{ id: MechanismId; label: string }>,
    [],
  );

  const session = sessions[activeMechanism];
  const netProfit = session.balance - session.totalDeposited;
  const winRate = session.betsPlayed > 0 ? (session.wins / session.betsPlayed) * 100 : 0;
  const [betDraft, setBetDraft] = useState(() => String(params.baseBet));

  useEffect(() => {
    setBetDraft(String(params.baseBet));
  }, [params.baseBet]);

  const commitBet = () => {
    const parsed = Number.parseInt(betDraft.replace(/\s/g, ""), 10);
    if (!Number.isFinite(parsed) || betDraft.trim() === "") {
      setParams({ baseBet: 1 });
      setBetDraft("1");
      return;
    }
    const capped = Math.min(Math.max(1, parsed), Math.max(1, session.balance));
    setParams({ baseBet: capped });
    setBetDraft(String(capped));
  };

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
              type="text"
              inputMode="numeric"
              value={betDraft}
              onChange={(event) => setBetDraft(event.target.value.replace(/[^\d]/g, ""))}
              onBlur={commitBet}
              className="input-field w-28 text-center"
            />
          </label>
          <button
            type="button"
            disabled={isPlaying || session.balance <= 0}
            onClick={() => {
              commitBet();
              void playGame();
            }}
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
