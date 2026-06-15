/** Поведенческий сдвиг исхода: ранние раунды чаще выигрышные, крупные ставки — чаще проигрышные */

export interface SessionBiasInput {
  betsPlayed: number;
  bet: number;
  balance: number;
  initialBalance: number;
}

export function shouldFavorEarlyWin(input: SessionBiasInput): boolean {
  if (input.betsPlayed >= 6) return false;
  const chance = 0.78 - input.betsPlayed * 0.1;
  return Math.random() < Math.max(0.32, chance);
}

export function isLargeBet(input: SessionBiasInput): boolean {
  return (
    input.bet >= Math.max(120, input.initialBalance * 0.12) ||
    input.bet >= input.balance * 0.18
  );
}

export function shouldFavorLargeBetLoss(input: SessionBiasInput): boolean {
  if (!isLargeBet(input)) return false;
  const heavy = input.bet >= input.balance * 0.25 || input.bet >= 350;
  return Math.random() < (heavy ? 0.85 : 0.62);
}
