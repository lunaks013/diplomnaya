import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const T = {
  fig1Title: "\u041f\u043e\u0432\u0435\u0434\u0435\u043d\u0447\u0435\u0441\u043a\u0438\u0435 \u0438 \u043d\u0435\u0439\u0440\u043e\u043a\u043e\u0433\u043d\u0438\u0442\u0438\u0432\u043d\u044b\u0435 \u0444\u0430\u043a\u0442\u043e\u0440\u044b",
  fig1Sub: "\u0422\u0435\u043e\u0440\u0435\u0442\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u0447\u0430\u0441\u0442\u044c \u00b7 \u0430\u043d\u0430\u043b\u0438\u0437 \u0433\u0435\u043c\u0431\u043b\u0438\u043d\u0433\u0430 \u0438 \u043b\u0443\u0434\u043e\u043c\u0430\u043d\u0438\u0438",
  p1t: "\u0418\u043b\u043b\u044e\u0437\u0438\u044f \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u044f",
  p1d: "\u0421\u0443\u0431\u044a\u0435\u043a\u0442 \u0432\u044b\u0431\u0438\u0440\u0430\u0435\u0442 \u0441\u0442\u0430\u0432\u043a\u0443, \u043d\u043e RNG \u043d\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043c \u043e\u0442 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439",
  p2t: "\u041f\u043e\u0432\u0442\u043e\u0440\u043d\u043e\u0435 \u043f\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435",
  p2d: "\u041c\u0430\u0440\u043a\u0435\u0440 \u00ab\u043e\u0442\u044b\u0433\u0440\u044b\u0448\u0430\u00bb \u043f\u043e\u0441\u043b\u0435 \u0441\u0435\u0440\u0438\u0438 \u043f\u0440\u043e\u0438\u0433\u0440\u044b\u0448\u0435\u0439",
  p3t: "\u042d\u0444\u0444\u0435\u043a\u0442 near-miss",
  p3d: "\u0418\u0441\u0445\u043e\u0434, \u0431\u043b\u0438\u0437\u043a\u0438\u0439 \u043a \u0432\u044b\u0438\u0433\u0440\u044b\u0448\u0443, \u0443\u0441\u0438\u043b\u0438\u0432\u0430\u0435\u0442 \u043c\u043e\u0442\u0438\u0432\u0430\u0446\u0438\u044e",
  p4t: "\u0418\u043d\u0432\u0430\u0440\u0438\u0430\u043d\u0442\u043d\u043e\u0441\u0442\u044c \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u0430",
  p4d: "E[\u0394] &lt; 0 \u043f\u0440\u0438 \u043b\u044e\u0431\u043e\u043c \u043c\u0435\u0445\u0430\u043d\u0438\u0437\u043c\u0435 RNG",
  brain: "\u0421\u0445\u0435\u043c\u0430 \u0432\u0437\u0430\u0438\u043c\u043e\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f \u0437\u043e\u043d",
  ctrl: "\u041a\u043e\u043d\u0442\u0440\u043e\u043b\u044c (\u041f\u0424\u041a)",
  reward: "\u041d\u0430\u0433\u0440\u0430\u0434\u0430 (\u041d\u0421)",
  dep: "\u0417\u0430\u0432\u0438\u0441\u0438\u043c\u043e\u0441\u0442\u044c",
  low: "\u0441\u043d\u0438\u0436\u0435\u043d\u0430",
  high: "\u043f\u043e\u0432\u044b\u0448\u0435\u043d\u0430",
  fig2Title: "\u041c\u043e\u0434\u0435\u043b\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043c\u0435\u0442\u043e\u0434\u043e\u043c \u041c\u043e\u043d\u0442\u0435-\u041a\u0430\u0440\u043b\u043e",
  fig2Sub: "\u0422\u0440\u0430\u0435\u043a\u0442\u043e\u0440\u0438\u0438 \u043a\u0430\u043f\u0438\u0442\u0430\u043b\u0430 \u043f\u0440\u0438 \u043e\u0434\u0438\u043d\u0430\u043a\u043e\u0432\u044b\u0445 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u0430\u0445",
  yAxis: "\u041d\u043e\u0440\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u043a\u0430\u043f\u0438\u0442\u0430\u043b",
  xAxis: "\u0418\u0442\u0435\u0440\u0430\u0446\u0438\u044f",
  legend1: "\u0412\u0441\u0435 \u0441\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u0438 (n = 50)",
  legend2: "\u041f\u0440\u0438\u043c\u0435\u0440\u044b \u0442\u0440\u0430\u0435\u043a\u0442\u043e\u0440\u0438\u0439",
  note: "\u041a\u0430\u0436\u0434\u0430\u044f \u043b\u0438\u043d\u0438\u044f \u2014 \u043d\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043c\u0430\u044f \u0442\u0440\u0430\u0435\u043a\u0442\u043e\u0440\u0438\u044f \u043a\u0430\u043f\u0438\u0442\u0430\u043b\u0430. \u0421\u0440\u0435\u0434\u043d\u0435\u0435 E[\u0394] \u043e\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u0432\u0441\u0435\u0445 \u043c\u0435\u0445\u0430\u043d\u0438\u0437\u043c\u043e\u0432 RNG.",
  mech: "\u0421\u0440\u0430\u0432\u043d\u0435\u043d\u0438\u0435 4 \u043c\u0435\u0445\u0430\u043d\u0438\u0437\u043c\u043e\u0432",
};

const head = (h = 520) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 ${h}" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#eef2f7"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="${h}" fill="url(#bg)"/>
  <rect x="1" y="1" width="1198" height="${h - 2}" fill="none" stroke="#e2e8f0" stroke-width="2"/>`;

function card(x, y, title, lines) {
  return `
  <g transform="translate(${x} ${y})">
    <rect width="258" height="132" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect x="0" y="0" width="7" height="132" rx="3.5" fill="#1e3a5f"/>
    <text x="24" y="34" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#0f172a">${title}</text>
    <text x="24" y="64" font-family="Arial, sans-serif" font-size="13" fill="#475569">
      ${lines.map((line, i) => `<tspan x="24" dy="${i === 0 ? 0 : 19}">${line}</tspan>`).join("\n      ")}
    </text>
  </g>`;
}

const psychology = `${head(640)}
  <text x="48" y="52" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#0f172a">${T.fig1Title}</text>
  <text x="48" y="84" font-family="Arial, sans-serif" font-size="15" fill="#64748b">${T.fig1Sub}</text>

  ${card(48, 120, T.p1t, ["Игрок выбирает ставку", "и ощущает влияние", "на случайный исход"])}
  ${card(330, 120, T.p2t, ["После проигрыша", "возникает желание", "быстро отыграться"])}
  ${card(612, 120, T.p3t, ["«Почти выигрыш»", "усиливает интерес", "к продолжению серии"])}
  ${card(894, 120, T.p4t, ["Средний результат", "остаётся отрицательным", "при любом RNG"])}

  <g transform="translate(48 306)">
    <rect width="1104" height="132" rx="16" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="552" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#1e3a5f">Логика формирования рискованного поведения</text>
    <g transform="translate(54 58)">
      <rect width="190" height="46" rx="10" fill="#eef2f7" stroke="#cbd5e1"/>
      <text x="95" y="29" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#0f172a">Серия проигрышей</text>
      <line x1="205" y1="23" x2="260" y2="23" stroke="#64748b" stroke-width="2" marker-end="url(#arr)"/>
      <rect x="275" width="190" height="46" rx="10" fill="#eef2f7" stroke="#cbd5e1"/>
      <text x="370" y="29" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#0f172a">Эмоциональная реакция</text>
      <line x1="480" y1="23" x2="535" y2="23" stroke="#64748b" stroke-width="2" marker-end="url(#arr)"/>
      <rect x="550" width="190" height="46" rx="10" fill="#eef2f7" stroke="#cbd5e1"/>
      <text x="645" y="29" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#0f172a">Продолжение игры</text>
      <line x1="755" y1="23" x2="810" y2="23" stroke="#64748b" stroke-width="2" marker-end="url(#arr)"/>
      <rect x="825" width="190" height="46" rx="10" fill="#1e3a5f"/>
      <text x="920" y="29" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#ffffff">Риск потери контроля</text>
    </g>
  </g>

  <g transform="translate(48 470)">
    <rect width="520" height="120" rx="16" fill="#ffffff" stroke="#1e3a5f" stroke-width="2"/>
    <text x="34" y="34" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#1e3a5f">Нейрокогнитивная интерпретация</text>
    <text x="34" y="66" font-family="Arial, sans-serif" font-size="13" fill="#475569">При зависимости система награды становится активнее,</text>
    <text x="34" y="88" font-family="Arial, sans-serif" font-size="13" fill="#475569">а когнитивный контроль над импульсом ослабевает.</text>
  </g>

  <g transform="translate(600 470)">
    <rect width="552" height="120" rx="16" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="34" y="34" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#1e3a5f">Что показывает программный комплекс</text>
    <text x="34" y="66" font-family="Arial, sans-serif" font-size="13" fill="#475569">Даже при разных механизмах случайности итоговая тенденция</text>
    <text x="34" y="88" font-family="Arial, sans-serif" font-size="13" fill="#475569">сохраняется: математическое ожидание E[&#916;] &lt; 0.</text>
  </g>

  <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#64748b"/></marker></defs>
</svg>`;

function mcPath(seed, y0, y1, steps) {
  let d = `M 120 ${y0}`;
  for (let i = 1; i <= steps; i++) {
    const x = 120 + (i / steps) * 900;
    const t = i / steps;
    const noise = Math.sin(seed * 17 + i * 0.7) * 18 + Math.cos(seed * 3 + i * 0.4) * 12;
    const y = y0 + (y1 - y0) * t + noise * (1 - t * 0.3);
    d += ` L ${x.toFixed(1)} ${Math.max(80, Math.min(380, y)).toFixed(1)}`;
  }
  return d;
}

let paths = "";
for (let i = 0; i < 50; i++) {
  const y1 = 250 + (i % 10) * 10;
  const opacity = i < 5 ? 0.9 : 0.12;
  const stroke = i < 5 ? "#1e3a5f" : "#94a3b8";
  const width = i < 5 ? 2.2 : 1;
  paths += `<path d="${mcPath(i + 1, 95, y1, 40)}" fill="none" stroke="${stroke}" stroke-width="${width}" opacity="${opacity}"/>\n`;
}

const montecarlo = `${head()}
  <text x="48" y="48" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#0f172a">${T.fig2Title}</text>
  <text x="48" y="78" font-family="Arial, sans-serif" font-size="14" fill="#64748b">${T.fig2Sub}</text>
  <g transform="translate(48 100)">
    <rect width="1104" height="360" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
    <line x1="80" y1="40" x2="80" y2="300" stroke="#cbd5e1" stroke-width="1.5"/>
    <line x1="80" y1="300" x2="1060" y2="300" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="24" y="170" font-family="Arial, sans-serif" font-size="12" fill="#64748b" transform="rotate(-90 24 170)">${T.yAxis}</text>
    <text x="570" y="340" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#64748b">${T.xAxis}</text>
    <text x="70" y="55" text-anchor="end" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8">1.0</text>
    <text x="70" y="305" text-anchor="end" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8">0.0</text>
    <text x="120" y="318" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8">0</text>
    <text x="1020" y="318" text-anchor="end" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8">1000</text>
    ${paths}
    <line x1="80" y1="48" x2="1060" y2="48" stroke="#e2e8f0" stroke-dasharray="4 4"/>
    <rect x="820" y="52" width="220" height="56" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
    <line x1="836" y1="72" x2="866" y2="72" stroke="#94a3b8" stroke-width="2"/>
    <text x="874" y="76" font-family="Arial, sans-serif" font-size="11" fill="#475569">${T.legend1}</text>
    <line x1="836" y1="94" x2="866" y2="94" stroke="#1e3a5f" stroke-width="2.2"/>
    <text x="874" y="98" font-family="Arial, sans-serif" font-size="11" fill="#475569">${T.legend2}</text>
  </g>
  <text x="48" y="490" font-family="Arial, sans-serif" font-size="13" fill="#475569">${T.note}</text>
  <rect x="900" y="468" width="252" height="36" rx="8" fill="#1e3a5f"/>
  <text x="1026" y="491" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#ffffff">${T.mech}</text>
</svg>`;

const files = {
  "theory-psychology-ru.svg": psychology,
  "theory-montecarlo-ru.svg": montecarlo,
};

for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, name), content, "utf8");
  console.log("wrote", name);
}
