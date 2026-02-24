/**
 * Level curve: cumulative XP needed to reach each level.
 * Level 1 = 0, Level 2 = 100, Level 3 = 250, Level 4 = 450, ...
 * Formula: XP to reach level L = 50 * L * (L - 1) for L >= 2
 */
const MAX_LEVEL = 50;

export function xpToReachLevel(level: number): number {
  if (level <= 1) return 0;
  return 50 * level * (level - 1);
}

export function getLevelFromTotalXP(totalXP: number): number {
  let level = 1;
  for (let L = 2; L <= MAX_LEVEL; L++) {
    if (totalXP >= xpToReachLevel(L)) level = L;
    else break;
  }
  return level;
}

/** XP progress within current level: 0 to 1 (1 = ready for next level) */
export function getProgressInLevel(totalXP: number): { level: number; progress: number; xpInLevel: number; xpNeededForNext: number } {
  const level = getLevelFromTotalXP(totalXP);
  const currentThreshold = xpToReachLevel(level);
  const nextThreshold = xpToReachLevel(level + 1);
  const xpNeededForNext = nextThreshold - currentThreshold;
  const xpInLevel = totalXP - currentThreshold;
  const progress = level >= MAX_LEVEL ? 1 : xpInLevel / xpNeededForNext;
  return { level, progress, xpInLevel, xpNeededForNext };
}

export function getLevelTitle(level: number): string {
  const titles: Record<number, string> = {
    1: 'Seedling',
    2: 'Sprout',
    3: 'Bud',
    4: 'Bloom',
    5: 'Eco Friend',
    6: 'Green Walker',
    7: 'Cycle Star',
    8: 'Clean Commuter',
    9: 'Air Guardian',
    10: 'Climate Hero',
    11: 'Earth Champion',
    12: 'Planet Protector',
  };
  if (titles[level]) return titles[level];
  if (level >= 20) return 'Legend';
  if (level >= 15) return 'Master';
  return `Level ${level}`;
}
