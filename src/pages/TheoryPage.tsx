import { Brain, RefreshCw, Scale, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { AcademicFigure } from "../components/AcademicFigure";
import { PageHeader } from "../components/PageHeader";
import { SectionHeader } from "../components/SectionHeader";
import { useTelemetry } from "../context/TelemetryContext";
import { IMAGES } from "../lib/images";
import { ALL_MECHANISM_IDS, MECHANISM_LIST } from "../math/mechanisms";
import type { MechanismId } from "../types";

const points = [
  {
    icon: Target,
    title: "Иллюзия контроля",
    text: "Субъект выбирает размер ставки и момент пополнения счёта. Создаётся ощущение влияния на исход, хотя RNG остаётся независимым от действий пользователя.",
  },
  {
    icon: RefreshCw,
    title: "Повторное пополнение",
    text: "После серии отрицательных исходов наблюдается попытка «отыграться» — один из ключевых поведенческих маркеров лудомании.",
  },
  {
    icon: Brain,
    title: "Эффект near-miss",
    text: "Исход, близкий к положительному, усиливает мотивацию продолжать серию, хотя фактически не улучшает результат.",
  },
  {
    icon: Scale,
    title: "Инвариантность результата",
    text: "При четырёх различных механизмах рандомизации средний итог остаётся отрицательным — меняется только скорость декапитализации.",
  },
];

const MODULE_NAMES: Record<MechanismId, string> = {
  lcg: "Слот",
  csprng: "Кости",
  provablyFair: "Карты",
  weightedWheel: "Рулетка",
};

const EVENT_LABELS: Record<string, string> = {
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

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function TheoryPage() {
  const { sessions, psychLog } = useTelemetry();

  const allSessions = ALL_MECHANISM_IDS.map((id) => sessions[id]);
  const totalBets = allSessions.reduce((sum, session) => sum + session.betsPlayed, 0);
  const totalTopUps = allSessions.reduce((sum, session) => sum + session.topUpCount, 0);
  const totalLosses = allSessions.reduce((sum, session) => sum + session.losses, 0);
  const longestLossStreak = allSessions.reduce(
    (max, session) => Math.max(max, session.consecutiveLosses),
    0,
  );
  const hasGameplay = totalBets > 0;
  const nearMissCount = psychLog.filter((event) => event.type === "near_miss").length;
  const lossPatternCount = psychLog.filter((event) =>
    ["loss_streak", "martingale_trap", "chase_loss"].includes(event.type),
  ).length;
  const recentEvents = psychLog.slice(0, 4);

  const theorySignals = [
    {
      title: "Иллюзия контроля",
      theory: "Пользователь выбирает ставку и момент запуска, поэтому может возникать ощущение влияния на случайный исход.",
      evidence: hasGameplay
        ? `Есть игровые действия: сыграно ${totalBets} ставок.`
        : "Пока ставок нет, поэтому проявление ещё не наблюдалось.",
    },
    {
      title: "Попытка отыграться",
      theory: "После отрицательных исходов пользователь может продолжать игру или пополнять баланс, чтобы вернуть потери.",
      evidence:
        totalTopUps > 0
          ? `Зафиксировано пополнений: ${totalTopUps}.`
          : `Пополнений пока нет. Проигрышных исходов: ${totalLosses}.`,
    },
    {
      title: "Эффект near-miss",
      theory: "Почти выигрыш может восприниматься как близость к успеху и усиливать желание продолжать.",
      evidence:
        nearMissCount > 0
          ? `Зафиксировано near-miss событий: ${nearMissCount}.`
          : "Near-miss пока не зафиксирован в текущей сессии.",
    },
    {
      title: "Серия проигрышей",
      theory: "Несколько отрицательных исходов подряд повышают эмоциональное напряжение и риск импульсивных решений.",
      evidence:
        lossPatternCount > 0 || longestLossStreak > 0
          ? `Текущая максимальная серия проигрышей: ${longestLossStreak}. Поведенческих сигналов: ${lossPatternCount}.`
          : "Серии проигрышей пока не сформировались.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-[74px] md:px-6">
      <PageHeader
        label="Теоретическая часть"
        title="Гемблинг и лудомания"
        description="Независимо от технической реализации генератора случайных чисел итог для участника на длинной серии обычно остаётся отрицательным."
      />

      <section className="mb-12">
        <SectionHeader
          title="Связь теории с текущей сессией"
          description="Этот блок не дублирует итоги, а объясняет игровые действия через понятия лудомании: контроль, отыгрыш, near-miss и серии проигрышей."
        />

        {!hasGameplay && (
          <div className="glass mb-5 p-6">
            <p className="text-sm leading-relaxed text-slate-600">
              Пока пользователь не играл, теория отображается как объяснение возможных поведенческих факторов.
              После нескольких раундов в разделе «Программа» ниже появятся наблюдения, связанные с текущей сессией.
            </p>
            <Link to="/games" className="btn-primary mt-4 inline-flex">
              Открыть программу
            </Link>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {theorySignals.map((signal) => (
            <article key={signal.title} className="glass p-5">
              <h3 className="text-base font-bold text-slate-900">{signal.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{signal.theory}</p>
              <div className="mt-4 rounded-card bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Наблюдение по текущей сессии
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#1e3a5f]">{signal.evidence}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="glass mt-5 p-5">
          <h3 className="text-sm font-semibold text-slate-800">Живые поведенческие наблюдения</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Здесь отображаются не финансовые итоги, а события, которые имеют теоретическое значение
            для анализа лудомании.
          </p>
          {recentEvents.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              Наблюдений пока нет. Они появятся после ставок, серий проигрышей, near-miss или пополнений.
            </p>
          ) : (
            <div className="mt-3 space-y-3">
              {recentEvents.map((event) => (
                <div key={event.id} className="rounded-card bg-slate-50 p-3 text-sm">
                  <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>{formatTime(event.timestamp)}</span>
                    <span>·</span>
                    <span>{MODULE_NAMES[event.mechanism]}</span>
                    <span>·</span>
                    <span>{EVENT_LABELS[event.type] ?? event.type}</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">{event.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AcademicFigure
        src={IMAGES.psychology}
        alt="Нейрокогнитивные аспекты исследования зависимого поведения"
        caption="Рис. 1 — Поведенческие и нейрокогнитивные факторы, изучаемые в работе"
        className="mb-10"
      />

      <section className="mb-12">
        <SectionHeader
          title="Ключевые положения"
          description="Тезисы, которые подтверждаются программным комплексом"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((p) => (
            <article key={p.title} className="thesis-card">
              <div className="thesis-card-icon">
                <p.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
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
                <th>Реализация</th>
                <th>Модуль</th>
                <th className="text-right">Преимущество системы</th>
              </tr>
            </thead>
            <tbody>
              {MECHANISM_LIST.map((m, i) => (
                <tr key={m.id}>
                  <td className="text-slate-500">{i + 1}</td>
                  <td className="font-medium text-slate-900">{m.label}</td>
                  <td className="text-slate-600">{m.technicalName}</td>
                  <td className="text-slate-600">{m.gameShell}</td>
                  <td className="text-right font-medium text-neg">{m.houseEdge}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <AcademicFigure
          src={IMAGES.analytics}
          alt="Визуализация метода Монте-Карло"
          caption="Рис. 2 — Сравнение траекторий при статистическом моделировании"
          className="mb-6"
        />
        <div className="glass p-6 md:p-8">
          <h2 className="heading-lg mb-3">Метод Монте-Карло</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Это способ ответить на вопрос: <strong className="text-slate-900">что в среднем будет на длинной серии</strong>,
            если играть с тем же балансом и ставкой. Компьютер многократно симулирует игру — без ваших реальных денег.
          </p>
          <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-slate-600">
            <li>В программе вы играете сами — это один реальный путь.</li>
            <li>Монте-Карло считает сотни виртуальных путей и берёт средний результат.</li>
            <li>Так видно риск обнуления баланса и сравнение четырёх механизмов случайности.</li>
          </ul>
          <Link to="/results?tab=monte-carlo" className="btn-primary mt-5 inline-flex">
            Открыть расчёт Монте-Карло в итогах
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <div className="quote-block">
          <p className="text-base leading-relaxed">
            Средний итог на длинной серии отрицателен при любом механизме RNG. Поведенческие факторы
            (иллюзия контроля, near-miss, повторное пополнение) усиливают субъективную вовлечённость,
            но не изменяют итоговый статистический результат на дистанции.
          </p>
        </div>
      </section>

      <Link to="/games" className="btn-primary">
        Перейти к программе
      </Link>
    </div>
  );
}
