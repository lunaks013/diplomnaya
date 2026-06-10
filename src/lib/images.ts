const base = import.meta.env.BASE_URL;
const v = "2";

/** Иллюстрации в научном стиле (дипломная работа) */
export const IMAGES = {
  hero: `${base}images/diploma-overview-simple.svg?v=${v}`,
  psychology: `${base}images/psychology-simple.svg?v=${v}`,
  analytics: `${base}images/monte-carlo-simple.svg?v=${v}`,
  rng: `${base}images/rng-mechanisms-simple.svg?v=${v}`,
} as const;
