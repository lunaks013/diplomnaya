/** Рис. 2 — наглядная схема для защиты диплома */

const PATHS = [
  "M 56 52 C 90 48, 120 72, 155 68 S 220 38, 260 58 S 310 95, 360 88 S 410 62, 460 78 S 510 108, 544 102",
  "M 56 52 C 85 58, 125 42, 165 55 S 210 82, 255 70 S 295 48, 340 62 S 385 90, 430 75 S 475 58, 544 68",
  "M 56 52 C 95 62, 130 38, 175 48 S 225 78, 270 65 S 315 52, 360 72 S 400 98, 445 85 S 490 72, 544 82",
  "M 56 52 C 80 44, 115 68, 150 58 S 200 32, 245 48 S 290 78, 335 68 S 380 52, 425 65 S 470 88, 544 95",
  "M 56 52 C 88 56, 128 74, 168 62 S 218 40, 262 52 S 308 70, 352 58 S 398 44, 442 56 S 488 76, 544 88",
];

const USER_PATH =
  "M 56 52 C 100 46, 140 64, 185 52 S 235 36, 280 48 S 325 72, 370 58 S 415 42, 460 55 S 505 78, 544 72";

const AVG_PATH =
  "M 56 52 C 110 58, 165 70, 220 78 S 280 88, 340 92 S 400 98, 460 102 S 505 106, 544 108";

export function MonteCarloTheoryDiagram() {
  return (
    <figure className="mc-theory-figure">
      <div className="mc-theory-canvas">
        <div className="mc-theory-head">
          <p className="mc-theory-title">Как работает Монте-Карло</p>
          <p className="mc-theory-sub">Один исход случаен · среднее на дистанции предсказуемо</p>
        </div>

        <svg viewBox="0 0 600 200" className="mc-theory-svg" role="img" aria-label="Схема метода Монте-Карло">
          <defs>
            <linearGradient id="mc-grid-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <rect width="600" height="200" fill="url(#mc-grid-fade)" rx="12" />

          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="48" y1={y} x2="552" y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />
          ))}
          <line x1="48" y1="24" x2="48" y2="168" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="48" y1="168" x2="552" y2="168" stroke="#cbd5e1" strokeWidth="1.5" />

          <text x="14" y="100" fill="#94a3b8" fontSize="10" transform="rotate(-90 14 100)">
            Баланс
          </text>
          <text x="300" y="188" textAnchor="middle" fill="#94a3b8" fontSize="10">
            Номер раунда →
          </text>
          <text x="42" y="36" textAnchor="end" fill="#64748b" fontSize="9">
            старт
          </text>
          <text x="42" y="172" textAnchor="end" fill="#64748b" fontSize="9">
            0 ₽
          </text>

          {PATHS.map((d, i) => (
            <path key={d} d={d} fill="none" stroke="#94a3b8" strokeWidth="1.2" opacity={0.35 - i * 0.02} />
          ))}

          <path d={AVG_PATH} fill="none" stroke="#c9a227" strokeWidth="3" strokeDasharray="8 5" />
          <path d={USER_PATH} fill="none" stroke="#2563eb" strokeWidth="2.5" />

          <circle cx="56" cy="52" r="4" fill="#2563eb" />
          <circle cx="544" cy="72" r="4" fill="#2563eb" />
          <circle cx="544" cy="108" r="4" fill="#c9a227" />
        </svg>

        <div className="mc-theory-legend">
          <div className="mc-theory-legend-item">
            <span className="mc-theory-line mc-theory-line-user" />
            <div>
              <p className="mc-theory-legend-label">Ваша игра</p>
              <p className="mc-theory-legend-hint">один реальный путь</p>
            </div>
          </div>
          <div className="mc-theory-legend-item">
            <span className="mc-theory-line mc-theory-line-many" />
            <div>
              <p className="mc-theory-legend-label">50 виртуальных сессий</p>
              <p className="mc-theory-legend-hint">компьютер играет сам</p>
            </div>
          </div>
          <div className="mc-theory-legend-item">
            <span className="mc-theory-line mc-theory-line-avg" />
            <div>
              <p className="mc-theory-legend-label">Средняя линия</p>
              <p className="mc-theory-legend-hint">прогноз на дистанции</p>
            </div>
          </div>
        </div>

        <div className="mc-theory-defense">
          <p className="mc-theory-defense-label">Как объяснить комиссии</p>
          <p className="mc-theory-defense-text">
            «Мы не угадываем один раунд. Мы многократно моделируем игру при одинаковых условиях и смотрим,
            куда в среднем уходит баланс — так оцениваем риск потери капитала».
          </p>
        </div>
      </div>
      <figcaption className="academic-figure-caption">
        Рис. 2 — Схема метода Монте-Карло: множество виртуальных сессий и средний прогноз баланса
      </figcaption>
    </figure>
  );
}
