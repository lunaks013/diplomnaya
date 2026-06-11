import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const R = {
  mod1: "\u041c\u041e\u0414\u0423\u041b\u042c I \u00b7 \u0414\u0415\u041c\u041e\u041d\u0421\u0422\u0420\u0410\u0426\u0418\u041e\u041d\u041d\u0410\u042f \u041e\u0411\u041e\u041b\u041e\u0427\u041a\u0410",
  mod2: "\u041c\u041e\u0414\u0423\u041b\u042c II \u00b7 \u0414\u0415\u041c\u041e\u041d\u0421\u0422\u0420\u0410\u0426\u0418\u041e\u041d\u041d\u0410\u042f \u041e\u0411\u041e\u041b\u041e\u0427\u041a\u0410",
  mod3: "\u041c\u041e\u0414\u0423\u041b\u042c III \u00b7 \u0414\u0415\u041c\u041e\u041d\u0421\u0422\u0420\u0410\u0426\u0418\u041e\u041d\u041d\u0410\u042f \u041e\u0411\u041e\u041b\u041e\u0427\u041a\u0410",
  mod4: "\u041c\u041e\u0414\u0423\u041b\u042c IV \u00b7 \u0414\u0415\u041c\u041e\u041d\u0421\u0422\u0420\u0410\u0426\u0418\u041e\u041d\u041d\u0410\u042f \u041e\u0411\u041e\u041b\u041e\u0427\u041a\u0410",
  ruletka: "\u0420\u0443\u043b\u0435\u0442\u043a\u0430 \u2014 LCG PRNG",
  ruletkaSub: "\u041b\u0438\u043d\u0435\u0439\u043d\u044b\u0439 \u043a\u043e\u043d\u0433\u0440\u0443\u044d\u043d\u0442\u043d\u044b\u0439 \u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440",
  ravnom: "\u0420\u0430\u0432\u043d\u043e\u043c\u0435\u0440\u043d\u043e\u0435 \u0441\u0435\u043a\u0442\u043e\u0440\u043d\u043e\u0435 \u0440\u0430\u0441\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u0438\u0435",
  note1: "\u041d\u0430\u0443\u0447\u043d\u0430\u044f \u0434\u0435\u043c\u043e\u043d\u0441\u0442\u0440\u0430\u0446\u0438\u044f, \u043d\u0435 \u0430\u0437\u0430\u0440\u0442\u043d\u0430\u044f \u0438\u0433\u0440\u0430",
  kosti: "\u041a\u043e\u0441\u0442\u0438 \u2014 CSPRNG",
  kostiSub: "\u041a\u0440\u0438\u043f\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043a\u0438 \u0441\u0442\u043e\u0439\u043a\u0438\u0439 \u0413\u041f\u0421\u0427 (Web Crypto API)",
  rasp: "\u0420\u0430\u0441\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u0438\u0435 \u0438\u0441\u0445\u043e\u0434\u043e\u0432",
  chast: "\u0447\u0430\u0441\u0442\u043e\u0442\u0430 / \u0438\u0442\u0435\u0440\u0430\u0446\u0438\u044f",
  note2: "\u042d\u043a\u0441\u043f\u043e\u043d\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u0430\u044f \u043c\u043e\u0434\u0435\u043b\u044c \u043e\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0438 \u0441\u0435\u0440\u0438\u0438",
  karty: "\u041a\u0430\u0440\u0442\u044b \u2014 Provably Fair",
  kartySub: "\u0412\u0435\u0440\u0438\u0444\u0438\u0446\u0438\u0440\u0443\u0435\u043c\u044b\u0439 \u043a\u0440\u0438\u043f\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0438\u0441\u0445\u043e\u0434 (SHA-256)",
  ishod: "\u0438\u0441\u0445\u043e\u0434",
  verif: "\u0432\u0435\u0440\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044f",
  prozr: "\u041f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u044b\u0439 \u0430\u043b\u0433\u043e\u0440\u0438\u0442\u043c \u0431\u0435\u0437 \u0441\u043a\u0440\u044b\u0442\u043e\u0433\u043e \u043c\u0430\u043d\u0438\u043f\u0443\u043b\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f",
  note3: "\u0412\u0435\u0440\u0438\u0444\u0438\u0446\u0438\u0440\u0443\u0435\u043c\u044b\u0439 \u043a\u0440\u0438\u043f\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0438\u0441\u0445\u043e\u0434",
  slot: "\u0421\u043b\u043e\u0442 \u2014 Weighted RNG",
  slotSub: "\u0412\u0437\u0432\u0435\u0448\u0435\u043d\u043d\u043e\u0435 \u0440\u0430\u0441\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u0438\u0435 \u00b7 \u044d\u0444\u0444\u0435\u043a\u0442 near-miss",
  shema: "\u0421\u0445\u0435\u043c\u0430 \u0432\u0437\u0432\u0435\u0448\u0435\u043d\u043d\u044b\u0445 \u0441\u0435\u043a\u0442\u043e\u0440\u043e\u0432",
  proig: "\u043f\u0440\u043e\u0438\u0433\u0440\u044b\u0448",
  malyj: "\u043c\u0430\u043b\u044b\u0439 \u0432\u044b\u0438\u0433\u0440.",
  dzhek: "\u0434\u0436\u0435\u043a\u043f\u043e\u0442",
  summa: "\u0441\u0443\u043c\u043c\u0430 \u0432\u0435\u0441\u043e\u0432 = 1.00 \u00b7 \u0438\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u043d\u0438\u0435 near-miss",
  note4: "\u041f\u043e\u0432\u0435\u0434\u0435\u043d\u0447\u0435\u0441\u043a\u0430\u044f \u0442\u0435\u043b\u0435\u043c\u0435\u0442\u0440\u0438\u044f \u0441\u0435\u0440\u0438\u0439",
};

const commonHead = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 280" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#eef2f7"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="280" fill="url(#bg)"/>
  <rect x="1" y="1" width="1198" height="278" fill="none" stroke="#e2e8f0" stroke-width="2"/>`;

function footer(note) {
  return `
  <g transform="translate(520 210)">
    <rect width="90" height="32" rx="6" fill="#1e3a5f"/>
    <text x="45" y="21" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#ffffff">E[&#916;] &lt; 0</text>
    <text x="110" y="21" font-family="Arial, sans-serif" font-size="13" fill="#64748b">${note}</text>
  </g>
</svg>`;
}

const banners = {
  "game-roulette-academic.svg": `${commonHead}
  <text x="48" y="52" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="#64748b">${R.mod1}</text>
  <text x="48" y="92" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#0f172a">${R.ruletka}</text>
  <text x="48" y="124" font-family="Arial, sans-serif" font-size="15" fill="#475569">${R.ruletkaSub}</text>
  <g transform="translate(48 148)">
    <rect width="420" height="44" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="16" y="28" font-family="Consolas, monospace" font-size="14" fill="#1e3a5f">state = (1664525*state + 1013904223) mod 2^32</text>
  </g>
  <g transform="translate(820 40)">
    <circle cx="160" cy="100" r="88" fill="#ffffff" stroke="#1e3a5f" stroke-width="3"/>
    <circle cx="160" cy="100" r="62" fill="none" stroke="#cbd5e1" stroke-width="2"/>
    <g stroke="#1e3a5f" stroke-width="1.5">
      <line x1="160" y1="12" x2="160" y2="38"/><line x1="160" y1="162" x2="160" y2="188"/>
      <line x1="72" y1="100" x2="98" y2="100"/><line x1="222" y1="100" x2="248" y2="100"/>
      <line x1="98" y1="38" x2="116" y2="56"/><line x1="204" y1="144" x2="222" y2="162"/>
      <line x1="222" y1="38" x2="204" y2="56"/><line x1="98" y1="162" x2="116" y2="144"/>
    </g>
    <circle cx="160" cy="100" r="18" fill="#1e3a5f"/>
    <text x="160" y="106" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#ffffff">RNG</text>
    <text x="160" y="210" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#64748b">${R.ravnom}</text>
  </g>${footer(R.note1)}`,

  "game-dice-academic.svg": `${commonHead}
  <text x="48" y="52" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="#64748b">${R.mod2}</text>
  <text x="48" y="92" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#0f172a">${R.kosti}</text>
  <text x="48" y="124" font-family="Arial, sans-serif" font-size="15" fill="#475569">${R.kostiSub}</text>
  <g transform="translate(48 148)">
    <rect width="380" height="44" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="16" y="28" font-family="Consolas, monospace" font-size="14" fill="#1e3a5f">crypto.getRandomValues(Uint32Array)</text>
  </g>
  <g transform="translate(700 36)">
    <rect x="0" y="0" width="72" height="72" rx="12" fill="#ffffff" stroke="#1e3a5f" stroke-width="2"/>
    <circle cx="18" cy="18" r="5" fill="#1e3a5f"/><circle cx="54" cy="18" r="5" fill="#1e3a5f"/>
    <circle cx="36" cy="36" r="5" fill="#1e3a5f"/><circle cx="18" cy="54" r="5" fill="#1e3a5f"/>
    <circle cx="54" cy="54" r="5" fill="#1e3a5f"/>
    <rect x="100" y="0" width="72" height="72" rx="12" fill="#ffffff" stroke="#1e3a5f" stroke-width="2"/>
    <circle cx="118" cy="18" r="5" fill="#1e3a5f"/><circle cx="154" cy="54" r="5" fill="#1e3a5f"/>
    <g transform="translate(220 0)">
      <text x="0" y="20" font-family="Arial, sans-serif" font-size="12" fill="#64748b">${R.rasp}</text>
      <rect x="0" y="32" width="28" height="80" fill="#1e3a5f" opacity="0.85"/>
      <rect x="36" y="48" width="28" height="64" fill="#1e3a5f" opacity="0.65"/>
      <rect x="72" y="56" width="28" height="56" fill="#1e3a5f" opacity="0.5"/>
      <rect x="108" y="40" width="28" height="72" fill="#1e3a5f" opacity="0.7"/>
      <rect x="144" y="60" width="28" height="52" fill="#1e3a5f" opacity="0.45"/>
      <line x1="0" y1="120" x2="172" y2="120" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="86" y="140" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8">${R.chast}</text>
    </g>
  </g>${footer(R.note2)}`,

  "game-cards-academic.svg": `${commonHead}
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0 0 L8 4 L0 8 Z" fill="#64748b"/>
    </marker>
  </defs>
  <text x="48" y="52" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="#64748b">${R.mod4}</text>
  <text x="48" y="92" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#0f172a">${R.karty}</text>
  <text x="48" y="124" font-family="Arial, sans-serif" font-size="15" fill="#475569">${R.kartySub}</text>
  <g transform="translate(48 148)">
    <rect width="500" height="44" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="16" y="28" font-family="Consolas, monospace" font-size="13" fill="#1e3a5f">roll = parseInt(SHA256(s+c+n)[0:8], 16) mod 100</text>
  </g>
  <g transform="translate(640 50)">
    <rect x="0" y="20" width="100" height="130" rx="10" fill="#ffffff" stroke="#1e3a5f" stroke-width="2"/>
    <text x="50" y="95" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#1e3a5f">?</text>
    <text x="50" y="12" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#64748b">${R.ishod}</text>
    <line x1="110" y1="85" x2="155" y2="85" stroke="#64748b" stroke-width="2" marker-end="url(#arr)"/>
    <rect x="165" y="55" width="110" height="60" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="220" y="82" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#1e3a5f">serverSeed</text>
    <text x="220" y="98" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#1e3a5f">+ clientSeed</text>
    <line x1="285" y1="85" x2="330" y2="85" stroke="#64748b" stroke-width="2" marker-end="url(#arr)"/>
    <rect x="340" y="55" width="90" height="60" rx="8" fill="#1e3a5f"/>
    <text x="385" y="82" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#ffffff">SHA-256</text>
    <text x="385" y="98" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#cbd5e1">${R.verif}</text>
    <line x1="440" y1="85" x2="485" y2="85" stroke="#64748b" stroke-width="2" marker-end="url(#arr)"/>
    <rect x="495" y="65" width="70" height="40" rx="6" fill="#ffffff" stroke="#1e3a5f" stroke-width="2"/>
    <text x="530" y="90" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="#1e3a5f">roll</text>
    <text x="285" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#64748b">${R.prozr}</text>
  </g>${footer(R.note3)}`,

  "game-slot-academic.svg": `${commonHead}
  <text x="48" y="52" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="#64748b">${R.mod3}</text>
  <text x="48" y="92" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#0f172a">${R.slot}</text>
  <text x="48" y="124" font-family="Arial, sans-serif" font-size="15" fill="#475569">${R.slotSub}</text>
  <g transform="translate(48 148)">
    <rect width="380" height="44" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="16" y="28" font-family="Consolas, monospace" font-size="14" fill="#1e3a5f">r -= weight[i]; if (r &lt;= 0) goto sector[i]</text>
  </g>
  <g transform="translate(620 42)">
    <rect x="0" y="0" width="480" height="150" rx="12" fill="#ffffff" stroke="#1e3a5f" stroke-width="2"/>
    <text x="240" y="24" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#64748b">${R.shema}</text>
    <g transform="translate(30 40)">
      <rect x="0" y="0" width="80" height="90" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
      <text x="40" y="35" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#64748b">w=0.45</text>
      <text x="40" y="58" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#1e3a5f">${R.proig}</text>
      <rect x="100" y="0" width="80" height="90" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
      <text x="140" y="35" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#64748b">w=0.30</text>
      <text x="140" y="58" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#1e3a5f">near-miss</text>
      <rect x="200" y="0" width="80" height="90" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
      <text x="240" y="35" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#64748b">w=0.15</text>
      <text x="240" y="58" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#1e3a5f">${R.malyj}</text>
      <rect x="300" y="0" width="80" height="90" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
      <text x="340" y="35" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#64748b">w=0.10</text>
      <text x="340" y="58" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#1e3a5f">${R.dzhek}</text>
      <line x1="0" y1="105" x2="380" y2="105" stroke="#cbd5e1"/>
      <text x="190" y="125" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8">${R.summa}</text>
    </g>
  </g>${footer(R.note4)}`,
};

for (const [name, content] of Object.entries(banners)) {
  fs.writeFileSync(path.join(dir, name), content, "utf8");
  console.log("wrote", name);
}
