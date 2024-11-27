'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import QuizGame from '@/components/quiz-game';
import { Play, X } from 'lucide-react';
import Image from 'next/image';

export default function LearnPage() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const tracks = [
    { id: 1, name: 'Core Protocol' },
    { id: 2, name: 'Cypherpunk and Privacy' },
    { id: 3, name: 'Usability' },
    { id: 4, name: 'Cryptoeconomics' },
    { id: 5, name: 'Real World Ethereum' },
    { id: 6, name: 'Security' },
    { id: 7, name: 'Developer Experience' },
    { id: 8, name: 'Layer 2' },
    { id: 9, name: 'Coordination' },
  ];

  const handleTrackSelect = (track: string) => {
    setSelectedTrack(track);
  };

  const handleStartQuiz = () => {
    if (selectedTrack) {
      setShowQuiz(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Learning Tracks</h1>

        <div className="grid grid-cols-1 gap-4">
          {tracks.map((track) => (
            <motion.div
              key={track.id}
              className={`p-4 rounded-lg border ${selectedTrack === track.name
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-slate-700 bg-slate-800/50'
                }`}
              onClick={() => handleTrackSelect(track.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={`/${track.id}.jpeg`}
                  alt={track.name}
                  width={48}
                  height={48}
                  className="rounded object-cover"
                />
                <h2 className="text-lg font-semibold font-grotesk text-cyan-400">{track.name}</h2>
              </div>

              {selectedTrack === track.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 space-y-4"
                >
                  <div className="p-3 rounded bg-slate-800 border border-slate-700">
                    <h3 className="text-cyan-400 font-mono mb-2">Basic</h3>
                    <p className="text-slate-300 text-sm mb-4">
                      Test your knowledge with a quick quiz challenge
                    </p>
                    <button
                      onClick={handleStartQuiz}
                      className="flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded
                               hover:bg-cyan-500/30 transition-colors duration-300 font-mono text-sm"
                    >
                      <Play size={16} />
                      Start Quiz
                    </button>
                  </div>

                  <div className="p-3 rounded bg-slate-800 border border-slate-700 opacity-50">
                    <h3 className="text-slate-400 font-mono mb-2">Advanced</h3>
                    <p className="text-slate-500 text-sm">Coming soon...</p>
                  </div>

                  <div className="p-3 rounded bg-slate-800 border border-slate-700 opacity-50">
                    <h3 className="text-slate-400 font-mono mb-2">Expert</h3>
                    <p className="text-slate-500 text-sm">Coming soon...</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
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
                onClick={() => setSelectedTrack(topic.name)}
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



      {showQuiz && selectedTrack && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowQuiz(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white z-50"
            >
              <X size={24} />
            </button>
            <QuizGame
              track={selectedTrack}
              onClose={() => setShowQuiz(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
