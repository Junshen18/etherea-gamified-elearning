'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Learn() {
  const [selectedTopic, setSelectedTopic] = useState('Core Protocol');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 max-w-[428px] mx-auto">
      {/* Top Stats Bar */}
      <div className="mb-6">
        <div className="bg-gray-800 p-3 rounded-lg border border-cyan-500/30 backdrop-blur-sm">
          {/* Level and XP Row */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex flex-col">
              <span className="text-cyan-400 text-xs">Current Level</span>
              <span className="text-lg font-bold">Level 2</span>
            </div>
            <div className="flex-1">
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: '50%' }}
                />
              </div>
              <span className="text-xs text-cyan-400">5/10 XP</span>
            </div>
          </div>
          
          {/* Tokens Row */}
          <div className="flex items-center gap-2">
            <Image src="/token-icon.png" alt="Tokens" width={20} height={20} className="w-5 h-5" />
            <span className="text-lg font-bold text-white">100</span>
          </div>
        </div>
      </div>
      
      {/* Topic Selector */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3">Choose Your Path</h2>
        <div className="overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex gap-2 min-w-max">
            {[
              { name: 'Core Protocol', icon: '🔗' },
              { name: 'Real World ETH', icon: '🌍' },
              { name: 'Security', icon: '🛡️' },
              { name: 'Cypherpunk', icon: '🕶️' },
              { name: 'Usability', icon: '👥' },
              { name: 'Cryptoeconomics', icon: '📊' },
              { name: 'Layer 2', icon: '⚡' },
              { name: 'Cryptography', icon: '🔐' },
            ].map((topic, index) => (
              <button
                key={index}
                onClick={() => setSelectedTopic(topic.name)}
                className={`px-4 py-2 rounded-full border border-cyan-500/30 backdrop-blur-sm
                  ${index === 0 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500' 
                    : 'bg-gray-800/50'
                  } 
                  hover:bg-gray-700/50 transition-all whitespace-nowrap flex items-center gap-2`}
              >
                <span>{topic.icon}</span>
                <span>{topic.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      

      {/* Learning Path */}
      <div className="relative">
        {/* Connection Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" style={{ position: 'absolute', zIndex: 0 }}>
            <path 
              d="M70 80 L180 160 M180 160 L70 240 M180 160 L290 240" 
              stroke="rgb(75 85 99)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Stages */}
        <div className="relative z-[1]">
          {/* Stage 1 */}
          <div className="absolute left-4 top-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <span className="text-xl font-bold">1</span>
            </div>
            <span className="mt-2 text-sm font-semibold">Basics</span>
          </div>

          {/* Stage 2 */}
          <div className="absolute left-[160px] top-32 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500/80 to-blue-500/80 flex items-center justify-center cursor-not-allowed">
              <span className="text-xl font-bold">2</span>
            </div>
            <span className="mt-2 text-sm font-semibold text-gray-400">Advanced</span>
          </div>

          {/* Stage 3A */}
          <div className="absolute left-4 top-56 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center cursor-not-allowed">
              <span className="text-xl font-bold">3A</span>
            </div>
            <span className="mt-2 text-sm font-semibold text-gray-400">Specialist</span>
          </div>

          {/* Stage 3B */}
          <div className="absolute left-[280px] top-56 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center cursor-not-allowed">
              <span className="text-xl font-bold">3B</span>
            </div>
            <span className="mt-2 text-sm font-semibold text-gray-400">Expert</span>
          </div>
        </div>

        {/* Add height to container to account for absolute positioning */}
        <div className="h-[400px]"></div>
      </div>
    </div>
  );
}
