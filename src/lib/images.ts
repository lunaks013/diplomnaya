import { publicAsset } from "./assetUrl";

const v = "10";

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
