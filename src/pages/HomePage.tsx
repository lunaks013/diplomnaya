import { ArrowRight, BarChart3, BookOpen, Code2, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { AcademicFigure } from "../components/AcademicFigure";
import { MechanismCard } from "../components/MechanismCard";
import { PageHeader } from "../components/PageHeader";
import { SectionHeader } from "../components/SectionHeader";
import { IMAGES } from "../lib/images";
import { MECHANISM_LIST } from "../math/mechanisms";

const steps = [
  "Открыть «Программу» и показать четыре исследовательских модуля",
  "Сыграть несколько раундов и показать, какие действия фиксирует система",
  "Перейти в «Итоги» и объяснить, как меняется баланс на длинной серии",
];

const features = [
  {
    icon: Code2,
    title: "4 понятных модуля",
    text: "Рулетка, кости, карты и слот показывают разные способы получения случайного результата",
  },
  {
    icon: FlaskConical,
    title: "Поведенческий анализ",
    text: "Система фиксирует пополнения, серии проигрышей и эффект «почти выиграл»",
  },
  {
    icon: BarChart3,
    title: "Рабочие итоги",
    text: "После игры сайт показывает баланс, победы, проигрыши и итог по каждому модулю",
  },
];

const stats = [
  { value: "4", label: "механизма случайности" },
  { value: "4", label: "программных модуля" },
  { value: "50", label: "траекторий анализа" },
  { value: "итог ниже 0", label: "для всех модулей", accent: true },
];

export function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-[74px] md:px-6">
      <PageHeader
        label="Дипломная работа · 2026"
        title="Анализ гемблинга (лудомании)"
        description="Интерактивный программный комплекс, который показывает, как случайные исходы, серии проигрышей и попытки отыграться влияют на поведение пользователя."
      />

      <section className="glass mb-8 overflow-hidden p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="section-label">Что показывает сайт</p>
            <h2 className="text-2xl font-black leading-tight text-slate-900 md:text-3xl">
              Не казино, а учебная модель для анализа поведения при случайных исходах
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Пользователь запускает демонстрационные раунды, а сайт собирает сведения: сколько было
              ставок, как менялся баланс, были ли серии проигрышей, пополнения и ситуации «почти выиграл».
              Эти данные затем используются в теории и итогах.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/games" className="btn-primary">
                Начать демонстрацию
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/theory" className="btn-outline">
                Понять теорию
              </Link>
            </div>
          </div>
          <div className="rounded-card border border-ozon-border bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Логика работы</p>
            <div className="mt-4 space-y-3">
              {["Игрок делает ставку", "Система выбирает случайный исход", "Баланс меняется", "Теория объясняет поведение", "Итоги показывают результат"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-card bg-white px-4 py-3 text-sm text-slate-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AcademicFigure
        src={IMAGES.hero}
        alt="Научно-исследовательская работа с анализом данных"
        caption="Рис. 1 — Программный комплекс для анализа поведенческих и статистических закономерностей"
        className="mb-8"
      />

      <div className="mb-8 flex flex-wrap gap-3">
        <Link to="/games" className="btn-primary">
          Открыть программу
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/theory" className="btn-outline">
          Теоретическая часть
        </Link>
        <Link to="/results" className="btn-outline">
          Итоги анализа
        </Link>
      </div>

      <div className="stat-row mb-12">
        {stats.map((s) => (
          <div key={s.label} className="stat-pill">
            <p className={`stat-pill-value ${s.accent ? "text-[#1e3a5f]" : ""}`}>{s.value}</p>
            <p className="stat-pill-label">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mb-12">
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

      <section className="mb-12">
        <SectionHeader title="Структура исследования" />
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="glass p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#1e3a5f]" />
            <p className="section-label !mb-0">Сценарий защиты</p>
          </div>
          <h2 className="heading-lg">Рекомендуемый порядок демонстрации</h2>
          <ol className="step-list mt-5">
            {steps.map((text, i) => (
              <li key={i} className="step-item">
                <span className="step-num">{i + 1}</span>
                <p className="text-sm leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Программный комплекс
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            Перейти к экспериментальной части
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Игровые модули · журнал наблюдений · моделирование · сводная таблица
          </p>
        </div>
        <Link to="/games" className="btn-primary shrink-0">
          Открыть программу
        </Link>
      </section>
    </div>
  );
}
