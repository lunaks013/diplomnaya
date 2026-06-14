import type { MechanismId, MechanismInfo } from "../types";

export const MECHANISMS: Record<MechanismId, MechanismInfo> = {
  lcg: {
    id: "lcg",
    label: "Механизм I — псевдослучайная выборка",
    technicalName: "Последовательный генератор случайных значений",
    gameShell: "Модуль I: рулетка с тремя значениями",
    description:
      "Модуль создаёт три последовательных значения и показывает, как отдельные совпадения влияют на восприятие результата.",
    implementation: "Три случайных значения сравниваются между собой, после чего система определяет исход раунда.",
    houseEdge: 12,
    theoreticalWinRate: 22.4,
    researchFocus:
      "Демонстрация того, что стандартный PRNG не делает длительную серию выгодной для пользователя.",
  },
  csprng: {
    id: "csprng",
    label: "Механизм II — криптостойкая случайность",
    technicalName: "Непредсказуемый источник случайных значений",
    gameShell: "Модуль II: кости с непредсказуемым исходом",
    description:
      "Модуль использует надёжный источник случайности браузера и показывает, что непредсказуемость не гарантирует выгодный итог.",
    implementation: "Браузер создаёт случайное значение, затем система сравнивает его с правилом текущего модуля.",
    houseEdge: 4,
    theoreticalWinRate: 48,
    researchFocus:
      "Проверка гипотезы: криптографически стойкая случайность не компенсирует преимущество системы.",
  },
  weightedWheel: {
    id: "weightedWheel",
    label: "Механизм III — взвешенный выбор",
    technicalName: "Взвешенное секторное распределение (near-miss)",
    gameShell: "Модуль III: слот с разными шансами",
    description:
      "Взвешенный выбор сектора с инженерным размещением исходов, провоцирующим эффект «почти выигрыш» (near-miss).",
    implementation: "Система выбирает сектор с учётом заданных весов: одни исходы встречаются чаще, другие реже.",
    houseEdge: 12,
    theoreticalWinRate: 31,
    researchFocus:
      "Анализ near-miss эффекта как фактора усиления субъективной мотивации к продолжению серии.",
  },
  provablyFair: {
    id: "provablyFair",
    label: "Механизм IV — проверяемый исход",
    technicalName: "Прозрачный алгоритм проверки результата",
    gameShell: "Модуль IV: карты с проверяемым исходом",
    description:
      "Прозрачный алгоритм показывает, что исход можно проверить, но сама проверяемость не делает серию выгодной.",
    implementation: "Система формирует результат проверяемым способом и сравнивает его с правилом модуля.",
    houseEdge: 4,
    theoreticalWinRate: 48,
    researchFocus:
      "Доказательство: прозрачность алгоритма не делает итог серии выгодным для пользователя.",
  },
};

export const MECHANISM_LIST = Object.values(MECHANISMS);

export const ALL_MECHANISM_IDS: MechanismId[] = ["lcg", "csprng", "weightedWheel", "provablyFair"];
