import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const T = {
  heroTitle: "\u0421\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430 \u0434\u0438\u043f\u043b\u043e\u043c\u043d\u043e\u0433\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u0430",
  heroSub: "\u0410\u043d\u0430\u043b\u0438\u0437 \u0433\u0435\u043c\u0431\u043b\u0438\u043d\u0433\u0430 (\u043b\u0443\u0434\u043e\u043c\u0430\u043d\u0438\u0438) \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u0441\u043b\u0443\u0447\u0430\u0439\u043d\u044b\u0445 \u0438\u0441\u0445\u043e\u0434\u043e\u0432, \u0442\u0435\u043b\u0435\u043c\u0435\u0442\u0440\u0438\u0438 \u0438 \u043c\u043e\u0434\u0435\u043b\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f",
  input: "\u0412\u0445\u043e\u0434\u043d\u044b\u0435 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b",
  inputText: "\u0431\u0430\u043b\u0430\u043d\u0441, \u0441\u0442\u0430\u0432\u043a\u0430, \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044f",
  rng: "4 \u043c\u0435\u0445\u0430\u043d\u0438\u0437\u043c\u0430 \u0441\u043b\u0443\u0447\u0430\u0439\u043d\u043e\u0441\u0442\u0438",
  rngText: "\u0440\u0443\u043b\u0435\u0442\u043a\u0430, \u043a\u043e\u0441\u0442\u0438, \u043a\u0430\u0440\u0442\u044b, \u0441\u043b\u043e\u0442",
  telemetry: "\u041f\u043e\u0432\u0435\u0434\u0435\u043d\u0447\u0435\u0441\u043a\u0430\u044f \u0442\u0435\u043b\u0435\u043c\u0435\u0442\u0440\u0438\u044f",
  telemetryText: "\u0441\u0435\u0440\u0438\u0438, \u043f\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f, near-miss",
  mc: "\u041c\u043e\u043d\u0442\u0435-\u041a\u0430\u0440\u043b\u043e",
  mcText: "50 \u0442\u0440\u0430\u0435\u043a\u0442\u043e\u0440\u0438\u0439 \u0434\u043b\u044f \u043a\u0430\u0436\u0434\u043e\u0433\u043e \u043c\u0435\u0445\u0430\u043d\u0438\u0437\u043c\u0430",
  result: "\u0412\u044b\u0432\u043e\u0434",
  resultText: "\u0438\u0442\u043e\u0433 \u0441\u0435\u0440\u0438\u0438 \u043d\u0438\u0436\u0435 \u043d\u0443\u043b\u044f",
  rngTitle: "\u0427\u0435\u0442\u044b\u0440\u0435 \u043c\u043e\u0434\u0443\u043b\u044f \u0441\u043b\u0443\u0447\u0430\u0439\u043d\u044b\u0445 \u0438\u0441\u0445\u043e\u0434\u043e\u0432",
  rngSub: "\u041a\u0430\u0436\u0434\u044b\u0439 \u043c\u0435\u0445\u0430\u043d\u0438\u0437\u043c \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u043a\u0430\u043a \u043e\u0442\u0434\u0435\u043b\u044c\u043d\u044b\u0439 \u0438\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0439 \u043c\u043e\u0434\u0443\u043b\u044c",
  lcg: "\u0420\u0443\u043b\u0435\u0442\u043a\u0430",
  csprng: "\u041a\u043e\u0441\u0442\u0438",
  weighted: "\u0421\u043b\u043e\u0442",
  fair: "\u041a\u0430\u0440\u0442\u044b",
  purpose: "\u041d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435: \u043f\u043e\u043a\u0430\u0437\u0430\u0442\u044c, \u0447\u0442\u043e \u0442\u0438\u043f \u0441\u043b\u0443\u0447\u0430\u0439\u043d\u043e\u0441\u0442\u0438 \u043d\u0435 \u0434\u0435\u043b\u0430\u0435\u0442 \u0434\u043b\u0438\u0442\u0435\u043b\u044c\u043d\u0443\u044e \u0441\u0435\u0440\u0438\u044e \u0432\u044b\u0433\u043e\u0434\u043d\u043e\u0439",
};

function head(height = 520) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 ${height}" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#eef2f7"/>
    </linearGradient>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0 0 L8 4 L0 8 Z" fill="#64748b"/>
    </marker>
  </defs>
  <rect width="1200" height="${height}" fill="url(#bg)"/>
  <rect x="1" y="1" width="1198" height="${height - 2}" fill="none" stroke="#e2e8f0" stroke-width="2"/>`;
}

function box(x, y, w, title, text) {
  return `
  <g transform="translate(${x} ${y})">
    <rect width="${w}" height="86" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
    <rect width="6" height="86" rx="3" fill="#1e3a5f"/>
    <text x="22" y="32" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#0f172a">${title}</text>
    <text x="22" y="58" font-family="Arial, sans-serif" font-size="13" fill="#475569">${text}</text>
  </g>`;
}

const hero = `${head(520)}
  <text x="48" y="58" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#0f172a">${T.heroTitle}</text>
  <text x="48" y="92" font-family="Arial, sans-serif" font-size="15" fill="#475569">${T.heroSub}</text>
  ${box(48, 140, 250, T.input, T.inputText)}
  <line x1="306" y1="183" x2="356" y2="183" stroke="#64748b" stroke-width="2" marker-end="url(#arr)"/>
  ${box(365, 140, 280, T.rng, T.rngText)}
  <line x1="653" y1="183" x2="703" y2="183" stroke="#64748b" stroke-width="2" marker-end="url(#arr)"/>
  ${box(712, 140, 300, T.telemetry, T.telemetryText)}
  <line x1="862" y1="232" x2="862" y2="282" stroke="#64748b" stroke-width="2" marker-end="url(#arr)"/>
  ${box(712, 292, 300, T.mc, T.mcText)}
  <line x1="703" y1="335" x2="653" y2="335" stroke="#64748b" stroke-width="2" marker-end="url(#arr)"/>
  ${box(365, 292, 280, T.result, T.resultText)}
  <g transform="translate(48 292)">
    <rect width="250" height="86" rx="12" fill="#1e3a5f"/>
    <text x="125" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff">Дипломная работа</text>
    <text x="125" y="62" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#dbeafe">научная демонстрация</text>
  </g>
  <text x="48" y="455" font-family="Arial, sans-serif" font-size="14" fill="#475569">${T.purpose}</text>
</svg>`;

function rngCard(x, y, title, body, accent) {
  return `
  <g transform="translate(${x} ${y})">
    <rect width="250" height="150" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
    <circle cx="42" cy="42" r="22" fill="${accent}" opacity="0.18"/>
    <circle cx="42" cy="42" r="8" fill="${accent}"/>
    <text x="80" y="38" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#0f172a">${title}</text>
    <text x="80" y="62" font-family="Arial, sans-serif" font-size="12" fill="#64748b">${body}</text>
    <line x1="28" y1="96" x2="222" y2="96" stroke="#e2e8f0"/>
    <text x="28" y="124" font-family="Arial, sans-serif" font-size="12" fill="#1e3a5f">итог серии ниже нуля</text>
  </g>`;
}

const rng = `${head(420)}
  <text x="48" y="58" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#0f172a">${T.rngTitle}</text>
  <text x="48" y="90" font-family="Arial, sans-serif" font-size="15" fill="#475569">${T.rngSub}</text>
  ${rngCard(48, 130, "Рулетка", T.lcg, "#1e3a5f")}
  ${rngCard(330, 130, "Кости", T.csprng, "#2563eb")}
  ${rngCard(612, 130, "Слот", T.weighted, "#7c3aed")}
  ${rngCard(894, 130, "Карты", T.fair, "#0f766e")}
  <rect x="48" y="330" width="1104" height="44" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="600" y="358" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#475569">${T.purpose}</text>
</svg>`;

const files = {
  "home-overview-ru.svg": hero,
  "home-rng-ru.svg": rng,
};

for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, name), content, "utf8");
  console.log("wrote", name);
}
