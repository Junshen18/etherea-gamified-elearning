"use client";

import { useState } from 'react';
import Image from 'next/image';
import { DailyQuestModal } from '@/components/DailyQuestModal';
import { useDailyQuests } from '@/components/daily-quests';


interface TokenBalance {
  formatted: string;
  symbol: string;
}

export default function Home() {
  const [exp, setExp] = useState<number>(5);
  const [nextLevelExp, setNextLevelExp] = useState<number>(10);
  const [level, setLevel] = useState<number>(2);
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const { quests, updateProgress } = useDailyQuests();
  const [streakCount, setStreakCount] = useState<number>(2);

  // Temporary mock data
  const tokenBalance: TokenBalance = {
    formatted: "100",
    symbol: "ETN"
  };


  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white">
      <div className="container mx-auto px-8 py-8">
        <div className="flex flex-col items-center gap-8">
          {/* Level Display with Streak */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Level {level}</h1>
            <p className="text-gray-300">Adventure Awaits!</p>
                        
            <div className="mt-4 inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full">
              <span className="animate-bounce">🔥</span>
              <span className="font-bold">{streakCount} Day Streak</span>
            </div>
          </div>

          {/* Experience Bar */}
          <div className="w-full max-w-md">
            <div className="flex justify-between mb-2 text-sm">
              <span>Experience</span>
              <span>{exp} / {nextLevelExp} XP</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-purple-500 h-full transition-all duration-300 relative"
                style={{ width: `${(exp/nextLevelExp) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-300/30 to-purple-600/0 animate-shine" />
              </div>
            </div>
          </div>

          {/* Character Display */}
          <div className=" w-72 h-72 bg-black/50 rounded-full">
            <Image
              src="/nft-character.png"
              alt="Character"
              className="object-contain p-4"
              priority
              // fill
              height={800}
              width={500}
            />
          </div>

          

          {/* Token Display */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 flex items-center gap-4">

              <Image
                src="/token-icon.png" // Add your token icon
                alt="Token"
                width={64}
                height={64}
              />

            <div>
              <p className="text-sm text-gray-400">Balance</p>
              <p className="text-xl font-bold">
                {Number(tokenBalance.formatted).toFixed(2)} {tokenBalance.symbol}
              </p>
            </div>
          </div>

          {/* Daily Quest Button */}
          <button
            onClick={()=> setIsQuestModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
                     text-white font-bold py-4 px-8 rounded-lg
                     transform transition-all duration-200 hover:scale-105 active:scale-95
                     shadow-lg hover:shadow-purple-500/25"
          >
            Check Daily Quests
          </button>

          <DailyQuestModal
        isOpen={isQuestModalOpen}
        onClose={() => setIsQuestModalOpen(false)}
        quests={quests}
        onUpdateProgress={updateProgress}
      />
        </div>
      </div>
    </main>
  );
}