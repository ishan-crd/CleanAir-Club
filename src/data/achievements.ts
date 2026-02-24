export type AchievementId = 'earlybird' | 'pedal' | 'tree' | 'top1';

export type Achievement = {
  id: AchievementId;
  title: string;
  icon: 'sunny' | 'bicycle' | 'leaf' | 'star';
  bg: string;
  iconColor: string;
  description: string;
  howToGet: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'earlybird',
    title: 'Early Bird',
    icon: 'sunny',
    bg: 'rgba(254, 240, 138, 0.5)',
    iconColor: '#CA8A04',
    description: 'You logged an eco-friendly action before 9 AM. Early risers who choose green transport or habits help reduce peak-hour emissions.',
    howToGet: 'Log any transport or lifestyle action (e.g. walk, metro, reusable bottle) before 9:00 AM.',
  },
  {
    id: 'pedal',
    title: 'Pedal Master',
    icon: 'bicycle',
    bg: 'rgba(191, 219, 254, 0.5)',
    iconColor: '#2563EB',
    description: 'You chose the bicycle for a trip. Cycling cuts CO₂, keeps you fit, and sets an example for cleaner commutes.',
    howToGet: 'Select "Bicycle" when logging a transport action on the Log Your Action screen.',
  },
  {
    id: 'tree',
    title: 'Tree Planter',
    icon: 'leaf',
    bg: 'rgba(167, 243, 208, 0.5)',
    iconColor: '#059669',
    description: 'Your saved CO₂ is equivalent to the impact of multiple trees. Every kg you save helps clean the air we breathe.',
    howToGet: 'Reach a total of 12 kg CO₂ saved through logged actions (transport and lifestyle combined).',
  },
  {
    id: 'top1',
    title: 'Top 1%',
    icon: 'star',
    bg: 'rgba(233, 213, 255, 0.5)',
    iconColor: '#9333EA',
    description: 'You’re in the top 1% of CleanAir Club users by impact. Your choices inspire others to go green.',
    howToGet: 'Reach Level 10 or higher and be in the top 1% of your squad or global leaderboard by total XP or CO₂ saved.',
  },
];

export function getAchievementById(id: AchievementId): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
