import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { DailyQuest } from '../models/daily-quest';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface DailyQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  quests: DailyQuest[];
  onUpdateProgress: (questId: string, progress: number) => void;
}

export function DailyQuestModal({ isOpen, onClose, quests, onUpdateProgress }: DailyQuestModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium leading-6 text-white">
                    Daily Quests
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>

                <div className="space-y-4">
                  {quests.map((quest) => (
                    <div
                      key={quest.id}
                      className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-white">{quest.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-white text-sm flex flex-row items-center gap-1">{quest.rewards.coins} <Image src="/token-icon.png" alt="token" width={16} height={16} /></span>
                          <span className="text-purple-400 text-sm">{quest.rewards.exp} XP</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-3">{quest.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>Progress</span>
                          <span>{quest.progress} / {quest.requirement}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              quest.completed ? 'bg-green-500' : 'bg-purple-500'
                            }`}
                            style={{
                              width: `${Math.min(
                                (quest.progress / quest.requirement) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 