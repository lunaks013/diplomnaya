import type { MechanismComparison } from "../math/monteCarlo";
import { MECHANISMS } from "../math/mechanisms";
import type { MechanismId } from "../types";

interface MechanismSummaryTableProps {
  data: MechanismComparison[];
}

const GAME_NAMES: Record<MechanismId, string> = {
  lcg: "Слот",
  csprng: "Кости",
  weightedWheel: "Рулетка",
  provablyFair: "Карты",
};

const GAME_COLORS: Record<MechanismId, string> = {
  lcg: "#1e3a5f",
  csprng: "#2563eb",
  provablyFair: "#0f766e",
  weightedWheel: "#7c3aed",
};

function formatProfit(n: number): string {
  const sign = n >= 0 ? "+" : "−";
  return `${sign}${Math.abs(Math.round(n)).toLocaleString("ru-RU")} ₽`;
}

export function MechanismSummaryTable({ data }: MechanismSummaryTableProps) {
  return (
    <div className="results-table-card">
      <div className="results-table-header">
        <div>
          <p className="results-table-eyebrow">Сводная таблица</p>
          <h3 className="results-table-title">Сравнение четырёх механизмов</h3>
        </div>
        <p className="results-table-note">Данные моделирования Монте-Карло</p>
      </div>

      <div className="results-table-desktop overflow-x-auto">
        <table className="results-table">
          <thead>
            <tr>
              <th>Механизм</th>
              <th>Модуль</th>
              <th className="text-right">Преимущество</th>
              <th className="text-right">Средний итог</th>
              <th className="text-right">Исчерпание</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const meta = MECHANISMS[row.mechanism];
              const profit = row.stats.averageProfit;
              const profitPositive = profit >= 0;

              return (
                <tr key={row.mechanism}>
                  <td>
                    <div className="results-table-mechanism">
                      <span
                        className="results-table-dot"
                        style={{ background: GAME_COLORS[row.mechanism] }}
                      />
                      <div>
                        <p className="results-table-mechanism-name">
                          {meta.label.replace(/^Механизм [IVX]+ — /i, "")}
                        </p>
                        <p className="results-table-mechanism-sub">{meta.technicalName}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="results-table-module">{GAME_NAMES[row.mechanism]}</span>
                  </td>
                  <td className="text-right">
                    <span className="results-table-badge results-table-badge-edge">{meta.houseEdge}%</span>
                  </td>
                  <td className="text-right">
                    <span
                      className={`results-table-badge ${
                        profitPositive ? "results-table-badge-win" : "results-table-badge-loss"
                      }`}
                    >
                      {formatProfit(profit)}
                    </span>
                  </td>
                  <td className="text-right">
                    <span className="results-table-muted">{row.stats.bankruptcyRate.toFixed(1)}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="results-table-mobile">
        {data.map((row) => {
          const meta = MECHANISMS[row.mechanism];
          const profit = row.stats.averageProfit;
          const profitPositive = profit >= 0;

          return (
            <article key={row.mechanism} className="results-table-mobile-row">
              <div className="flex items-center gap-3">
                <span className="results-table-dot" style={{ background: GAME_COLORS[row.mechanism] }} />
                <div>
                  <p className="font-semibold text-slate-900">{GAME_NAMES[row.mechanism]}</p>
                  <p className="text-xs text-slate-500">{meta.label.replace(/^Механизм [IVX]+ — /, "")}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="results-table-mobile-stat">
                  <span className="results-table-mobile-label">Преимущество</span>
                  <span className="results-table-badge results-table-badge-edge">{meta.houseEdge}%</span>
                </div>
                <div className="results-table-mobile-stat">
                  <span className="results-table-mobile-label">Итог</span>
                  <span
                    className={`results-table-badge ${
                      profitPositive ? "results-table-badge-win" : "results-table-badge-loss"
                    }`}
                  >
                    {formatProfit(profit)}
                  </span>
                </div>
                <div className="results-table-mobile-stat">
                  <span className="results-table-mobile-label">Исчерпание</span>
                  <span className="results-table-muted font-semibold">{row.stats.bankruptcyRate.toFixed(1)}%</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
