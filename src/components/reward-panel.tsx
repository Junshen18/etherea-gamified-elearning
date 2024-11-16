'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

interface RewardPanelProps {
  isOpen: boolean;
  onClose: () => void;
  rewards: {
    type: 'exp' | 'coin' | 'nft';
    amount?: number;
    name?: string;
    image?: string;
  }[];
  className?: string;
}

const RewardPanel: React.FC<RewardPanelProps> = ({ isOpen, onClose, rewards }) => {
  const [isClaimed, setIsClaimed] = useState(false);
  const dummyWallet = "0x742...3f91";

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'exp':
        return '⭐'; // You can replace with actual image path
      case 'coin':
        return '🪙'; // You can replace with actual image path
      case 'nft':
        return '🎨'; // You can replace with actual image path
      default:
        return '🎁';
    }
  };

  const handleClaim = () => {
    setIsClaimed(true);
    // You can add actual claiming logic here
    setTimeout(() => {
      onClose();
      setIsClaimed(false);
    }, 3000); // Close after 3 seconds
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`w-screen h-screen bg-black/50 backdrop-blur-sm relative`}
          >
            <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[90vw] max-w-[400px]">

              <div className="absolute w-full h-full transform -skew-x-2 rounded-lg" />
              
              {/* Content container */}
              <div className="relative border border-slate-700 bg-slate-900/50 rounded-lg p-1">
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex items-center mb-6 border-b border-slate-700 pb-4">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse" />
                    <h2 className="text-cyan-500 font-mono text-lg sm:text-xl uppercase tracking-wider">
                      {isClaimed ? 'Claimed Successfully!' : 'Rewards Acquired!'}
                    </h2>
                  </div>

                  {/* Rewards list */}
                  <div className="space-y-4">
                    {rewards.map((reward, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                      >
                        <div className="w-10 h-10 flex items-center justify-center text-2xl">
                          {reward.image ? (
                            <Image
                              src={reward.image}
                              alt={reward.type}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          ) : (
                            getRewardIcon(reward.type)
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-cyan-400 font-mono">
                            {reward.type === 'nft' ? reward.name : `${reward.amount} ${reward.type.toUpperCase()}`}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Claimed confirmation */}
                    {isClaimed && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-center"
                      >
                        <div className="flex items-center justify-center text-green-500 mb-2">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <p className="text-slate-300 text-sm">
                          Claimed to wallet
                        </p>
                        <p className="font-mono text-cyan-400 text-sm">
                          {dummyWallet}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Claim button */}
                  <button
                    onClick={handleClaim}
                    disabled={isClaimed}
                    className={`mt-6 w-full py-2 rounded font-mono transition-colors duration-300
                      ${isClaimed 
                        ? 'bg-green-500/20 border border-green-500 text-green-500 cursor-not-allowed'
                        : 'bg-cyan-500/20 border border-cyan-500 text-cyan-500 hover:bg-cyan-500/30'
                      }`}
                  >
                    {isClaimed ? 'CLAIMED' : 'CLAIM'}
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-2 left-4 w-1/4 h-1 bg-gradient-to-r from-cyan-500 to-transparent" />
              <div className="absolute -top-2 right-4 w-1/4 h-1 bg-gradient-to-l from-cyan-500 to-transparent" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RewardPanel;
