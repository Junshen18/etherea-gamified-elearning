import { useEffect, useState } from 'react';
import { DailyQuest, DailyQuestService } from '../models/daily-quest';

export function useDailyQuests() {
  const [quests, setQuests] = useState<DailyQuest[]>([]);

  useEffect(() => {
    // Load daily quests
    const today = new Date();
    const dailyQuests = DailyQuestService.generateDailyQuests(today);
    setQuests(dailyQuests);
  }, []);

  const updateProgress = (questId: string, progress: number) => {
    setQuests(currentQuests => 
      currentQuests.map(quest => 
        quest.id === questId 
          ? DailyQuestService.updateQuestProgress(quest, progress)
          : quest
      )
    );
  };

  return { quests, updateProgress };
} 