# Полный экспорт сайта «Анализ гемблинга (лудомании)»

Дата сборки: 2026-06-13
Файлов: 71

Стек: React 19, TypeScript, Vite, Tailwind CSS, Recharts, React Router.
Страницы: Главная, Теория, Программа, Итоги.

---

## PROJECT_DOCUMENTATION.md

```markdown
# Документация проекта

## 1. Общая информация

**Название проекта:** Анализ гемблинга (лудомании) на примере программного комплекса  
**Тип проекта:** веб-приложение для дипломной работы  
**Назначение:** исследовательская демонстрация влияния механизмов случайности, математического ожидания и поведенческих факторов на результаты пользователя  
**Важно:** проект не является казино, азартной игрой или коммерческим игровым продуктом. Он используется как учебно-исследовательский программный комплекс.

Проект реализует интерактивный сайт, в котором пользователь может:

- изучить теоретическую часть по гемблингу и лудомании;
- увидеть научные схемы по поведенческим и нейрокогнитивным факторам;
- запустить четыре демонстрационных модуля с разными механизмами генерации случайных чисел;
- сыграть несколько итераций в каждом модуле;
- посмотреть фактическую телеметрию: ставки, победы, проигрыши, баланс, пополнения и итог;
- запустить моделирование методом Монте-Карло;
- сравнить результаты по всем четырём механизмам RNG;
- использовать сайт как наглядный материал при защите дипломной работы.

Главная идея проекта: **тип генератора случайных чисел может меняться, но при отрицательном математическом ожидании итоговая тенденция для пользователя остаётся отрицательной**. Дополнительно показывается, что поведенческие факторы (near-miss, повторное пополнение, иллюзия контроля, попытка отыграться) усиливают вовлечённость, но не меняют математический результат.

## 2. Используемый стек технологий

Проект написан как современное фронтенд-приложение.

| Технология | Назначение |
|---|---|
| React | построение интерфейса и компонентной структуры |
| TypeScript | типизация данных, состояния и математических функций |
| Vite | запуск dev-сервера и сборка проекта |
| Tailwind CSS | стилизация интерфейса |
| React Router | маршрутизация между страницами |
| Recharts | построение диаграмм в разделе «Итоги» |
| Lucide React | иконки интерфейса |
| Web Crypto API | криптографическая случайность и SHA-256 |

Основные команды проекта находятся в `package.json`:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## 3. Как запустить проект

### 3.1. Установка зависимостей

Если зависимости ещё не установлены:

```bash
npm install
```

### 3.2. Запуск в режиме разработки

```bash
npm run dev
```

После запуска Vite обычно откроет адрес:

```text
http://localhost:5173/
```

Если браузер не открылся автоматически, адрес можно скопировать из терминала.

### 3.3. Сборка проекта

```bash
npm run build
```

Команда выполняет:

1. проверку TypeScript через `tsc -b`;
2. сборку проекта через `vite build`;
3. создание папки `dist`.

### 3.4. Предпросмотр собранной версии

```bash
npm run preview
```

### 3.5. Важное замечание про открытие сайта

Не рекомендуется открывать `index.html` двойным кликом напрямую из файловой системы. Проект должен запускаться через dev-сервер:

```bash
npm run dev
```

Это важно, потому что Vite обслуживает модули, маршруты и статические файлы корректным способом.

## 4. Назначение проекта в дипломной работе

Проект нужен не для демонстрации азартной игры, а для объяснения исследовательской идеи:

1. В программном комплексе создаются четыре разных модуля RNG.
2. Пользователь выполняет ставки и получает случайные исходы.
3. Система фиксирует параметры игровой сессии.
4. Отдельно записываются поведенческие наблюдения.
5. Через Монте-Карло показывается статистическая картина на дистанции.
6. Итог доказывает, что отрицательное математическое ожидание сохраняется при разных механизмах случайности.

На защите сайт можно использовать как интерактивную демонстрацию:

- сначала открыть «Главная» и объяснить цель проекта;
- затем открыть «Теория» и показать поведенческие факторы;
- затем открыть «Программа» и пройти по четырём модулям;
- сыграть несколько ставок в каждом модуле;
- после этого открыть «Итоги» и показать фактическую сводку;
- затем запустить Монте-Карло и показать сравнительные диаграммы.

## 5. Общая структура проекта

Основные папки:

```text
src/
  App.tsx
  main.tsx
  index.css
  components/
  context/
  lib/
  math/
  pages/
  types/
public/
  images/
scripts/
```

### 5.1. `src/App.tsx`

Главный компонент приложения. В нём задаётся маршрутизация:

- `/` — главная страница;
- `/theory` — теоретическая часть;
- `/games` — программа / практическая часть;
- `/simulator` — перенаправление на `/games`;
- `/results` — итоги анализа.

Приложение обёрнуто в:

- `HashRouter` — маршрутизация через hash-URL;
- `TelemetryProvider` — общий контекст состояния и телеметрии;
- `Suspense` — загрузка страниц через lazy import.

### 5.2. `src/main.tsx`

Точка входа React-приложения. Здесь:

- находится элемент `#root`;
- подключается `App`;
- подключается `ErrorBoundary`;
- подключается глобальный файл стилей `index.css`.

Если `#root` не найден, на странице выводится сообщение о необходимости запуска проекта через `npm run dev`.

### 5.3. `src/index.css`

Основной файл визуального оформления. В нём находятся:

- базовые стили Tailwind;
- оформление светлой академической темы;
- стили навигации;
- кнопки;
- карточки;
- таблицы;
- блоки рисунков;
- диаграммы;
- интерфейс вкладок.

Проект оформлен в академическом стиле: светлый фон, белые карточки, тёмно-синий акцент, аккуратные русскоязычные схемы.

## 6. Маршруты и страницы приложения

## 6.1. Главная страница

Файл:

```text
src/pages/HomePage.tsx
```

Главная страница выполняет роль введения в дипломный проект.

На ней есть:

- заголовок «Анализ гемблинга (лудомании)»;
- описание цели проекта;
- рисунок структуры дипломного проекта;
- быстрые кнопки перехода к «Программе», «Теории» и «Итогам»;
- краткая статистика: 4 RNG-механизма, 4 программных модуля, 50 траекторий Монте-Карло;
- раздел «Программные модули»;
- схема четырёх механизмов RNG;
- рисунок Монте-Карло;
- рекомендуемый порядок демонстрации на защите.

Главная страница должна дать комиссии быстрое понимание:

- что это дипломная работа;
- что сайт не является казино;
- какие методы реализованы;
- какую научную идею демонстрирует проект.

## 6.2. Страница «Теория»

Файл:

```text
src/pages/TheoryPage.tsx
```

Страница объясняет теоретическую основу проекта.

Основные блоки:

- рисунок 1: поведенческие и нейрокогнитивные факторы;
- ключевые положения;
- таблица механизмов генерации случайных чисел;
- рисунок 2: моделирование методом Монте-Карло;
- пояснение метода Монте-Карло;
- итоговый теоретический вывод.

Ключевые положения:

1. **Иллюзия контроля**  
   Пользователь выбирает ставку и момент пополнения, из-за чего возникает ощущение влияния на исход, хотя RNG остаётся независимым.

2. **Повторное пополнение**  
   После проигрышей пользователь может пытаться «отыграться», что является важным поведенческим маркером.

3. **Эффект near-miss**  
   Ситуация «почти выиграл» усиливает желание продолжать, хотя математически это не улучшает ожидание.

4. **Инвариантность результата**  
   Независимо от механизма RNG средний результат остаётся отрицательным.

## 6.3. Страница «Программа»

Файл:

```text
src/pages/GamesPage.tsx
```

Это практическая часть проекта. На странице есть четыре вкладки:

- Рулетка;
- Кости;
- Карты;
- Слот.

Каждая вкладка связана с отдельным механизмом RNG:

| Вкладка | ID механизма | Механизм |
|---|---|---|
| Рулетка | `lcg` | LCG PRNG |
| Кости | `csprng` | CSPRNG |
| Карты | `provablyFair` | Provably Fair |
| Слот | `weightedWheel` | Weighted RNG |

На странице отображается:

- академический баннер модуля;
- текущий баланс;
- количество ставок;
- количество побед;
- количество пополнений;
- общая внесённая сумма;
- результат последней итерации;
- поле изменения ставки;
- кнопка «Играть»;
- кнопка пополнения;
- кнопка запуска Монте-Карло;
- сводные показатели последнего Монте-Карло.

Важно: вкладки выглядят как демонстрационные исследовательские оболочки. Их задача — не развлечение, а сбор и показ поведенческой телеметрии.

## 6.4. Страница «Итоги»

Файл:

```text
src/pages/ResultsPage.tsx
```

Страница «Итоги» собирает два типа информации:

1. **Фактические сведения после игры пользователя.**
2. **Статистическое сравнение механизмов через Монте-Карло.**

### Фактические сведения по игровым вкладкам

После игры в «Рулетку», «Кости», «Карты» и «Слот» в разделе «Итоги» выводятся:

- общее число сыгранных ставок;
- победы и проигрыши;
- чистый итог;
- число пополнений;
- баланс по каждому модулю;
- число ставок по каждому модулю;
- победы / проигрыши по каждому модулю;
- винрейт;
- последний результат по каждому модулю.

Эта часть не требует запуска Монте-Карло. Она обновляется после обычной игры пользователя.

### Статистическая часть

Если пользователь запускает Монте-Карло, дополнительно отображается:

- последний расчёт;
- средний остаток;
- средний `Δ`;
- процент исчерпания капитала;
- доля положительных исходов;
- русскоязычный график траекторий капитала;
- диаграммы сравнения механизмов;
- таблица механизмов.

## 7. Состояние и телеметрия

Главная логика состояния находится в:

```text
src/context/TelemetryContext.tsx
```

Контекст `TelemetryProvider` хранит:

- активный механизм `activeMechanism`;
- параметры сессии `params`;
- пользовательские правила `customRules`;
- данные по всем четырём сессиям `sessions`;
- журнал поведенческих событий `psychLog`;
- историю завершённых сессий `sessionHistory`;
- результат Монте-Карло `mcResult`;
- состояние Provably Fair `provablyFair`;
- агрегированные метрики `metrics`;
- флаги загрузки и игры.

### 7.1. Параметры по умолчанию

```ts
initialBalance: 1000
baseBet: 10
strategy: "flat"
crashTarget: 2.0
diceThreshold: 50
```

### 7.2. Сессия одного модуля

Каждый модуль имеет собственную сессию:

```ts
balance
initialBalance
totalDeposited
topUpCount
betsPlayed
wins
losses
consecutiveLosses
consecutiveWins
currentStreak
maxWinStreak
lastResult
lastBet
pathway
houseAbsorbed
```

Это позволяет отдельно анализировать «Рулетку», «Кости», «Карты» и «Слот».

### 7.3. Что происходит при нажатии «Играть»

Функция:

```text
playGame()
```

Логика:

1. Проверяется, что игра не запущена повторно.
2. Берётся активный механизм.
3. Проверяется баланс.
4. Рассчитывается ставка с учётом стратегии.
5. Вызывается `playRoundWithBalance`.
6. Баланс изменяется на `netChange`.
7. Обновляются победы, проигрыши и серии.
8. Записывается результат последней итерации.
9. Обновляется путь капитала `pathway`.
10. Создаются поведенческие события.
11. Если баланс стал нулевым, фиксируется исчерпание капитала.

### 7.4. Что происходит при пополнении

Функция:

```text
topUp()
```

Логика:

1. К текущему балансу активного модуля добавляется `initialBalance`.
2. Увеличивается `totalDeposited`.
3. Увеличивается `topUpCount`.
4. В `pathway` добавляется новая точка баланса.
5. В журнал наблюдений добавляется событие пополнения.

### 7.5. Где хранится состояние

В основном интерфейсе состояние хранится в React state внутри `TelemetryContext`. Это значит, что при перезагрузке страницы данные текущей сессии сбрасываются.

В проекте также присутствуют экспериментальные/старые файлы в `src/app` и `src/state`, где использовался другой подход и `localStorage`. Но текущий основной интерфейс подключён через `src/App.tsx` и использует `TelemetryProvider`.

## 8. Математические механизмы RNG

Описание механизмов находится в:

```text
src/math/mechanisms.ts
```

В проекте реализованы четыре механизма.

## 8.1. Механизм I — LCG PRNG

Файл:

```text
src/math/lcg.ts
```

LCG — линейный конгруэнтный генератор.

Формула:

```text
state = (1664525 × state + 1013904223) mod 2^32
```

В коде:

```ts
this.state = (1664525 * this.state + 1013904223) >>> 0;
return this.state / 0x100000000;
```

Особенности:

- генератор имеет внутреннее состояние;
- результат зависит от предыдущего значения;
- подходит для демонстрации стандартного псевдослучайного механизма;
- не является криптографически стойким;
- используется в модуле «Рулетка».

В демонстрационной логике LCG используется для генерации трёх символов. Символы выбираются с весами:

| Символ | Вес |
|---|---:|
| OR | 35 |
| LM | 28 |
| CH | 20 |
| BAR | 12 |
| 7 | 5 |

При совпадении символов рассчитывается выплатная логика. Даже при положительных отдельных исходах общий принцип остаётся прежним: на дистанции заложенное преимущество системы не исчезает.

## 8.2. Механизм II — CSPRNG

Файл:

```text
src/math/csprng.ts
```

CSPRNG использует Web Crypto API:

```ts
crypto.getRandomValues(buf)
```

Особенности:

- криптографически стойкий источник случайности;
- результат не должен быть предсказуемым для пользователя;
- используется для демонстрации того, что даже качественная случайность не отменяет отрицательное математическое ожидание.

В модуле используется crash-модель. Генерируется точка:

```text
raw = (1 - houseEdge) / U
```

где:

- `U` — случайное число от 0 до 1;
- `houseEdge = 0.04`.

Пользователь выигрывает, если выбранный порог не превышает crash-point:

```text
cashoutTarget <= crashPoint
```

## 8.3. Механизм III — Weighted RNG

Файл:

```text
src/math/weightedWheel.ts
```

Weighted RNG использует взвешенное распределение с секторами.

Каждый сектор имеет:

- `id`;
- `label`;
- `weight`;
- `multiplier`;
- признак `isJackpot`.

Пример:

```ts
{ id: "j0", label: "×50", weight: 1, multiplier: 50, isJackpot: true }
{ id: "l1", label: "×0", weight: 18, multiplier: 0, isJackpot: false }
```

Сектор выбирается не равновероятно. Чем больше `weight`, тем выше вероятность выпадения.

Дополнительно реализован near-miss:

- если сектор рядом с jackpot;
- если сам сектор не является jackpot;
- если случайная проверка даёт положительный результат.

Near-miss важен для теоретической части: он показывает ситуацию, когда исход визуально близок к выигрышу, но фактически не меняет математический результат.

## 8.4. Механизм IV — Provably Fair

Файл:

```text
src/math/provablyFair.ts
```

Provably Fair основан на SHA-256:

```text
SHA-256(serverSeed : clientSeed : nonce)
```

Логика:

1. Генерируется serverSeed.
2. Генерируется clientSeed.
3. Используется nonce.
4. Строка хешируется через SHA-256.
5. Первые 8 hex-символов переводятся в число.
6. Результат приводится к диапазону 0–99:

```ts
const roll = parseInt(rawHex, 16) % 100;
```

Победа определяется порогом:

```text
roll >= threshold
```

Особенность механизма: он демонстрирует прозрачность алгоритма и проверяемость исхода. Но даже прозрачный алгоритм не меняет математическое ожидание, если коэффициенты выплат содержат системное преимущество.

## 9. Игровой движок

Файл:

```text
src/math/engine.ts
```

Этот файл объединяет математические механизмы и игровой процесс.

Ключевые функции:

| Функция | Назначение |
|---|---|
| `playRoundWithBalance` | запускает один раунд с проверкой баланса |
| `playRound` | выбирает нужный механизм по `MechanismId` |
| `playLcgSlots` | логика LCG-модуля |
| `playCrash` | логика CSPRNG crash-модели |
| `playWheel` | логика weighted wheel |
| `playProvablyFairDice` | логика SHA-256 roll |
| `simulateWin` | упрощённая симуляция исхода для Монте-Карло |
| `getTheoreticalWinRate` | расчёт теоретического win-rate |

Функция `playRound` работает через `switch`:

```ts
switch (mechanism) {
  case "lcg":
  case "csprng":
  case "weightedWheel":
  case "provablyFair":
}
```

Каждый механизм возвращает общий тип результата:

```ts
GameRoundResult
```

В нём есть:

- `won`;
- `payout`;
- `netChange`;
- `message`;
- `nearMiss`;
- `metadata`.

## 10. Стратегии ставок

Файл:

```text
src/math/betting.ts
```

Реализованы три стратегии:

| Стратегия | Описание |
|---|---|
| `flat` | фиксированная ставка |
| `martingale` | удвоение после проигрыша |
| `dalembert` | линейное увеличение после проигрыша и уменьшение после выигрыша |

Формулы:

### Flat

```text
bet = baseBet
```

### Martingale

```text
bet = baseBet × 2^(consecutiveLosses)
```

### D'Alembert

```text
bet = baseBet + consecutiveLosses × baseBet - consecutiveWins × baseBet
```

Ограничение:

```ts
return Math.min(Math.max(1, Math.floor(raw)), balance);
```

Ставка не может быть:

- меньше 1;
- больше текущего баланса.

## 11. Метод Монте-Карло

Файл:

```text
src/math/monteCarlo.ts
```

Монте-Карло используется для оценки статистической картины на дистанции.

Константы:

```ts
MONTE_CARLO_PATHWAYS = 50
MONTE_CARLO_BETS = 100
```

То есть для каждого расчёта выполняется:

- 50 независимых траекторий;
- до 100 ставок в каждой траектории.

### 11.1. Как выполняется одна траектория

Функция:

```text
runSinglePathway()
```

Шаги:

1. Баланс устанавливается равным начальному.
2. Создаётся массив `balances`.
3. На каждой итерации рассчитывается ставка.
4. Через `simulateWin` определяется исход.
5. При победе баланс увеличивается.
6. При проигрыше баланс уменьшается.
7. Рассчитывается максимальная просадка.
8. Если баланс стал нулевым, траектория прекращается.

### 11.2. Агрегированные показатели

После всех траекторий рассчитываются:

- средний финальный баланс;
- средний профит;
- процент исчерпания капитала;
- максимальная просадка;
- фактический win-rate;
- теоретический win-rate;
- скорость декапитализации;
- системная маржа.

### 11.3. Сравнение механизмов

Функция:

```text
compareAllMechanisms()
```

Она запускает Монте-Карло для всех механизмов:

```ts
["lcg", "csprng", "weightedWheel", "provablyFair"]
```

и возвращает массив сравнительных результатов.

## 12. Поведенческий анализ

Файл:

```text
src/math/psychAnalyzer.ts
```

Этот модуль отвечает за журнал поведенческих наблюдений.

Он создаёт события типа:

- `near_miss`;
- `martingale_trap`;
- `illusion_of_control`;
- `top_up`;
- `bankruptcy`;
- `win_streak`;
- `loss_streak`;
- `big_win`;
- `parameter_change`;
- `dalembert_escalation`;
- `chase_loss`.

### 12.1. Near-miss

Создаётся, если исход близок к выигрышу, но не даёт положительного результата.

Смысл:

- пользователь субъективно воспринимает исход как «почти успех»;
- мотивация продолжать может усиливаться;
- математическое ожидание не меняется.

### 12.2. Серия проигрышей

Если подряд произошло несколько проигрышей, фиксируется событие:

```text
loss_streak
```

Если используется Мартингейл, фиксируется:

```text
martingale_trap
```

### 12.3. Пополнение

Пополнение фиксируется как поведенческий маркер. Если пользователь пополняет баланс после исчерпания капитала, это трактуется как паттерн chasing losses.

### 12.4. Крупный выигрыш

Если выигрыш заметно превышает базовую ставку, создаётся событие `big_win`. Это показывает риск иллюзии «я нашёл систему».

## 13. Типы данных

Файл:

```text
src/types/index.ts
```

Основные типы:

### 13.1. `MechanismId`

```ts
type MechanismId = "lcg" | "csprng" | "weightedWheel" | "provablyFair";
```

### 13.2. `GameSession`

Описывает состояние одного модуля.

Важные поля:

- `balance` — текущий баланс;
- `initialBalance` — стартовый баланс;
- `totalDeposited` — сколько всего внесено;
- `topUpCount` — число пополнений;
- `betsPlayed` — число ставок;
- `wins` — победы;
- `losses` — проигрыши;
- `lastResult` — последний текстовый результат;
- `pathway` — траектория капитала;
- `houseAbsorbed` — сумма, поглощённая системой.

### 13.3. `SimulationStats`

Описывает результат Монте-Карло.

Поля:

- `averageFinalBalance`;
- `averageProfit`;
- `bankruptcyRate`;
- `maxDrawdown`;
- `winRate`;
- `theoreticalWinRate`;
- `capitalDecayRate`;
- `houseMargin`.

### 13.4. `PsychEvent`

Описывает поведенческое событие.

Поля:

- `id`;
- `type`;
- `mechanism`;
- `message`;
- `brainRegion`;
- `timestamp`.

## 14. Компоненты интерфейса

## 14.1. Layout и навигация

Файлы:

```text
src/components/AppLayout.tsx
src/components/Navbar.tsx
```

`AppLayout` задаёт:

- общий фон;
- верхнее меню;
- область `<Outlet />`;
- нижний footer.

`Navbar` содержит ссылки:

- Главная;
- Теория;
- Программа;
- Итоги.

Для мобильной версии есть раскрываемое меню.

## 14.2. Рисунки

Файл:

```text
src/components/AcademicFigure.tsx
```

Компонент отображает рисунок:

- `src`;
- `alt`;
- подпись `caption`;
- CSS-класс.

Также есть fallback-логика: если изображение не загрузилось, подставляется запасной файл.

## 14.3. Карточки статистики

Файл:

```text
src/components/StatCard.tsx
```

Используется в разделе «Итоги» и других местах для вывода числовых показателей.

## 14.4. Сравнение механизмов

Файл:

```text
src/components/MechanismCompare.tsx
```

Использует Recharts и строит:

- диаграмму среднего профита;
- диаграмму исчерпания капитала.

Подписи механизмов укорочены для читаемости:

- LCG PRNG;
- CSPRNG;
- Weighted RNG;
- Provably Fair.

## 14.5. Журнал наблюдений

Файл:

```text
src/components/lab/PsychLog.tsx
```

Показывает поведенческие события из `psychLog`.

Если событий нет, выводится сообщение:

```text
Ожидание событий экспериментальной сессии…
```

## 15. Изображения и схемы

Основные изображения лежат в:

```text
public/images/
```

Подключение изображений выполняется через:

```text
src/lib/images.ts
src/lib/assetUrl.ts
```

`assetUrl.ts` учитывает `base` Vite, чтобы пути работали корректно.

Актуальные изображения:

| Назначение | Файл |
|---|---|
| Главная, обзор проекта | `home-overview-ru.svg` |
| Главная, четыре RNG | `home-rng-ru.svg` |
| Теория, поведенческие факторы | `theory-psychology-ru.svg` |
| Теория/Итоги, Монте-Карло | `theory-montecarlo-ru.svg` |
| Программа, рулетка | `game-roulette-academic.svg` |
| Программа, кости | `game-dice-academic.svg` |
| Программа, карты | `game-cards-academic.svg` |
| Программа, слот | `game-slot-academic.svg` |

Для сброса кэша используется версия:

```ts
const v = "10";
```

При изменении изображения можно увеличить версию, чтобы браузер загрузил новый файл.

## 16. Генерация SVG-схем

В проекте есть скрипты, которые создают русскоязычные SVG:

```text
scripts/write-home-figures.mjs
scripts/write-theory-figures.mjs
scripts/write-game-banners.mjs
```

Они нужны, чтобы:

- быстро пересоздать схемы;
- избежать битой кодировки;
- хранить текст и структуру рисунков в управляемом виде.

Пример запуска:

```bash
node scripts/write-theory-figures.mjs
```

После генерации рекомендуется выполнить:

```bash
npm run build
```

## 17. Конфигурация Vite

Файл:

```text
vite.config.ts
```

Основные параметры:

```ts
base: "./"
server: {
  port: 5173,
  strictPort: false,
  open: true
}
```

`base: "./"` нужен, чтобы собранные статические файлы могли корректно ссылаться друг на друга при относительном размещении.

## 18. Сценарий демонстрации на защите

Рекомендуемый порядок:

1. Открыть главную страницу.
2. Сказать, что это исследовательский программный комплекс для анализа гемблинга и лудомании.
3. Пояснить, что проект не является казино.
4. Показать схему структуры проекта.
5. Перейти в «Теория».
6. Объяснить четыре поведенческих фактора:
   - иллюзия контроля;
   - повторное пополнение;
   - near-miss;
   - отрицательное математическое ожидание.
7. Показать таблицу механизмов RNG.
8. Перейти в «Программа».
9. По очереди открыть вкладки:
   - Рулетка;
   - Кости;
   - Карты;
   - Слот.
10. В каждом модуле сделать несколько ставок.
11. Показать, что баланс, победы, проигрыши и последний результат меняются.
12. Нажать «Пополнить» и объяснить поведенческий маркер.
13. Запустить «Монте-Карло».
14. Перейти в «Итоги».
15. Показать фактические сведения по вкладкам.
16. Показать диаграммы сравнения механизмов.
17. Сформулировать главный вывод: разные RNG-механизмы не отменяют отрицательное математическое ожидание.

## 19. Главный научный вывод

Главный вывод проекта:

```text
Если система имеет отрицательное математическое ожидание для участника,
то смена генератора случайных чисел не делает результат выгодным на дистанции.
```

Сайт демонстрирует это через:

- LCG PRNG;
- CSPRNG;
- Weighted RNG;
- Provably Fair SHA-256;
- реальные пользовательские сессии;
- журнал поведенческих наблюдений;
- Монте-Карло моделирование.

## 20. Возможные вопросы комиссии и ответы

### Вопрос: Это казино?

Ответ: нет. Это исследовательская демонстрация. Игровые оболочки используются только как понятная форма для сбора телеметрии и объяснения вероятностных механизмов.

### Вопрос: Почему используются игровые термины?

Ответ: тема диплома связана с гемблингом и лудоманией, поэтому демонстрационные модули имитируют типовые игровые сценарии. При этом дизайн сделан академическим, а не рекламным.

### Вопрос: Что именно анализирует программа?

Ответ: программа анализирует:

- исходы случайных механизмов;
- изменение баланса;
- частоту побед и проигрышей;
- пополнения;
- серии проигрышей;
- near-miss;
- риск исчерпания капитала;
- результаты моделирования Монте-Карло.

### Вопрос: Почему четыре RNG-механизма?

Ответ: чтобы показать, что проблема не в конкретном генераторе, а в математической структуре системы. Даже при криптографически стойкой случайности результат на дистанции остаётся отрицательным, если выплаты настроены с преимуществом системы.

### Вопрос: Зачем нужен Provably Fair?

Ответ: он показывает прозрачный механизм, где исход можно проверить через SHA-256. Это важно для сравнения: даже проверяемый честный алгоритм не отменяет отрицательное ожидание.

### Вопрос: Что показывает Монте-Карло?

Ответ: Монте-Карло показывает статистическую картину на множестве независимых траекторий. Это помогает уйти от случайности единичных исходов и увидеть общую тенденцию.

### Вопрос: Что показывает near-miss?

Ответ: near-miss показывает психологически значимый эффект «почти выиграл». Он может усиливать мотивацию продолжать, хотя математически это проигрыш или неположительный результат.

## 21. Ограничения проекта

У проекта есть ограничения, которые важно понимать:

- это учебно-исследовательская модель, а не промышленная аналитическая система;
- данные основной сессии не сохраняются после перезагрузки страницы;
- статистика Монте-Карло зависит от текущих параметров;
- визуальные игровые оболочки упрощены;
- выводы демонстрационные и предназначены для дипломной работы.

## 22. Что можно улучшить в будущем

Возможные направления развития:

- добавить сохранение основной сессии в `localStorage`;
- добавить экспорт отчёта в PDF;
- добавить отдельную страницу методологии;
- добавить больше графиков по фактическим игровым сессиям;
- добавить настройки стратегии ставок на странице «Программа»;
- добавить больше пояснений к каждому поведенческому событию;
- добавить режим «демонстрация для защиты» с пошаговыми подсказками.

## 23. Основные файлы проекта

| Файл | Назначение |
|---|---|
| `src/App.tsx` | маршрутизация и подключение контекста |
| `src/main.tsx` | точка входа React |
| `src/index.css` | глобальная стилизация |
| `src/pages/HomePage.tsx` | главная страница |
| `src/pages/TheoryPage.tsx` | теория |
| `src/pages/GamesPage.tsx` | практическая программа |
| `src/pages/ResultsPage.tsx` | итоги |
| `src/context/TelemetryContext.tsx` | состояние, телеметрия, действия пользователя |
| `src/math/engine.ts` | игровой движок |
| `src/math/lcg.ts` | LCG PRNG |
| `src/math/csprng.ts` | CSPRNG и crash-модель |
| `src/math/weightedWheel.ts` | weighted RNG и near-miss |
| `src/math/provablyFair.ts` | SHA-256 Provably Fair |
| `src/math/monteCarlo.ts` | моделирование Монте-Карло |
| `src/math/psychAnalyzer.ts` | поведенческий анализ |
| `src/types/index.ts` | основные типы данных |
| `src/lib/images.ts` | пути к изображениям |
| `src/lib/assetUrl.ts` | корректная сборка public-путей |
| `scripts/write-home-figures.mjs` | генерация схем главной страницы |
| `scripts/write-theory-figures.mjs` | генерация схем теории |
| `scripts/write-game-banners.mjs` | генерация баннеров вкладок программы |

## 24. Краткое резюме

Данный проект представляет собой веб-приложение для дипломной работы по теме анализа гемблинга и лудомании. Он сочетает:

- теоретическую часть;
- интерактивную практическую часть;
- четыре механизма генерации случайных чисел;
- сбор телеметрии;
- журнал поведенческих наблюдений;
- моделирование Монте-Карло;
- итоговую аналитическую сводку.

Проект демонстрирует, что отрицательное математическое ожидание сохраняется независимо от того, какой механизм случайности используется. Поведенческие факторы могут усиливать вовлечённость пользователя, но не меняют статистический результат на дистанции.

```

---

## index.html

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <link rel="preload" as="image" href="./images/hero-academic.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <title>Анализ гемблинга — дипломная работа</title>
    <style>
      html, body, #root { height: 100%; margin: 0; }
      body { background: #f0f2f6; color: #0f172a; font-family: Inter, system-ui, sans-serif; }
      #boot-hint { padding: 48px 24px; max-width: 520px; margin: 0 auto; line-height: 1.6; }
      #boot-hint h1 { font-size: 1.25rem; margin: 0 0 12px; }
      #boot-hint p { color: #64748b; font-size: 0.95rem; margin: 0 0 16px; }
      #boot-hint code, #boot-hint pre { background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; }
      #boot-hint pre { padding: 12px; font-size: 0.85rem; overflow-x: auto; }
    </style>
  </head>
  <body>
    <div id="root">
      <div id="boot-hint">
        <h1>Загрузка сайта…</h1>
        <p>Если экран остаётся пустым — не открывайте этот файл двойным кликом. Нужен dev-сервер.</p>
        <p><strong>Запуск:</strong> дважды кликните <code>start.bat</code> в папке проекта<br>или в терминале:</p>
        <pre>cd "C:\Users\PC\Desktop\Сайт"
npm run dev</pre>
        <p>Откройте в браузере адрес из терминала (обычно <code>http://localhost:5173/</code>).</p>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

---

## package.json

```json
{
  "name": "ludo-analysis-web",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^12.40.0",
    "lucide-react": "^0.544.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-is": "^19.2.7",
    "react-router-dom": "^7.17.0",
    "recharts": "^3.8.1"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.12.3",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.4.21",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.19",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.59.2",
    "vite": "^8.0.12"
  }
}

```

---

## postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

---

## src/App.tsx

```typescript
import { lazy, Suspense } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { TelemetryProvider } from "./context/TelemetryContext";

const HomePage = lazy(() => import("./pages/HomePage").then((m) => ({ default: m.HomePage })));
const TheoryPage = lazy(() => import("./pages/TheoryPage").then((m) => ({ default: m.TheoryPage })));
const GamesPage = lazy(() => import("./pages/GamesPage").then((m) => ({ default: m.GamesPage })));
const ResultsPage = lazy(() => import("./pages/ResultsPage").then((m) => ({ default: m.ResultsPage })));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
      Загрузка…
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <TelemetryProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="theory" element={<TheoryPage />} />
              <Route path="games" element={<GamesPage />} />
              <Route path="simulator" element={<Navigate to="/games" replace />} />
              <Route path="results" element={<ResultsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </TelemetryProvider>
    </HashRouter>
  );
}

```

---

## src/components/AcademicFigure.tsx

```typescript
import { useMemo, useState } from "react";
import { publicAsset } from "../lib/assetUrl";

interface AcademicFigureProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

const FALLBACKS = [
  publicAsset("images/hero-academic.png"),
  publicAsset("images/hero.jpg"),
  publicAsset("images/hero.svg"),
];

export function AcademicFigure({ src, alt, caption, className = "" }: AcademicFigureProps) {
  const sources = useMemo(
    () => [src, ...FALLBACKS.filter((url) => url !== src)],
    [src],
  );
  const [index, setIndex] = useState(0);
  const currentSrc = sources[Math.min(index, sources.length - 1)];

  return (
    <figure className={`academic-figure ${className}`}>
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="academic-figure-img"
        onError={() => {
          setIndex((i) => (i < sources.length - 1 ? i + 1 : i));
        }}
      />
      {caption && <figcaption className="academic-figure-caption">{caption}</figcaption>}
    </figure>
  );
}

```

---

## src/components/AppLayout.tsx

```typescript
import { Link, Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-[1600px]">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-8 text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 md:px-6">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Анализ гемблинга (лудомании) на примере программного комплекса
            </p>
            <p className="mt-1 text-xs">Дипломная работа · 2026 · исследовательское ПО, не коммерческий продукт</p>
          </div>
          <nav className="flex flex-wrap gap-5 text-sm">
            <Link to="/" className="no-underline text-slate-600 hover:text-[#1e3a5f]">Главная</Link>
            <Link to="/theory" className="no-underline text-slate-600 hover:text-[#1e3a5f]">Теория</Link>
            <Link to="/games" className="no-underline text-slate-600 hover:text-[#1e3a5f]">Программа</Link>
            <Link to="/results" className="no-underline text-slate-600 hover:text-[#1e3a5f]">Итоги</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

```

---

## src/components/ErrorBoundary.tsx

```typescript
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App crash:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#f4f6f9] p-6">
          <div className="glass max-w-md p-8 text-center">
            <h1 className="text-lg font-semibold text-slate-900">Ошибка загрузки</h1>
            <p className="mt-2 text-sm text-slate-600">
              Запустите через терминал: <code className="text-slate-900">npm run dev</code>
            </p>
            <p className="mt-3 text-xs text-neg">{this.state.error.message}</p>
            <button type="button" onClick={() => window.location.reload()} className="btn-primary mt-4">
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

```

---

## src/components/LiveMonteCarloChart.tsx

```typescript
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { GameSession, MechanismId, SimulationResult } from "../types";

interface LiveMonteCarloChartProps {
  sessions: Record<MechanismId, GameSession>;
  mcResult: SimulationResult | null;
  startingBalance: number;
}

const MODULES: Array<{ id: MechanismId; name: string; color: string }> = [
  { id: "lcg", name: "Рулетка", color: "#1e3a5f" },
  { id: "csprng", name: "Кости", color: "#2563eb" },
  { id: "provablyFair", name: "Карты", color: "#0f766e" },
  { id: "weightedWheel", name: "Слот", color: "#7c3aed" },
];

function formatMoney(value: number): string {
  return `${Math.round(value).toLocaleString("ru-RU")} ₽`;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; color?: string }>;
  label?: number | string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-semibold text-slate-800">Раунд {label}</p>
      {payload.map((item) => (
        <p key={item.name} style={{ color: item.color }} className="font-medium">
          {item.name}: {typeof item.value === "number" ? formatMoney(item.value) : "—"}
        </p>
      ))}
    </div>
  );
}

export function LiveMonteCarloChart({ sessions, mcResult, startingBalance }: LiveMonteCarloChartProps) {
  const hasGameplay = MODULES.some(({ id }) => sessions[id].betsPlayed > 0 || sessions[id].topUpCount > 0);
  const hasMonteCarlo = Boolean(mcResult?.averageBalances.length);

  const maxLength = Math.max(
    2,
    ...MODULES.map(({ id }) => sessions[id].pathway.length),
    mcResult?.averageBalances.length ?? 0,
  );

  const data = Array.from({ length: maxLength }, (_, index) => {
    const point: Record<string, number | null> & { round: number } = { round: index };

    for (const { id } of MODULES) {
      const pathway = sessions[id].pathway;
      point[id] = pathway[index] ?? pathway[pathway.length - 1] ?? null;
    }

    if (mcResult?.averageBalances[index] !== undefined) {
      point.monteCarloAverage = mcResult.averageBalances[index];
    }

    return point;
  });

  if (!hasGameplay && !hasMonteCarlo) {
    return (
      <div className="glass mb-8 p-8 text-center">
        <h2 className="heading-lg mb-2">Рабочая диаграмма результатов</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Пока нет данных для построения графика. Перейдите во вкладку «Программа», сыграйте несколько
          раундов в рулетку, кости, карты или слот, и здесь появятся реальные траектории баланса.
        </p>
      </div>
    );
  }

  return (
    <section className="glass mb-8 p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="heading-lg">Рабочая диаграмма результатов</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            График строится по реальным данным из вкладки «Программа»: каждая линия показывает, как
            менялся баланс в отдельном модуле после ставок и пополнений.
          </p>
        </div>
        <div className="rounded-card bg-slate-50 px-4 py-3 text-sm">
          <p className="text-xs text-slate-500">Начальный баланс</p>
          <p className="font-bold text-slate-900">{formatMoney(startingBalance)}</p>
        </div>
      </div>

      <div className="h-[360px] rounded-card border border-ozon-border bg-white p-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 24, bottom: 10, left: 4 }}>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
            <XAxis
              dataKey="round"
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              label={{ value: "Раунд", position: "insideBottom", offset: -4, fontSize: 12, fill: "#64748b" }}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              width={72}
              tickFormatter={(value: number) => `${Math.round(value).toLocaleString("ru-RU")} ₽`}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend verticalAlign="top" height={32} iconType="line" wrapperStyle={{ fontSize: 12 }} />
            <ReferenceLine
              y={startingBalance}
              stroke="#94a3b8"
              strokeDasharray="5 5"
              label={{ value: "старт", position: "insideTopLeft", fill: "#64748b", fontSize: 11 }}
            />

            {MODULES.map(({ id, name, color }) => (
              <Line
                key={id}
                type="monotone"
                dataKey={id}
                name={name}
                stroke={color}
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                connectNulls
                isAnimationActive={false}
              />
            ))}

            {hasMonteCarlo && (
              <Line
                type="monotone"
                dataKey="monteCarloAverage"
                name="Средняя линия Монте-Карло"
                stroke="#c9a227"
                strokeWidth={3}
                strokeDasharray="8 5"
                dot={false}
                connectNulls
                isAnimationActive={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map(({ id, name, color }) => {
          const session = sessions[id];
          const last = session.pathway[session.pathway.length - 1] ?? session.balance;
          const change = last - session.totalDeposited;

          return (
            <div key={id} className="rounded-card border border-ozon-border bg-slate-50 p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                <p className="text-sm font-semibold text-slate-900">{name}</p>
              </div>
              <p className="text-xs text-slate-500">Ставок: {session.betsPlayed}</p>
              <p className="text-xs text-slate-500">Текущий баланс: {formatMoney(session.balance)}</p>
              <p className={`text-xs font-semibold ${change >= 0 ? "text-pos" : "text-neg"}`}>
                Итог: {change >= 0 ? "+" : "−"}
                {formatMoney(Math.abs(change))}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

```

---

## src/components/MechanismCard.tsx

```typescript
import { ArrowRight, Binary, Fingerprint, PieChart, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { MechanismId, MechanismInfo } from "../types";

const MECHANISM_ICON: Record<MechanismId, typeof Binary> = {
  lcg: Binary,
  csprng: ShieldCheck,
  weightedWheel: PieChart,
  provablyFair: Fingerprint,
};

interface MechanismCardProps {
  mechanism: MechanismInfo;
}

export function MechanismCard({ mechanism }: MechanismCardProps) {
  const Icon = MECHANISM_ICON[mechanism.id];

  return (
    <Link to="/games" className="mechanism-card group no-underline">
      <div className="mechanism-card-body">
        <div className="flex items-start gap-4">
          <div className="mechanism-card-icon">
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-900">{mechanism.label}</h3>
              <span className="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                преимущество {mechanism.houseEdge}%
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{mechanism.technicalName}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{mechanism.researchFocus}</p>
          </div>
        </div>
        <p className="mt-4 flex items-center gap-1 text-sm font-medium text-[#1e3a5f]">
          Перейти к модулю
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </p>
      </div>
    </Link>
  );
}

```

---

## src/components/MechanismCompare.tsx

```typescript
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MechanismComparison } from "../math/monteCarlo";
import type { MechanismId } from "../types";

interface MechanismCompareProps {
  data: MechanismComparison[];
}

const tooltipStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 6,
  fontSize: 12,
  color: "#1e293b",
};

const shortNames: Record<MechanismId, string> = {
  lcg: "LCG PRNG",
  csprng: "CSPRNG",
  weightedWheel: "Weighted RNG",
  provablyFair: "Provably Fair",
};

export function MechanismCompare({ data }: MechanismCompareProps) {
  const profitData = data.map((d) => ({
    name: shortNames[d.mechanism],
    fullName: d.gameShell,
    value: Math.round(d.stats.averageProfit),
  }));

  const bustData = data.map((d) => ({
    name: shortNames[d.mechanism],
    fullName: d.gameShell,
    value: +d.stats.bankruptcyRate.toFixed(1),
  }));

  return (
    <div className="grid gap-5">
      <div className="glass p-5">
        <h3 className="text-sm font-semibold text-slate-800">Средний итог</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={profitData} layout="vertical" margin={{ top: 18, left: 20, right: 24, bottom: 8 }}>
            <CartesianGrid stroke="rgba(0,0,0,0.06)" horizontal={false} />
            <XAxis type="number" tick={{ fill: "#64748b", fontSize: 11 }} />
            <YAxis type="category" dataKey="name" width={120} tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill="#1e3a5f" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass p-5">
        <h3 className="text-sm font-semibold text-slate-800">Исчерпание капитала, %</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={bustData} layout="vertical" margin={{ top: 18, left: 20, right: 24, bottom: 8 }}>
            <CartesianGrid stroke="rgba(0,0,0,0.06)" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 11 }} />
            <YAxis type="category" dataKey="name" width={120} tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill="#64748b" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

```

---

## src/components/Navbar.tsx

```typescript
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Главная", end: true },
  { to: "/theory", label: "Теория" },
  { to: "/games", label: "Программа" },
  { to: "/results", label: "Итоги" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-navbar fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto flex h-[58px] max-w-6xl items-stretch px-4 md:px-6">
        <NavLink to="/" className="flex items-center gap-2.5 no-underline">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-sm font-black text-navy">
            А
          </span>
          <div className="hidden sm:block">
            <span className="block text-sm font-bold text-white">
              Анализ гемблинга
            </span>
            <span className="block text-[10px] text-white/55">Дипломная работа · 2026</span>
          </div>
        </NavLink>

        <nav className="mx-auto hidden items-stretch md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/games" className="btn-primary my-2 hidden !px-4 !py-2 text-xs md:inline-flex">
          Программа
        </NavLink>

        <button
          type="button"
          className="ml-auto flex h-10 w-10 items-center justify-center text-white md:ml-0 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-navy-light px-4 py-3 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2.5 text-sm no-underline ${isActive ? "font-semibold text-gold" : "text-white/70"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/games" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full text-center text-sm">
            Программа
          </NavLink>
        </nav>
      )}
    </header>
  );
}

```

---

## src/components/PageHeader.tsx

```typescript
interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <header className="page-header">
      <p className="section-label">{label}</p>
      <h1 className="heading-xl mt-1">{title}</h1>
      {description && <p className="body-text mt-2 max-w-2xl">{description}</p>}
    </header>
  );
}

```

---

## src/components/SectionHeader.tsx

```typescript
interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  light?: boolean;
}

export function SectionHeader({ label, title, description, light }: SectionHeaderProps) {
  return (
    <div className={`section-header ${light ? "section-header-light" : ""}`}>
      {label && <p className="section-label">{label}</p>}
      <h2 className={`heading-lg ${label ? "mt-2" : ""}`}>{title}</h2>
      {description && <p className="body-text mt-2 max-w-2xl">{description}</p>}
    </div>
  );
}

```

---

## src/components/StatCard.tsx

```typescript
interface StatCardProps {
  title: string;
  value: string;
  hint?: string;
  valueClassName?: string;
}

export function StatCard({ title, value, hint, valueClassName = "" }: StatCardProps) {
  return (
    <div className="glass p-5 transition hover:shadow-lift">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</p>
      <p className={`mt-2 text-2xl font-bold text-slate-900 ${valueClassName}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

```

---

## src/components/controls/ControlSidebar.tsx

```typescript
import { motion } from "framer-motion";
import { RotateCcw, SlidersHorizontal, Zap } from "lucide-react";
import { getStrategyDescription, getStrategyName } from "../../math/bettingStrategies";
import { RANDOMIZER_META } from "../../math/researchEngine";
import { useTelemetry } from "../../state/useTelemetry";
import type { BettingStrategyId, RandomizerId } from "../../types/simulation";

const randomizers = Object.values(RANDOMIZER_META);
const strategies: BettingStrategyId[] = ["flat", "martingale", "dalembert"];

export function ControlSidebar() {
  const {
    settings,
    updateSettings,
    setRandomizer,
    setStrategy,
    applyCustomRule,
    topUp,
    resetSession,
  } = useTelemetry();

  return (
    <aside className="h-full overflow-y-auto border-r border-white/5 bg-slate-950/50 p-4 backdrop-blur-2xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300/80">Механизм RNG</p>
        <div className="mt-3 space-y-2">
          {randomizers.map((item) => {
            const active = settings.activeRandomizer === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setRandomizer(item.id as RandomizerId)}
                className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
                  active
                    ? "border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_28px_rgba(34,211,238,0.12)]"
                    : "border-white/5 bg-slate-900/40 hover:border-white/15"
                }`}
              >
                <p className={active ? "text-sm font-semibold text-cyan-100" : "text-sm font-semibold text-slate-100"}>
                  {item.shortTitle}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-slate-400">{item.subtitle}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-violet-300" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">Параметры</p>
        </div>

        <NumberField
          label="Начальный баланс"
          value={settings.initialBalance}
          min={100}
          step={100}
          onChange={(value) => updateSettings({ initialBalance: value, balance: value })}
        />
        <NumberField
          label="Базовая ставка"
          value={settings.baseBet}
          min={1}
          step={10}
          onChange={(value) => updateSettings({ baseBet: value })}
        />
        <NumberField
          label="Seed LCG"
          value={settings.lcgSeed}
          min={1}
          step={1}
          onChange={(value) => updateSettings({ lcgSeed: value })}
        />

        {settings.activeRandomizer === "csprng" && (
          <NumberField
            label="Cash-out множитель"
            value={settings.crashCashOut}
            min={1.1}
            step={0.1}
            onChange={(value) => updateSettings({ crashCashOut: value })}
          />
        )}

        {settings.activeRandomizer === "provablyFair" && (
          <NumberField
            label="Порог dice"
            value={settings.diceThreshold}
            min={5}
            max={95}
            step={1}
            onChange={(value) => updateSettings({ diceThreshold: value })}
          />
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">Стратегия ставок</p>
        <div className="mt-3 space-y-2">
          {strategies.map((strategy) => (
            <button
              key={strategy}
              type="button"
              onClick={() => setStrategy(strategy)}
              className={`w-full rounded-xl border px-3 py-2 text-left text-xs transition ${
                settings.strategy === strategy
                  ? "border-violet-400/50 bg-violet-400/10 text-violet-100"
                  : "border-white/5 bg-slate-950/40 text-slate-300 hover:border-white/15"
              }`}
            >
              <span className="font-semibold">{getStrategyName(strategy)}</span>
              <span className="mt-1 block text-[11px] text-slate-500">{getStrategyDescription(strategy)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4">
        <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
          Компилятор правил
        </label>
        <textarea
          value={settings.customRule}
          onChange={(event) => updateSettings({ customRule: event.target.value })}
          className="mt-3 h-28 w-full resize-none rounded-xl border border-white/10 bg-slate-950/60 p-3 text-xs leading-relaxed text-slate-200 outline-none focus:border-cyan-400/40"
        />
        <button
          type="button"
          onClick={() => applyCustomRule(settings.customRule)}
          className="mt-3 w-full rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Применить правило
        </button>
        <p className="mt-3 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-[11px] leading-relaxed text-amber-100">
          Предупреждение: изменение правил может формировать иллюзию контроля, но не отменяет
          отрицательное математическое ожидание.
        </p>
      </div>

      <div className="mt-4 space-y-2">
        <motion.button
          type="button"
          onClick={topUp}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm font-semibold text-amber-100"
        >
          <Zap className="h-4 w-4" />
          Симулировать дофаминовое пополнение
        </motion.button>
        <button
          type="button"
          onClick={resetSession}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm font-semibold text-slate-200"
        >
          <RotateCcw className="h-4 w-4" />
          Сбросить сессию
        </button>
      </div>
    </aside>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max?: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-slate-400">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Math.max(min, Number(event.target.value) || min))}
        className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/40"
      />
    </label>
  );
}

```

---

## src/components/games/CryptoDice.tsx

```typescript
import type { ProvablyFairState } from "../../types";

interface CryptoDiceProps {
  lastResult: string | null;
  isRolling: boolean;
  provablyFair: ProvablyFairState;
  diceThreshold: number;
  onRotateSeeds: () => void;
  onRevealSeed: () => void;
}

function parseRoll(message: string | null): number | null {
  if (!message) return null;
  const match = message.match(/значение=(\d+)/i);
  return match ? parseInt(match[1], 10) : null;
}

function parseHash(message: string | null): string | null {
  if (!message) return null;
  const match = message.match(/хеш=([a-f0-9]+)/i);
  return match?.[1] ?? null;
}

export function CryptoDice({
  lastResult,
  isRolling,
  provablyFair,
  diceThreshold,
  onRotateSeeds,
  onRevealSeed,
}: CryptoDiceProps) {
  const roll = parseRoll(lastResult);
  const hash = parseHash(lastResult);
  const isWin = lastResult?.includes("положительный") ?? false;

  return (
    <div className="lab-module-frame">
      <div className="mb-4 border-b border-slate-200 pb-3">
        <h3 className="text-sm font-semibold text-slate-800">Модуль IV — Provably Fair</h3>
        <p className="mt-1 text-xs text-slate-500">
          Верифицируемый исход на базе SHA-256(serverSeed + clientSeed + nonce)
        </p>
      </div>

      <table className="lab-data-table mb-4 text-xs">
        <tbody>
          <tr>
            <td className="w-40 font-medium text-slate-600">Хеш server seed</td>
            <td className="break-all font-mono text-[11px]">{provablyFair.serverSeedHash || "—"}</td>
          </tr>
          <tr>
            <td className="font-medium text-slate-600">Client seed</td>
            <td className="break-all font-mono text-[11px]">{provablyFair.clientSeed || "—"}</td>
          </tr>
          <tr>
            <td className="font-medium text-slate-600">Nonce</td>
            <td className="font-mono">{provablyFair.nonce}</td>
          </tr>
          {provablyFair.revealed && (
            <tr>
              <td className="font-medium text-slate-600">Server seed (раскрыт)</td>
              <td className="break-all font-mono text-[11px] text-emerald-700">{provablyFair.serverSeed}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mb-4 flex gap-2">
        <button type="button" onClick={onRotateSeeds} className="lab-btn-secondary text-xs">
          Сгенерировать новые seed
        </button>
        <button type="button" onClick={onRevealSeed} className="lab-btn-secondary text-xs">
          Раскрыть server seed
        </button>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-center">
          <span className="text-xs text-slate-500">Порог</span>
          <p className="font-mono font-semibold">≥ {diceThreshold}</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-center">
          <span className="text-xs text-slate-500">Значение</span>
          <p className="font-mono font-semibold">{isRolling ? "…" : roll ?? "—"}</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-center">
          <span className="text-xs text-slate-500">SHA-256</span>
          <p className="truncate font-mono text-[10px]">{hash ? `${hash}…` : "—"}</p>
        </div>
      </div>

      {lastResult && !isRolling && (
        <div
          className={`rounded-md border px-4 py-3 text-sm ${
            isWin ? "border-emerald-200 bg-emerald-50 lab-result-positive" : "border-red-200 bg-red-50 lab-result-negative"
          }`}
        >
          {lastResult}
        </div>
      )}
    </div>
  );
}

```

---

## src/components/games/CryptoDice/CryptoDice.tsx

```typescript
import { motion } from "framer-motion";
import { Fingerprint, RefreshCw } from "lucide-react";
import { RANDOMIZER_META } from "../../../math/researchEngine";
import { useTelemetry } from "../../../state/useTelemetry";

export function CryptoDice() {
  const {
    settings,
    serverHash,
    clientSeed,
    nonce,
    setClientSeed,
    rotateProvablyFairSeeds,
    lastOutcome,
    isRoundRunning,
  } = useTelemetry();
  const roll = lastOutcome?.details.roll ?? "—";
  const hash = lastOutcome?.details.hash ?? "—";

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300/80">Механизм 4</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Provably Fair SHA-256 Dice</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              {RANDOMIZER_META.provablyFair.researchFocus}
            </p>
          </div>
          <Fingerprint className="h-8 w-8 text-violet-200" />
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_220px]">
          <div className="space-y-4 rounded-2xl border border-white/5 bg-slate-950/60 p-4">
            <ReadOnlyField label="Server seed hash (preview до броска)" value={serverHash || "генерация…"} />
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-[0.18em] text-slate-500">Client seed</span>
              <input
                value={clientSeed}
                onChange={(event) => setClientSeed(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 font-mono text-xs text-slate-100 outline-none focus:border-violet-300/40"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              <ReadOnlyField label="Nonce" value={String(nonce)} />
              <ReadOnlyField label="Порог" value={`≥ ${settings.diceThreshold}`} />
              <ReadOnlyField label="Hash фрагмент" value={String(hash)} />
            </div>
            <button
              type="button"
              onClick={() => void rotateProvablyFairSeeds()}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200"
            >
              <RefreshCw className="h-4 w-4" />
              Новые seed
            </button>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-slate-950/60 p-5">
            <motion.div
              animate={isRoundRunning ? { y: [0, -18, 0], rotate: [0, 8, -8, 0] } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.7 }}
              className="flex h-28 w-28 items-center justify-center rounded-3xl border border-violet-300/30 bg-violet-300/10 text-5xl font-black text-violet-100 shadow-[0_0_40px_rgba(167,139,250,0.15)]"
            >
              {isRoundRunning ? "…" : roll}
            </motion.div>
            <p className="mt-4 text-center text-xs leading-relaxed text-slate-400">
              Исход детерминированно вычисляется из SHA-256(serverSeed + clientSeed + nonce).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="overflow-hidden text-ellipsis rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 font-mono text-xs text-slate-200">
        {value}
      </p>
    </div>
  );
}

```

---

## src/components/games/CyberWheel.tsx

```typescript
import { WHEEL_SECTORS } from "../../math/weightedWheel";

interface CyberWheelProps {
  lastResult: string | null;
  isSpinning: boolean;
}

function parseSector(message: string | null): string | null {
  if (!message) return null;
  const match = message.match(/сектор «([^»]+)»/i);
  return match?.[1] ?? null;
}

export function CyberWheel({ lastResult, isSpinning }: CyberWheelProps) {
  const sectorLabel = parseSector(lastResult);
  const sector = sectorLabel ? WHEEL_SECTORS.find((s) => s.label === sectorLabel) : null;
  const isNearMiss = lastResult?.includes("near-miss") ?? false;
  const isWin = lastResult?.includes("положительный") ?? false;

  return (
    <div className="lab-module-frame">
      <div className="mb-4 border-b border-slate-200 pb-3">
        <h3 className="text-sm font-semibold text-slate-800">Модуль III — Weighted RNG</h3>
        <p className="mt-1 text-xs text-slate-500">
          Взвешенное секторное распределение с возможным near-miss эффектом
        </p>
      </div>

      <table className="lab-data-table mb-4">
        <thead>
          <tr>
            <th>Сектор</th>
            <th>Вес</th>
            <th>Множитель</th>
            <th>Near-miss</th>
          </tr>
        </thead>
        <tbody>
          {WHEEL_SECTORS.map((s) => (
            <tr
              key={s.id}
              className={sector?.id === s.id ? "bg-slate-100 font-semibold" : ""}
            >
              <td>{s.label}</td>
              <td className="font-mono">{s.weight}</td>
              <td className="font-mono">×{s.multiplier}</td>
              <td>{s.isJackpot ? "—" : s.multiplier === 0 ? "возможен" : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="text-xs text-slate-500">Выбранный сектор</span>
          <p className="font-semibold text-slate-800">
            {isSpinning ? "…" : sectorLabel ?? "—"}
          </p>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="text-xs text-slate-500">Near-miss</span>
          <p className="font-semibold text-slate-800">
            {isSpinning ? "…" : isNearMiss ? "Зафиксирован" : "Не зафиксирован"}
          </p>
        </div>
      </div>

      {lastResult && !isSpinning && (
        <div
          className={`rounded-md border px-4 py-3 text-sm ${
            isWin
              ? "border-emerald-200 bg-emerald-50 lab-result-positive"
              : isNearMiss
                ? "border-amber-200 bg-amber-50 text-amber-800"
                : "border-slate-200 bg-slate-50 lab-result-neutral"
          }`}
        >
          {lastResult}
        </div>
      )}
    </div>
  );
}

```

---

## src/components/games/CyberWheel/CyberWheel.tsx

```typescript
import { motion } from "framer-motion";
import { WEIGHTED_SECTORS } from "../../../math/weightedRandom";
import { RANDOMIZER_META } from "../../../math/researchEngine";
import { useTelemetry } from "../../../state/useTelemetry";

export function CyberWheel() {
  const { lastOutcome, isRoundRunning } = useTelemetry();
  const dopamine = Number(lastOutcome?.details.dopamineSpike ?? 0);
  const selectedSector = String(lastOutcome?.details.sector ?? "—");
  const slice = 360 / WEIGHTED_SECTORS.length;

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300/80">Механизм 3</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Weighted Dynamic Randomizer</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              {RANDOMIZER_META.weighted.researchFocus}
            </p>
          </div>
          <span className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-xs font-semibold text-red-200">
            RTP 88%
          </span>
        </div>

        <div className="grid items-center gap-6 lg:grid-cols-[330px_1fr]">
          <div className="relative mx-auto h-72 w-72">
            <div className="absolute left-1/2 top-0 z-20 h-0 w-0 -translate-x-1/2 border-x-[10px] border-b-[18px] border-x-transparent border-b-cyan-300" />
            <motion.svg
              viewBox="0 0 200 200"
              className="h-full w-full rounded-full border border-white/10 bg-slate-950 shadow-[0_0_60px_rgba(16,185,129,0.12)]"
              animate={{ rotate: isRoundRunning ? 1440 : 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            >
              {WEIGHTED_SECTORS.map((sector, index) => {
                const start = (index * slice - 90) * (Math.PI / 180);
                const end = ((index + 1) * slice - 90) * (Math.PI / 180);
                const x1 = 100 + 92 * Math.cos(start);
                const y1 = 100 + 92 * Math.sin(start);
                const x2 = 100 + 92 * Math.cos(end);
                const y2 = 100 + 92 * Math.sin(end);
                const labelAngle = ((index + 0.5) * slice - 90) * (Math.PI / 180);
                return (
                  <g key={sector.id}>
                    <path d={`M100 100 L${x1} ${y1} A92 92 0 0 1 ${x2} ${y2} Z`} fill={sector.color} opacity={0.8} />
                    <text
                      x={100 + 57 * Math.cos(labelAngle)}
                      y={100 + 57 * Math.sin(labelAngle)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="7"
                      fill="white"
                      fontWeight={700}
                    >
                      {sector.label}
                    </text>
                  </g>
                );
              })}
              <circle cx="100" cy="100" r="20" fill="#020617" stroke="rgba(255,255,255,0.25)" />
            </motion.svg>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Выбранный сектор</p>
              <p className="mt-2 text-3xl font-black text-white">{selectedSector}</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
              <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                <span>Индикатор дофаминового подкрепления</span>
                <span>{dopamine}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400"
                  animate={{ width: `${dopamine}%` }}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-50">
              Near-miss предупреждение: высокий визуальный сектор рядом с выигрышем повышает субъективную
              мотивацию продолжать, хотя финансовый исход остаётся отрицательным.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

## src/components/games/GameModuleVisual.tsx

```typescript
import { useEffect, useState } from "react";
import type { SlotSymbol } from "../../math/lcg";
import { SLOT_SYMBOLS } from "../../math/lcg";
import { WHEEL_SECTORS } from "../../math/weightedWheel";
import type { MechanismId, ProvablyFairState } from "../../types";

interface GameModuleVisualProps {
  mechanism: MechanismId;
  lastResult: string | null;
  isPlaying: boolean;
  crashTarget: number;
  diceThreshold: number;
  provablyFair: ProvablyFairState;
}

const SYMBOL_LABELS: Record<SlotSymbol, string> = {
  "7": "7",
  BAR: "BAR",
  CH: "Вишня",
  LM: "Лимон",
  OR: "Апельсин",
};

const SYMBOL_COLORS: Record<SlotSymbol, string> = {
  "7": "#c9a227",
  BAR: "#1e3a5f",
  CH: "#dc2626",
  LM: "#eab308",
  OR: "#f97316",
};

const TAB_ACCENTS: Record<MechanismId, string> = {
  lcg: "#1e3a5f",
  csprng: "#0d9488",
  provablyFair: "#7c3aed",
  weightedWheel: "#c2410c",
};

function parseReels(message: string | null): [SlotSymbol, SlotSymbol, SlotSymbol] | null {
  if (!message) return null;
  const match = message.match(/комбинация:\s*([^.]+\S)/i);
  if (!match) return null;
  const parts = match[1].split("|").map((s) => s.trim()) as SlotSymbol[];
  if (parts.length === 3 && parts.every((p) => SLOT_SYMBOLS.includes(p))) {
    return [parts[0], parts[1], parts[2]];
  }
  return null;
}

function parseCrashValue(message: string | null): number | null {
  if (!message) return null;
  const match = message.match(/[Зз]начение\s+([\d.]+)/);
  return match ? parseFloat(match[1]) : null;
}

function parseSector(message: string | null): string | null {
  if (!message) return null;
  const match = message.match(/сектор «([^»]+)»/i);
  return match?.[1] ?? null;
}

function parseDiceValue(message: string | null): number | null {
  if (!message) return null;
  const match = message.match(/[Зз]начение\s+(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function outcomeTone(lastResult: string | null): "win" | "near" | "loss" | "idle" {
  if (!lastResult) return "idle";
  if (lastResult.includes("положительный")) return "win";
  if (lastResult.includes("near") || lastResult.includes("Почти")) return "near";
  return "loss";
}

function ReelBox({
  symbol,
  spinning,
  accent,
}: {
  symbol: SlotSymbol | null;
  spinning: boolean;
  accent: string;
}) {
  return (
    <div
      className={`game-reel ${spinning ? "game-reel-spinning" : ""}`}
      style={{ borderColor: accent }}
    >
      {spinning ? (
        <span className="game-reel-placeholder">?</span>
      ) : symbol ? (
        <span className="game-reel-symbol" style={{ color: SYMBOL_COLORS[symbol] }}>
          {SYMBOL_LABELS[symbol]}
        </span>
      ) : (
        <span className="game-reel-placeholder">—</span>
      )}
    </div>
  );
}

function RouletteVisual({
  lastResult,
  isPlaying,
  accent,
}: {
  lastResult: string | null;
  isPlaying: boolean;
  accent: string;
}) {
  const reels = parseReels(lastResult);
  const tone = outcomeTone(lastResult);

  return (
    <div className="game-visual-inner">
      <div className="game-visual-header">
        <div className="game-visual-icon" style={{ background: `${accent}18`, color: accent }}>
          ◉
        </div>
        <div>
          <h3 className="game-visual-title">Рулетка — три случайных значения</h3>
          <p className="game-visual-subtitle">LCG PRNG генерирует последовательность, из неё формируется комбинация</p>
        </div>
      </div>

      <div className="game-roulette-layout">
        <div className="game-reels-row">
          <ReelBox symbol={reels?.[0] ?? null} spinning={isPlaying} accent={accent} />
          <ReelBox symbol={reels?.[1] ?? null} spinning={isPlaying} accent={accent} />
          <ReelBox symbol={reels?.[2] ?? null} spinning={isPlaying} accent={accent} />
        </div>

        <div className="game-wheel-schematic" style={{ borderColor: accent }}>
          <svg viewBox="0 0 120 120" className="h-full w-full">
            <circle cx="60" cy="60" r="52" fill="#f8fafc" stroke={accent} strokeWidth="3" />
            <circle cx="60" cy="60" r="36" fill="none" stroke="#cbd5e1" strokeWidth="2" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 60 + Math.cos(rad) * 20;
              const y1 = 60 + Math.sin(rad) * 20;
              const x2 = 60 + Math.cos(rad) * 48;
              const y2 = 60 + Math.sin(rad) * 48;
              return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth="1.5" />;
            })}
            <circle cx="60" cy="60" r="12" fill={accent} />
            <text x="60" y="64" textAnchor="middle" fontSize="8" fill="#fff">
              RNG
            </text>
          </svg>
        </div>
      </div>

      <OutcomeBadge tone={tone} isPlaying={isPlaying} lastResult={lastResult} idleText="Нажмите «Играть» — появятся три значения" />
    </div>
  );
}

function DiceVisual({
  lastResult,
  isPlaying,
  crashTarget,
  accent,
}: {
  lastResult: string | null;
  isPlaying: boolean;
  crashTarget: number;
  accent: string;
}) {
  const value = parseCrashValue(lastResult);
  const tone = outcomeTone(lastResult);
  const pct = value ? Math.min(100, (value / (crashTarget * 1.5)) * 100) : 0;
  const thresholdPct = Math.min(100, (crashTarget / (crashTarget * 1.5)) * 100);
  const dieFace = value ? Math.min(6, Math.max(1, Math.ceil((value / crashTarget) * 3))) : null;

  return (
    <div className="game-visual-inner">
      <div className="game-visual-header">
        <div className="game-visual-icon" style={{ background: `${accent}18`, color: accent }}>
          ⚀
        </div>
        <div>
          <h3 className="game-visual-title">Кости — случайное значение и порог</h3>
          <p className="game-visual-subtitle">CSPRNG создаёт непредсказуемое число, система сравнивает его с порогом</p>
        </div>
      </div>

      <div className="game-dice-layout">
        <div className="game-dice-pair">
          {[0, 1].map((i) => (
            <div key={i} className="game-die" style={{ borderColor: accent }}>
              {isPlaying ? (
                <span className="game-die-dots">···</span>
              ) : dieFace ? (
                <span className="game-die-face">{dieFace}</span>
              ) : (
                <span className="game-die-dots">?</span>
              )}
            </div>
          ))}
        </div>

        <div className="game-gauge">
          <div className="game-gauge-labels">
            <span>0</span>
            <span style={{ color: accent, fontWeight: 700 }}>Порог: {crashTarget.toFixed(2)}</span>
            <span>{(crashTarget * 1.5).toFixed(1)}</span>
          </div>
          <div className="game-gauge-track">
            <div className="game-gauge-threshold" style={{ left: `${thresholdPct}%`, borderColor: accent }} />
            {!isPlaying && value !== null && (
              <div
                className={`game-gauge-fill ${tone === "win" ? "game-gauge-fill-win" : "game-gauge-fill-loss"}`}
                style={{ width: `${pct}%`, background: tone === "win" ? "#22c55e" : "#ef4444" }}
              />
            )}
            {isPlaying && <div className="game-gauge-fill game-gauge-fill-pulse" style={{ background: accent }} />}
          </div>
          <p className="game-gauge-value">
            {isPlaying ? "Генерация значения…" : value !== null ? `Получено: ${value.toFixed(2)}` : "Ожидание раунда"}
          </p>
        </div>
      </div>

      <OutcomeBadge tone={tone} isPlaying={isPlaying} lastResult={lastResult} idleText="Запустите раунд — увидите значение и сравнение с порогом" />
    </div>
  );
}

function CardsVisual({
  lastResult,
  isPlaying,
  diceThreshold,
  provablyFair,
  accent,
}: {
  lastResult: string | null;
  isPlaying: boolean;
  diceThreshold: number;
  provablyFair: ProvablyFairState;
  accent: string;
}) {
  const value = parseDiceValue(lastResult);
  const tone = outcomeTone(lastResult);

  return (
    <div className="game-visual-inner">
      <div className="game-visual-header">
        <div className="game-visual-icon" style={{ background: `${accent}18`, color: accent }}>
          ♠
        </div>
        <div>
          <h3 className="game-visual-title">Карты — проверяемый исход</h3>
          <p className="game-visual-subtitle">Результат формируется прозрачно и может быть проверен по исходным данным</p>
        </div>
      </div>

      <div className="game-cards-layout">
        <div
          className={`game-playing-card ${tone === "win" ? "game-playing-card-win" : tone === "loss" ? "game-playing-card-loss" : ""}`}
          style={{ borderColor: accent }}
        >
          <span className="game-card-corner" style={{ color: accent }}>
            A
          </span>
          <span className="game-card-value">
            {isPlaying ? "…" : value !== null ? value : "?"}
          </span>
          <span className="game-card-suit" style={{ color: accent }}>
            ♠
          </span>
        </div>

        <div className="game-verify-flow">
          <div className="game-verify-step">
            <span className="game-verify-num">1</span>
            <span>Исходные данные раунда</span>
          </div>
          <div className="game-verify-arrow">→</div>
          <div className="game-verify-step">
            <span className="game-verify-num">2</span>
            <span>Проверка алгоритма</span>
          </div>
          <div className="game-verify-arrow">→</div>
          <div className="game-verify-step game-verify-step-active" style={{ borderColor: accent, color: accent }}>
            <span className="game-verify-num" style={{ background: accent }}>
              3
            </span>
            <span>Итог: {value ?? "—"}</span>
          </div>
        </div>
      </div>

      <div className="game-seed-info">
        <div>
          <span className="game-seed-label">Порог</span>
          <p className="game-seed-value">≥ {diceThreshold}</p>
        </div>
        <div>
          <span className="game-seed-label">Попытка</span>
          <p className="game-seed-value">№ {provablyFair.nonce}</p>
        </div>
        <div className="min-w-0 flex-1">
          <span className="game-seed-label">Код проверки</span>
          <p className="game-seed-value truncate font-mono text-xs">
            {provablyFair.serverSeedHash ? `${provablyFair.serverSeedHash.slice(0, 12)}…` : "—"}
          </p>
        </div>
      </div>

      <OutcomeBadge tone={tone} isPlaying={isPlaying} lastResult={lastResult} idleText="Запустите раунд — карта покажет проверяемое значение" />
    </div>
  );
}

function SlotVisual({
  lastResult,
  isPlaying,
  accent,
}: {
  lastResult: string | null;
  isPlaying: boolean;
  accent: string;
}) {
  const sectorLabel = parseSector(lastResult);
  const activeSector = sectorLabel ? WHEEL_SECTORS.find((s) => s.label === sectorLabel) : null;
  const tone = outcomeTone(lastResult);

  return (
    <div className="game-visual-inner">
      <div className="game-visual-header">
        <div className="game-visual-icon" style={{ background: `${accent}18`, color: accent }}>
          ◈
        </div>
        <div>
          <h3 className="game-visual-title">Слот — взвешенные секторы</h3>
          <p className="game-visual-subtitle">Каждый сектор имеет свой вес: одни исходы выпадают чаще других</p>
        </div>
      </div>

      <div className="game-slot-wheel-wrap">
        <svg viewBox="0 0 200 200" className="game-slot-wheel">
          {WHEEL_SECTORS.map((sector, i) => {
            const slice = 360 / WHEEL_SECTORS.length;
            const start = (i * slice - 90) * (Math.PI / 180);
            const end = ((i + 1) * slice - 90) * (Math.PI / 180);
            const r = 90;
            const cx = 100;
            const cy = 100;
            const x1 = cx + r * Math.cos(start);
            const y1 = cy + r * Math.sin(start);
            const x2 = cx + r * Math.cos(end);
            const y2 = cy + r * Math.sin(end);
            const large = slice > 180 ? 1 : 0;
            const isActive = activeSector?.id === sector.id;
            return (
              <path
                key={sector.id}
                d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
                fill={sector.color}
                opacity={isActive ? 1 : 0.55}
                stroke={isActive ? accent : "#fff"}
                strokeWidth={isActive ? 3 : 1}
              />
            );
          })}
          <circle cx="100" cy="100" r="22" fill="#fff" stroke={accent} strokeWidth="3" />
          <text x="100" y="105" textAnchor="middle" fontSize="10" fill={accent} fontWeight="700">
            {isPlaying ? "…" : activeSector?.label ?? "RNG"}
          </text>
        </svg>

        <div className="game-slot-legend">
          {WHEEL_SECTORS.filter((s) => s.isJackpot || s.multiplier >= 2).map((s) => (
            <div key={s.id} className="game-slot-legend-item">
              <span className="game-slot-dot" style={{ background: s.color }} />
              <span>{s.label}</span>
              <span className="text-slate-400">w={s.weight}</span>
            </div>
          ))}
        </div>
      </div>

      <OutcomeBadge tone={tone} isPlaying={isPlaying} lastResult={lastResult} idleText="Запустите раунд — колесо покажет выбранный сектор" />
    </div>
  );
}

function OutcomeBadge({
  tone,
  isPlaying,
  lastResult,
  idleText,
}: {
  tone: "win" | "near" | "loss" | "idle";
  isPlaying: boolean;
  lastResult: string | null;
  idleText: string;
}) {
  if (isPlaying) {
    return (
      <div className="game-outcome game-outcome-playing">
        <span className="game-outcome-pulse" />
        Выполняется раунд…
      </div>
    );
  }

  if (!lastResult) {
    return <div className="game-outcome game-outcome-idle">{idleText}</div>;
  }

  const cls =
    tone === "win"
      ? "game-outcome-win"
      : tone === "near"
        ? "game-outcome-near"
        : "game-outcome-loss";

  return <div className={`game-outcome ${cls}`}>{lastResult}</div>;
}

export function GameModuleVisual({
  mechanism,
  lastResult,
  isPlaying,
  crashTarget,
  diceThreshold,
  provablyFair,
}: GameModuleVisualProps) {
  const accent = TAB_ACCENTS[mechanism];
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!isPlaying && lastResult) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 600);
      return () => clearTimeout(t);
    }
  }, [isPlaying, lastResult]);

  return (
    <div className={`game-visual-panel ${flash ? "game-visual-flash" : ""}`} style={{ "--game-accent": accent } as React.CSSProperties}>
      {mechanism === "lcg" && <RouletteVisual lastResult={lastResult} isPlaying={isPlaying} accent={accent} />}
      {mechanism === "csprng" && (
        <DiceVisual lastResult={lastResult} isPlaying={isPlaying} crashTarget={crashTarget} accent={accent} />
      )}
      {mechanism === "provablyFair" && (
        <CardsVisual
          lastResult={lastResult}
          isPlaying={isPlaying}
          diceThreshold={diceThreshold}
          provablyFair={provablyFair}
          accent={accent}
        />
      )}
      {mechanism === "weightedWheel" && (
        <SlotVisual lastResult={lastResult} isPlaying={isPlaying} accent={accent} />
      )}
    </div>
  );
}

```

---

## src/components/games/GameWorkspace.tsx

```typescript
import { AnimatePresence, motion } from "framer-motion";
import { Play, TrendingDown } from "lucide-react";
import { CryptoDice } from "./CryptoDice/CryptoDice";
import { CyberWheel } from "./CyberWheel/CyberWheel";
import { QuantumCrash } from "./QuantumCrash/QuantumCrash";
import { RetroSlots } from "./RetroSlots/RetroSlots";
import { calculateNextBet } from "../../math/bettingStrategies";
import { RANDOMIZER_META } from "../../math/researchEngine";
import { useTelemetry } from "../../state/useTelemetry";

export function GameWorkspace() {
  const { settings, stats, previousBetUnavailable, lastOutcome, isRoundRunning, playRound } = useWorkspaceData();
  const meta = RANDOMIZER_META[settings.activeRandomizer];

  return (
    <main className="min-w-0 overflow-y-auto p-5 xl:p-6">
      <div className="mb-5 rounded-3xl border border-white/5 bg-slate-900/40 p-5 backdrop-blur-2xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300/80">
              Поведенческая телеметрия · активный модуль
            </p>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-white xl:text-3xl">{meta.title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">{meta.subtitle}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-950/70 px-5 py-4 text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Баланс</p>
            <p className="mt-1 text-3xl font-black tabular-nums text-white">
              {settings.balance.toLocaleString("ru-RU")} ₽
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <InfoPill label="Раундов" value={stats.totalRounds.toString()} />
          <InfoPill label="Серия проигрышей" value={stats.lossStreak.toString()} risk={stats.lossStreak >= 3} />
          <InfoPill label="Следующая ставка" value={`${previousBetUnavailable.toLocaleString("ru-RU")} ₽`} />
          <InfoPill label="Маржа системы" value={`${Math.round(stats.accumulatedHouseMargin).toLocaleString("ru-RU")} ₽`} risk />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={settings.activeRandomizer}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.22 }}
        >
          {settings.activeRandomizer === "lcg" && <RetroSlots />}
          {settings.activeRandomizer === "csprng" && <QuantumCrash />}
          {settings.activeRandomizer === "weighted" && <CyberWheel />}
          {settings.activeRandomizer === "provablyFair" && <CryptoDice />}
        </motion.div>
      </AnimatePresence>

      {lastOutcome && (
        <div className="mt-5 rounded-2xl border border-white/5 bg-slate-900/40 p-4 text-sm text-slate-300">
          <p className={lastOutcome.profit >= 0 ? "font-semibold text-emerald-300" : "font-semibold text-red-300"}>
            Последний исход: {lastOutcome.message}
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={settings.balance <= 0 || isRoundRunning}
          onClick={() => void playRound()}
          className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.22)] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Play className="h-4 w-4" />
          {isRoundRunning ? "Выполняется расчёт…" : "Выполнить научную итерацию"}
        </button>
        <div className="inline-flex items-center gap-2 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
          <TrendingDown className="h-4 w-4" />
          Демонстрация отрицательного математического ожидания
        </div>
      </div>
    </main>
  );
}

function useWorkspaceData() {
  const telemetry = useTelemetry();
  const nextBet = calculateNextBet(telemetry.settings.strategy, {
    balance: telemetry.settings.balance,
    baseBet: telemetry.settings.baseBet,
    previousBet: telemetry.settings.baseBet,
    lastRoundWon: null,
    lossStreak: telemetry.stats.lossStreak,
    maxBet: telemetry.settings.balance,
  }).nextBet;
  return { ...telemetry, previousBetUnavailable: nextBet };
}

function InfoPill({ label, value, risk = false }: { label: string; value: string; risk?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className={risk ? "mt-1 text-xl font-black text-red-200" : "mt-1 text-xl font-black text-white"}>{value}</p>
    </div>
  );
}

```

---

## src/components/games/QuantumCrash.tsx

```typescript
import { useEffect, useState } from "react";
import { Line, LineChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface QuantumCrashProps {
  lastResult: string | null;
  isPlaying: boolean;
  crashTarget: number;
}

function parseCrashData(message: string | null): { crashPoint: number; won: boolean } | null {
  if (!message) return null;
  const match = message.match(/t\*=([\d.]+)/i);
  if (!match) return null;
  return {
    crashPoint: parseFloat(match[1]),
    won: message.includes("положительный"),
  };
}

export function QuantumCrash({ lastResult, isPlaying, crashTarget }: QuantumCrashProps) {
  const parsed = parseCrashData(lastResult);
  const [chartData, setChartData] = useState<{ step: number; value: number }[]>([]);

  useEffect(() => {
    if (!isPlaying && parsed) {
      const points = Array.from({ length: 20 }, (_, i) => {
        const progress = (i + 1) / 20;
        const value = 1 + (parsed.crashPoint - 1) * progress;
        return { step: i + 1, value: Math.round(value * 100) / 100 };
      });
      setChartData(points);
    } else if (isPlaying) {
      setChartData([]);
    }
  }, [isPlaying, lastResult]); // eslint-disable-line react-hooks/exhaustive-deps

  const isWin = parsed?.won ?? false;

  return (
    <div className="lab-module-frame">
      <div className="mb-4 border-b border-slate-200 pb-3">
        <h3 className="text-sm font-semibold text-slate-800">Модуль II — CSPRNG</h3>
        <p className="mt-1 text-xs text-slate-500">
          Экспоненциальная модель прекращения роста (crypto.getRandomValues)
        </p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="text-xs text-slate-500">Порог фиксации t*</span>
          <p className="font-mono font-semibold text-slate-800">{crashTarget.toFixed(2)}</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="text-xs text-slate-500">Фактическое t*</span>
          <p className="font-mono font-semibold text-slate-800">
            {isPlaying ? "…" : parsed ? parsed.crashPoint.toFixed(2) : "—"}
          </p>
        </div>
      </div>

      <div className="mb-4 h-48 rounded-md border border-slate-200 bg-slate-50 p-2">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <XAxis dataKey="step" tick={{ fontSize: 10, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 10, fill: "#64748b" }} domain={[1, "auto"]} />
              <ReferenceLine y={crashTarget} stroke="#1e3a5f" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="value" stroke="#1e3a5f" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            {isPlaying ? "Выполняется итерация…" : "График траектории появится после итерации"}
          </div>
        )}
      </div>

      {lastResult && !isPlaying && (
        <div
          className={`rounded-md border px-4 py-3 text-sm ${
            isWin ? "border-emerald-200 bg-emerald-50 lab-result-positive" : "border-red-200 bg-red-50 lab-result-negative"
          }`}
        >
          {lastResult}
        </div>
      )}
    </div>
  );
}

```

---

## src/components/games/QuantumCrash/QuantumCrash.tsx

```typescript
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { RANDOMIZER_META } from "../../../math/researchEngine";
import { useTelemetry } from "../../../state/useTelemetry";

export function QuantumCrash() {
  const { settings, lastOutcome, isRoundRunning } = useTelemetry();
  const crashPoint = Number(lastOutcome?.details.crashPoint ?? 1);
  const points = Array.from({ length: 28 }, (_, index) => {
    const progress = (index + 1) / 28;
    return {
      step: index + 1,
      value: Math.max(1, 1 + (crashPoint - 1) * Math.pow(progress, 1.45)),
    };
  });

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300/80">Механизм 2</p>
            <h2 className="mt-2 text-2xl font-bold text-white">CSPRNG / Quantum Crash</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              {RANDOMIZER_META.csprng.researchFocus}
            </p>
          </div>
          <span className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-xs font-semibold text-red-200">
            EV −4%
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_220px]">
          <div className="h-72 rounded-2xl border border-white/5 bg-slate-950/60 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={points}>
                <defs>
                  <linearGradient id="crashLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="step" hide />
                <YAxis hide domain={[1, "auto"]} />
                <Area type="monotone" dataKey="value" stroke="#22d3ee" fill="url(#crashLine)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-white/5 bg-slate-950/60 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Multiplier</p>
            <motion.p
              animate={isRoundRunning ? { scale: [1, 1.06, 1] } : { scale: 1 }}
              transition={{ repeat: isRoundRunning ? Infinity : 0, duration: 0.7 }}
              className="mt-2 text-5xl font-black tabular-nums text-cyan-100"
            >
              {isRoundRunning ? "…" : `${crashPoint.toFixed(2)}×`}
            </motion.p>
            <p className="mt-4 text-sm text-slate-400">
              Целевой cash-out: <span className="font-semibold text-white">{settings.crashCashOut.toFixed(2)}×</span>
            </p>
            <button
              type="button"
              className="mt-5 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100"
            >
              Cash-out является параметром модели
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 text-sm leading-relaxed text-slate-300">
        Криптографически стойкий источник энтропии делает исход непредсказуемым, но отрицательное
        математическое ожидание задаётся правилами выплаты, а не качеством случайности.
      </div>
    </div>
  );
}

```

---

## src/components/games/RetroSlots.tsx

```typescript
import { useEffect, useRef, useState } from "react";
import type { SlotSymbol } from "../../math/lcg";
import { SLOT_SYMBOLS } from "../../math/lcg";

interface RetroSlotsProps {
  lastResult: string | null;
  isSpinning: boolean;
}

function parseReels(message: string | null): [SlotSymbol, SlotSymbol, SlotSymbol] | null {
  if (!message) return null;
  const match = message.match(/([7BARCHLMOR|]+)/);
  if (!match) return null;
  const parts = match[1].split("|").map((s) => s.trim()) as SlotSymbol[];
  if (parts.length === 3 && parts.every((p) => SLOT_SYMBOLS.includes(p))) {
    return [parts[0], parts[1], parts[2]];
  }
  return null;
}

export function RetroSlots({ lastResult, isSpinning }: RetroSlotsProps) {
  const parsed = parseReels(lastResult);
  const [displayReels, setDisplayReels] = useState<[SlotSymbol, SlotSymbol, SlotSymbol] | null>(parsed);
  const prevSpinning = useRef(false);

  useEffect(() => {
    if (isSpinning) {
      setDisplayReels(null);
    } else if (parsed) {
      setDisplayReels(parsed);
    }
    prevSpinning.current = isSpinning;
  }, [isSpinning, parsed]);

  const isWin = lastResult?.includes("положительный") ?? false;
  const isNearMiss = lastResult?.includes("near-miss") ?? false;

  return (
    <div className="lab-module-frame">
      <div className="mb-4 border-b border-slate-200 pb-3">
        <h3 className="text-sm font-semibold text-slate-800">Модуль I — LCG PRNG</h3>
        <p className="mt-1 text-xs text-slate-500">
          Трёхкомпонентная выборка на базе линейного конгруэнтного генератора
        </p>
      </div>

      <table className="lab-data-table mb-4">
        <thead>
          <tr>
            <th>Компонент</th>
            <th>R₁</th>
            <th>R₂</th>
            <th>R₃</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-medium text-slate-600">Значение</td>
            {isSpinning ? (
              <td colSpan={3} className="text-center text-slate-400 italic">
                Выполняется итерация…
              </td>
            ) : displayReels ? (
              displayReels.map((sym, i) => (
                <td key={i} className="text-center font-mono font-semibold">
                  {sym}
                </td>
              ))
            ) : (
              <td colSpan={3} className="text-center text-slate-400">
                Ожидание данных
              </td>
            )}
          </tr>
        </tbody>
      </table>

      {lastResult && !isSpinning && (
        <div
          className={`rounded-md border px-4 py-3 text-sm ${
            isWin
              ? "border-emerald-200 bg-emerald-50 lab-result-positive"
              : isNearMiss
                ? "border-amber-200 bg-amber-50 text-amber-800"
                : "border-slate-200 bg-slate-50 lab-result-neutral"
          }`}
        >
          {lastResult}
        </div>
      )}
    </div>
  );
}

```

---

## src/components/games/RetroSlots/RetroSlots.tsx

```typescript
import { motion } from "framer-motion";
import { useMemo } from "react";
import { RANDOMIZER_META } from "../../../math/researchEngine";
import { useTelemetry } from "../../../state/useTelemetry";

const symbols = ["Σ", "μ", "σ", "R", "λ", "7"];

export function RetroSlots() {
  const { lastOutcome, isRoundRunning } = useTelemetry();
  const displayed = useMemo(() => {
    const reels = String(lastOutcome?.details.reels ?? "Σ, μ, σ").split(", ");
    return reels.length === 3 ? reels : ["Σ", "μ", "σ"];
  }, [lastOutcome]);

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300/80">Механизм 1</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Seedable PRNG / LCG</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              {RANDOMIZER_META.lcg.researchFocus}
            </p>
          </div>
          <span className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-xs font-semibold text-red-200">
            EV −12%
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {displayed.map((symbol, index) => (
            <div
              key={`${symbol}-${index}`}
              className="relative h-36 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70"
            >
              <motion.div
                className="flex flex-col items-center"
                animate={isRoundRunning ? { y: [0, -520, 0] } : { y: 0 }}
                transition={{ duration: 0.9 + index * 0.12, ease: "easeInOut" }}
              >
                {(isRoundRunning ? Array.from({ length: 8 }, (_, i) => symbols[i % symbols.length]) : [symbol]).map(
                  (item, itemIndex) => (
                    <div
                      key={`${item}-${itemIndex}`}
                      className="flex h-36 w-full items-center justify-center font-mono text-4xl font-black text-cyan-100"
                    >
                      {item}
                    </div>
                  ),
                )}
              </motion.div>
              <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-300/30" />
            </div>
          ))}
        </div>
      </div>

      <ScientificExplanation
        title="Научная интерпретация"
        text="LCG позволяет воспроизвести последовательность по seed. Предсказуемость или равномерность генератора не меняет правила выплат: при house edge капитал убывает на длинной дистанции."
      />
    </div>
  );
}

function ScientificExplanation({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 text-sm leading-relaxed text-slate-300">
      <p className="mb-1 font-semibold text-white">{title}</p>
      {text}
    </div>
  );
}

```

---

## src/components/home/HomeFlowDiagram.tsx

```typescript
import { ArrowRight, BarChart3, Brain, Dices, Target } from "lucide-react";

const STEPS = [
  {
    icon: Target,
    title: "Входные параметры",
    text: "Баланс, ставка, стратегия",
    color: "#1e3a5f",
    bg: "#eff6ff",
  },
  {
    icon: Dices,
    title: "4 механизма RNG",
    text: "Рулетка, кости, карты, слот",
    color: "#0d9488",
    bg: "#f0fdfa",
  },
  {
    icon: Brain,
    title: "Поведенческая телеметрия",
    text: "Серии, пополнения, near-miss",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: BarChart3,
    title: "Монте-Карло",
    text: "50 траекторий на механизм",
    color: "#c2410c",
    bg: "#fff7ed",
  },
];

export function HomeFlowDiagram() {
  return (
    <div className="home-flow">
      <div className="home-flow-badge">
        <span className="home-flow-badge-dot" />
        Научная демонстрация · не азартная игра
      </div>

      <div className="home-flow-grid">
        {STEPS.map((step, index) => (
          <div key={step.title} className="home-flow-item-wrap">
            <article
              className="home-flow-item"
              style={{ background: step.bg, borderColor: `${step.color}33` }}
            >
              <div className="home-flow-icon" style={{ background: `${step.color}18`, color: step.color }}>
                <step.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <h3 className="home-flow-title" style={{ color: step.color }}>
                  {step.title}
                </h3>
                <p className="home-flow-text">{step.text}</p>
              </div>
            </article>
            {index < STEPS.length - 1 && (
              <div className="home-flow-arrow hidden lg:flex">
                <ArrowRight className="h-5 w-5 text-slate-300" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="home-flow-result">
        <div className="home-flow-result-icon">↓</div>
        <div className="home-flow-result-box">
          <p className="home-flow-result-label">Главный вывод исследования</p>
          <p className="home-flow-result-value">На длинной серии итог ниже нуля при любом механизме</p>
        </div>
      </div>
    </div>
  );
}

```

---

## src/components/home/HomeQuickNav.tsx

```typescript
import { ArrowRight, BarChart3, BookOpen, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  {
    to: "/theory",
    icon: BookOpen,
    label: "Теория",
    title: "Теоретическая часть",
    description: "Понятия лудомании, механизмы RNG и интерпретация поведения пользователя",
    color: "#1e3a5f",
    gradient: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    accent: "#3b82f6",
  },
  {
    to: "/games",
    icon: Gamepad2,
    label: "Программа",
    title: "Практическая часть",
    description: "Рулетка, кости, карты и слот — четыре демонстрационных модуля с живой визуализацией",
    color: "#0d9488",
    gradient: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)",
    accent: "#14b8a6",
    featured: true,
  },
  {
    to: "/results",
    icon: BarChart3,
    label: "Итоги",
    title: "Результаты анализа",
    description: "Сводка по всем модулям, диаграмма Монте-Карло и сравнение механизмов",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
    accent: "#8b5cf6",
  },
];

export function HomeQuickNav() {
  return (
    <div className="home-quick-nav">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`home-nav-card group no-underline ${item.featured ? "home-nav-card-featured" : ""}`}
          style={{ background: item.gradient }}
        >
          {item.featured && <span className="home-nav-card-badge">Начать здесь</span>}
          <div className="home-nav-card-icon" style={{ background: `${item.accent}22`, color: item.accent }}>
            <item.icon className="h-6 w-6" strokeWidth={2} />
          </div>
          <p className="home-nav-card-label" style={{ color: item.color }}>
            {item.label}
          </p>
          <h3 className="home-nav-card-title">{item.title}</h3>
          <p className="home-nav-card-desc">{item.description}</p>
          <span className="home-nav-card-link" style={{ color: item.accent }}>
            Перейти
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}

```

---

## src/components/lab/BankruptcyAlert.tsx

```typescript
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useTelemetry } from "../../context/TelemetryContext";

export function BankruptcyAlert() {
  const { showBankruptcyAlert, topUp, dismissBankruptcyAlert, params } = useTelemetry();

  return (
    <AnimatePresence>
      {showBankruptcyAlert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40"
        >
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            className="mx-4 max-w-lg rounded-lg border border-slate-200 bg-white p-6 shadow-lg"
          >
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-md bg-red-50 p-2">
                <AlertTriangle className="h-5 w-5 text-red-700" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Исчерпание экспериментального капитала
                </h3>
                <p className="mt-1 text-sm text-slate-500">Баланс сессии = 0 ₽</p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-slate-600">
              Зафиксировано полное исчерпание капитала при отрицательном математическом ожидании.
              Повторное пополнение моделирует поведенческий паттерн «chasing losses»
              (попытка компенсировать потери).
            </p>

            <div className="flex gap-3">
              <button type="button" onClick={topUp} className="lab-btn-primary flex-1">
                Пополнить +{params.initialBalance.toLocaleString("ru-RU")} ₽
              </button>
              <button type="button" onClick={dismissBankruptcyAlert} className="lab-btn-secondary">
                Закрыть
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

---

## src/components/lab/ControlSidebar.tsx

```typescript
import { RefreshCw, RotateCcw, Wallet } from "lucide-react";
import { useTelemetry } from "../../context/TelemetryContext";
import { getStrategyDescription, getStrategyLabel } from "../../math/betting";
import { ALL_MECHANISM_IDS, MECHANISMS } from "../../math/mechanisms";
import type { BettingStrategy } from "../../types";
import { RuleCompiler } from "./RuleCompiler";

const STRATEGIES: BettingStrategy[] = ["flat", "martingale", "dalembert"];

export function ControlSidebar() {
  const {
    activeMechanism,
    setActiveMechanism,
    params,
    setParams,
    topUp,
    resetSession,
    sessions,
    showBankruptcyAlert,
  } = useTelemetry();

  const session = sessions[activeMechanism];

  return (
    <aside className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <div>
        <p className="lab-label">Механизмы рандомизации</p>
        <div className="mt-2 space-y-1">
          {ALL_MECHANISM_IDS.map((id) => {
            const m = MECHANISMS[id];
            const active = activeMechanism === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveMechanism(id)}
                className={`w-full rounded-md border px-3 py-2.5 text-left transition ${
                  active
                    ? "border-[#1e3a5f] bg-slate-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <p className={`text-sm font-medium ${active ? "text-[#1e3a5f]" : "text-slate-800"}`}>
                  {m.label}
                </p>
                <p className="text-[11px] text-slate-500">{m.technicalName}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lab-panel">
        <p className="lab-label">Параметры эксперимента</p>

        <label className="lab-field">
          <span>Начальный капитал, ₽</span>
          <input
            type="number"
            min={100}
            step={100}
            value={params.initialBalance}
            onChange={(e) =>
              setParams({ initialBalance: Math.max(100, Number(e.target.value) || 100) })
            }
            className="lab-input"
          />
        </label>

        <label className="lab-field">
          <span>Базовый размер ставки, ₽</span>
          <input
            type="number"
            min={1}
            value={params.baseBet}
            onChange={(e) => setParams({ baseBet: Math.max(1, Number(e.target.value) || 1) })}
            className="lab-input"
          />
        </label>

        <div className="lab-field">
          <span>Стратегия управления ставкой</span>
          <div className="mt-1.5 space-y-1">
            {STRATEGIES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setParams({ strategy: s })}
                className={`w-full rounded-md border px-3 py-2 text-left text-xs transition ${
                  params.strategy === s
                    ? "border-[#1e3a5f] bg-slate-50 text-[#1e3a5f]"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <span className="font-medium">{getStrategyLabel(s)}</span>
                <p className="mt-0.5 text-[11px] text-slate-500">{getStrategyDescription(s)}</p>
              </button>
            ))}
          </div>
        </div>

        {activeMechanism === "csprng" && (
          <label className="lab-field">
            <span>Порог фиксации t* (CSPRNG)</span>
            <input
              type="number"
              min={1.1}
              max={10}
              step={0.1}
              value={params.crashTarget}
              onChange={(e) =>
                setParams({ crashTarget: Math.min(10, Math.max(1.1, Number(e.target.value) || 2)) })
              }
              className="lab-input"
            />
          </label>
        )}
      </div>

      <RuleCompiler />

      <div className="mt-auto space-y-2">
        <button
          type="button"
          onClick={topUp}
          className={`lab-btn-accent w-full ${showBankruptcyAlert ? "border-amber-400 bg-amber-50" : ""}`}
        >
          <RotateCcw className="h-4 w-4" />
          Симуляция повторного пополнения счёта
        </button>

        <button type="button" onClick={resetSession} className="lab-btn-secondary w-full">
          <RefreshCw className="h-4 w-4" />
          Сброс экспериментальной сессии
        </button>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Wallet className="h-3.5 w-3.5" />
            <span>Внесено средств: {session.totalDeposited.toLocaleString("ru-RU")} ₽</span>
          </div>
          <p className="mt-1">Количество пополнений: {session.topUpCount}</p>
        </div>
      </div>
    </aside>
  );
}

```

---

## src/components/lab/LabDashboard.tsx

```typescript
import { ControlSidebar } from "./ControlSidebar";
import { MechanismShell } from "./MechanismShell";
import { TelemetryPanel } from "./TelemetryPanel";
import { BankruptcyAlert } from "./BankruptcyAlert";

export function LabDashboard() {
  return (
    <div className="lab-root">
      <header className="lab-header">
        <div>
          <p className="lab-label">Программный комплекс · Практическая часть дипломной работы</p>
          <h1 className="text-base font-bold text-slate-900 md:text-lg">
            Исследовательская платформа анализа лудомании
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Сравнительный анализ четырёх механизмов генерации случайных чисел
          </p>
        </div>
        <div className="hidden text-right text-xs text-slate-500 md:block">
          <p className="font-medium text-slate-700">Дипломная работа · 2026</p>
          <p>Математическое ожидание E[Δ] &lt; 0 при всех механизмах</p>
        </div>
      </header>

      <div className="lab-grid">
        <div className="lab-sidebar-left">
          <ControlSidebar />
        </div>

        <main className="lab-center">
          <MechanismShell />
        </main>

        <div className="lab-sidebar-right">
          <TelemetryPanel />
        </div>
      </div>

      <BankruptcyAlert />
    </div>
  );
}

```

---

## src/components/lab/MechanismShell.tsx

```typescript
import { AnimatePresence, motion } from "framer-motion";
import { useTelemetry } from "../../context/TelemetryContext";
import { MECHANISMS } from "../../math/mechanisms";
import { CryptoDice } from "../games/CryptoDice";
import { CyberWheel } from "../games/CyberWheel";
import { QuantumCrash } from "../games/QuantumCrash";
import { RetroSlots } from "../games/RetroSlots";

export function MechanismShell() {
  const {
    activeMechanism,
    sessions,
    isPlaying,
    params,
    provablyFair,
    rotateSeeds,
    revealSeed,
    playGame,
    customRules,
  } = useTelemetry();

  const session = sessions[activeMechanism];
  const info = MECHANISMS[activeMechanism];
  const canPlay = session.balance > 0 && !isPlaying;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">{info.gameShell}</h2>
          <p className="mt-0.5 text-xs text-slate-500">{info.technicalName}</p>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-600">{info.description}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-slate-500">Текущий капитал</p>
          <p className="text-xl font-bold tabular-nums text-slate-900">
            {session.balance.toLocaleString("ru-RU")} ₽
          </p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-4 gap-2">
        {[
          { label: "Итераций", val: session.betsPlayed },
          { label: "Положит.", val: session.wins },
          { label: "Отрицат.", val: session.losses },
          { label: "Серия −", val: session.consecutiveLosses },
        ].map((s) => (
          <div key={s.label} className="lab-stat-pill">
            <p className="text-[10px] uppercase tracking-wide text-slate-500">{s.label}</p>
            <p className="text-lg font-semibold text-slate-900">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-1 items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMechanism}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {activeMechanism === "lcg" && (
              <RetroSlots lastResult={session.lastResult} isSpinning={isPlaying} />
            )}
            {activeMechanism === "csprng" && (
              <QuantumCrash
                lastResult={session.lastResult}
                isPlaying={isPlaying}
                crashTarget={params.crashTarget}
              />
            )}
            {activeMechanism === "weightedWheel" && (
              <CyberWheel lastResult={session.lastResult} isSpinning={isPlaying} />
            )}
            {activeMechanism === "provablyFair" && (
              <CryptoDice
                lastResult={session.lastResult}
                isRolling={isPlaying}
                provablyFair={provablyFair}
                diceThreshold={customRules.winThreshold}
                onRotateSeeds={() => void rotateSeeds()}
                onRevealSeed={revealSeed}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex gap-3 border-t border-slate-200 pt-4">
        <button
          type="button"
          disabled={!canPlay}
          onClick={() => void playGame()}
          className="lab-btn-primary flex-1 disabled:opacity-40"
        >
          {isPlaying
            ? "Выполняется итерация…"
            : session.balance <= 0
              ? "Капитал исчерпан"
              : "Выполнить итерацию"}
        </button>
      </div>
    </div>
  );
}

```

---

## src/components/lab/PsychLog.tsx

```typescript
import { FileText } from "lucide-react";
import { useTelemetry } from "../../context/TelemetryContext";

const TYPE_LABELS: Record<string, string> = {
  near_miss: "Near-miss",
  martingale_trap: "Мартингейл",
  illusion_of_control: "Иллюзия контроля",
  top_up: "Пополнение",
  bankruptcy: "Исчерпание капитала",
  win_streak: "Серия положит.",
  loss_streak: "Серия отрицат.",
  big_win: "Крупный исход",
  chase_loss: "Chasing losses",
  parameter_change: "Изменение параметра",
  dalembert_escalation: "Д'Аламбер",
};

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function PsychLog() {
  const { psychLog } = useTelemetry();

  return (
    <div className="lab-panel">
      <div className="mb-3 flex items-center gap-2">
        <FileText className="h-4 w-4 text-slate-500" />
        <p className="text-xs font-semibold text-slate-700">Журнал поведенческих наблюдений</p>
      </div>

      <div className="max-h-52 overflow-y-auto rounded-md border border-slate-200 bg-slate-50 p-2 font-mono text-[10px] leading-relaxed">
        {psychLog.length === 0 ? (
          <p className="p-2 text-slate-400">Ожидание событий экспериментальной сессии…</p>
        ) : (
          psychLog.map((event) => (
            <div key={event.id} className="border-b border-slate-200 py-2 last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">{formatTime(event.timestamp)}</span>
                <span className="font-semibold text-[#1e3a5f]">
                  [{TYPE_LABELS[event.type] ?? event.type}]
                </span>
              </div>
              <p className="mt-1 text-slate-700">{event.message}</p>
              {event.brainRegion && (
                <p className="mt-0.5 text-slate-500">Нейрокогнитивный коррелят: {event.brainRegion}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

```

---

## src/components/lab/RuleCompiler.tsx

```typescript
import { AlertTriangle } from "lucide-react";
import { useTelemetry } from "../../context/TelemetryContext";

export function RuleCompiler() {
  const { customRules, setCustomRules, activeMechanism } = useTelemetry();

  const showThreshold = activeMechanism === "provablyFair" || activeMechanism === "lcg";

  return (
    <div className="lab-panel">
      <p className="lab-label">Настройка условий исхода</p>
      <p className="mb-3 text-[11px] leading-relaxed text-slate-500">
        Изменение параметров моделирует субъективное ощущение контроля над результатом.
      </p>

      {showThreshold && (
        <label className="lab-field">
          <span>Порог положительного исхода (0–99)</span>
          <input
            type="range"
            min={10}
            max={90}
            value={customRules.winThreshold}
            onChange={(e) => setCustomRules({ winThreshold: Number(e.target.value) })}
            className="w-full accent-[#1e3a5f]"
          />
          <span className="text-sm font-medium text-slate-800">{customRules.winThreshold}</span>
        </label>
      )}

      <label className="lab-field">
        <span>Коэффициент выплат</span>
        <input
          type="range"
          min={0.5}
          max={2}
          step={0.1}
          value={customRules.payoutMultiplier}
          onChange={(e) => setCustomRules({ payoutMultiplier: Number(e.target.value) })}
          className="w-full accent-[#1e3a5f]"
        />
        <span className="text-sm font-medium text-slate-800">×{customRules.payoutMultiplier.toFixed(1)}</span>
      </label>

      {customRules.modified && (
        <div className="mt-3 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <p className="text-[11px] leading-relaxed text-amber-900">
            <strong>Примечание:</strong> изменение условий активирует когнитивную иллюзию контроля.
            Математическое ожидание E[Δ] остаётся отрицательным.
          </p>
        </div>
      )}
    </div>
  );
}

```

---

## src/components/lab/SessionChart.tsx

```typescript
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MONTE_CARLO_PATHWAYS } from "../../context/TelemetryContext";
import type { SimulationResult } from "../../types";

interface SessionChartProps {
  result: SimulationResult | null;
  livePathway: number[];
  startingBalance: number;
}

const PATHWAY_COLORS = [
  "#94a3b8", "#64748b", "#cbd5e1", "#475569", "#a1a1aa",
  "#78716c", "#9ca3af", "#6b7280", "#71717a", "#525252",
];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-semibold text-slate-700">Итерация #{label}</p>
      {payload.slice(0, 5).map((p) => (
        <p key={p.name} className="text-slate-600">
          {p.name}: <span className="font-semibold">{Math.round(p.value).toLocaleString("ru-RU")} ₽</span>
        </p>
      ))}
      {payload.length > 5 && (
        <p className="text-slate-400">+{payload.length - 5} траекторий…</p>
      )}
    </div>
  );
}

export function SessionChart({ result, livePathway, startingBalance }: SessionChartProps) {
  const runs = result?.runs ?? [];
  const maxLen = Math.max(
    livePathway.length,
    ...runs.map((r) => r.balances.length),
    20,
  );

  const chartData = Array.from({ length: maxLen }, (_, i) => {
    const point: Record<string, number | string> = { bet: i };
    if (i < livePathway.length) {
      point.live = livePathway[i];
    }
    runs.slice(0, MONTE_CARLO_PATHWAYS).forEach((run, ri) => {
      point[`p${ri}`] = run.balances[i] ?? run.balances[run.balances.length - 1] ?? 0;
    });
    return point;
  });

  const hasData = livePathway.length > 1 || runs.length > 0;

  if (!hasData) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-400">
        Выполните итерацию или расчёт Монте-Карло для построения графика
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="bet"
          tick={{ fill: "#64748b", fontSize: 10 }}
          axisLine={{ stroke: "#e2e8f0" }}
          tickLine={false}
          label={{ value: "Итерация", position: "insideBottom", offset: -2, fontSize: 10, fill: "#94a3b8" }}
        />
        <YAxis
          tick={{ fill: "#64748b", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={50}
          tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={startingBalance} stroke="#94a3b8" strokeDasharray="4 4" />
        {runs.slice(0, MONTE_CARLO_PATHWAYS).map((_, i) => (
          <Line
            key={`p${i}`}
            type="monotone"
            dataKey={`p${i}`}
            name={`MC-${i + 1}`}
            stroke={PATHWAY_COLORS[i % PATHWAY_COLORS.length]}
            strokeWidth={1}
            dot={false}
            strokeOpacity={0.5}
            isAnimationActive={false}
          />
        ))}
        {livePathway.length > 1 && (
          <Line
            type="monotone"
            dataKey="live"
            name="Текущая сессия"
            stroke="#1e3a5f"
            strokeWidth={2}
            dot={false}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

```

---

## src/components/lab/TelemetryPanel.tsx

```typescript
import { Activity, AlertTriangle, TrendingDown, Wallet } from "lucide-react";
import { useTelemetry, MONTE_CARLO_PATHWAYS } from "../../context/TelemetryContext";
import { MECHANISMS } from "../../math/mechanisms";
import { PsychLog } from "./PsychLog";
import { SessionChart } from "./SessionChart";

function MetricWidget({
  icon,
  label,
  value,
  unit,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  hint?: string;
}) {
  return (
    <div className="lab-metric-widget">
      <div className="mb-2 text-slate-500">{icon}</div>
      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold tabular-nums text-slate-900">
        {value}
        {unit && <span className="ml-1 text-sm font-normal text-slate-500">{unit}</span>}
      </p>
      {hint && <p className="mt-1 text-[10px] text-slate-400">{hint}</p>}
    </div>
  );
}

export function TelemetryPanel() {
  const {
    activeMechanism,
    sessions,
    params,
    mcResult,
    metrics,
    isSimulating,
    runMonteCarloSim,
  } = useTelemetry();

  const session = sessions[activeMechanism];
  const info = MECHANISMS[activeMechanism];
  const stats = mcResult?.stats;

  return (
    <aside className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <div>
        <p className="lab-label">Панель аналитики</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{info.researchFocus}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <MetricWidget
          icon={<AlertTriangle className="h-4 w-4" />}
          label="Вероятность исчерпания капитала"
          value={(stats?.bankruptcyRate ?? metrics.bankruptcyProbabilityIndex).toFixed(1)}
          unit="%"
          hint={`${MONTE_CARLO_PATHWAYS} траекторий Монте-Карло`}
        />
        <MetricWidget
          icon={<TrendingDown className="h-4 w-4" />}
          label="Скорость декапитализации"
          value={(stats?.capitalDecayRate ?? metrics.averageCapitalDecayRate).toFixed(1)}
          unit="%"
          hint="Δ капитала / начальный баланс"
        />
        <MetricWidget
          icon={<Wallet className="h-4 w-4" />}
          label="Системная маржа"
          value={Math.round(stats?.houseMargin ?? metrics.accumulatedHouseMargin).toLocaleString("ru-RU")}
          unit="₽"
          hint="Накопленная разница в пользу системы"
        />
        <MetricWidget
          icon={<Activity className="h-4 w-4" />}
          label="Доля положит. исходов"
          value={
            stats
              ? stats.winRate.toFixed(1)
              : session.betsPlayed > 0
                ? ((session.wins / session.betsPlayed) * 100).toFixed(1)
                : "—"
          }
          unit="%"
          hint={`теоретическая ${stats?.theoreticalWinRate.toFixed(1) ?? info.theoreticalWinRate}%`}
        />
      </div>

      <div className="lab-panel flex-1">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-700">Динамика капитала</p>
          <button
            type="button"
            disabled={isSimulating}
            onClick={runMonteCarloSim}
            className="lab-btn-secondary px-3 py-1.5 text-[10px] disabled:opacity-40"
          >
            {isSimulating ? "Расчёт…" : `Монте-Карло (n=${MONTE_CARLO_PATHWAYS})`}
          </button>
        </div>
        <SessionChart
          result={mcResult}
          livePathway={session.pathway}
          startingBalance={params.initialBalance}
        />
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-2">
            <span className="text-slate-500">Средний итог</span>
            <p className="font-semibold text-slate-900">
              {Math.round(stats.averageFinalBalance).toLocaleString("ru-RU")} ₽
            </p>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-2">
            <span className="text-slate-500">Средний Δ</span>
            <p className={`font-semibold ${stats.averageProfit >= 0 ? "text-pos" : "text-neg"}`}>
              {stats.averageProfit >= 0 ? "+" : ""}
              {Math.round(stats.averageProfit).toLocaleString("ru-RU")} ₽
            </p>
          </div>
        </div>
      )}

      <PsychLog />
    </aside>
  );
}

```

---

## src/components/layout/AcademicDisclaimer.tsx

```typescript
import { ShieldAlert } from "lucide-react";

export function AcademicDisclaimer() {
  return (
    <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-relaxed text-cyan-50 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
      <div className="flex gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
        <p>
          <strong className="text-white">Научное позиционирование:</strong> данный программный комплекс
          предназначен исключительно для научного анализа игровой зависимости, моделирования финансовых
          рисков и демонстрации отрицательного математического ожидания. Он не является азартной игрой
          и не предназначен для использования в развлекательных или коммерческих целях.
        </p>
      </div>
    </section>
  );
}

```

---

## src/components/telemetry/AnalyticsDashboard.tsx

```typescript
import { Activity, AlertTriangle, Banknote, BarChart3, Brain, Gauge, TrendingDown, Waves } from "lucide-react";
import { useTelemetry } from "../../state/useTelemetry";
import { MonteCarloChart } from "./MonteCarloChart";
import { PsychLog } from "./PsychLog";

export function AnalyticsDashboard() {
  const { settings, stats, monteCarlo, balancePath, runMonteCarlo, isRunningMonteCarlo } = useTelemetry();
  const addictionRisk = Math.min(
    100,
    stats.lossStreak * 9 +
      stats.nearMissEvents * 5 +
      stats.dopamineTopUps * 13 +
      stats.strategyChanges * 4 +
      stats.stakeChanges * 3,
  );
  const stakeChangeRate = stats.totalRounds > 0 ? (stats.stakeChanges / stats.totalRounds) * 100 : 0;

  return (
    <aside className="h-full overflow-y-auto border-l border-white/5 bg-slate-950/50 p-4 backdrop-blur-2xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300/80">Аналитика</p>
          <h2 className="mt-1 text-lg font-black text-white">Сводка рисков</h2>
        </div>
        <button
          type="button"
          onClick={runMonteCarlo}
          disabled={isRunningMonteCarlo}
          className="rounded-xl bg-violet-400 px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-violet-300 disabled:opacity-50"
        >
          {isRunningMonteCarlo ? "Расчёт…" : "Monte Carlo"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Metric icon={<AlertTriangle />} label="Вероятность банкротства" value={`${(monteCarlo?.bankruptcyProbability ?? 0).toFixed(1)}%`} risk />
        <Metric icon={<TrendingDown />} label="Убывание капитала" value={`${(monteCarlo?.averageCapitalDecayRate ?? 0).toFixed(1)}%`} risk />
        <Metric icon={<Banknote />} label="Маржа системы" value={`${Math.round(stats.accumulatedHouseMargin).toLocaleString("ru-RU")} ₽`} />
        <Metric icon={<Activity />} label="Количество раундов" value={stats.totalRounds.toString()} />
        <Metric icon={<Waves />} label="Серия проигрышей" value={stats.lossStreak.toString()} risk={stats.lossStreak >= 3} />
        <Metric icon={<Gauge />} label="Почти выигрыш" value={stats.nearMissEvents.toString()} risk={stats.nearMissEvents > 0} />
        <Metric icon={<Brain />} label="Индекс риска" value={`${addictionRisk.toFixed(0)}/100`} risk={addictionRisk >= 50} />
        <Metric icon={<BarChart3 />} label="Изм. ставок" value={`${stakeChangeRate.toFixed(1)}%`} />
      </div>

      <section className="mt-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Траектории капитала</h3>
          <span className="text-xs text-slate-500">50×100</span>
        </div>
        <MonteCarloChart result={monteCarlo} livePath={balancePath.length > 0 ? balancePath : [settings.balance]} />
      </section>

      <section className="mt-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4">
        <h3 className="text-sm font-bold text-white">Математический вывод</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          При отрицательном математическом ожидании средняя траектория капитала убывает.
          Качество случайности влияет на предсказуемость, но не устраняет маржу системы.
        </p>
        <p className="mt-3 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-xs leading-relaxed text-red-100">
          EV: {monteCarlo ? `${monteCarlo.expectedValue.toFixed(2)} ₽/раунд` : "рассчитывается после Monte Carlo"}
        </p>
      </section>

      <div className="mt-4">
        <PsychLog />
      </div>
    </aside>
  );
}

function Metric({ icon, label, value, risk = false }: { icon: React.ReactNode; label: string; value: string; risk?: boolean }) {
  return (
    <div
      className={`rounded-2xl border bg-slate-900/40 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${
        risk ? "border-red-400/20" : "border-white/5"
      }`}
    >
      <div className={risk ? "mb-2 text-red-300" : "mb-2 text-cyan-300"}>{icon}</div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">{label}</p>
      <p className={risk ? "mt-1 text-xl font-black text-red-100" : "mt-1 text-xl font-black text-white"}>{value}</p>
    </div>
  );
}

```

---

## src/components/telemetry/MonteCarloChart.tsx

```typescript
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonteCarloResult } from "../../types/simulation";

interface MonteCarloChartProps {
  result: MonteCarloResult | null;
  livePath: number[];
}

const palette = ["#22d3ee", "#a78bfa", "#34d399", "#64748b", "#818cf8", "#14b8a6", "#f87171"];

export function MonteCarloChart({ result, livePath }: MonteCarloChartProps) {
  const maxLength = Math.max(livePath.length, ...(result?.paths.map((path) => path.balances.length) ?? [0]), 2);
  const data = Array.from({ length: maxLength }, (_, round) => {
    const point: Record<string, number> = { round };
    if (livePath[round] !== undefined) point.live = livePath[round];
    result?.paths.slice(0, 50).forEach((path) => {
      point[`s${path.id}`] = path.balances[round] ?? path.finalBalance;
    });
    if (result?.averagePath[round] !== undefined) point.average = result.averagePath[round];
    return point;
  });

  if (!result && livePath.length < 2) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-white/5 bg-slate-950/50 text-sm text-slate-500">
        Запустите Монте-Карло или выполните несколько итераций
      </div>
    );
  }

  return (
    <div className="h-72 rounded-2xl border border-white/5 bg-slate-950/50 p-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
          <XAxis dataKey="round" tick={{ fill: "#64748b", fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: "#64748b", fontSize: 10 }} tickLine={false} axisLine={false} width={46} />
          <Tooltip
            contentStyle={{
              background: "rgba(15,23,42,0.96)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              color: "#e2e8f0",
              fontSize: 12,
            }}
            labelFormatter={(value) => `Раунд ${value}`}
          />
          {result?.paths.slice(0, 50).map((path, index) => (
            <Line
              key={path.id}
              type="monotone"
              dataKey={`s${path.id}`}
              stroke={palette[index % palette.length]}
              strokeWidth={1}
              strokeOpacity={0.24}
              dot={false}
              isAnimationActive={false}
            />
          ))}
          <Line type="monotone" dataKey="live" stroke="#ffffff" strokeWidth={2} dot={false} name="Текущая сессия" />
          <Line
            type="monotone"
            dataKey="average"
            stroke="#22d3ee"
            strokeWidth={3}
            dot={false}
            name="Средняя траектория"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

```

---

## src/components/telemetry/PsychLog.tsx

```typescript
import { TerminalSquare } from "lucide-react";
import { useTelemetry } from "../../state/useTelemetry";

export function PsychLog() {
  const { events } = useTelemetry();
  return (
    <section className="rounded-2xl border border-white/5 bg-slate-950/70 p-4">
      <div className="mb-3 flex items-center gap-2">
        <TerminalSquare className="h-4 w-4 text-cyan-300" />
        <h3 className="text-sm font-bold text-white">Psych-Log · поведенческая телеметрия</h3>
      </div>
      <div className="h-56 overflow-y-auto rounded-xl border border-white/5 bg-black/30 p-3 font-mono text-[11px] leading-relaxed">
        {events.map((event) => (
          <div key={event.id} className="border-b border-white/5 py-2 last:border-0">
            <p className={event.type === "bankruptcy" ? "text-red-300" : event.type === "nearMiss" ? "text-amber-200" : "text-slate-300"}>
              {event.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

```

---

## src/context/TelemetryContext.tsx

```typescript
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  bootstrapProvablyFair,
  getProvablyFairState,
  playRoundWithBalance,
  revealServerSeed,
  rotateProvablyFairSeeds,
} from "../math/engine";
import { MONTE_CARLO_BETS, MONTE_CARLO_PATHWAYS, runMonteCarlo } from "../math/monteCarlo";
import { ALL_MECHANISM_IDS } from "../math/mechanisms";
import {
  analyzeAfterRound,
  analyzeCustomRulesChange,
  analyzeParameterChange,
  analyzeStrategyChange,
  analyzeTopUp,
} from "../math/psychAnalyzer";
import type {
  CustomGameRules,
  GameSession,
  MechanismId,
  ProvablyFairState,
  PsychEvent,
  SessionSnapshot,
  SimulationResult,
  TelemetryMetrics,
  TelemetryParams,
} from "../types";

const DEFAULT_PARAMS: TelemetryParams = {
  initialBalance: 1000,
  baseBet: 10,
  strategy: "flat",
  crashTarget: 2.0,
  diceThreshold: 50,
};

const DEFAULT_RULES: CustomGameRules = {
  winThreshold: 50,
  payoutMultiplier: 1,
  modified: false,
};

function createSession(balance: number): GameSession {
  return {
    balance,
    initialBalance: balance,
    totalDeposited: balance,
    topUpCount: 0,
    betsPlayed: 0,
    wins: 0,
    losses: 0,
    consecutiveLosses: 0,
    consecutiveWins: 0,
    currentStreak: 0,
    maxWinStreak: 0,
    lastResult: null,
    lastBet: 0,
    pathway: [balance],
    houseAbsorbed: 0,
  };
}

interface TelemetryContextValue {
  activeMechanism: MechanismId;
  setActiveMechanism: (id: MechanismId) => void;
  sessions: Record<MechanismId, GameSession>;
  params: TelemetryParams;
  setParams: (p: Partial<TelemetryParams>) => void;
  customRules: CustomGameRules;
  setCustomRules: (r: Partial<CustomGameRules>) => void;
  psychLog: PsychEvent[];
  sessionHistory: SessionSnapshot[];
  mcResult: SimulationResult | null;
  isSimulating: boolean;
  isPlaying: boolean;
  provablyFair: ProvablyFairState;
  metrics: TelemetryMetrics;
  showBankruptcyAlert: boolean;
  playGame: () => Promise<void>;
  topUp: () => void;
  resetSession: () => void;
  runMonteCarloSim: () => void;
  rotateSeeds: () => Promise<void>;
  revealSeed: () => void;
  dismissBankruptcyAlert: () => void;
}

const TelemetryContext = createContext<TelemetryContextValue | null>(null);

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const [activeMechanism, setActiveMechanism] = useState<MechanismId>("lcg");
  const [params, setParamsState] = useState<TelemetryParams>(DEFAULT_PARAMS);
  const [customRules, setCustomRulesState] = useState<CustomGameRules>(DEFAULT_RULES);
  const [psychLog, setPsychLog] = useState<PsychEvent[]>([]);
  const [sessionHistory, setSessionHistory] = useState<SessionSnapshot[]>([]);
  const [mcResult, setMcResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [provablyFair, setProvablyFair] = useState<ProvablyFairState>({
    serverSeed: "",
    serverSeedHash: "",
    clientSeed: "",
    nonce: 0,
    revealed: false,
  });
  const [showBankruptcyAlert, setShowBankruptcyAlert] = useState(false);

  const [sessions, setSessions] = useState<Record<MechanismId, GameSession>>(() => {
    const init = {} as Record<MechanismId, GameSession>;
    for (const id of ALL_MECHANISM_IDS) init[id] = createSession(DEFAULT_PARAMS.initialBalance);
    return init;
  });

  useEffect(() => {
    void bootstrapProvablyFair().then(setProvablyFair);
  }, []);

  const addPsychEvents = useCallback((events: PsychEvent[]) => {
    if (events.length === 0) return;
    setPsychLog((prev) => [...events, ...prev].slice(0, 100));
  }, []);

  const setParams = useCallback(
    (partial: Partial<TelemetryParams>) => {
      setParamsState((prev) => {
        const next = { ...prev, ...partial };
        const events: PsychEvent[] = [];
        for (const key of Object.keys(partial) as (keyof TelemetryParams)[]) {
          if (partial[key] !== undefined && partial[key] !== prev[key]) {
            events.push(analyzeParameterChange(activeMechanism, key, partial[key] as string | number));
          }
        }
        if (partial.strategy && partial.strategy !== prev.strategy) {
          events.push(analyzeStrategyChange(partial.strategy, activeMechanism));
        }
        addPsychEvents(events);
        return next;
      });
    },
    [activeMechanism, addPsychEvents],
  );

  const setCustomRules = useCallback(
    (partial: Partial<CustomGameRules>) => {
      setCustomRulesState((prev) => {
        const next = { ...prev, ...partial, modified: true };
        addPsychEvents([analyzeCustomRulesChange(next, activeMechanism)]);
        return next;
      });
    },
    [activeMechanism, addPsychEvents],
  );

  const archiveSession = useCallback((mechanism: MechanismId, session: GameSession) => {
    const snapshot: SessionSnapshot = {
      id: `sess-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      mechanism,
      pathway: [...session.pathway],
      bankrupt: session.balance <= 0,
      timestamp: Date.now(),
    };
    setSessionHistory((prev) => [snapshot, ...prev].slice(0, 50));
  }, []);

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
        if (s.currentStreak > s.maxWinStreak) s.maxWinStreak = s.currentStreak;
      } else {
        s.losses += 1;
        s.consecutiveLosses += 1;
        s.consecutiveWins = 0;
        s.currentStreak = 0;
      }

      if (s.pathway.length > 200) s.pathway = s.pathway.slice(-200);

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

  const topUp = useCallback(() => {
    const amount = params.initialBalance;
    const wasBankrupt = sessions[activeMechanism].balance <= 0;

    setSessions((prev) => {
      const s = { ...prev[activeMechanism] };
      s.balance += amount;
      s.totalDeposited += amount;
      s.topUpCount += 1;
      s.pathway = [...s.pathway, s.balance];
      return { ...prev, [activeMechanism]: s };
    });

    addPsychEvents([
      analyzeTopUp(activeMechanism, amount, sessions[activeMechanism].topUpCount + 1, wasBankrupt),
    ]);
    setShowBankruptcyAlert(false);
  }, [activeMechanism, addPsychEvents, params.initialBalance, sessions]);

  const resetSession = useCallback(() => {
    setSessions((prev) => ({
      ...prev,
      [activeMechanism]: createSession(params.initialBalance),
    }));
    addPsychEvents([
      analyzeParameterChange(activeMechanism, "session", "сброс"),
    ]);
  }, [activeMechanism, addPsychEvents, params.initialBalance]);

  const runMonteCarloSim = useCallback(() => {
    setIsSimulating(true);
    setTimeout(() => {
      const result = runMonteCarlo(activeMechanism, params, customRules, MONTE_CARLO_PATHWAYS, MONTE_CARLO_BETS);
      setMcResult(result);
      setIsSimulating(false);
      addPsychEvents([
        analyzeParameterChange(
          activeMechanism,
          "monteCarlo",
          `${MONTE_CARLO_PATHWAYS} траекторий`,
        ),
      ]);
    }, 300);
  }, [activeMechanism, addPsychEvents, customRules, params]);

  const rotateSeeds = useCallback(async () => {
    const next = await rotateProvablyFairSeeds();
    setProvablyFair(next);
  }, []);

  const revealSeed = useCallback(() => {
    setProvablyFair(revealServerSeed());
  }, []);

  const dismissBankruptcyAlert = useCallback(() => {
    setShowBankruptcyAlert(false);
  }, []);

  const metrics = useMemo((): TelemetryMetrics => {
    const allSessions = Object.values(sessions);
    const bankruptCount = allSessions.filter((s) => s.balance <= 0).length;
    const historyBankrupt =
      sessionHistory.length > 0
        ? (sessionHistory.filter((s) => s.bankrupt).length / sessionHistory.length) * 100
        : (bankruptCount / allSessions.length) * 100;

    const decayRates = allSessions.map((s) => {
      const start = s.pathway[0] ?? s.initialBalance;
      const end = s.pathway[s.pathway.length - 1] ?? s.balance;
      return start > 0 ? ((start - end) / start) * 100 : 0;
    });
    const avgDecay = decayRates.reduce((a, b) => a + b, 0) / Math.max(1, decayRates.length);

    const houseMargin = allSessions.reduce((s, sess) => s + sess.houseAbsorbed, 0);

    return {
      bankruptcyProbabilityIndex: mcResult?.stats.bankruptcyRate ?? historyBankrupt,
      averageCapitalDecayRate: mcResult?.stats.capitalDecayRate ?? avgDecay,
      accumulatedHouseMargin: mcResult?.stats.houseMargin ?? houseMargin,
      sessionCount: sessionHistory.length + allSessions.reduce((s, sess) => s + sess.betsPlayed, 0),
    };
  }, [mcResult, sessionHistory, sessions]);

  return (
    <TelemetryContext.Provider
      value={{
        activeMechanism,
        setActiveMechanism,
        sessions,
        params,
        setParams,
        customRules,
        setCustomRules,
        psychLog,
        sessionHistory,
        mcResult,
        isSimulating,
        isPlaying,
        provablyFair,
        metrics,
        showBankruptcyAlert,
        playGame,
        topUp,
        resetSession,
        runMonteCarloSim,
        rotateSeeds,
        revealSeed,
        dismissBankruptcyAlert,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  const ctx = useContext(TelemetryContext);
  if (!ctx) throw new Error("useTelemetry must be used within TelemetryProvider");
  return ctx;
}

export { MONTE_CARLO_PATHWAYS, MONTE_CARLO_BETS };

```

---

## src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    @apply font-sans antialiased;
    background: linear-gradient(180deg, #f0f4fa 0%, #f4f6f9 40%, #eef2f7 100%);
    color: #0f172a;
  }
}

@layer components {
  .section-label {
    @apply text-xs font-bold uppercase tracking-[0.2em];
    color: #c9a227;
  }

  .heading-xl {
    @apply text-2xl font-bold leading-tight md:text-4xl;
    color: #0f172a;
    letter-spacing: -0.03em;
  }

  .heading-lg {
    @apply text-xl font-bold md:text-2xl;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  .body-text {
    @apply text-sm leading-relaxed md:text-base;
    color: #64748b;
  }

  .page-header {
    @apply mb-8 overflow-hidden rounded-card;
    background: linear-gradient(135deg, #0a1628 0%, #1a3050 100%);
    padding: 2rem;
    color: #fff;
  }

  .page-header .heading-xl {
    color: #fff;
  }

  .page-header .body-text {
    color: rgba(255, 255, 255, 0.75);
  }

  .btn-primary {
    @apply inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold no-underline transition;
    color: #0a1628;
    border-radius: 10px;
    background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
    box-shadow: 0 4px 14px rgba(201, 162, 39, 0.35);
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, #e0bc42 0%, #d4af37 100%);
    transform: translateY(-1px);
  }

  .btn-outline,
  .btn-secondary {
    @apply inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-semibold no-underline transition;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    color: #0f172a;
  }

  .btn-outline:hover,
  .btn-secondary:hover {
    border-color: #c9a227;
    color: #0a1628;
    box-shadow: 0 4px 12px rgba(10, 22, 40, 0.06);
  }

  .input-field {
    @apply w-full rounded-btn border border-ozon-border bg-white px-3 py-2.5 text-sm text-ozon-text outline-none;
  }

  .input-field:focus {
    border-color: #c9a227;
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.15);
  }

  .glass {
    @apply bg-white;
    border-radius: 16px;
    border: 1px solid #e8ecf2;
    box-shadow: 0 4px 24px rgba(10, 22, 40, 0.06);
  }

  .tab-bar {
    @apply flex gap-1 rounded-card p-1.5;
    background: #0a1628;
  }

  .tab-btn {
    @apply flex-1 rounded-btn px-3 py-2.5 text-sm font-semibold transition;
  }

  .tab-btn-active {
    color: #0a1628;
    background: linear-gradient(135deg, #d4af37, #c9a227);
  }

  .tab-btn-inactive {
    @apply text-white/60 hover:text-white;
  }

  .game-preview-img {
    @apply h-36 w-full object-contain object-center md:h-40;
    background: linear-gradient(135deg, #f8fafc 0%, #eef2f7 50%, #e8f0fe 100%);
  }

  .game-tab-icon {
    @apply mr-1.5 inline-block text-base leading-none;
  }

  .game-visual-panel {
    @apply overflow-hidden rounded-card border border-ozon-border bg-white p-5 md:p-6;
    box-shadow: 0 8px 32px rgba(10, 22, 40, 0.08);
    transition: box-shadow 0.3s ease;
  }

  .game-visual-flash {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--game-accent) 25%, transparent), 0 8px 32px rgba(10, 22, 40, 0.1);
  }

  .game-visual-inner {
    @apply flex flex-col gap-5;
  }

  .game-visual-header {
    @apply flex items-start gap-4;
  }

  .game-visual-icon {
    @apply flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl;
  }

  .game-visual-title {
    @apply text-base font-bold text-slate-900 md:text-lg;
  }

  .game-visual-subtitle {
    @apply mt-1 text-xs leading-relaxed text-slate-500 md:text-sm;
  }

  .game-roulette-layout {
    @apply grid items-center gap-5 md:grid-cols-[1fr_auto];
  }

  .game-reels-row {
    @apply flex justify-center gap-3;
  }

  .game-reel {
    @apply flex h-24 w-24 items-center justify-center rounded-xl border-2 bg-gradient-to-b from-white to-slate-50 md:h-28 md:w-28;
    box-shadow: inset 0 2px 8px rgba(10, 22, 40, 0.06);
  }

  .game-reel-spinning {
    animation: reel-spin 0.6s ease-in-out infinite alternate;
  }

  .game-reel-symbol {
    @apply text-xl font-bold md:text-2xl;
  }

  .game-reel-placeholder {
    @apply text-2xl font-bold text-slate-300;
  }

  .game-wheel-schematic {
    @apply mx-auto h-28 w-28 rounded-full border-2 bg-white p-2 md:mx-0 md:h-32 md:w-32;
  }

  .game-dice-layout {
    @apply grid gap-5 md:grid-cols-[auto_1fr];
  }

  .game-dice-pair {
    @apply flex justify-center gap-4;
  }

  .game-die {
    @apply flex h-20 w-20 items-center justify-center rounded-2xl border-2 bg-white md:h-24 md:w-24;
    box-shadow: 0 4px 16px rgba(10, 22, 40, 0.08);
  }

  .game-die-face {
    @apply text-4xl font-bold text-slate-800;
  }

  .game-die-dots {
    @apply text-2xl tracking-widest text-slate-400;
  }

  .game-gauge-labels {
    @apply mb-2 flex justify-between text-xs text-slate-500;
  }

  .game-gauge-track {
    @apply relative h-6 overflow-hidden rounded-full bg-slate-100;
  }

  .game-gauge-threshold {
    @apply absolute top-0 h-full w-0.5 -translate-x-1/2 border-l-2 border-dashed;
  }

  .game-gauge-fill {
    @apply absolute left-0 top-0 h-full rounded-full transition-all duration-500;
  }

  .game-gauge-fill-pulse {
    @apply w-1/3 animate-pulse;
  }

  .game-gauge-value {
    @apply mt-2 text-center text-sm font-semibold text-slate-700;
  }

  .game-cards-layout {
    @apply flex flex-col items-center gap-5 md:flex-row md:justify-center;
  }

  .game-playing-card {
    @apply relative flex h-40 w-28 flex-col items-center justify-center rounded-xl border-2 bg-gradient-to-b from-white to-slate-50;
    box-shadow: 0 8px 24px rgba(10, 22, 40, 0.1);
  }

  .game-playing-card-win {
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3), 0 8px 24px rgba(10, 22, 40, 0.1);
  }

  .game-playing-card-loss {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2), 0 8px 24px rgba(10, 22, 40, 0.1);
  }

  .game-card-corner {
    @apply absolute left-3 top-3 text-sm font-bold;
  }

  .game-card-value {
    @apply text-5xl font-bold text-slate-800;
  }

  .game-card-suit {
    @apply absolute bottom-3 right-3 text-2xl;
  }

  .game-verify-flow {
    @apply flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600;
  }

  .game-verify-step {
    @apply flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2;
  }

  .game-verify-step-active {
    @apply border-2 bg-white font-semibold;
  }

  .game-verify-num {
    @apply flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 text-[10px] font-bold text-white;
  }

  .game-verify-arrow {
    @apply text-slate-400;
  }

  .game-seed-info {
    @apply grid grid-cols-3 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3;
  }

  .game-seed-label {
    @apply text-[10px] uppercase tracking-wide text-slate-500;
  }

  .game-seed-value {
    @apply mt-0.5 text-sm font-semibold text-slate-800;
  }

  .game-slot-wheel-wrap {
    @apply flex flex-col items-center gap-4 md:flex-row md:justify-center;
  }

  .game-slot-wheel {
    @apply h-44 w-44 shrink-0 md:h-52 md:w-52;
  }

  .game-slot-legend {
    @apply grid gap-2 text-xs text-slate-600;
  }

  .game-slot-legend-item {
    @apply flex items-center gap-2;
  }

  .game-slot-dot {
    @apply h-3 w-3 shrink-0 rounded-full;
  }

  .game-outcome {
    @apply rounded-lg px-4 py-3 text-sm leading-relaxed;
  }

  .game-outcome-idle {
    @apply border border-dashed border-slate-200 bg-slate-50 text-center text-slate-500;
  }

  .game-outcome-playing {
    @apply flex items-center justify-center gap-2 border border-blue-200 bg-blue-50 font-medium text-[#1e3a5f];
  }

  .game-outcome-win {
    @apply border border-emerald-200 bg-emerald-50 text-emerald-800;
  }

  .game-outcome-near {
    @apply border border-amber-200 bg-amber-50 text-amber-800;
  }

  .game-outcome-loss {
    @apply border border-slate-200 bg-slate-50 text-slate-700;
  }

  .game-outcome-pulse {
    @apply h-2 w-2 animate-pulse rounded-full bg-[#1e3a5f];
  }

  .game-stat-card {
    @apply rounded-card border border-ozon-border bg-gradient-to-br from-white to-slate-50 py-3 text-center;
    box-shadow: 0 2px 12px rgba(10, 22, 40, 0.04);
  }

  .game-stat-card-highlight {
    background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
    border-color: #fcd34d;
  }

  @keyframes reel-spin {
    from {
      transform: translateY(-2px);
      opacity: 0.7;
    }
    to {
      transform: translateY(2px);
      opacity: 1;
    }
  }

  .academic-figure {
    @apply overflow-hidden rounded-card border border-ozon-border bg-white;
    box-shadow: 0 4px 24px rgba(10, 22, 40, 0.06);
  }

  .academic-figure-img {
    @apply block h-auto w-full object-contain object-center;
    background: linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
  }

  .academic-figure-caption {
    @apply border-t border-ozon-border px-4 py-3 text-center text-sm text-ozon-muted;
  }

  .stat-row {
    @apply grid grid-cols-2 gap-4 md:grid-cols-4;
  }

  .stat-pill,
  .feature-card,
  .mechanism-card {
    @apply rounded-card border border-ozon-border bg-white;
    box-shadow: 0 4px 20px rgba(10, 22, 40, 0.05);
  }

  .stat-pill {
    @apply p-5 text-center;
  }

  .stat-pill-value {
    @apply text-3xl font-bold;
    color: #0a1628;
  }

  .stat-pill-label {
    @apply mt-1 text-xs text-ozon-muted;
  }

  .feature-card,
  .mechanism-card-body {
    @apply p-5;
  }

  .site-navbar {
    background: linear-gradient(135deg, #0a1628 0%, #132238 100%);
    border-bottom: 1px solid rgba(201, 162, 39, 0.25);
    box-shadow: 0 4px 24px rgba(10, 22, 40, 0.18);
  }

  .nav-link {
    @apply px-4 py-5 text-sm font-medium no-underline transition;
  }

  .nav-link-active {
    color: #c9a227;
    box-shadow: inset 0 -3px 0 #c9a227;
  }

  .nav-link-inactive {
    color: rgba(255, 255, 255, 0.75);
  }

  .nav-link-inactive:hover {
    color: #fff;
  }

  /* ── Главная страница ── */
  .home-page {
    @apply pb-16 pt-[58px];
  }

  .home-hero {
    @apply relative overflow-hidden px-4 py-12 md:px-6 md:py-16;
    background: linear-gradient(135deg, #0a1628 0%, #132a4a 45%, #1a3050 100%);
  }

  .home-hero-glow {
    @apply pointer-events-none absolute rounded-full;
    filter: blur(80px);
  }

  .home-hero-glow-1 {
    top: -60px;
    right: 10%;
    width: 320px;
    height: 320px;
    background: rgba(201, 162, 39, 0.15);
  }

  .home-hero-glow-2 {
    bottom: -80px;
    left: 5%;
    width: 280px;
    height: 280px;
    background: rgba(13, 148, 136, 0.12);
  }

  .home-hero-content {
    @apply relative mx-auto max-w-5xl;
  }

  .home-hero-badge {
    @apply mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider;
    background: rgba(201, 162, 39, 0.15);
    color: #e8c84a;
    border: 1px solid rgba(201, 162, 39, 0.3);
  }

  .home-hero-title {
    @apply text-3xl font-bold leading-tight text-white md:text-5xl;
    letter-spacing: -0.03em;
  }

  .home-hero-desc {
    @apply mt-4 max-w-2xl text-base leading-relaxed md:text-lg;
    color: rgba(255, 255, 255, 0.8);
  }

  .home-hero-actions {
    @apply mt-8 flex flex-wrap gap-3;
  }

  .home-hero-btn-main {
    @apply !px-7 !py-3.5 text-base;
  }

  .home-hero-btn-secondary {
    @apply !border-white/20 !bg-white/10 !text-white backdrop-blur-sm;
  }

  .home-hero-btn-secondary:hover {
    @apply !border-gold/50 !bg-white/15 !text-white;
  }

  .home-container {
    @apply mx-auto max-w-5xl px-4 md:px-6;
  }

  .home-stats {
    @apply relative z-10 -mt-8 mb-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4;
  }

  .home-stat-card {
    @apply rounded-card border bg-white p-4 text-center transition hover:-translate-y-0.5 md:p-5;
    border-color: color-mix(in srgb, var(--stat-color) 20%, #e2e8f0);
    box-shadow: 0 8px 24px rgba(10, 22, 40, 0.06);
  }

  .home-stat-card-accent {
    background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
    border-color: #fdba74;
  }

  .home-stat-icon {
    @apply mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold;
    background: color-mix(in srgb, var(--stat-color) 12%, white);
    color: var(--stat-color);
  }

  .home-stat-value {
    @apply text-xl font-bold md:text-2xl;
    color: var(--stat-color);
  }

  .home-stat-label {
    @apply mt-1 text-xs text-slate-500;
  }

  .home-section {
    @apply mb-12;
  }

  .home-quick-nav {
    @apply grid gap-4 md:grid-cols-3;
  }

  .home-nav-card {
    @apply relative flex flex-col rounded-card border p-5 transition hover:-translate-y-1 md:p-6;
    border-color: rgba(10, 22, 40, 0.08);
    box-shadow: 0 8px 28px rgba(10, 22, 40, 0.06);
  }

  .home-nav-card:hover {
    box-shadow: 0 12px 36px rgba(10, 22, 40, 0.1);
  }

  .home-nav-card-featured {
    @apply border-2;
    border-color: rgba(20, 184, 166, 0.4);
    box-shadow: 0 8px 32px rgba(13, 148, 136, 0.15);
  }

  .home-nav-card-badge {
    @apply absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide;
    background: #14b8a6;
    color: #fff;
  }

  .home-nav-card-icon {
    @apply mb-4 flex h-12 w-12 items-center justify-center rounded-xl;
  }

  .home-nav-card-label {
    @apply text-xs font-bold uppercase tracking-wider;
  }

  .home-nav-card-title {
    @apply mt-1 text-lg font-bold text-slate-900;
  }

  .home-nav-card-desc {
    @apply mt-2 flex-1 text-sm leading-relaxed text-slate-600;
  }

  .home-nav-card-link {
    @apply mt-4 inline-flex items-center gap-1 text-sm font-semibold;
  }

  .home-flow {
    @apply rounded-card border border-ozon-border bg-white p-5 md:p-7;
    box-shadow: 0 8px 32px rgba(10, 22, 40, 0.06);
  }

  .home-flow-badge {
    @apply mb-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-600;
  }

  .home-flow-badge-dot {
    @apply h-2 w-2 rounded-full bg-emerald-500;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  .home-flow-grid {
    @apply grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr];
  }

  .home-flow-item-wrap {
    @apply flex items-center gap-2;
  }

  .home-flow-item {
    @apply flex flex-1 items-start gap-3 rounded-xl border-2 p-4;
  }

  .home-flow-icon {
    @apply flex h-10 w-10 shrink-0 items-center justify-center rounded-lg;
  }

  .home-flow-title {
    @apply text-sm font-bold;
  }

  .home-flow-text {
    @apply mt-0.5 text-xs text-slate-600;
  }

  .home-flow-arrow {
    @apply shrink-0 items-center justify-center px-1;
  }

  .home-flow-result {
    @apply mt-5 flex flex-col items-center gap-2;
  }

  .home-flow-result-icon {
    @apply text-xl text-slate-300;
  }

  .home-flow-result-box {
    @apply w-full rounded-xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-4 text-center;
  }

  .home-flow-result-label {
    @apply text-xs font-semibold uppercase tracking-wide text-amber-700;
  }

  .home-flow-result-value {
    @apply mt-1 text-sm font-bold text-slate-800 md:text-base;
  }

  .home-features {
    @apply grid gap-4 md:grid-cols-3;
  }

  .home-feature-card {
    @apply rounded-card border-2 p-5 transition hover:-translate-y-0.5;
    box-shadow: 0 4px 20px rgba(10, 22, 40, 0.04);
  }

  .home-feature-icon {
    @apply mb-3 flex h-11 w-11 items-center justify-center rounded-xl;
  }

  .home-defense-card {
    @apply overflow-hidden rounded-card border border-ozon-border bg-white p-6 md:p-8;
    box-shadow: 0 8px 32px rgba(10, 22, 40, 0.06);
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  }

  .home-defense-header {
    @apply mb-5 flex items-start gap-4;
  }

  .home-defense-icon {
    @apply flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#1e3a5f];
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  }

  .home-step-list {
    @apply space-y-3;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .home-step-item {
    @apply flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4;
  }

  .home-step-num {
    @apply flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white;
    background: linear-gradient(135deg, #1e3a5f 0%, #0d9488 100%);
  }

  .home-cta {
    @apply relative flex flex-col items-start justify-between gap-5 overflow-hidden rounded-card border border-ozon-border p-6 md:flex-row md:items-center md:p-8;
    background: linear-gradient(135deg, #ffffff 0%, #f0fdfa 50%, #eff6ff 100%);
    box-shadow: 0 8px 32px rgba(10, 22, 40, 0.08);
  }

  .home-cta-glow {
    @apply pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full;
    background: rgba(201, 162, 39, 0.12);
    filter: blur(40px);
  }

  .home-cta-content {
    @apply relative;
  }

  .home-cta-label {
    @apply text-xs font-semibold uppercase tracking-wider text-teal-700;
  }

  .home-cta-title {
    @apply mt-1 text-lg font-bold text-slate-900 md:text-xl;
  }

  .home-cta-desc {
    @apply mt-1 text-sm text-slate-600;
  }

  .home-cta-btn {
    @apply relative;
  }

  .figure-grid {
    @apply grid gap-4 md:grid-cols-2;
  }

  .feature-card {
    @apply rounded-card border border-ozon-border bg-white p-5;
    box-shadow: 0 4px 20px rgba(10, 22, 40, 0.05);
  }

  .feature-icon {
    @apply mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-[#1e3a5f];
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  }

  .mechanism-card {
    @apply transition hover:-translate-y-0.5 hover:shadow-lift;
  }

  .mechanism-card-icon {
    @apply flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-[#1e3a5f];
    background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
  }

  .cta-banner {
    @apply flex flex-col items-start justify-between gap-4 rounded-card border border-ozon-border bg-white p-6 md:flex-row md:items-center;
    box-shadow: 0 4px 24px rgba(10, 22, 40, 0.06);
  }

  .step-list {
    @apply space-y-3;
    list-style: none;
    padding: 0;
  }

  .step-item {
    @apply flex items-start gap-3;
  }

  .step-num {
    @apply flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-xs font-bold text-white;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  @media (max-width: 1023px) {
    .home-flow-grid {
      @apply grid-cols-1;
    }

    .home-flow-item-wrap {
      @apply flex-col;
    }

    .home-flow-arrow {
      @apply rotate-90 py-1;
    }
  }
}

@layer utilities {
  .text-pos {
    color: #16a34a;
  }

  .text-neg {
    color: #dc2626;
  }

  .text-gold {
    color: #c9a227;
  }
}

```

---

## src/lib/assetUrl.ts

```typescript
/** Путь к файлу из public/ с учётом base Vite (./ при открытии из dist). */
export function publicAsset(path: string): string {
  const [file, query = ""] = path.split("?");
  const clean = file.replace(/^\//, "");
  const base = import.meta.env.BASE_URL;
  const joined = base.endsWith("/") ? `${base}${clean}` : `${base}/${clean}`;
  return query ? `${joined}?${query}` : joined;
}

```

---

## src/lib/images.ts

```typescript
import { publicAsset } from "./assetUrl";

const v = "13";

/** Тематические иллюстрации для дипломной работы (PNG в public/images) */
export const IMAGES = {
  hero: publicAsset(`images/home-overview-ru.svg?v=${v}`),
  psychology: publicAsset(`images/theory-psychology-ru.svg?v=${v}`),
  analytics: publicAsset(`images/theory-montecarlo-ru.svg?v=${v}`),
  rng: publicAsset(`images/home-rng-ru.svg?v=${v}`),
} as const;

/** Академические баннеры модулей (схемы, не казино-фото) */
export const GAME_IMAGES = {
  lcg: publicAsset(`images/game-roulette-academic.svg?v=${v}`),
  csprng: publicAsset(`images/game-dice-academic.svg?v=${v}`),
  provablyFair: publicAsset(`images/game-cards-academic.svg?v=${v}`),
  weightedWheel: publicAsset(`images/game-slot-academic.svg?v=${v}`),
} as const;

```

---

## src/lib/rng/fisherYates.ts

```typescript
/** Fisher-Yates shuffle — перемешивание колоды */
export function createDeck(): number[] {
  return Array.from({ length: 52 }, (_, i) => i);
}

export function fisherYatesShuffle<T>(arr: T[], random: () => number): T[] {
  const deck = [...arr];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function cardValue(index: number): number {
  return (index % 13) + 1;
}

export function cardLabel(index: number): string {
  const v = cardValue(index);
  const suits = ["♠", "♥", "♦", "♣"];
  const names = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  return `${names[v]}${suits[Math.floor(index / 13)]}`;
}

```

---

## src/lib/rng/prng.ts

```typescript
/** Браузерный PRNG — Math.random() (линейный конгруэнтный генератор V8) */
export function prngNext(): number {
  return Math.random();
}

export function prngInt(max: number): number {
  return Math.floor(prngNext() * max);
}

export function prngRange(min: number, max: number): number {
  return min + prngInt(max - min + 1);
}

```

---

## src/lib/rng/weighted.ts

```typescript
/** Взвешенный случайный выбор — кумулятивное распределение (RTP слота) */

export interface WeightedOutcome<T> {
  value: T;
  weight: number;
}

export function weightedPick<T>(outcomes: WeightedOutcome<T>[], random: () => number): T {
  const total = outcomes.reduce((s, o) => s + o.weight, 0);
  let r = random() * total;
  for (const o of outcomes) {
    r -= o.weight;
    if (r <= 0) return o.value;
  }
  return outcomes[outcomes.length - 1].value;
}

export const SLOT_SYMBOLS = ["🍒", "🍋", "🔔", "⭐", "7️⃣"] as const;
export type SlotSymbol = (typeof SLOT_SYMBOLS)[number];

const SYMBOL_WEIGHTS: WeightedOutcome<SlotSymbol>[] = [
  { value: "🍒", weight: 30 },
  { value: "🍋", weight: 25 },
  { value: "🔔", weight: 20 },
  { value: "⭐", weight: 15 },
  { value: "7️⃣", weight: 10 },
];

export function spinReel(random: () => number): SlotSymbol {
  return weightedPick(SYMBOL_WEIGHTS, random);
}

const PAYOUTS: Record<SlotSymbol, number> = {
  "🍒": 2,
  "🍋": 3,
  "🔔": 5,
  "⭐": 10,
  "7️⃣": 20,
};

export function slotPayout(symbols: [SlotSymbol, SlotSymbol, SlotSymbol]): number {
  if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
    return PAYOUTS[symbols[0]];
  }
  if (symbols[0] === symbols[1] || symbols[1] === symbols[2]) {
    return 1.5;
  }
  return 0;
}

export function isNearMiss(symbols: [SlotSymbol, SlotSymbol, SlotSymbol]): boolean {
  return symbols[0] === symbols[1] && symbols[2] !== symbols[0];
}

```

---

## src/lib/rng/xorshift.ts

```typescript
/** XorShift32 — собственная реализация псевдослучайного генератора с семенем */
export class XorShift32 {
  private state: number;

  constructor(seed = Date.now()) {
    this.state = seed || 1;
  }

  next(): number {
    let x = this.state;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.state = x >>> 0;
    return (this.state & 0xffffffff) / 0x100000000;
  }

  nextInt(max: number): number {
    return Math.floor(this.next() * max);
  }

  nextRange(min: number, max: number): number {
    return min + this.nextInt(max - min + 1);
  }

  setSeed(seed: number) {
    this.state = seed || 1;
  }
}

let globalXor = new XorShift32();

export function xorshiftNext(): number {
  return globalXor.next();
}

export function xorshiftInt(max: number): number {
  return globalXor.nextInt(max);
}

export function xorshiftRange(min: number, max: number): number {
  return globalXor.nextRange(min, max);
}

export function resetXorSeed(seed: number) {
  globalXor.setSeed(seed);
}

```

---

## src/main.tsx

```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./index.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
  document.body.innerHTML =
    '<p style="color:#fff;background:#000;padding:40px;font-family:sans-serif">Не найден #root. Запустите: npm run dev</p>';
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}

```

---

## src/math/betting.ts

```typescript
import type { BettingStrategy } from "../types";

export interface StrategyState {
  consecutiveLosses: number;
  consecutiveWins: number;
  lastBet: number;
}

export function computeStrategyBet(
  strategy: BettingStrategy,
  baseBet: number,
  balance: number,
  state: StrategyState,
): number {
  if (balance <= 0) return 0;

  let raw: number;
  switch (strategy) {
    case "flat":
      raw = baseBet;
      break;
    case "martingale":
      raw = baseBet * Math.pow(2, state.consecutiveLosses);
      break;
    case "dalembert":
      raw = baseBet + state.consecutiveLosses * baseBet - state.consecutiveWins * baseBet;
      break;
  }

  return Math.min(Math.max(1, Math.floor(raw)), balance);
}

export function getStrategyLabel(strategy: BettingStrategy): string {
  switch (strategy) {
    case "flat":
      return "Фиксированная (Flat)";
    case "martingale":
      return "Мартингейл";
    case "dalembert":
      return "Д'Аламбер";
  }
}

export function getStrategyDescription(strategy: BettingStrategy): string {
  switch (strategy) {
    case "flat":
      return "Постоянный размер ставки независимо от исхода.";
    case "martingale":
      return "Удвоение ставки после каждого проигрыша — классическая «ловушка отыгрыша».";
    case "dalembert":
      return "Линейное увеличение после проигрыша и уменьшение после выигрыша.";
  }
}

```

---

## src/math/bettingStrategies.ts

```typescript
import type { BettingStrategyId, StrategyResult, StrategyState } from "../types/simulation";

function clampBet(value: number, balance: number, maxBet: number): number {
  if (balance <= 0) return 0;
  return Math.max(1, Math.min(Math.floor(value), Math.floor(balance), Math.floor(maxBet)));
}

export function calculateNextBet(strategy: BettingStrategyId, state: StrategyState): StrategyResult {
  const warnings: string[] = [];
  let nextBet = state.baseBet;

  if (strategy === "martingale") {
    nextBet = state.lastRoundWon === false ? state.previousBet * 2 : state.baseBet;
    if (state.lossStreak >= 2) {
      warnings.push("Martingale Trap detected: ставка увеличивается после серии проигрышей.");
      warnings.push("Эскалация после потерь повышает риск банкротства.");
    }
  }

  if (strategy === "dalembert") {
    nextBet =
      state.lastRoundWon === false
        ? state.previousBet + state.baseBet
        : Math.max(state.baseBet, state.previousBet - state.baseBet);
    if (state.lossStreak >= 2) {
      warnings.push("D’Alembert escalation: линейное повышение ставки после потерь.");
    }
  }

  if (strategy === "flat") {
    nextBet = state.baseBet;
  }

  const bounded = clampBet(nextBet, state.balance, state.maxBet);
  if (bounded >= state.balance && state.balance > 0) {
    warnings.push("Cognitive distortion: ставка приблизилась к доступному капиталу.");
    warnings.push("Risk of bankruptcy: один отрицательный исход может обнулить баланс.");
  }

  return { nextBet: bounded, warnings };
}

export function getStrategyName(strategy: BettingStrategyId): string {
  switch (strategy) {
    case "flat":
      return "Flat";
    case "martingale":
      return "Мартингейл";
    case "dalembert":
      return "Д’Аламбер";
  }
}

export function getStrategyDescription(strategy: BettingStrategyId): string {
  switch (strategy) {
    case "flat":
      return "Фиксированная ставка: контрольный сценарий без эскалации.";
    case "martingale":
      return "Удвоение после проигрыша: демонстрирует ловушку эскалации ставок.";
    case "dalembert":
      return "Линейное повышение после проигрыша и снижение после выигрыша.";
  }
}

```

---

## src/math/csprng.ts

```typescript
/** Cryptographically Secure Pseudo-Random Number Generator via Web Crypto API */

export function csprngNext(): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0]! / 0x100000000;
}

export function csprngInt(max: number): number {
  if (max <= 0) return 0;
  return Math.floor(csprngNext() * max);
}

export function csprngRange(min: number, max: number): number {
  return min + csprngInt(max - min + 1);
}

const CRASH_HOUSE_EDGE = 0.04;

/**
 * Generates crash point using industry-standard inverse transform.
 * Even with perfect CSPRNG entropy, E[profit] < 0 due to house edge.
 */
export function generateCrashPoint(rng: () => number = csprngNext): number {
  const u = Math.max(rng(), 1e-10);
  const raw = (1 - CRASH_HOUSE_EDGE) / u;
  return Math.max(1.0, Math.floor(raw * 100) / 100);
}

export function evaluateCrash(
  crashPoint: number,
  cashoutTarget: number,
  bet: number,
): { won: boolean; payout: number; crashed: boolean } {
  if (cashoutTarget <= crashPoint) {
    const profit = Math.floor(bet * (cashoutTarget - 1));
    return { won: true, payout: profit, crashed: false };
  }
  return { won: false, payout: 0, crashed: true };
}

export function csprngTheoreticalWinRate(cashoutTarget: number): number {
  const pSurvive = (1 - CRASH_HOUSE_EDGE) / cashoutTarget;
  return Math.min(99, pSurvive * 100);
}

export function getCrashHouseEdge(): number {
  return CRASH_HOUSE_EDGE;
}

```

---

## src/math/engine.ts

```typescript
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
      message: `Значение ${crashPoint.toFixed(2)} выше порога ${cashoutTarget.toFixed(2)}. Исход положительный, прибыль ${outcome.payout} ₽.`,
      metadata: { crashPoint, cashoutTarget, mechanism: "csprng" },
    };
  }

  return {
    won: false,
    payout: 0,
    netChange: -bet,
    message: `Значение ${crashPoint.toFixed(2)} ниже порога ${cashoutTarget.toFixed(2)}. Исход отрицательный, потеря ${bet} ₽.`,
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
      message: `Выпало значение ${roll}. Положительный исход, прибыль ${outcome.payout} ₽.`,
      metadata: { roll, hash: hash.slice(0, 16), nonce: pf.nonce, mechanism: "provablyFair" },
    };
  }

  return {
    won: false,
    payout: 0,
    netChange: -bet,
    message: `Выпало значение ${roll}. Отрицательный исход, потеря ${bet} ₽.`,
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

```

---

## src/math/lcg.ts

```typescript
/** Seedable Linear Congruential Generator (Park-Miller variant) */
export class LCG {
  private state: number;

  constructor(seed?: number) {
    this.state = (seed ?? Date.now()) >>> 0;
    if (this.state === 0) this.state = 1;
  }

  next(): number {
    this.state = (1664525 * this.state + 1013904223) >>> 0;
    return this.state / 0x100000000;
  }

  nextInt(max: number): number {
    if (max <= 0) return 0;
    return Math.floor(this.next() * max);
  }

  nextRange(min: number, max: number): number {
    return min + this.nextInt(max - min + 1);
  }

  nextFloatRange(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  getSeed(): number {
    return this.state;
  }

  setSeed(seed: number): void {
    this.state = seed >>> 0;
    if (this.state === 0) this.state = 1;
  }
}

let globalLcg = new LCG();

export function lcgNext(): number {
  return globalLcg.next();
}

export function lcgFloatRange(min: number, max: number): number {
  return globalLcg.nextFloatRange(min, max);
}

export function lcgIntegerRange(min: number, max: number): number {
  return globalLcg.nextRange(min, max);
}

export function resetLcg(seed?: number): LCG {
  globalLcg = new LCG(seed);
  return globalLcg;
}

export function getLcgInstance(): LCG {
  return globalLcg;
}

export const SLOT_SYMBOLS = ["7", "BAR", "CH", "LM", "OR"] as const;
export type SlotSymbol = (typeof SLOT_SYMBOLS)[number];

const SYMBOL_WEIGHTS: { symbol: SlotSymbol; weight: number }[] = [
  { symbol: "OR", weight: 35 },
  { symbol: "LM", weight: 28 },
  { symbol: "CH", weight: 20 },
  { symbol: "BAR", weight: 12 },
  { symbol: "7", weight: 5 },
];

const PAYOUT_TABLE: Record<SlotSymbol, number> = {
  "7": 25,
  BAR: 10,
  CH: 5,
  LM: 3,
  OR: 2,
};

function pickSymbol(rng: () => number): SlotSymbol {
  const total = SYMBOL_WEIGHTS.reduce((s, w) => s + w.weight, 0);
  let r = rng() * total;
  for (const entry of SYMBOL_WEIGHTS) {
    r -= entry.weight;
    if (r <= 0) return entry.symbol;
  }
  return SYMBOL_WEIGHTS[SYMBOL_WEIGHTS.length - 1].symbol;
}

export function spinLcgReels(rng: () => number = lcgNext): [SlotSymbol, SlotSymbol, SlotSymbol] {
  return [pickSymbol(rng), pickSymbol(rng), pickSymbol(rng)];
}

export function evaluateLcgSlots(
  reels: [SlotSymbol, SlotSymbol, SlotSymbol],
  bet: number,
  payoutMultiplier = 1,
): { won: boolean; payout: number; nearMiss: boolean } {
  const [a, b, c] = reels;
  const nearMiss = (a === b && c !== a) || (b === c && a !== b);

  if (a === b && b === c) {
    const raw = bet * PAYOUT_TABLE[a] * 0.88 * payoutMultiplier;
    return { won: true, payout: Math.floor(raw), nearMiss: false };
  }

  if (a === b || b === c) {
    const raw = bet * 1.2 * 0.88 * payoutMultiplier;
    return { won: true, payout: Math.floor(raw), nearMiss };
  }

  return { won: false, payout: 0, nearMiss };
}

export function lcgTheoreticalWinRate(): number {
  return 22.4;
}

```

---

## src/math/mechanisms.ts

```typescript
import type { MechanismId, MechanismInfo } from "../types";

export const MECHANISMS: Record<MechanismId, MechanismInfo> = {
  lcg: {
    id: "lcg",
    label: "Механизм I — LCG PRNG",
    technicalName: "Линейный конгруэнтный генератор (LCG)",
    gameShell: "Модуль I: трёхкомпонентная выборка LCG",
    description:
      "Seedable LCG генерирует три последовательных значения. Исследуется статистическое поведение стандартных PRNG на длинных сериях.",
    implementation: "state = (1664525 × state + 1013904223) mod 2³²",
    houseEdge: 12,
    theoreticalWinRate: 22.4,
    researchFocus:
      "Демонстрация того, что стандартный PRNG не делает длительную серию выгодной для пользователя.",
  },
  csprng: {
    id: "csprng",
    label: "Механизм II — CSPRNG",
    technicalName: "Криптографически стойкий ГПСЧ (Web Crypto API)",
    gameShell: "Модуль II: экспоненциальная модель CSPRNG",
    description:
      "Точка прекращения роста генерируется через crypto.getRandomValues. Исследуется влияние криптостойкой энтропии на итоговый результат.",
    implementation: "crypto.getRandomValues(Uint32Array) → t = (1−ε)/U",
    houseEdge: 4,
    theoreticalWinRate: 48,
    researchFocus:
      "Проверка гипотезы: криптографически стойкая случайность не компенсирует преимущество системы.",
  },
  weightedWheel: {
    id: "weightedWheel",
    label: "Механизм III — Weighted RNG",
    technicalName: "Взвешенное секторное распределение (near-miss)",
    gameShell: "Модуль III: секторное распределение с near-miss",
    description:
      "Взвешенный выбор сектора с инженерным размещением исходов, провоцирующим эффект «почти выигрыш» (near-miss).",
    implementation: "r -= weight[i]; if (r ≤ 0) → sector[i]",
    houseEdge: 12,
    theoreticalWinRate: 31,
    researchFocus:
      "Анализ near-miss эффекта как фактора усиления субъективной мотивации к продолжению серии.",
  },
  provablyFair: {
    id: "provablyFair",
    label: "Механизм IV — Provably Fair",
    technicalName: "SHA-256(serverSeed + clientSeed + nonce)",
    gameShell: "Модуль IV: верифицируемый криптографический исход",
    description:
      "Полностью прозрачный алгоритм: хеш исхода верифицируется до выполнения итерации. Исключается фактор скрытого манипулирования.",
    implementation: "roll = parseInt(SHA256(s+c+n)[0:8], 16) mod 100",
    houseEdge: 4,
    theoreticalWinRate: 48,
    researchFocus:
      "Доказательство: прозрачность алгоритма не делает итог серии выгодным для пользователя.",
  },
};

export const MECHANISM_LIST = Object.values(MECHANISMS);

export const ALL_MECHANISM_IDS: MechanismId[] = ["lcg", "csprng", "weightedWheel", "provablyFair"];

```

---

## src/math/monteCarlo.ts

```typescript
import type {
  BettingStrategy,
  CustomGameRules,
  MechanismId,
  SimulationResult,
  SimulationRun,
  SimulationStats,
  TelemetryParams,
} from "../types";
import { computeStrategyBet, type StrategyState } from "./betting";
import { csprngNext } from "./csprng";
import { getTheoreticalWinRate, simulateWin } from "./engine";
import { lcgNext } from "./lcg";
import { MECHANISMS } from "./mechanisms";

export const MONTE_CARLO_PATHWAYS = 50;
export const MONTE_CARLO_BETS = 100;

function getRandomFor(mechanism: MechanismId): () => number {
  switch (mechanism) {
    case "lcg":
      return lcgNext;
    case "csprng":
    case "weightedWheel":
    case "provablyFair":
      return csprngNext;
  }
}

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

    const bet = computeStrategyBet(params.strategy, params.baseBet, balance, strategyState);
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

  return { balances, bankrupt: balance <= 0, maxDrawdown, wins, betsPlayed };
}

function computeAverageBalances(runs: SimulationRun[], length: number): number[] {
  const avg: number[] = [];
  for (let i = 0; i < length; i++) {
    let sum = 0;
    for (const run of runs) {
      sum += run.balances[i] ?? run.balances[run.balances.length - 1] ?? 0;
    }
    avg.push(sum / runs.length);
  }
  return avg;
}

function aggregateStats(
  runs: SimulationRun[],
  params: TelemetryParams,
  mechanism: MechanismId,
  rules: CustomGameRules,
): SimulationStats {
  const bankruptCount = runs.filter((r) => r.bankrupt).length;
  const totalWins = runs.reduce((s, r) => s + r.wins, 0);
  const totalBets = runs.reduce((s, r) => s + r.betsPlayed, 0);
  const avgFinal =
    runs.reduce((s, r) => s + r.balances[r.balances.length - 1], 0) / runs.length;
  const avgMaxDrawdown = runs.reduce((s, r) => s + r.maxDrawdown, 0) / runs.length;

  const initialTotal = params.initialBalance * runs.length;
  const finalTotal = runs.reduce((s, r) => s + r.balances[r.balances.length - 1], 0);
  const houseMargin = Math.max(0, initialTotal - finalTotal);

  const decayRates = runs.map((r) => {
    const start = r.balances[0] ?? params.initialBalance;
    const end = r.balances[r.balances.length - 1] ?? 0;
    return start > 0 ? ((start - end) / start) * 100 : 100;
  });
  const capitalDecayRate = decayRates.reduce((a, b) => a + b, 0) / decayRates.length;

  return {
    averageFinalBalance: avgFinal,
    averageProfit: avgFinal - params.initialBalance,
    bankruptcyRate: (bankruptCount / runs.length) * 100,
    maxDrawdown: avgMaxDrawdown * 100,
    winRate: totalBets > 0 ? (totalWins / totalBets) * 100 : 0,
    theoreticalWinRate: getTheoreticalWinRate(mechanism, params, rules),
    capitalDecayRate,
    houseMargin,
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

export function computeBankruptcyIndex(
  sessions: { bankrupt: boolean }[],
): number {
  if (sessions.length === 0) return 0;
  return (sessions.filter((s) => s.bankrupt).length / sessions.length) * 100;
}

export function computeCapitalDecay(sessions: { pathway: number[] }[]): number {
  if (sessions.length === 0) return 0;
  const rates = sessions.map((s) => {
    const start = s.pathway[0] ?? 0;
    const end = s.pathway[s.pathway.length - 1] ?? 0;
    return start > 0 ? ((start - end) / start) * 100 : 0;
  });
  return rates.reduce((a, b) => a + b, 0) / rates.length;
}

export function computeHouseMargin(
  sessions: { pathway: number[]; initialBalance?: number }[],
  totalDeposited: number,
): number {
  const currentTotal = sessions.reduce(
    (s, sess) => s + (sess.pathway[sess.pathway.length - 1] ?? 0),
    0,
  );
  return Math.max(0, totalDeposited - currentTotal);
}

export { type BettingStrategy };

export interface MechanismComparison {
  mechanism: MechanismId;
  label: string;
  gameShell: string;
  stats: SimulationStats;
}

export function compareAllMechanisms(
  params: TelemetryParams,
  rules: CustomGameRules,
  pathways = MONTE_CARLO_PATHWAYS,
  bets = MONTE_CARLO_BETS,
): MechanismComparison[] {
  const ids: MechanismId[] = ["lcg", "csprng", "weightedWheel", "provablyFair"];

  return ids.map((mechanism) => {
    const result = runMonteCarlo(mechanism, params, rules, pathways, bets);
    const info = MECHANISMS[mechanism];
    return {
      mechanism,
      label: info.label,
      gameShell: info.gameShell,
      stats: result.stats,
    };
  });
}

```

---

## src/math/monteCarloResearch.ts

```typescript
import { calculateNextBet } from "./bettingStrategies";
import { LCG, spinLcgReels, evaluateLcgSlots } from "./lcg";
import { generateCrashPoint, evaluateCrash } from "./csprng";
import { evaluateWeightedOutcome, pickWeightedSector } from "./weightedRandom";
import type {
  BettingStrategyId,
  MonteCarloPath,
  MonteCarloResult,
  RandomizerId,
  SimulationSettings,
} from "../types/simulation";

export const MONTE_CARLO_SESSIONS = 50;
export const MONTE_CARLO_ROUNDS = 100;

interface SimulateOptions {
  settings: SimulationSettings;
  sessions?: number;
  rounds?: number;
}

export function runResearchMonteCarlo({
  settings,
  sessions = MONTE_CARLO_SESSIONS,
  rounds = MONTE_CARLO_ROUNDS,
}: SimulateOptions): MonteCarloResult {
  const paths: MonteCarloPath[] = [];
  for (let i = 0; i < sessions; i += 1) {
    paths.push(simulateSession(settings, rounds, i + 1));
  }

  const averagePath = Array.from({ length: rounds + 1 }, (_, index) => {
    const sum = paths.reduce((acc, path) => acc + (path.balances[index] ?? path.finalBalance), 0);
    return Math.round(sum / paths.length);
  });

  const bankruptCount = paths.filter((path) => path.bankrupt).length;
  const finalSum = paths.reduce((sum, path) => sum + path.finalBalance, 0);
  const startSum = settings.initialBalance * paths.length;
  const expectedValue = (finalSum - startSum) / Math.max(1, paths.length * rounds);
  const averageCapitalDecayRate = ((startSum - finalSum) / Math.max(1, startSum)) * 100;

  return {
    paths,
    averagePath,
    bankruptcyProbability: (bankruptCount / paths.length) * 100,
    averageCapitalDecayRate,
    expectedValue,
    accumulatedHouseMargin: Math.max(0, startSum - finalSum),
  };
}

function simulateSession(settings: SimulationSettings, rounds: number, id: number): MonteCarloPath {
  let balance = settings.initialBalance;
  let previousBet = settings.baseBet;
  let lastRoundWon: boolean | null = null;
  let lossStreak = 0;
  const balances = [balance];
  const lcg = new LCG(settings.lcgSeed + id * 9973);

  for (let round = 0; round < rounds; round += 1) {
    if (balance <= 0) {
      balances.push(0);
      continue;
    }

    const strategy = calculateNextBet(settings.strategy as BettingStrategyId, {
      balance,
      baseBet: settings.baseBet,
      previousBet,
      lastRoundWon,
      lossStreak,
      maxBet: balance,
    });
    const bet = Math.min(strategy.nextBet, balance);
    const profit = simulateProfit(settings.activeRandomizer, settings, bet, lossStreak, lcg);

    balance = Math.max(0, balance + profit);
    previousBet = bet;
    lastRoundWon = profit > 0;
    lossStreak = profit > 0 ? 0 : lossStreak + 1;
    balances.push(Math.round(balance));
  }

  return {
    id,
    balances,
    bankrupt: balance <= 0,
    finalBalance: Math.round(balance),
  };
}

function simulateProfit(
  randomizer: RandomizerId,
  settings: SimulationSettings,
  bet: number,
  lossStreak: number,
  lcg: LCG,
): number {
  switch (randomizer) {
    case "lcg": {
      const reels = spinLcgReels(() => lcg.next());
      const result = evaluateLcgSlots(reels, bet);
      return result.won ? result.payout - bet : -bet;
    }
    case "csprng": {
      const crashPoint = generateCrashPoint(() => lcg.next());
      const result = evaluateCrash(crashPoint, settings.crashCashOut, bet);
      return result.won ? result.payout : -bet;
    }
    case "weighted": {
      const spin = pickWeightedSector(() => lcg.next(), lossStreak);
      return evaluateWeightedOutcome(bet, spin).profit;
    }
    case "provablyFair": {
      const roll = Math.floor(lcg.next() * 100);
      const winProbability = (100 - settings.diceThreshold) / 100;
      const payout = roll >= settings.diceThreshold ? Math.floor(bet * (1 / winProbability) * 0.96) : 0;
      return payout > 0 ? payout - bet : -bet;
    }
  }
}

```

---

## src/math/provablyFair.ts

```typescript
/** Provably Fair Cryptographic Algorithm — SHA-256(serverSeed + clientSeed + nonce) */

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

export async function hashServerSeed(serverSeed: string): Promise<string> {
  return sha256(serverSeed);
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

export function provablyFairTheoreticalWinRate(threshold: number): number {
  const winProbability = (100 - threshold) / 100;
  return winProbability * 96;
}

```

---

## src/math/psychAnalyzer.ts

```typescript
import type {
  BettingStrategy,
  CustomGameRules,
  MechanismId,
  PsychEvent,
  PsychEventType,
  TelemetryParams,
} from "../types";

let eventCounter = 0;

function createEvent(
  type: PsychEventType,
  mechanism: MechanismId,
  message: string,
  brainRegion?: string,
): PsychEvent {
  eventCounter += 1;
  return {
    id: `psych-${eventCounter}-${Date.now()}`,
    type,
    mechanism,
    message,
    brainRegion,
    timestamp: Date.now(),
  };
}

export function analyzeParameterChange(
  mechanism: MechanismId,
  field: string,
  value: string | number,
): PsychEvent {
  return createEvent(
    "parameter_change",
    mechanism,
    `Изменён параметр «${field}» → ${value}. Когнитивная переоценка контроля над исходом.`,
    "Префронтальная кора",
  );
}

export function analyzeCustomRulesChange(_rules: CustomGameRules, mechanism: MechanismId): PsychEvent {
  return createEvent(
    "illusion_of_control",
    mechanism,
    `Предупреждение: активирована когнитивная иллюзия контроля. Изменение правил не делает серию выгодной для пользователя.`,
    "Префронтальная кора (лateral PFC)",
  );
}

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
        isMartingale ? "Вентральный striatum / миндалина" : "Передняя поясная кора",
      ),
    );
  }

  if (round.won && session.consecutiveWins >= 3) {
    events.push(
      createEvent(
        "win_streak",
        mechanism,
        `Серия из ${session.consecutiveWins} побед — иллюзия «система работает». На длинной дистанции итог всё равно остаётся невыгодным.`,
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

export function analyzeTopUp(
  mechanism: MechanismId,
  amount: number,
  topUpCount: number,
  wasBankrupt: boolean,
): PsychEvent {
  if (wasBankrupt) {
    return createEvent(
      "bankruptcy",
      mechanism,
      `Банкротство → мгновенное пополнение +${amount} ₽ (раз #${topUpCount}). Паттерн «chasing losses» — попытка компенсировать невозвратные потери.`,
      "Миндалина / ventral striatum",
    );
  }
  return createEvent(
    "top_up",
    mechanism,
    `Пополнение +${amount} ₽ (раз #${topUpCount}) — субъективное «отыграюсь», но это не улучшает итог серии.`,
    "Орбитofrontalная кора",
  );
}

export function analyzeStrategyChange(strategy: BettingStrategy, mechanism: MechanismId): PsychEvent {
  const labels: Record<BettingStrategy, string> = {
    flat: "Фиксированная",
    martingale: "Мартингейл",
    dalembert: "Д'Аламбер",
  };
  return createEvent(
    "parameter_change",
    mechanism,
    `Смена стратегии на «${labels[strategy]}». Ни одна стратегия ставок не делает длительную серию выгодной.`,
    "Префронтальная кора",
  );
}

export function analyzeChaseLoss(mechanism: MechanismId, betIncrease: number): PsychEvent {
  return createEvent(
    "chase_loss",
    mechanism,
    `Ставка увеличена на ${betIncrease}% после проигрыша — поведенческий паттерн «chase losses».`,
    "Миндалина",
  );
}

```

---

## src/math/researchEngine.ts

```typescript
import { csprngNext, evaluateCrash, generateCrashPoint } from "./csprng";
import { evaluateLcgSlots, LCG, spinLcgReels } from "./lcg";
import { computeProvablyFairRoll, evaluateProvablyFairDice } from "./provablyFair";
import { evaluateWeightedOutcome, pickWeightedSector } from "./weightedRandom";
import type { RandomizerId, RoundOutcome, SimulationSettings } from "../types/simulation";

export const RANDOMIZER_META = {
  lcg: {
    id: "lcg",
    title: "Seedable PRNG / LCG",
    shortTitle: "LCG",
    subtitle: "Воспроизводимая псевдослучайная последовательность",
    houseEdge: 0.12,
    researchFocus:
      "Стандартные программные генераторы случайных чисел создают воспроизводимые последовательности. Однако даже при равномерном распределении отрицательное математическое ожидание сохраняет преимущество системы.",
  },
  csprng: {
    id: "csprng",
    title: "CSPRNG / Web Crypto API",
    shortTitle: "CSPRNG",
    subtitle: "Криптографически стойкая энтропия браузера",
    houseEdge: 0.04,
    researchFocus:
      "Криптографически стойкая случайность исключает предсказание результата, но не отменяет отрицательное математическое ожидание.",
  },
  weighted: {
    id: "weighted",
    title: "Weighted Dynamic Randomizer",
    shortTitle: "Weighted",
    subtitle: "Взвешенная RTP-матрица и near-miss эффект",
    houseEdge: 0.12,
    researchFocus:
      "Эффект почти выигрыша усиливает вовлеченность пользователя, хотя фактически результат остается проигрышным.",
  },
  provablyFair: {
    id: "provablyFair",
    title: "Provably Fair SHA-256 Dice",
    shortTitle: "SHA-256",
    subtitle: "Проверяемый исход server seed + client seed + nonce",
    houseEdge: 0.04,
    researchFocus:
      "Даже полностью проверяемый и прозрачный алгоритм не устраняет преимущество системы, если правила игры имеют отрицательное математическое ожидание.",
  },
} as const satisfies Record<RandomizerId, {
  id: RandomizerId;
  title: string;
  shortTitle: string;
  subtitle: string;
  researchFocus: string;
  houseEdge: number;
}>;

export interface ResearchEngineOptions {
  settings: SimulationSettings;
  bet: number;
  lossStreak: number;
  serverSeed: string;
  clientSeed: string;
  nonce: number;
}

export async function playResearchRound(options: ResearchEngineOptions): Promise<RoundOutcome> {
  const { settings, bet, lossStreak } = options;
  switch (settings.activeRandomizer) {
    case "lcg":
      return playLcg(settings, bet);
    case "csprng":
      return playCsprng(settings, bet);
    case "weighted":
      return playWeighted(bet, lossStreak);
    case "provablyFair":
      return playProvablyFair(options);
  }
}

function playLcg(settings: SimulationSettings, bet: number): RoundOutcome {
  const rng = new LCG(settings.lcgSeed + settings.balance + bet);
  const reels = spinLcgReels(() => rng.next());
  const result = evaluateLcgSlots(reels, bet, 1);
  const profit = result.won ? result.payout - bet : -bet;
  return {
    won: profit > 0,
    bet,
    profit,
    payout: result.won ? result.payout : 0,
    risk: result.nearMiss ? "nearMiss" : "neutral",
    message: result.nearMiss
      ? `LCG: ${reels.join(" · ")}. Зафиксирован эффект почти выигрыша, Δ=${profit} ₽.`
      : `LCG: ${reels.join(" · ")}. Результат итерации Δ=${profit} ₽.`,
    details: {
      reels: reels.join(", "),
      seed: settings.lcgSeed,
      expectedValue: "-12%",
    },
  };
}

function playCsprng(settings: SimulationSettings, bet: number): RoundOutcome {
  const crashPoint = generateCrashPoint(csprngNext);
  const result = evaluateCrash(crashPoint, settings.crashCashOut, bet);
  const profit = result.won ? result.payout : -bet;
  return {
    won: result.won,
    bet,
    profit,
    payout: result.won ? bet + result.payout : 0,
    risk: crashPoint < settings.crashCashOut && crashPoint >= settings.crashCashOut * 0.85 ? "nearMiss" : "neutral",
    message: `CSPRNG: точка краха ${crashPoint.toFixed(2)}×, целевой cash-out ${settings.crashCashOut.toFixed(2)}×, Δ=${profit} ₽.`,
    details: {
      crashPoint: crashPoint.toFixed(2),
      cashOut: settings.crashCashOut.toFixed(2),
      expectedValue: "-4%",
    },
  };
}

function playWeighted(bet: number, lossStreak: number): RoundOutcome {
  const spin = pickWeightedSector(Math.random, lossStreak);
  const result = evaluateWeightedOutcome(bet, spin);
  return {
    won: result.won,
    bet,
    profit: result.profit,
    payout: result.payout,
    risk: spin.nearMiss ? "nearMiss" : "neutral",
    message: `Weighted RNG: сектор «${spin.sector.label}», ${spin.trigger} Δ=${result.profit} ₽.`,
    details: {
      sector: spin.sector.label,
      multiplier: spin.sector.multiplier,
      dopamineSpike: spin.dopamineSpike,
      expectedValue: "-12%",
    },
  };
}

async function playProvablyFair(options: ResearchEngineOptions): Promise<RoundOutcome> {
  const { settings, bet, serverSeed, clientSeed, nonce } = options;
  const roll = await computeProvablyFairRoll(serverSeed, clientSeed, nonce);
  const result = evaluateProvablyFairDice(roll.roll, bet, settings.diceThreshold);
  return {
    won: result.won,
    bet,
    profit: result.netChange,
    payout: result.won ? bet + result.payout : 0,
    risk: "neutral",
    message: `SHA-256: roll=${roll.roll}, nonce=${nonce}, hash=${roll.hash.slice(0, 12)}…, Δ=${result.netChange} ₽.`,
    details: {
      roll: roll.roll,
      nonce,
      hash: roll.hash.slice(0, 16),
      threshold: settings.diceThreshold,
      expectedValue: "-4%",
    },
  };
}

```

---

## src/math/weightedRandom.ts

```typescript
export interface WeightedSector {
  id: string;
  label: string;
  weight: number;
  multiplier: number;
  color: string;
  highValueLoss: boolean;
}

export interface WeightedSpinResult {
  sector: WeightedSector;
  sectorIndex: number;
  nearMiss: boolean;
  dopamineSpike: number;
  trigger: string;
}

export const RTP_MATRIX = {
  targetRtp: 0.88,
  houseEdge: 0.12,
  nearMissBoostAfterLosses: 0.08,
};

export const WEIGHTED_SECTORS: WeightedSector[] = [
  { id: "loss-left", label: "Почти ×20", weight: 12, multiplier: 0, color: "#ef4444", highValueLoss: true },
  { id: "win-small", label: "×1.2", weight: 20, multiplier: 1.2, color: "#10b981", highValueLoss: false },
  { id: "loss-neutral", label: "0", weight: 26, multiplier: 0, color: "#64748b", highValueLoss: false },
  { id: "win-mid", label: "×2", weight: 9, multiplier: 2, color: "#22d3ee", highValueLoss: false },
  { id: "loss-right", label: "Почти ×20", weight: 13, multiplier: 0, color: "#f97316", highValueLoss: true },
  { id: "jackpot", label: "×20", weight: 1, multiplier: 20, color: "#a855f7", highValueLoss: false },
  { id: "loss-after", label: "Почти ×20", weight: 14, multiplier: 0, color: "#ef4444", highValueLoss: true },
  { id: "win-return", label: "×0.5", weight: 5, multiplier: 0.5, color: "#94a3b8", highValueLoss: false },
];

export function pickWeightedSector(random = Math.random, lossStreak = 0): WeightedSpinResult {
  const adjusted = WEIGHTED_SECTORS.map((sector) => ({
    sector,
    weight:
      sector.highValueLoss && lossStreak >= 2
        ? sector.weight * (1 + RTP_MATRIX.nearMissBoostAfterLosses * lossStreak)
        : sector.weight,
  }));
  const total = adjusted.reduce((sum, entry) => sum + entry.weight, 0);
  let cursor = random() * total;
  const selected =
    adjusted.find((entry) => {
      cursor -= entry.weight;
      return cursor <= 0;
    }) ?? adjusted[adjusted.length - 1];

  const sector = selected.sector;
  const sectorIndex = WEIGHTED_SECTORS.findIndex((item) => item.id === sector.id);
  const nearMiss = detectNearMiss(sectorIndex);
  return {
    sector,
    sectorIndex,
    nearMiss,
    dopamineSpike: classifyDopamineSpike(nearMiss, sector.multiplier, lossStreak),
    trigger: classifyPsychologicalTrigger(nearMiss, sector.multiplier, lossStreak),
  };
}

export function detectNearMiss(index: number): boolean {
  const current = WEIGHTED_SECTORS[index];
  if (!current || !current.highValueLoss) return false;
  const left = WEIGHTED_SECTORS[(index - 1 + WEIGHTED_SECTORS.length) % WEIGHTED_SECTORS.length];
  const right = WEIGHTED_SECTORS[(index + 1) % WEIGHTED_SECTORS.length];
  return left.multiplier >= 10 || right.multiplier >= 10;
}

export function evaluateWeightedOutcome(bet: number, result: WeightedSpinResult): { won: boolean; payout: number; profit: number } {
  const gross = Math.floor(bet * result.sector.multiplier * RTP_MATRIX.targetRtp);
  const profit = gross - bet;
  return {
    won: profit > 0,
    payout: Math.max(0, gross),
    profit,
  };
}

function classifyDopamineSpike(nearMiss: boolean, multiplier: number, lossStreak: number): number {
  if (nearMiss) return Math.min(100, 70 + lossStreak * 8);
  if (multiplier >= 10) return 95;
  if (multiplier > 1) return 45;
  return 12;
}

function classifyPsychologicalTrigger(nearMiss: boolean, multiplier: number, lossStreak: number): string {
  if (nearMiss) return "Эффект почти выигрыша: высокий риск продолжения серии.";
  if (lossStreak >= 3) return "Эскалация после потерь: повышенная уязвимость к повторной ставке.";
  if (multiplier >= 10) return "Редкое крупное подкрепление: формирование переоценки вероятности.";
  return "Нейтральный исход распределения.";
}

```

---

## src/math/weightedWheel.ts

```typescript
/** Weighted Dynamic Randomizer with engineered near-miss sectors */

export interface WheelSector {
  id: string;
  label: string;
  color: string;
  weight: number;
  multiplier: number;
  isJackpot: boolean;
}

export const WHEEL_SECTORS: WheelSector[] = [
  { id: "j0", label: "×50", color: "#fbbf24", weight: 1, multiplier: 50, isJackpot: true },
  { id: "l1", label: "×0", color: "#ef4444", weight: 18, multiplier: 0, isJackpot: false },
  { id: "w1", label: "×2", color: "#22c55e", weight: 12, multiplier: 2, isJackpot: false },
  { id: "l2", label: "×0", color: "#dc2626", weight: 16, multiplier: 0, isJackpot: false },
  { id: "w2", label: "×3", color: "#10b981", weight: 8, multiplier: 3, isJackpot: false },
  { id: "l3", label: "×0", color: "#b91c1c", weight: 15, multiplier: 0, isJackpot: false },
  { id: "nm1", label: "×0.5", color: "#f97316", weight: 10, multiplier: 0.5, isJackpot: false },
  { id: "l4", label: "×0", color: "#991b1b", weight: 14, multiplier: 0, isJackpot: false },
  { id: "w3", label: "×1.5", color: "#34d399", weight: 6, multiplier: 1.5, isJackpot: false },
];

const NEAR_MISS_ADJACENT: Record<string, string[]> = {
  j0: ["l1", "l4"],
  l1: ["j0", "w1"],
  w1: ["l1", "l2"],
  l2: ["w1", "w2"],
  w2: ["l2", "l3"],
  l3: ["w2", "nm1"],
  nm1: ["l3", "l4"],
  l4: ["nm1", "j0"],
};

export function pickWheelSector(rng: () => number): WheelSector {
  const total = WHEEL_SECTORS.reduce((s, sec) => s + sec.weight, 0);
  let r = rng() * total;
  for (const sector of WHEEL_SECTORS) {
    r -= sector.weight;
    if (r <= 0) return sector;
  }
  return WHEEL_SECTORS[WHEEL_SECTORS.length - 1];
}

export function isWheelNearMiss(landed: WheelSector, rng: () => number): boolean {
  if (landed.isJackpot || landed.multiplier >= 2) return false;
  const adjacents = NEAR_MISS_ADJACENT[landed.id] ?? [];
  const jackpotNeighbor = adjacents.some((id) => {
    const sec = WHEEL_SECTORS.find((s) => s.id === id);
    return sec?.isJackpot;
  });
  if (!jackpotNeighbor) return false;
  return rng() < 0.72;
}

export function computeWheelAngle(sectorIndex: number, rng: () => number): number {
  const sectorCount = WHEEL_SECTORS.length;
  const sliceAngle = 360 / sectorCount;
  const base = sectorIndex * sliceAngle;
  const jitter = rng() * sliceAngle * 0.7 + sliceAngle * 0.15;
  return base + jitter;
}

export function evaluateWheelSpin(
  sector: WheelSector,
  bet: number,
  _nearMiss: boolean,
  payoutMultiplier = 1,
): { won: boolean; payout: number; netChange: number } {
  if (sector.multiplier === 0) {
    return { won: false, payout: 0, netChange: -bet };
  }
  if (sector.multiplier < 1) {
    const loss = Math.floor(bet * (1 - sector.multiplier));
    return { won: false, payout: 0, netChange: -loss };
  }
  const gross = Math.floor(bet * sector.multiplier * 0.88 * payoutMultiplier);
  const net = gross - bet;
  return { won: net > 0, payout: Math.max(0, net), netChange: net };
}

export function weightedWheelTheoreticalWinRate(): number {
  let expectedReturn = 0;
  const total = WHEEL_SECTORS.reduce((s, sec) => s + sec.weight, 0);
  for (const sec of WHEEL_SECTORS) {
    const p = sec.weight / total;
    expectedReturn += p * sec.multiplier * 0.88;
  }
  return Math.min(99, expectedReturn * 35);
}

```

---

## src/pages/GamesPage.tsx

```typescript
import { useMemo } from "react";
import { GameModuleVisual } from "../components/games/GameModuleVisual";
import { PageHeader } from "../components/PageHeader";
import { useTelemetry } from "../context/TelemetryContext";
import { GAME_IMAGES } from "../lib/images";
import { MECHANISMS } from "../math/mechanisms";
import type { MechanismId } from "../types";

const MODULE_DETAILS: Record<
  MechanismId,
  {
    academicName: string;
    goal: string;
    userAction: string;
    outcome: string;
    interpretation: string;
    observed: string[];
    icon: string;
    accent: string;
  }
> = {
  lcg: {
    academicName: "Рулетка на линейном PRNG",
    goal: "Показать работу обычного псевдослучайного генератора, где каждое новое число зависит от предыдущего состояния.",
    userAction: "Пользователь задаёт ставку и запускает один раунд. Система генерирует три значения и сравнивает их как демонстрационную выборку.",
    outcome: "Положительный исход появляется при совпадении значений. Частичное совпадение может считаться near-miss.",
    interpretation: "Даже если отдельный раунд оказался успешным, на длинной серии преимущество системы сохраняется.",
    observed: ["число ставок", "победы и проигрыши", "серии исходов", "изменение баланса"],
    icon: "◉",
    accent: "#1e3a5f",
  },
  csprng: {
    academicName: "Кости на криптографическом RNG",
    goal: "Показать, что криптографически стойкая случайность делает исход непредсказуемым, но не гарантирует выгодный итог.",
    userAction: "Пользователь выбирает ставку. Система через Web Crypto API получает случайное значение и рассчитывает точку исхода.",
    outcome: "Если сгенерированное значение проходит заданный порог, фиксируется положительный исход. Иначе ставка списывается.",
    interpretation: "Качество случайности влияет на непредсказуемость, но не делает систему выгодной для участника.",
    observed: ["фактический винрейт", "порог исхода", "проигрышные серии", "остаток капитала"],
    icon: "⚀",
    accent: "#0d9488",
  },
  provablyFair: {
    academicName: "Карты с проверяемым алгоритмом",
    goal: "Показать прозрачный механизм, где результат формируется проверяемым способом.",
    userAction: "Пользователь запускает раунд. Система создаёт проверяемый результат и сравнивает его с правилом модуля.",
    outcome: "Если число проходит порог, раунд положительный. Результат можно проверить по исходным данным.",
    interpretation: "Прозрачность алгоритма доказывает проверяемость исхода, но не делает серию выгодной для пользователя.",
    observed: ["проверяемый исход", "результат раунда", "номер попытки", "баланс после раунда"],
    icon: "♠",
    accent: "#7c3aed",
  },
  weightedWheel: {
    academicName: "Слот на взвешенном RNG",
    goal: "Показать механизм, где разные секторы имеют разные веса, а near-miss усиливает субъективную вовлечённость.",
    userAction: "Пользователь задаёт ставку. Система выбирает сектор не равновероятно, а по заданным весам.",
    outcome: "Сектор с множителем даёт положительный или частичный исход. Соседство с крупным сектором может дать near-miss.",
    interpretation: "Взвешенное распределение демонстрирует, как интерфейс может создавать ощущение близости к выигрышу.",
    observed: ["выбранный сектор", "near-miss", "частоту пополнений", "скорость потери капитала"],
    icon: "◈",
    accent: "#c2410c",
  },
};

const ALGORITHM_EXPLANATIONS: Record<MechanismId, string> = {
  lcg: "Система создаёт последовательность псевдослучайных значений и по ним определяет итог раунда.",
  csprng: "Система получает случайное значение из криптографического источника браузера и сравнивает его с правилом модуля.",
  provablyFair: "Система формирует проверяемый результат: его можно воспроизвести по исходным данным раунда.",
  weightedWheel: "Система выбирает сектор с учётом заданных весов: одни исходы встречаются чаще, другие реже.",
};

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
    runMonteCarloSim,
    isPlaying,
    isSimulating,
    mcResult,
    provablyFair,
    rotateSeeds,
    revealSeed,
    customRules,
  } = useTelemetry();

  const tabs = useMemo(
    () =>
      [
        { id: "lcg", label: "Рулетка", title: "Рулетка", image: GAME_IMAGES.lcg },
        { id: "csprng", label: "Кости", title: "Кости", image: GAME_IMAGES.csprng },
        { id: "provablyFair", label: "Карты", title: "Карты", image: GAME_IMAGES.provablyFair },
        { id: "weightedWheel", label: "Слот", title: "Слот", image: GAME_IMAGES.weightedWheel },
      ] satisfies Array<{ id: MechanismId; label: string; title: string; image: string }>,
    [],
  );

  const active = tabs.find((tab) => tab.id === activeMechanism) ?? tabs[0];
  const session = sessions[activeMechanism];
  const result = mcResult?.stats;
  const info = MECHANISMS[activeMechanism];
  const details = MODULE_DETAILS[activeMechanism];
  const netProfit = session.balance - session.totalDeposited;
  const winRate = session.betsPlayed > 0 ? (session.wins / session.betsPlayed) * 100 : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-[74px] md:px-6">
      <PageHeader
        label="Практическая часть"
        title="Программа"
        description="Четыре демонстрационных модуля показывают разные механизмы случайности. Наглядная визуализация помогает понять, как работает каждый алгоритм."
      />

      <div className="tab-bar mb-5">
        {tabs.map((tab) => {
          const mod = MODULE_DETAILS[tab.id];
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveMechanism(tab.id)}
              className={`tab-btn ${activeMechanism === tab.id ? "tab-btn-active" : "tab-btn-inactive"}`}
            >
              <span className="game-tab-icon">{mod.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mb-5 overflow-hidden rounded-card border border-ozon-border bg-white">
        <img src={active.image} alt={active.title} className="game-preview-img" />
      </div>

      <div className="mb-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <GameModuleVisual
          mechanism={activeMechanism}
          lastResult={session.lastResult}
          isPlaying={isPlaying}
          crashTarget={params.crashTarget}
          diceThreshold={customRules.winThreshold}
          provablyFair={provablyFair}
        />

        <section className="glass flex flex-col p-5 md:p-6">
          <div className="mb-4 border-b border-ozon-border pb-4">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: details.accent }}>
              {details.academicName}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-ozon-text">{active.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{details.goal}</p>
          </div>

          <div className="mb-4 rounded-card border-2 p-4" style={{ borderColor: `${details.accent}33`, background: `${details.accent}08` }}>
            <p className="text-xs text-ozon-muted">Текущий баланс</p>
            <p className="text-3xl font-bold text-ozon-text">{session.balance.toLocaleString("ru-RU")} ₽</p>
            <p className={`mt-1 text-sm font-semibold ${netProfit >= 0 ? "text-pos" : "text-neg"}`}>
              Итог: {netProfit >= 0 ? "+" : "−"}
              {formatMoney(Math.abs(netProfit))}
            </p>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { label: "Ставок", val: session.betsPlayed },
              { label: "Побед", val: session.wins },
              { label: "Проигрышей", val: session.losses },
              { label: "Винрейт", val: `${winRate.toFixed(1)}%` },
              { label: "Пополнений", val: session.topUpCount },
              { label: "Серия −", val: session.consecutiveLosses },
            ].map((item, i) => (
              <div key={item.label} className={`game-stat-card ${i === 0 ? "game-stat-card-highlight" : ""}`}>
                <p className="text-xs text-ozon-muted">{item.label}</p>
                <p className="mt-1 font-bold text-ozon-text">{item.val}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-3">
            <div className="flex flex-wrap items-end gap-3">
              <label>
                <span className="mb-1 block text-xs font-medium text-ozon-muted">Ставка</span>
                <input
                  type="number"
                  min={1}
                  value={params.baseBet}
                  onChange={(event) => setParams({ baseBet: Math.max(1, Number(event.target.value) || 1) })}
                  className="input-field w-28"
                />
              </label>
              <button
                type="button"
                disabled={isPlaying || session.balance <= 0}
                onClick={() => void playGame()}
                className="btn-primary disabled:opacity-40"
              >
                {isPlaying ? "Играем…" : "Играть"}
              </button>
              <button type="button" onClick={topUp} className="btn-outline">
                Пополнить +{params.initialBalance.toLocaleString("ru-RU")} ₽
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" disabled={isSimulating} onClick={runMonteCarloSim} className="btn-outline text-sm">
                {isSimulating ? "Считаем…" : "Монте-Карло"}
              </button>
              {activeMechanism === "provablyFair" && (
                <>
                  <button type="button" onClick={() => void rotateSeeds()} className="btn-outline text-sm">
                    Новые seed
                  </button>
                  <button type="button" onClick={revealSeed} className="btn-outline text-sm">
                    Раскрыть seed
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      <section className="glass mb-6 p-6 md:p-8">
        <div className="mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-card border border-ozon-border bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ozon-muted">Как работает модуль</p>
            <h3 className="mt-2 text-lg font-bold text-ozon-text">{info.technicalName}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{details.userAction}</p>
            <div className="mt-4 rounded-card bg-white p-4">
              <p className="text-xs text-ozon-muted">Принцип работы простыми словами</p>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-[#1e3a5f]">
                {ALGORITHM_EXPLANATIONS[activeMechanism]}
              </p>
            </div>
          </div>

          <div className="rounded-card border border-ozon-border bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ozon-muted">Что фиксируется</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {details.observed.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: details.accent }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-card px-4 py-3 text-sm leading-relaxed" style={{ background: `${details.accent}12`, color: details.accent }}>
              {details.interpretation}
            </p>
          </div>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-4">
          {[
            "1. Введите размер ставки",
            "2. Нажмите «Играть»",
            "3. Посмотрите результат на схеме",
            "4. Откройте «Итоги» для сводки",
          ].map((step) => (
            <div key={step} className="rounded-card border border-ozon-border bg-white px-4 py-3 text-sm font-medium text-slate-700">
              {step}
            </div>
          ))}
        </div>

        <div className="rounded-card border border-ozon-border bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-800">Пояснение исхода: </span>
          {details.outcome}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="glass p-5">
          <p className="text-xs text-ozon-muted">Банкротство (Монте-Карло)</p>
          <p className="mt-2 text-2xl font-bold text-ozon-text">{result ? `${result.bankruptcyRate.toFixed(1)}%` : "—"}</p>
        </div>
        <div className="glass p-5">
          <p className="text-xs text-ozon-muted">Средний баланс</p>
          <p className="mt-2 text-2xl font-bold text-ozon-text">
            {result ? `${Math.round(result.averageFinalBalance).toLocaleString("ru-RU")} ₽` : "—"}
          </p>
        </div>
        <div className="glass p-5">
          <p className="text-xs text-ozon-muted">Средний итог</p>
          <p className={`mt-2 text-2xl font-bold ${result && result.averageProfit < 0 ? "text-neg" : "text-pos"}`}>
            {result ? `${Math.round(result.averageProfit).toLocaleString("ru-RU")} ₽` : "—"}
          </p>
        </div>
        <div className="glass p-5">
          <p className="text-xs text-ozon-muted">Винрейт (симуляция)</p>
          <p className="mt-2 text-2xl font-bold text-ozon-text">{result ? `${result.winRate.toFixed(1)}%` : "—"}</p>
        </div>
      </section>
    </div>
  );
}

```

---

## src/pages/HomePage.tsx

```typescript
import { ArrowRight, BarChart3, BookOpen, Code2, FlaskConical, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { AcademicFigure } from "../components/AcademicFigure";
import { HomeFlowDiagram } from "../components/home/HomeFlowDiagram";
import { HomeQuickNav } from "../components/home/HomeQuickNav";
import { MechanismCard } from "../components/MechanismCard";
import { SectionHeader } from "../components/SectionHeader";
import { IMAGES } from "../lib/images";
import { MECHANISM_LIST } from "../math/mechanisms";

const steps = [
  "Продемонстрировать 4 механизма генерации случайных чисел и их программную реализацию",
  "Провести серию экспериментальных итераций и зафиксировать поведенческие наблюдения",
  "Выполнить моделирование методом Монте-Карло и сравнить результаты по всем механизмам",
];

const features = [
  {
    icon: Code2,
    title: "4 механизма RNG",
    text: "Линейный PRNG, криптографический RNG, взвешенное распределение и проверяемый алгоритм",
    color: "#1e3a5f",
    bg: "#eff6ff",
  },
  {
    icon: FlaskConical,
    title: "Поведенческий анализ",
    text: "Журнал наблюдений: пополнение счёта, серии исходов, эффект near-miss",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: BarChart3,
    title: "Монте-Карло",
    text: "50 параллельных траекторий капитала для каждого механизма",
    color: "#0d9488",
    bg: "#f0fdfa",
  },
];

const stats = [
  { value: "4", label: "механизма RNG", icon: "◉", color: "#1e3a5f" },
  { value: "4", label: "программных модуля", icon: "⬡", color: "#0d9488" },
  { value: "50", label: "траекторий MC", icon: "↗", color: "#7c3aed" },
  { value: "итог ниже 0", label: "для всех модулей", icon: "!", color: "#c2410c", accent: true },
];

export function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-glow home-hero-glow-1" />
        <div className="home-hero-glow home-hero-glow-2" />

        <div className="home-hero-content">
          <div className="home-hero-badge">
            <Sparkles className="h-3.5 w-3.5" />
            Дипломная работа · 2026
          </div>

          <h1 className="home-hero-title">Анализ гемблинга (лудомании)</h1>

          <p className="home-hero-desc">
            Научный программный комплекс для демонстрации поведенческих и статистических закономерностей.
            Показывает, что на длинной серии капитал снижается при любом механизме случайности.
          </p>

          <div className="home-hero-actions">
            <Link to="/games" className="btn-primary home-hero-btn-main">
              Открыть программу
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/theory" className="btn-outline home-hero-btn-secondary">
              <BookOpen className="h-4 w-4" />
              Теория
            </Link>
            <Link to="/results" className="btn-outline home-hero-btn-secondary">
              <BarChart3 className="h-4 w-4" />
              Итоги
            </Link>
          </div>
        </div>
      </section>

      <div className="home-container">
        <section className="home-stats">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`home-stat-card ${s.accent ? "home-stat-card-accent" : ""}`}
              style={{ "--stat-color": s.color } as CSSProperties}
            >
              <span className="home-stat-icon">{s.icon}</span>
              <p className="home-stat-value">{s.value}</p>
              <p className="home-stat-label">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="home-section">
          <SectionHeader
            label="Навигация"
            title="Куда перейти"
            description="Три основных раздела дипломного проекта — выберите нужный для защиты или демонстрации."
          />
          <HomeQuickNav />
        </section>

        <section className="home-section">
          <SectionHeader
            label="Обзор"
            title="Как устроен проект"
            description="От ввода параметров до вывода — вся логика исследования на одной схеме."
          />
          <HomeFlowDiagram />
          <AcademicFigure
            src={IMAGES.hero}
            alt="Структура дипломного проекта"
            caption="Рис. 1 — Программный комплекс для анализа поведенческих и статистических закономерностей"
            className="mt-6"
          />
        </section>

        <section className="home-section">
          <SectionHeader
            label="Практическая часть"
            title="Программные модули"
            description="Каждый механизм реализован отдельно и доступен в разделе «Программа»."
          />
          <div className="figure-grid mb-6">
            <AcademicFigure
              src={IMAGES.rng}
              alt="Схема алгоритмов генерации случайных чисел"
              caption="Рис. 2 — Четыре механизма RNG, реализованные в программе"
            />
            <AcademicFigure
              src={IMAGES.analytics}
              alt="График траекторий моделирования Монте-Карло"
              caption="Рис. 3 — Траектории капитала при моделировании Монте-Карло"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {MECHANISM_LIST.map((m) => (
              <MechanismCard key={m.id} mechanism={m} />
            ))}
          </div>
        </section>

        <section className="home-section">
          <SectionHeader title="Структура исследования" />
          <div className="home-features">
            {features.map((f) => (
              <div
                key={f.title}
                className="home-feature-card"
                style={{ background: f.bg, borderColor: `${f.color}22` }}
              >
                <div className="home-feature-icon" style={{ background: `${f.color}18`, color: f.color }}>
                  <f.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section">
          <div className="home-defense-card">
            <div className="home-defense-header">
              <div className="home-defense-icon">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="section-label !mb-0">Сценарий защиты</p>
                <h2 className="heading-lg">Рекомендуемый порядок демонстрации</h2>
              </div>
            </div>
            <ol className="home-step-list">
              {steps.map((text, i) => (
                <li key={i} className="home-step-item">
                  <span className="home-step-num">{i + 1}</span>
                  <p className="text-sm leading-relaxed text-slate-600">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="home-cta">
          <div className="home-cta-glow" />
          <div className="home-cta-content">
            <p className="home-cta-label">Программный комплекс</p>
            <h2 className="home-cta-title">Перейти к экспериментальной части</h2>
            <p className="home-cta-desc">Модули RNG · журнал наблюдений · Монте-Карло · сводная таблица</p>
          </div>
          <Link to="/games" className="btn-primary home-cta-btn shrink-0">
            Открыть программу
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}

```

---

## src/pages/ResultsPage.tsx

```typescript
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LiveMonteCarloChart } from "../components/LiveMonteCarloChart";
import { MechanismCompare } from "../components/MechanismCompare";
import { PageHeader } from "../components/PageHeader";
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
              title="Средний итог"
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

      <LiveMonteCarloChart sessions={sessions} mcResult={mcResult} startingBalance={params.initialBalance} />

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
                <th className="text-right">Преимущество системы</th>
                <th className="text-right">Средний итог</th>
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
                    <td className="text-right text-neg">{m.houseEdge}%</td>
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

```

---

## src/pages/TheoryPage.tsx

```typescript
import { Brain, RefreshCw, Scale, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { SectionHeader } from "../components/SectionHeader";
import { useTelemetry } from "../context/TelemetryContext";
import { MECHANISM_LIST } from "../math/mechanisms";
import { MONTE_CARLO_PATHWAYS } from "../math/monteCarlo";

const points = [
  {
    icon: Target,
    title: "Иллюзия контроля",
    text: "Пользователь выбирает ставку и момент действия, поэтому может возникнуть ощущение влияния на исход. На самом деле случайный механизм работает независимо от желания пользователя.",
  },
  {
    icon: RefreshCw,
    title: "Попытка отыграться",
    text: "После отрицательных исходов человек может продолжать игру или пополнять баланс, чтобы компенсировать уже полученные потери.",
  },
  {
    icon: Brain,
    title: "Эффект near-miss",
    text: "Ситуация «почти получилось» субъективно воспринимается сильнее обычного проигрыша и может поддерживать желание продолжать серию.",
  },
  {
    icon: Scale,
    title: "Итог на дистанции",
    text: "Отдельные положительные исходы возможны, но на длинной серии преимущество системы приводит к снижению капитала пользователя.",
  },
];

const eventLabels: Record<string, string> = {
  near_miss: "почти выигрыш",
  martingale_trap: "ловушка отыгрыша",
  illusion_of_control: "иллюзия контроля",
  top_up: "пополнение",
  bankruptcy: "исчерпание капитала",
  win_streak: "серия побед",
  loss_streak: "серия проигрышей",
  big_win: "крупный выигрыш",
  chase_loss: "попытка отыграться",
  parameter_change: "изменение параметров",
  dalembert_escalation: "рост ставки",
};

function formatMoney(value: number): string {
  return `${Math.round(value).toLocaleString("ru-RU")} ₽`;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function TheoryPage() {
  const { sessions, psychLog, mcResult } = useTelemetry();

  const sessionList = Object.values(sessions);
  const totalBets = sessionList.reduce((sum, session) => sum + session.betsPlayed, 0);
  const totalWins = sessionList.reduce((sum, session) => sum + session.wins, 0);
  const totalLosses = sessionList.reduce((sum, session) => sum + session.losses, 0);
  const totalTopUps = sessionList.reduce((sum, session) => sum + session.topUpCount, 0);
  const totalDeposited = sessionList.reduce((sum, session) => sum + session.totalDeposited, 0);
  const currentBalance = sessionList.reduce((sum, session) => sum + session.balance, 0);
  const totalResult = currentBalance - totalDeposited;

  const nearMissCount = psychLog.filter((event) => event.type === "near_miss").length;
  const lossMarkers = psychLog.filter((event) =>
    ["loss_streak", "martingale_trap", "bankruptcy", "chase_loss"].includes(event.type),
  ).length;
  const controlMarkers = psychLog.filter((event) =>
    ["parameter_change", "illusion_of_control"].includes(event.type),
  ).length;

  const played = totalBets > 0;
  const recentEvents = psychLog.slice(0, 4);

  const theoryMarkers = [
    {
      title: "Иллюзия контроля",
      active: played || controlMarkers > 0,
      evidence:
        controlMarkers > 0
          ? `Зафиксировано событий изменения параметров: ${controlMarkers}.`
          : played
            ? "Пользователь уже выбирал ставку и запускал раунды."
            : "Пока не проявилась: раунды ещё не запускались.",
    },
    {
      title: "Попытка отыграться",
      active: totalTopUps > 0 || lossMarkers > 0,
      evidence:
        totalTopUps > 0
          ? `Пополнений баланса: ${totalTopUps}. Это может указывать на желание продолжить после потерь.`
          : lossMarkers > 0
            ? `Зафиксировано маркеров проигрышной серии: ${lossMarkers}.`
            : "Пока не проявилась: пополнений и длинных проигрышных серий нет.",
    },
    {
      title: "Эффект near-miss",
      active: nearMissCount > 0,
      evidence:
        nearMissCount > 0
          ? `Событий «почти выигрыш»: ${nearMissCount}.`
          : "Пока не проявился: события near-miss ещё не зафиксированы.",
    },
    {
      title: "Снижение капитала",
      active: totalResult < 0,
      evidence:
        totalResult < 0
          ? `Текущий общий итог ниже внесённой суммы на ${formatMoney(Math.abs(totalResult))}.`
          : played
            ? "Пока общий итог не ниже внесённой суммы, но вывод делается по длинной серии."
            : "Пока нет игровых данных для практической проверки.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-[74px] md:px-6">
      <PageHeader
        label="Теоретическая часть"
        title="Гемблинг и лудомания"
        description="Раздел объясняет поведенческие факторы и показывает, как они проявляются в текущей экспериментальной сессии."
      />

      <section className="mb-12">
        <SectionHeader
          title="Теоретическая интерпретация текущей сессии"
          description="Это не раздел итогов, а объяснение: какие признаки из теории уже проявились в действиях пользователя."
        />

        {!played && (
          <div className="glass mb-5 p-6 text-center">
            <p className="text-sm leading-relaxed text-slate-600">
              Игровых действий пока нет. Перейдите в «Программу», выполните несколько раундов, и этот
              раздел покажет, какие теоретические признаки проявились на практике.
            </p>
            <Link to="/games" className="btn-primary mt-4 inline-flex">
              Открыть программу
            </Link>
          </div>
        )}

        <div className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Ставок в опыте</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{totalBets}</p>
          </div>
          <div className="glass p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Победы / проигрыши</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {totalWins} / {totalLosses}
            </p>
          </div>
          <div className="glass p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Пополнений</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{totalTopUps}</p>
          </div>
          <div className="glass p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Текущий вывод</p>
            <p className={`mt-2 text-xl font-bold ${totalResult < 0 ? "text-neg" : "text-slate-900"}`}>
              {played ? (totalResult < 0 ? "капитал снизился" : "данных мало") : "нет данных"}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {theoryMarkers.map((marker) => (
            <article key={marker.title} className="glass p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="font-semibold text-slate-900">{marker.title}</h3>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    marker.active ? "bg-blue-50 text-[#1e3a5f]" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {marker.active ? "проявилось" : "не проявилось"}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{marker.evidence}</p>
            </article>
          ))}
        </div>

        <div className="glass mt-5 p-5">
          <h3 className="text-sm font-semibold text-slate-800">Пояснение для защиты</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Данный блок связывает теорию с практикой: сайт фиксирует не только результат раунда, но и
            признаки поведения пользователя. Если появляются пополнения, серии проигрышей или near-miss,
            это можно объяснить как проявление факторов, связанных с лудоманией.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <SectionHeader
          title="Ключевые положения"
          description="Основные понятия, которые используются для объяснения поведения пользователя"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((point) => (
            <article key={point.title} className="thesis-card">
              <div className="thesis-card-icon">
                <point.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-slate-900">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionHeader title="Механизмы генерации случайных чисел" />
        <div className="glass overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>№</th>
                <th>Механизм</th>
                <th>Простое объяснение</th>
                <th>Модуль</th>
                <th className="text-right">Преимущество системы</th>
              </tr>
            </thead>
            <tbody>
              {MECHANISM_LIST.map((mechanism, index) => (
                <tr key={mechanism.id}>
                  <td className="text-slate-500">{index + 1}</td>
                  <td className="font-medium text-slate-900">{mechanism.label}</td>
                  <td className="text-slate-600">{mechanism.description}</td>
                  <td className="text-slate-600">{mechanism.gameShell}</td>
                  <td className="text-right font-medium text-neg">{mechanism.houseEdge}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <div className="glass p-6 md:p-8">
          <h2 className="heading-lg mb-3">Метод Монте-Карло в теории</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Метод Монте-Карло нужен для проверки результата на большом количестве повторений. В проекте
            он моделирует <strong className="text-slate-900">{MONTE_CARLO_PATHWAYS} независимых траекторий</strong>{" "}
            при одинаковых параметрах. Это помогает показать общую тенденцию, а не случайность одного раунда.
          </p>
          <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-slate-600">
            <li>сколько траекторий заканчивается исчерпанием капитала;</li>
            <li>как быстро уменьшается баланс;</li>
            <li>какой средний итог получается на серии повторений.</li>
          </ul>
          {mcResult && (
            <p className="mt-4 rounded-card bg-blue-50 px-4 py-3 text-sm leading-relaxed text-[#1e3a5f]">
              В текущем расчёте Монте-Карло средний финальный баланс составил{" "}
              <strong>{formatMoney(mcResult.stats.averageFinalBalance)}</strong>. Эти данные используются
              как статистическое подтверждение теоретического вывода.
            </p>
          )}
        </div>
      </section>

      <section className="mb-12">
        <SectionHeader
          title="Журнал поведенческих наблюдений"
          description="Краткая теоретическая расшифровка последних событий, зафиксированных программой"
        />
        <div className="glass p-5">
          {recentEvents.length === 0 ? (
            <p className="text-sm text-slate-500">
              Событий пока нет. Они появятся после ставок, проигрышных серий, near-miss, изменения
              параметров или пополнения баланса.
            </p>
          ) : (
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div key={event.id} className="rounded-card bg-slate-50 p-3 text-sm">
                  <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>{formatTime(event.timestamp)}</span>
                    <span>·</span>
                    <span>{eventLabels[event.type] ?? event.type}</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">{event.message}</p>
                  {event.brainRegion && (
                    <p className="mt-1 text-xs text-slate-500">
                      Нейрокогнитивный коррелят: {event.brainRegion}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mb-10">
        <div className="quote-block">
          <p className="text-base leading-relaxed">
            Теория объясняет не только финансовый результат, но и поведение пользователя: почему после
            проигрышей возникает желание продолжать, почему «почти выигрыш» воспринимается эмоционально
            значимым и почему отдельные победы не отменяют общий риск снижения капитала.
          </p>
        </div>
      </section>

      <Link to="/games" className="btn-primary">
        Перейти к программе
      </Link>
    </div>
  );
}

```

---

## src/types/index.ts

```typescript
export type MechanismId = "lcg" | "csprng" | "weightedWheel" | "provablyFair";

export type BettingStrategy = "flat" | "martingale" | "dalembert";

export type PsychEventType =
  | "top_up"
  | "win_streak"
  | "loss_streak"
  | "near_miss"
  | "martingale_trap"
  | "dalembert_escalation"
  | "illusion_of_control"
  | "bankruptcy"
  | "big_win"
  | "chase_loss"
  | "parameter_change";

export interface PsychEvent {
  id: string;
  type: PsychEventType;
  mechanism: MechanismId;
  message: string;
  brainRegion?: string;
  timestamp: number;
}

export interface MechanismInfo {
  id: MechanismId;
  label: string;
  technicalName: string;
  gameShell: string;
  description: string;
  implementation: string;
  houseEdge: number;
  theoreticalWinRate: number;
  researchFocus: string;
}

export interface CustomGameRules {
  winThreshold: number;
  payoutMultiplier: number;
  modified: boolean;
}

export interface GameSession {
  balance: number;
  initialBalance: number;
  totalDeposited: number;
  topUpCount: number;
  betsPlayed: number;
  wins: number;
  losses: number;
  consecutiveLosses: number;
  consecutiveWins: number;
  currentStreak: number;
  maxWinStreak: number;
  lastResult: string | null;
  lastBet: number;
  pathway: number[];
  houseAbsorbed: number;
}

export interface SessionSnapshot {
  id: string;
  mechanism: MechanismId;
  pathway: number[];
  bankrupt: boolean;
  timestamp: number;
}

export interface TelemetryParams {
  initialBalance: number;
  baseBet: number;
  strategy: BettingStrategy;
  crashTarget: number;
  diceThreshold: number;
}

export interface SimulationRun {
  balances: number[];
  bankrupt: boolean;
  maxDrawdown: number;
  wins: number;
  betsPlayed: number;
}

export interface SimulationStats {
  averageFinalBalance: number;
  averageProfit: number;
  bankruptcyRate: number;
  maxDrawdown: number;
  winRate: number;
  theoreticalWinRate: number;
  capitalDecayRate: number;
  houseMargin: number;
}

export interface SimulationResult {
  runs: SimulationRun[];
  averageBalances: number[];
  stats: SimulationStats;
}

export interface GameRoundResult {
  won: boolean;
  payout: number;
  netChange: number;
  message: string;
  nearMiss?: boolean;
  metadata?: Record<string, string | number | boolean>;
}

export interface ProvablyFairState {
  serverSeed: string;
  serverSeedHash: string;
  clientSeed: string;
  nonce: number;
  revealed: boolean;
}

export interface TelemetryMetrics {
  bankruptcyProbabilityIndex: number;
  averageCapitalDecayRate: number;
  accumulatedHouseMargin: number;
  sessionCount: number;
}

```

---

## src/types/simulation.ts

```typescript
export type RandomizerId = "lcg" | "csprng" | "weighted" | "provablyFair";

export type BettingStrategyId = "flat" | "martingale" | "dalembert";

export type RoundRisk =
  | "neutral"
  | "nearMiss"
  | "martingaleTrap"
  | "bankruptcy"
  | "illusionOfControl"
  | "topUp";

export interface StrategyState {
  balance: number;
  baseBet: number;
  previousBet: number;
  lastRoundWon: boolean | null;
  lossStreak: number;
  maxBet: number;
}

export interface StrategyResult {
  nextBet: number;
  warnings: string[];
}

export interface RoundOutcome {
  won: boolean;
  bet: number;
  profit: number;
  payout: number;
  message: string;
  risk: RoundRisk;
  details: Record<string, string | number | boolean>;
}

export interface TelemetryEvent {
  id: string;
  timestamp: number;
  type: RoundRisk | "strategyChange" | "ruleChange" | "round" | "monteCarlo";
  message: string;
}

export interface SimulationSettings {
  initialBalance: number;
  balance: number;
  baseBet: number;
  activeRandomizer: RandomizerId;
  strategy: BettingStrategyId;
  customRule: string;
  crashCashOut: number;
  diceThreshold: number;
  lcgSeed: number;
}

export interface TelemetryStats {
  totalRounds: number;
  wins: number;
  losses: number;
  lossStreak: number;
  maxLossStreak: number;
  accumulatedHouseMargin: number;
  bankruptcyEvents: number;
  nearMissEvents: number;
  dopamineTopUps: number;
  ruleChanges: number;
  strategyChanges: number;
  stakeChanges: number;
}

export interface MonteCarloPath {
  id: number;
  balances: number[];
  bankrupt: boolean;
  finalBalance: number;
}

export interface MonteCarloResult {
  paths: MonteCarloPath[];
  averagePath: number[];
  bankruptcyProbability: number;
  averageCapitalDecayRate: number;
  expectedValue: number;
  accumulatedHouseMargin: number;
}

export interface RandomizerMeta {
  id: RandomizerId;
  title: string;
  shortTitle: string;
  subtitle: string;
  researchFocus: string;
  houseEdge: number;
}

```

---

## src/vite-env.d.ts

```typescript
/// <reference types="vite/client" />

```

---

## tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0a1628",
        "navy-light": "#132238",
        gold: "#c9a227",
        "gold-hover": "#b08d1e",
        ozon: {
          blue: "#1e3a5f",
          pink: "#dc2626",
          bg: "#f0f2f6",
          card: "#ffffff",
          text: "#0f172a",
          muted: "#64748b",
          border: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "16px",
        btn: "10px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(10, 22, 40, 0.08)",
        lift: "0 12px 40px rgba(10, 22, 40, 0.12)",
      },
    },
  },
  plugins: [],
};

```

---

## vite.config.ts

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
});

```

---

