import type {
  CustomGameRules,
  GameRoundResult,
  MechanismId,
  ProvablyFairState,
  TelemetryParams,
} from "../types";
import { computeStrategyBet, type StrategyState } from "./betting";
import { csprngNext, csprngTheoreticalWinRate, evaluateCrash, generateCrashPoint } from "./csprng";
import { evaluateLcgSlots, lcgNext, lcgTheoreticalWinRate, spinLcgReels } from "./lcg";
import { MECHANISMS } from "./mechanisms";
import {
  computeProvablyFairRoll,
  evaluateProvablyFairDice,
  generateClientSeed,
  generateServerSeed,
  hashServerSeed,
  provablyFairTheoreticalWinRate,
} from "./provablyFair";
import {
  computeWheelAngle,
  evaluateWheelSpin,
  isWheelNearMiss,
  pickWheelSector,
  WHEEL_SECTORS,
  weightedWheelTheoreticalWinRate,
} from "./weightedWheel";

export interface PlayContext {
  params: TelemetryParams;
  customRules: CustomGameRules;
  strategyState: StrategyState;
  provablyFair: ProvablyFairState;
}

let pfState: ProvablyFairState = {
  serverSeed: "",
  serverSeedHash: "",
  clientSeed: "",
  nonce: 0,
  revealed: false,
};

export async function initProvablyFairState(): Promise<ProvablyFairState> {
  const serverSeed = generateServerSeed();
  const serverSeedHash = await hashServerSeed(serverSeed);
  pfState = {
    serverSeed,
    serverSeedHash,
    clientSeed: generateClientSeed(),
    nonce: 0,
    revealed: false,
  };
  return { ...pfState };
}

export function getProvablyFairState(): ProvablyFairState {
  return { ...pfState };
}

export async function rotateProvablyFairSeeds(): Promise<ProvablyFairState> {
  return initProvablyFairState();
}

export function revealServerSeed(): ProvablyFairState {
  pfState = { ...pfState, revealed: true };
  return { ...pfState };
}

export function getTheoreticalWinRate(
  mechanism: MechanismId,
  params: TelemetryParams,
  customRules: CustomGameRules,
): number {
  const base =
    mechanism === "lcg"
      ? lcgTheoreticalWinRate()
      : mechanism === "csprng"
        ? csprngTheoreticalWinRate(params.crashTarget)
        : mechanism === "weightedWheel"
          ? weightedWheelTheoreticalWinRate()
          : provablyFairTheoreticalWinRate(customRules.winThreshold);

  if (customRules.modified) {
    return Math.min(99, base * (customRules.payoutMultiplier / 2));
  }
  return base;
}

export function getHouseEdge(mechanism: MechanismId): number {
  return MECHANISMS[mechanism].houseEdge;
}

export async function playRound(
  mechanism: MechanismId,
  ctx: PlayContext & { balance: number },
): Promise<GameRoundResult> {
  const bet = computeStrategyBet(
    ctx.params.strategy,
    ctx.params.baseBet,
    ctx.balance,
    ctx.strategyState,
  );

  switch (mechanism) {
    case "lcg":
      return playLcgSlots(bet, ctx.customRules);
    case "csprng":
      return playCrash(bet, ctx.params.crashTarget);
    case "weightedWheel":
      return playWheel(bet, ctx.customRules);
    case "provablyFair":
      return playProvablyFairDice(bet, ctx.customRules, ctx.provablyFair);
  }
}

export async function playRoundWithBalance(
  mechanism: MechanismId,
  balance: number,
  ctx: Omit<PlayContext, "strategyState"> & { strategyState: StrategyState },
): Promise<{ result: GameRoundResult; bet: number }> {
  const bet = computeStrategyBet(ctx.params.strategy, ctx.params.baseBet, balance, ctx.strategyState);
  if (bet <= 0 || balance < bet) {
    return {
      bet: 0,
      result: { won: false, payout: 0, netChange: 0, message: "Недостаточно средств" },
    };
  }

  const result = await playRound(mechanism, { ...ctx, balance });
  return { result, bet };
}

function playLcgSlots(bet: number, rules: CustomGameRules): GameRoundResult {
  const reels = spinLcgReels(lcgNext);
  const evalResult = evaluateLcgSlots(reels, bet, rules.payoutMultiplier);

  if (evalResult.won) {
    return {
      won: true,
      payout: evalResult.payout,
      netChange: evalResult.payout,
      message: `Выпала комбинация: ${reels.join(" | ")}. Исход положительный, прибыль ${evalResult.payout} ₽.`,
      nearMiss: evalResult.nearMiss,
      metadata: { reels: reels.join(","), mechanism: "lcg" },
    };
  }

  return {
    won: false,
    payout: 0,
    netChange: -bet,
    message: evalResult.nearMiss
      ? `Выпала комбинация: ${reels.join(" | ")}. Почти выигрыш, но ставка потеряна: ${bet} ₽.`
      : `Выпала комбинация: ${reels.join(" | ")}. Исход отрицательный, потеря ${bet} ₽.`,
    nearMiss: evalResult.nearMiss,
    metadata: { reels: reels.join(","), mechanism: "lcg" },
  };
}

function playCrash(bet: number, cashoutTarget: number): GameRoundResult {
  const crashPoint = generateCrashPoint(csprngNext);
  const outcome = evaluateCrash(crashPoint, cashoutTarget, bet);

  if (outcome.won) {
    return {
      won: true,
      payout: outcome.payout,
      netChange: outcome.payout,
      message: `Случайное значение оказалось выше выбранного порога. Исход положительный, прибыль ${outcome.payout} ₽.`,
      metadata: { crashPoint, cashoutTarget, mechanism: "csprng" },
    };
  }

  return {
    won: false,
    payout: 0,
    netChange: -bet,
    message: `Случайное значение оказалось ниже выбранного порога. Исход отрицательный, потеря ${bet} ₽.`,
    nearMiss: crashPoint >= cashoutTarget * 0.85 && crashPoint < cashoutTarget,
    metadata: { crashPoint, cashoutTarget, mechanism: "csprng" },
  };
}

function playWheel(bet: number, rules: CustomGameRules): GameRoundResult {
  const rng = csprngNext;
  const sector = pickWheelSector(rng);
  const sectorIndex = WHEEL_SECTORS.findIndex((s) => s.id === sector.id);
  const nearMiss = isWheelNearMiss(sector, rng);
  const angle = computeWheelAngle(sectorIndex, rng);
  const outcome = evaluateWheelSpin(sector, bet, nearMiss, rules.payoutMultiplier);

  if (outcome.won) {
    return {
      won: true,
      payout: outcome.payout,
      netChange: outcome.netChange,
      message: `Выбран сектор «${sector.label}». Исход положительный, прибыль ${outcome.payout} ₽.`,
      nearMiss,
      metadata: { sector: sector.label, angle, mechanism: "weightedWheel" },
    };
  }

  return {
    won: false,
    payout: 0,
    netChange: outcome.netChange,
    message: nearMiss
      ? `Выбран сектор «${sector.label}». Почти выигрыш, но итог отрицательный: потеря ${Math.abs(outcome.netChange)} ₽.`
      : `Выбран сектор «${sector.label}». Исход отрицательный, потеря ${Math.abs(outcome.netChange)} ₽.`,
    nearMiss,
    metadata: { sector: sector.label, angle, mechanism: "weightedWheel" },
  };
}

async function playProvablyFairDice(
  bet: number,
  rules: CustomGameRules,
  pf: ProvablyFairState,
): Promise<GameRoundResult> {
  const { roll, hash } = await computeProvablyFairRoll(pf.serverSeed, pf.clientSeed, pf.nonce);
  pfState = { ...pfState, nonce: pf.nonce + 1 };

  const outcome = evaluateProvablyFairDice(roll, bet, rules.winThreshold, rules.payoutMultiplier);

  if (outcome.won) {
    return {
      won: true,
      payout: outcome.payout,
      netChange: outcome.netChange,
      message: `Проверяемый алгоритм дал положительный исход. Прибыль ${outcome.payout} ₽.`,
      metadata: { roll, hash: hash.slice(0, 16), nonce: pf.nonce, mechanism: "provablyFair" },
    };
  }

  return {
    won: false,
    payout: 0,
    netChange: -bet,
    message: `Проверяемый алгоритм дал отрицательный исход. Потеря ${bet} ₽.`,
    metadata: { roll, hash: hash.slice(0, 16), nonce: pf.nonce, mechanism: "provablyFair" },
  };
}

export function simulateWin(
  mechanism: MechanismId,
  random: () => number,
  params: TelemetryParams,
  rules: CustomGameRules,
): boolean {
  switch (mechanism) {
    case "lcg": {
      const reels = spinLcgReels(random);
      return evaluateLcgSlots(reels, 100, rules.payoutMultiplier).won;
    }
    case "csprng": {
      const crash = generateCrashPoint(random);
      return crash >= params.crashTarget;
    }
    case "weightedWheel": {
      const sector = pickWheelSector(random);
      const nearMiss = isWheelNearMiss(sector, random);
      const outcome = evaluateWheelSpin(sector, 100, nearMiss, rules.payoutMultiplier);
      return outcome.won;
    }
    case "provablyFair": {
      const combined = `${random()}${random()}${Date.now()}`;
      let hash = 0;
      for (let i = 0; i < combined.length; i++) {
        hash = (hash * 31 + combined.charCodeAt(i)) >>> 0;
      }
      const roll = hash % 100;
      return roll >= rules.winThreshold;
    }
  }
}

export { initProvablyFairState as bootstrapProvablyFair };
