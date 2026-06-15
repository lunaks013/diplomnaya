import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { WHEEL_SECTORS } from "../../math/weightedWheel";
import { SectorWheel } from "./SectorWheel";
import type { MechanismId } from "../../types";

type RoundMeta = Record<string, string | number | boolean> | null;

const SYMBOL_META: Record<string, { emoji: string; label: string; color: string }> = {
  "7": { emoji: "7", label: "Семёрка", color: "#ef4444" },
  BAR: { emoji: "▬", label: "Бар", color: "#2563eb" },
  CH: { emoji: "🍒", label: "Вишня", color: "#dc2626" },
  LM: { emoji: "🍋", label: "Лимон", color: "#eab308" },
  OR: { emoji: "🍊", label: "Апельсин", color: "#f97316" },
  GR: { emoji: "🍇", label: "Виноград", color: "#7c3aed" },
  BL: { emoji: "🔔", label: "Колокол", color: "#ca8a04" },
  DI: { emoji: "💎", label: "Алмаз", color: "#0891b2" },
};

const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"] as const;
const SUITS = ["♠", "♥", "♦", "♣"] as const;

const DIE_PIPS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

function getResultTone(lastResult: string | null): "waiting" | "win" | "near" | "loss" {
  if (!lastResult) return "waiting";
  if (lastResult.includes("положительный") || lastResult.includes("прибыль")) return "win";
  if (lastResult.toLowerCase().includes("near") || lastResult.includes("Почти")) return "near";
  return "loss";
}

function parseReels(lastResult: string | null, meta: RoundMeta): string[] {
  const fromMeta = meta?.reels;
  if (typeof fromMeta === "string" && fromMeta.length > 0) {
    return fromMeta.split(",").map((item) => item.trim()).slice(0, 3);
  }
  const match = lastResult?.match(/комбинация:\s*([^.]*)/i);
  if (!match) return ["?", "?", "?"];
  return match[1].split("|").map((item) => item.trim()).slice(0, 3);
}

function shortResult(lastResult: string | null): string {
  if (!lastResult) return "Сделайте ставку и нажмите «Играть»";
  const tone = getResultTone(lastResult);
  if (tone === "win") {
    const profit = lastResult.match(/прибыль\s+(\d+)/i)?.[1];
    return profit ? `Выигрыш +${profit} ₽` : "Выигрыш";
  }
  if (tone === "near") {
    const loss = lastResult.match(/потеряна:\s*(\d+)/i)?.[1];
    return loss ? `Почти! Потеря ${loss} ₽` : "Почти выиграли";
  }
  const loss = lastResult.match(/потеря\s+(\d+)/i)?.[1];
  return loss ? `Проигрыш −${loss} ₽` : "Проигрыш";
}

function indexToCard(index: number): { rank: string; suit: string } {
  const safe = ((index % 52) + 52) % 52;
  return { rank: RANKS[safe % 13], suit: SUITS[Math.floor(safe / 13)] };
}

function crashToDice(crashPoint: number): [number, number] {
  const d1 = (Math.floor(crashPoint * 11) % 6) + 1;
  const d2 = (Math.floor(crashPoint * 17) % 6) + 1;
  return [d1, d2];
}

function randomDice(): [number, number] {
  return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
}

function randomCards(): [{ rank: string; suit: string }, { rank: string; suit: string }] {
  return [indexToCard(Math.floor(Math.random() * 52)), indexToCard(Math.floor(Math.random() * 52))];
}

function useSpinningValues<T>(isPlaying: boolean, settled: T, randomize: () => T): T {
  const [value, setValue] = useState<T>(settled);

  useEffect(() => {
    if (!isPlaying) {
      setValue(settled);
      return;
    }

    setValue(randomize());
    const timer = window.setInterval(() => setValue(randomize()), 90);
    return () => window.clearInterval(timer);
  }, [isPlaying, settled, randomize]);

  return isPlaying ? value : settled;
}

function ModuleTitle({ children }: { children: string }) {
  return (
    <div className="game-module-title">
      <span className="game-module-line" />
      <span>{children}</span>
      <span className="game-module-line" />
    </div>
  );
}

function DataReadout({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <div className="game-readout">
      {items.map((item) => (
        <div key={item.label} className="game-readout-item">
          <span className="game-readout-label">{item.label}</span>
          <span className="game-readout-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function DieFace({ value }: { value: number }) {
  const pips = DIE_PIPS[value] ?? DIE_PIPS[1];
  return (
    <div className="game-die-pro">
      <div className="game-die-grid">
        {Array.from({ length: 9 }, (_, i) => {
          const row = Math.floor(i / 3);
          const col = i % 3;
          const active = pips.some(([r, c]) => r === row && c === col);
          return <span key={i} className={`game-die-pip ${active ? "game-die-pip-on" : ""}`} />;
        })}
      </div>
    </div>
  );
}

function PlayingCard({
  rank,
  suit,
  faceDown,
  delay = 0,
}: {
  rank: string;
  suit: string;
  faceDown: boolean;
  delay?: number;
}) {
  const isRed = suit === "♥" || suit === "♦";

  return (
    <motion.div
      className="game-card-pro"
      initial={false}
      animate={{ rotateY: faceDown ? 180 : 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="game-card-face game-card-back-face" style={{ transform: "rotateY(180deg)" }}>
        <div className="game-card-pattern" />
        <span className="game-card-back-mark">✦</span>
      </div>
      <div className="game-card-face game-card-front-face">
        <div className={`game-card-corner ${isRed ? "text-red-600" : "text-slate-900"}`}>
          <span>{rank}</span>
          <span>{suit}</span>
        </div>
        <span className={`game-card-suit ${isRed ? "text-red-600" : "text-slate-900"}`}>{suit}</span>
        <div className={`game-card-corner game-card-corner-bl ${isRed ? "text-red-600" : "text-slate-900"}`}>
          <span>{rank}</span>
          <span>{suit}</span>
        </div>
      </div>
    </motion.div>
  );
}

function OutcomeBadge({ tone, isPlaying }: { tone: "waiting" | "win" | "near" | "loss"; isPlaying: boolean }) {
  if (isPlaying) return <span className="game-status game-status-play">Генерация исхода…</span>;
  if (tone === "waiting") return <span className="game-status game-status-wait">Готов к раунду</span>;
  if (tone === "win") return <span className="game-status game-status-win">Положительный исход</span>;
  if (tone === "near") return <span className="game-status game-status-near">Почти выигрыш</span>;
  return <span className="game-status game-status-loss">Отрицательный исход</span>;
}

function SlotReelsGame({
  lastResult,
  lastRoundMeta,
  isPlaying,
}: {
  lastResult: string | null;
  lastRoundMeta: RoundMeta;
  isPlaying: boolean;
}) {
  const reels = parseReels(lastResult, lastRoundMeta);
  const tone = getResultTone(lastResult);

  return (
    <div className="game-panel">
      <ModuleTitle>Слот</ModuleTitle>
      <div className="roulette-cabinet">
        <div className="roulette-cabinet-top" />
        <div className="roulette-window-row">
          {reels.map((symbol, index) => {
            const meta = SYMBOL_META[symbol];
            return (
              <motion.div
                key={`${symbol}-${index}`}
                className="roulette-window"
                animate={isPlaying ? { y: [0, -6, 0] } : { y: 0 }}
                transition={isPlaying ? { repeat: Infinity, duration: 0.26, delay: index * 0.07 } : { duration: 0.3 }}
              >
                <div className="roulette-window-inner">
                  {isPlaying ? (
                    <span className="roulette-symbol roulette-symbol-wait">•••</span>
                  ) : meta ? (
                    <>
                      <span className="roulette-symbol" style={{ color: meta.color }}>
                        {meta.emoji === "▬" ? "BAR" : meta.emoji}
                      </span>
                      <span className="roulette-caption">{meta.label}</span>
                    </>
                  ) : (
                    <span className="roulette-symbol roulette-symbol-wait">?</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="roulette-cabinet-base" />
      </div>
      <OutcomeBadge tone={tone} isPlaying={isPlaying} />
    </div>
  );
}

function DiceGame({
  lastResult,
  lastRoundMeta,
  crashTarget,
  isPlaying,
}: {
  lastResult: string | null;
  lastRoundMeta: RoundMeta;
  crashTarget: number;
  isPlaying: boolean;
}) {
  const tone = getResultTone(lastResult);
  const crashPoint = typeof lastRoundMeta?.crashPoint === "number" ? lastRoundMeta.crashPoint : null;

  const settledDice = useMemo<[number, number]>(() => {
    const d1 = lastRoundMeta?.die1;
    const d2 = lastRoundMeta?.die2;
    if (typeof d1 === "number" && typeof d2 === "number") return [d1, d2];
    if (crashPoint != null) return crashToDice(crashPoint);
    return [1, 1];
  }, [lastRoundMeta, crashPoint]);

  const displayDice = useSpinningValues(isPlaying, settledDice, randomDice);

  return (
    <div className="game-panel">
      <ModuleTitle>Кости</ModuleTitle>
      <div className="flex items-center justify-center gap-8 py-2">
        {displayDice.map((value, index) => (
          <motion.div
            key={index}
            animate={
              isPlaying
                ? { rotate: [0, 18, -12, 0], y: [0, -10, 0] }
                : { rotate: 0, y: 0, scale: [1, 1.04, 1] }
            }
            transition={
              isPlaying
                ? { repeat: Infinity, duration: 0.45, delay: index * 0.1 }
                : { duration: 0.35, delay: index * 0.08 }
            }
          >
            <DieFace value={value} />
          </motion.div>
        ))}
      </div>
      <DataReadout
        items={[
          { label: "Случайное значение", value: crashPoint != null ? crashPoint.toFixed(2) : "—" },
          { label: "Порог исхода", value: crashTarget.toFixed(2) },
          { label: "Сумма костей", value: String(displayDice[0] + displayDice[1]) },
        ]}
      />
      <OutcomeBadge tone={tone} isPlaying={isPlaying} />
    </div>
  );
}

function CardsGame({
  lastResult,
  lastRoundMeta,
  isPlaying,
}: {
  lastResult: string | null;
  lastRoundMeta: RoundMeta;
  isPlaying: boolean;
}) {
  const tone = getResultTone(lastResult);
  const roll = typeof lastRoundMeta?.roll === "number" ? lastRoundMeta.roll : null;
  const nonce = typeof lastRoundMeta?.nonce === "number" ? lastRoundMeta.nonce : 0;

  const settledCards = useMemo(() => {
    const c1 = lastRoundMeta?.card1;
    const c2 = lastRoundMeta?.card2;
    if (typeof c1 === "number" && typeof c2 === "number") {
      return [indexToCard(c1), indexToCard(c2)] as const;
    }
    if (roll == null) return [indexToCard(0), indexToCard(13)] as const;
    return [indexToCard(roll), indexToCard(roll * 5 + nonce * 7)] as const;
  }, [roll, nonce, lastRoundMeta]);

  const displayCards = useSpinningValues(isPlaying, settledCards, randomCards);

  return (
    <div className="game-panel">
      <ModuleTitle>Карты</ModuleTitle>
      <div className="flex items-center justify-center gap-5 py-2">
        {displayCards.map((card, index) => (
          <PlayingCard
            key={`${card.rank}-${card.suit}-${index}`}
            rank={card.rank}
            suit={card.suit}
            faceDown={isPlaying}
            delay={index * 0.08}
          />
        ))}
      </div>
      <DataReadout
        items={[
          { label: "Число исхода", value: roll != null ? String(roll) : "—" },
          { label: "Попытка", value: nonce > 0 ? String(nonce) : "—" },
          {
            label: "Комбинация",
            value: isPlaying ? "…" : `${displayCards[0].rank}${displayCards[0].suit} · ${displayCards[1].rank}${displayCards[1].suit}`,
          },
        ]}
      />
      <OutcomeBadge tone={tone} isPlaying={isPlaying} />
    </div>
  );
}

function RouletteWheelGame({
  lastResult,
  lastRoundMeta,
  isPlaying,
}: {
  lastResult: string | null;
  lastRoundMeta: RoundMeta;
  isPlaying: boolean;
}) {
  const tone = getResultTone(lastResult);
  const sector = typeof lastRoundMeta?.sector === "string" ? lastRoundMeta.sector : "—";
  const angle = typeof lastRoundMeta?.angle === "number" ? lastRoundMeta.angle : 0;
  const sectorIndex = Math.max(0, WHEEL_SECTORS.findIndex((s) => s.label === sector));

  const neighbors = useMemo(() => {
    if (sector === "—") return { left: "—", right: "—" };
    const left = WHEEL_SECTORS[(sectorIndex + WHEEL_SECTORS.length - 1) % WHEEL_SECTORS.length].label;
    const right = WHEEL_SECTORS[(sectorIndex + 1) % WHEEL_SECTORS.length].label;
    return { left, right };
  }, [sector, sectorIndex]);

  return (
    <div className="game-panel">
      <ModuleTitle>Рулетка</ModuleTitle>
      <div className="slot-cabinet">
        <SectorWheel sectors={WHEEL_SECTORS} rotation={angle} spinning={isPlaying} activeLabel={sector} />
        <div className="slot-sector-strip">
          <div className={`slot-sector-cell ${tone === "near" ? "slot-sector-cell-near" : ""}`}>
            <span className="slot-sector-cell-label">слева</span>
            <span className="slot-sector-cell-value">{isPlaying ? "…" : neighbors.left}</span>
          </div>
          <div className="slot-sector-cell slot-sector-cell-active">
            <span className="slot-sector-cell-label">результат</span>
            <span className="slot-sector-cell-value">{isPlaying ? "…" : sector}</span>
          </div>
          <div className={`slot-sector-cell ${tone === "near" ? "slot-sector-cell-near" : ""}`}>
            <span className="slot-sector-cell-label">справа</span>
            <span className="slot-sector-cell-value">{isPlaying ? "…" : tone === "near" ? "—" : neighbors.right}</span>
          </div>
        </div>
      </div>
      <DataReadout
        items={[
          { label: "Выбранный сектор", value: sector },
          { label: "Угол остановки", value: angle ? `${Math.round(angle)}°` : "—" },
        ]}
      />
      <OutcomeBadge tone={tone} isPlaying={isPlaying} />
    </div>
  );
}

export function GamePlayArea({
  mechanism,
  lastResult,
  lastRoundMeta,
  crashTarget,
  isPlaying,
}: {
  mechanism: MechanismId;
  lastResult: string | null;
  lastRoundMeta: RoundMeta;
  crashTarget: number;
  isPlaying: boolean;
}) {
  return (
    <div className="game-stage">
      <div className="game-stage-grid" />
      {mechanism === "lcg" && (
        <SlotReelsGame lastResult={lastResult} lastRoundMeta={lastRoundMeta} isPlaying={isPlaying} />
      )}
      {mechanism === "csprng" && (
        <DiceGame
          lastResult={lastResult}
          lastRoundMeta={lastRoundMeta}
          crashTarget={crashTarget}
          isPlaying={isPlaying}
        />
      )}
      {mechanism === "provablyFair" && (
        <CardsGame lastResult={lastResult} lastRoundMeta={lastRoundMeta} isPlaying={isPlaying} />
      )}
      {mechanism === "weightedWheel" && (
        <RouletteWheelGame lastResult={lastResult} lastRoundMeta={lastRoundMeta} isPlaying={isPlaying} />
      )}
      <p className="game-result-line">{shortResult(lastResult)}</p>
    </div>
  );
}
