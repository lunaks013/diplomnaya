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
