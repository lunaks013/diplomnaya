import { ArrowRight, BarChart3, Coins, Dices, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { AcademicFigure } from "../components/AcademicFigure";
import { MechanismCard } from "../components/MechanismCard";
import { PageHeader } from "../components/PageHeader";
import { SectionHeader } from "../components/SectionHeader";
import { IMAGES } from "../lib/images";
import { MECHANISM_LIST } from "../math/mechanisms";

const stats = [
  { value: "4", label: "модуля" },
  { value: "4", label: "механизма" },
  { value: "50", label: "траекторий" },
  { value: "−", label: "итог серии", accent: true },
];

const GAME_FLOW = [
  { icon: Coins, title: "Ставка", text: "Выбираете сумму" },
  { icon: Dices, title: "Раунд", text: "Система даёт исход" },
  { icon: Sparkles, title: "Баланс", text: "Счёт меняется" },
  { icon: BarChart3, title: "Итоги", text: "Игра + Монте-Карло" },
];

const GAMES = ["Слот", "Кости", "Карты", "Рулетка"];

export function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-[74px] md:px-6">
      <PageHeader
        label="Дипломная работа · 2026"
        title="Анализ гемблинга (лудомании)"
        description="Учебная модель: игра → сбор данных → выводы."
      />

      <section className="home-hero mb-8">
        <div className="home-hero-main">
          <p className="home-hero-label">Цель сайта</p>
          <h2 className="home-hero-title">
            Показать, как игра и случайные исходы влияют на поведение и баланс
          </h2>
          <p className="home-hero-text">
            Это не азартная игра, а исследовательская модель для дипломной работы.
          </p>

          <div className="home-hero-games">
            {GAMES.map((game) => (
              <span key={game} className="home-hero-game">
                {game}
              </span>
            ))}
          </div>

          <div className="home-hero-actions">
            <Link to="/games" className="btn-primary">
              Начать
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/theory" className="btn-outline home-hero-btn-light">
              Теория
            </Link>
            <Link to="/results?tab=monte-carlo" className="btn-outline home-hero-btn-light">
              Монте-Карло
            </Link>
          </div>
        </div>

        <div className="home-hero-flow-panel">
          <p className="home-hero-flow-title">Как работает программа</p>
          <div className="home-hero-flow">
            {GAME_FLOW.map((step, index) => (
              <div key={step.title} className="home-hero-flow-item">
                <div className="home-hero-flow-step">
                  <span className="home-hero-flow-num">{index + 1}</span>
                  <step.icon className="home-hero-flow-icon" strokeWidth={1.75} />
                  <p className="home-hero-flow-name">{step.title}</p>
                  <p className="home-hero-flow-desc">{step.text}</p>
                </div>
                {index < GAME_FLOW.length - 1 && <span className="home-hero-flow-arrow" aria-hidden>→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AcademicFigure
        src={IMAGES.hero}
        alt="Схема программного комплекса"
        caption="Рис. 1 — Структура программного комплекса"
        className="mb-8"
      />

      <div className="stat-row mb-10">
        {stats.map((s) => (
          <div key={s.label} className="stat-pill">
            <p className={`stat-pill-value ${s.accent ? "text-[#1e3a5f]" : ""}`}>{s.value}</p>
            <p className="stat-pill-label">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mb-10">
        <SectionHeader title="Модули программы" />
        <div className="grid gap-4 sm:grid-cols-2">
          {MECHANISM_LIST.map((m) => (
            <MechanismCard key={m.id} mechanism={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
