export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  rewards: {
    exp: number | null;
    coins: number | null;
  };
  completed: boolean;
  requirement: number;
  progress: number;
}

export class DailyQuestService {
  private static questPool: Partial<DailyQuest>[] = [
    {
      title: 'Daily Login',
      description: 'Log in to the game',
      requirement: 1,
      rewards: { exp: 5, coins: 10 }
    },
    {
      title: 'Quick Learn',
      description: 'Play one game',
      requirement: 1,
      rewards: { exp: 10, coins: 20 }
    },
    {
      title: 'Market Visit',
      description: 'Make one transaction in the shop',
      requirement: 1,
      rewards: { exp: 15, coins: 20 }
    },
  ];

  static generateDailyQuests(date: Date): DailyQuest[] {
    // Use date as seed for consistent daily quests
    const seed = date.toISOString().split('T')[0];
    
    // Fisher-Yates shuffle with seeded random
    const shuffled = [...this.questPool];
    const seededRandom = this.seededRandom(seed);
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Take first 3 quests and initialize them
    return shuffled.slice(0, 3).map((quest, index) => ({
      ...quest,
      id: `${seed}-${index}`,
      completed: false,
      progress: 0,
      description: quest.description!.replace('{requirement}', quest.requirement!.toString())
    })) as DailyQuest[];
  }

  private static seededRandom(seed: string) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    const x = Math.sin(hash++) * 10000;
    return () => x - Math.floor(x);
  }

  static updateQuestProgress(quest: DailyQuest, progress: number): DailyQuest {
    const newProgress = Math.min(progress, quest.requirement);
    const completed = newProgress >= quest.requirement;

    return {
      ...quest,
      progress: newProgress,
      completed
    };
  }
} 