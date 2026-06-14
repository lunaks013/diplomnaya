# Ключевые листинги кода для дипломной работы

Файл содержит 5 наиболее важных фрагментов кода проекта. Эти листинги можно вставлять в дипломный документ как техническое подтверждение реализации программного комплекса.

Каждый листинг сопровождается кратким пояснением: зачем он нужен и какую часть проекта демонстрирует.

## Листинг 1. Обработка одного игрового раунда и сбор телеметрии

**Файл:** `src/context/TelemetryContext.tsx`  
**Назначение:** центральная логика практической части. Функция запускает один раунд, обновляет баланс, количество ставок, победы, проигрыши, траекторию капитала и журнал поведенческих событий.

```tsx
const playGame = useCallback(async () => {
  if (isPlaying) return;

  const mechanism = activeMechanism;
  const current = sessions[mechanism];
  if (current.balance <= 0) return;

  setIsPlaying(true);

  try {
    const strategyState = {
      consecutiveLosses: current.consecutiveLosses,
      consecutiveWins: current.consecutiveWins,
      lastBet: current.lastBet,
    };

    const { result, bet } = await playRoundWithBalance(mechanism, current.balance, {
      params,
      customRules,
      strategyState,
      provablyFair: getProvablyFairState(),
    });

    if (bet <= 0) return;

    const s = { ...current };
    s.betsPlayed += 1;
    s.lastBet = bet;
    s.lastResult = result.message;
    s.balance = Math.max(0, s.balance + result.netChange);
    s.houseAbsorbed += result.netChange < 0 ? Math.abs(result.netChange) : 0;
    s.pathway = [...s.pathway, s.balance];

    if (result.won) {
      s.wins += 1;
      s.consecutiveWins += 1;
      s.consecutiveLosses = 0;
      s.currentStreak += 1;
      if (s.currentStreak > s.maxWinStreak) {
        s.maxWinStreak = s.currentStreak;
      }
    } else {
      s.losses += 1;
      s.consecutiveLosses += 1;
      s.consecutiveWins = 0;
      s.currentStreak = 0;
    }

    if (s.pathway.length > 200) {
      s.pathway = s.pathway.slice(-200);
    }

    setSessions((prev) => ({ ...prev, [mechanism]: s }));

    const roundEvents = analyzeAfterRound(mechanism, params, s, {
      won: result.won,
      nearMiss: result.nearMiss,
      payout: result.payout,
      bet,
    });

    addPsychEvents(roundEvents);

    if (s.balance <= 0) {
      setShowBankruptcyAlert(true);
      archiveSession(mechanism, s);
    }

    setProvablyFair(getProvablyFairState());
  } finally {
    setIsPlaying(false);
  }
}, [
  activeMechanism,
  addPsychEvents,
  archiveSession,
  customRules,
  isPlaying,
  params,
  sessions,
]);
```

**Почему листинг важен:**  
Этот фрагмент показывает, что проект не просто отображает интерфейс, а реально ведёт состояние экспериментальной сессии. Здесь фиксируются основные данные для раздела «Итоги»: ставки, баланс, победы, проигрыши, серии исходов и поведенческие события.

## Листинг 2. Диспетчер четырёх механизмов генерации случайных исходов

**Файл:** `src/math/engine.ts`  
**Назначение:** выбор математического механизма в зависимости от активной вкладки: LCG, CSPRNG, Weighted RNG или Provably Fair.

```ts
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
  const bet = computeStrategyBet(
    ctx.params.strategy,
    ctx.params.baseBet,
    balance,
    ctx.strategyState,
  );

  if (bet <= 0 || balance < bet) {
    return {
      bet: 0,
      result: {
        won: false,
        payout: 0,
        netChange: 0,
        message: "Недостаточно средств",
      },
    };
  }

  const result = await playRound(mechanism, { ...ctx, balance });
  return { result, bet };
}
```

**Почему листинг важен:**  
Этот код демонстрирует архитектурное разделение проекта: интерфейс не знает деталей конкретного RNG-механизма. Он передаёт выбранный `mechanism`, а игровой движок сам выбирает нужную математическую модель.

## Листинг 3. Реализация Provably Fair на основе SHA-256

**Файл:** `src/math/provablyFair.ts`  
**Назначение:** демонстрация проверяемого криптографического исхода через `serverSeed`, `clientSeed` и `nonce`.

```ts
export async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function generateServerSeed(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function generateClientSeed(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function computeProvablyFairRoll(
  serverSeed: string,
  clientSeed: string,
  nonce: number,
): Promise<{ roll: number; hash: string; rawHex: string }> {
  const combined = `${serverSeed}:${clientSeed}:${nonce}`;
  const hash = await sha256(combined);
  const rawHex = hash.slice(0, 8);
  const roll = parseInt(rawHex, 16) % 100;

  return { roll, hash, rawHex };
}

export function evaluateProvablyFairDice(
  roll: number,
  bet: number,
  threshold: number,
  payoutMultiplier = 1,
): { won: boolean; payout: number; netChange: number } {
  const winProbability = (100 - threshold) / 100;
  const fairPayout = 1 / winProbability;
  const adjustedPayout = fairPayout * 0.96 * payoutMultiplier;

  if (roll >= threshold) {
    const gross = Math.floor(bet * adjustedPayout);
    const net = gross - bet;
    return { won: true, payout: Math.max(0, net), netChange: net };
  }

  return { won: false, payout: 0, netChange: -bet };
}
```

**Почему листинг важен:**  
Он показывает наиболее технически сильную часть проекта: криптографически проверяемый исход. Даже при прозрачном SHA-256-механизме итоговое математическое ожидание остаётся отрицательным из-за коэффициента `0.96`.

## Листинг 4. Моделирование методом Монте-Карло

**Файл:** `src/math/monteCarlo.ts`  
**Назначение:** запуск серии независимых траекторий капитала и расчёт статистических показателей.

```ts
function runSinglePathway(
  mechanism: MechanismId,
  params: TelemetryParams,
  rules: CustomGameRules,
  random: () => number,
  bets: number,
): SimulationRun {
  let balance = params.initialBalance;
  const balances: number[] = [balance];
  let peak = balance;
  let maxDrawdown = 0;
  let wins = 0;
  let betsPlayed = 0;

  const strategyState: StrategyState = {
    consecutiveLosses: 0,
    consecutiveWins: 0,
    lastBet: 0,
  };

  for (let i = 0; i < bets; i++) {
    if (balance <= 0) {
      balances.push(0);
      break;
    }

    const bet = computeStrategyBet(
      params.strategy,
      params.baseBet,
      balance,
      strategyState,
    );

    if (bet <= 0) {
      balances.push(balance);
      break;
    }

    betsPlayed += 1;
    const won = simulateWin(mechanism, random, params, rules);

    if (won) {
      balance += bet;
      wins += 1;
      strategyState.consecutiveWins += 1;
      strategyState.consecutiveLosses = 0;
    } else {
      balance -= bet;
      strategyState.consecutiveLosses += 1;
      strategyState.consecutiveWins = 0;
    }

    strategyState.lastBet = bet;

    if (balance > peak) peak = balance;
    const drawdown = peak > 0 ? (peak - balance) / peak : 0;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;

    balances.push(Math.max(0, balance));
    if (balance <= 0) break;
  }

  while (balances.length < bets + 1) {
    balances.push(Math.max(0, balance));
  }

  return {
    balances,
    bankrupt: balance <= 0,
    maxDrawdown,
    wins,
    betsPlayed,
  };
}

export function runMonteCarlo(
  mechanism: MechanismId,
  params: TelemetryParams,
  rules: CustomGameRules,
  pathways = MONTE_CARLO_PATHWAYS,
  bets = MONTE_CARLO_BETS,
): SimulationResult {
  const random = getRandomFor(mechanism);
  const runs: SimulationRun[] = [];

  for (let i = 0; i < pathways; i++) {
    runs.push(runSinglePathway(mechanism, params, rules, random, bets));
  }

  const pathLength = bets + 1;

  return {
    runs,
    averageBalances: computeAverageBalances(runs, pathLength),
    stats: aggregateStats(runs, params, mechanism, rules),
  };
}
```

**Почему листинг важен:**  
Этот код показывает научную часть проекта. Одна пользовательская игра может дать случайный результат, а Монте-Карло позволяет увидеть статистическую тенденцию на множестве траекторий.

## Листинг 5. Поведенческий анализ после игрового раунда

**Файл:** `src/math/psychAnalyzer.ts`  
**Назначение:** автоматическое выявление поведенческих маркеров: near-miss, крупный выигрыш, серия проигрышей, ловушка Мартингейла и другие события.

```ts
export function analyzeAfterRound(
  mechanism: MechanismId,
  params: TelemetryParams,
  session: {
    consecutiveLosses: number;
    consecutiveWins: number;
    wins: number;
    losses: number;
    topUpCount: number;
    balance: number;
    initialBalance: number;
  },
  round: { won: boolean; nearMiss?: boolean; payout: number; bet: number },
): PsychEvent[] {
  const events: PsychEvent[] = [];

  if (round.nearMiss) {
    events.push(
      createEvent(
        "near_miss",
        mechanism,
        "Near-miss: исход визуально близок к выигрышу. Активируется дофаминовая система вознаграждения без фактического профита.",
        "Вентральный striatum",
      ),
    );
  }

  if (round.won && round.payout >= params.baseBet * 5) {
    events.push(
      createEvent(
        "big_win",
        mechanism,
        `Крупный выигрыш +${round.payout} ₽ — пик дофаминового отклика. Риск эффекта «я нашёл систему».`,
        "Вентральный striatum / NAcc",
      ),
    );
  }

  if (!round.won && session.consecutiveLosses >= 3) {
    const isMartingale = params.strategy === "martingale";

    events.push(
      createEvent(
        isMartingale ? "martingale_trap" : "loss_streak",
        mechanism,
        isMartingale
          ? `Серия из ${session.consecutiveLosses} проигрышей при стратегии Мартингейл — «ловушка отыгрыша» активирована.`
          : `Серия из ${session.consecutiveLosses} проигрышей подряд — растёт субъективная вероятность «отыграться».`,
        isMartingale
          ? "Вентральный striatum / миндалина"
          : "Передняя поясная кора",
      ),
    );
  }

  if (round.won && session.consecutiveWins >= 3) {
    events.push(
      createEvent(
        "win_streak",
        mechanism,
        `Серия из ${session.consecutiveWins} побед — иллюзия «система работает». E[profit] остаётся отрицательным.`,
        "Вентральный striatum",
      ),
    );
  }

  if (params.strategy === "dalembert" && session.consecutiveLosses >= 2) {
    events.push(
      createEvent(
        "dalembert_escalation",
        mechanism,
        "Стратегия Д'Аламбер: линейный рост ставки после проигрышей ускоряет декапитализацию.",
        "Дорсолateralная PFC",
      ),
    );
  }

  return events;
}
```

**Почему листинг важен:**  
Этот фрагмент связывает программную часть с темой диплома о лудомании. Он показывает, что система не просто считает выигрыши и проигрыши, а фиксирует поведенческие маркеры зависимого поведения.

## Рекомендация по использованию в дипломе

Для дипломного документа лучше вставлять листинги в таком порядке:

1. **Листинг 1** — как основную логику сбора телеметрии.
2. **Листинг 2** — как архитектуру выбора RNG-механизма.
3. **Листинг 3** — как пример криптографического механизма.
4. **Листинг 4** — как научно-статистическую часть.
5. **Листинг 5** — как связь проекта с анализом лудомании.

Если в дипломе разрешено вставить только 3 листинга, рекомендуется выбрать:

1. обработку игрового раунда;
2. Provably Fair SHA-256;
3. Монте-Карло.

