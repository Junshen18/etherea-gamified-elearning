'use client';
import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { motion } from 'framer-motion';
import RewardPanel from './reward-panel';
import questionData from '@/data/learning_track_questionset.json';
import { Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Question {
  track: string;
  question: string;
  correct_answer: string;
  wrong_answer: string;
  displayedAnswers: {
    left: string;
    right: string;
    correctSide: 'left' | 'right';
  };
}

interface QuizGameProps {
  track: string;
  onClose: () => void;
}

const QuizGame: React.FC<QuizGameProps> = ({ track, onClose }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [gameEnded, setGameEnded] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const router = useRouter();
  // Initialize questions with randomized answer positions
  const initializeQuestions = () => {
    const trackQuestions = questionData.questions
      .filter(q => q.track === track)
      .slice(0, 5)
      .map(q => {
        const isCorrectOnRight = Math.random() >= 0.5;
        return {
          ...q,
          displayedAnswers: {
            left: isCorrectOnRight ? q.wrong_answer : q.correct_answer,
            right: isCorrectOnRight ? q.correct_answer : q.wrong_answer,
            correctSide: isCorrectOnRight ? 'right' : 'left' as 'left' | 'right'
          }
        };
      });
    setQuestions(trackQuestions);
  };

  // Start game handler
  const handleStartGame = () => {
    initializeQuestions();
    setGameStarted(true);
  };

  // Countdown timer
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameEnded) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameEnded(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, gameEnded, gameStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSwipe = (direction: string, question: Question) => {
    const isCorrect = 
      (direction === 'right' && question.displayedAnswers.correctSide === 'right') ||
      (direction === 'left' && question.displayedAnswers.correctSide === 'left');
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setQuestions(prev => {
      const newQuestions = prev.filter(q => q !== question);
      if (newQuestions.length === 0) {
        setGameEnded(true);
      }
      return newQuestions;
    });
  };

  useEffect(() => {
    if (gameEnded && score >= 3) {
      setShowRewards(true);
    }
  }, [gameEnded, score]);

  if (!gameStarted) {
    return (
      <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-800/90 p-8 rounded-xl border border-cyan-500 text-center max-w-md mx-4"
        >
          <h2 className="text-2xl font-mono text-cyan-500 mb-6">Quiz Challenge</h2>
          <div className="space-y-4 mb-8">
            <p className="text-slate-300">Test your knowledge in</p>
            <p className="text-cyan-400 font-mono text-lg">{track}</p>
            <div className="border-t border-slate-700 pt-4">
              <p className="text-slate-400 text-sm">
                Swipe right for correct answers<br/>
                Swipe left for incorrect answers<br/>
                Complete in 3 minutes
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleStartGame}
              className="w-full bg-cyan-500/20 border border-cyan-500 text-cyan-500 py-3 rounded-lg
                        hover:bg-cyan-500/30 transition-colors duration-300 font-mono
                        flex items-center justify-center gap-2"
            >
              <Play size={20} />
              START CHALLENGE
            </button>
            <button
              onClick={onClose}
              className="w-full bg-transparent border border-slate-600 text-slate-400 py-3 rounded-lg
                        hover:bg-slate-800 transition-colors duration-300 font-mono"
            >
              CANCEL
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900 text-white z-50">
      {/* Cyberpunk-style background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-transparent to-cyan-500" />
      
      {/* Timer Display */}
      <div className="fixed top-4 left-0 right-0 flex justify-center px-6 z-50">
        <div className="bg-slate-800/80 px-6 py-3 rounded-lg border border-cyan-500">
          <span className="font-mono text-cyan-500 text-xl">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Score Display */}
      <div className="fixed top-20 left-0 right-0 flex justify-center px-6 z-50">
        <div className="bg-slate-800/80 px-4 py-2 rounded-lg border border-cyan-500">
          <span className="font-mono text-cyan-500">Score: {score}/5</span>
        </div>
      </div>

      {/* Cards Container */}
      {!gameEnded ? (
        <div className="h-screen flex items-center justify-center">
          <div className="w-80 h-[400px] relative">
            {questions.map((question, index) => (
              <TinderCard
                key={index}
                onSwipe={(dir) => handleSwipe(dir, question)}
                preventSwipe={['up', 'down']}
                className="absolute z-10"
              >
                <div className="w-80 h-[400px] bg-slate-800/90 rounded-xl p-6 border border-cyan-500 shadow-lg backdrop-blur-sm">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-cyan-500 font-mono mb-2">{question.track}</h3>
                      <p className="text-lg font-medium">{question.question}</p>
                    </div>
                    <div className="flex justify-between text-sm font-mono mt-4">
                      <span className="text-white">← {question.displayedAnswers.left}</span>
                      <span className="text-white">{question.displayedAnswers.right} →</span>
                    </div>
                  </div>
                </div>
              </TinderCard>
            ))}
          </div>
        </div>
      ) : (
        // End Game Screen
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-screen flex items-center justify-center"
        >
          <div className="bg-slate-800/90 p-8 rounded-xl border border-cyan-500 text-center">
            <h2 className="text-2xl font-mono text-cyan-500 mb-4">Game Over!</h2>
            <p className="text-xl mb-2">Final Score: {score}/5</p>
            <p className="text-lg text-cyan-400 mb-6">
              {score >= 3 ? 'Congratulations! You earned rewards!' : 'Try again to earn rewards!'}
            </p>
            <button
              onClick={() => {
                onClose();
                
                if (score >= 3) {
                  setShowRewards(true);
                } else {
                  router.push('/authenticated-pages/home');
                }
              }}
              className="bg-transparent border border-cyan-500 text-cyan-500 px-6 py-2 rounded-lg
                        hover:bg-cyan-500/10 transition-colors duration-300 font-mono"
            >
              {score >= 3 ? 'CLAIM REWARDS' : 'TRY AGAIN'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Rewards Panel */}
      <RewardPanel
        isOpen={showRewards}
        onClose={() => {
          setShowRewards(false);
          onClose();
        }}
        rewards={[
          { type: 'exp', amount: 100 },
          { type: 'coin', amount: 50 },
          { type: 'nft', name: 'Quiz Master Badge', image: '/badges/quiz-master.png' }
        ]}
      />
    </div>
  );
};

export default QuizGame; 