'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, InfoIcon } from 'lucide-react';

interface NotificationModelProps {
  isOpen: boolean;
  type?: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  buttonText: string;
  buttonOnClick: () => void;
}

const NotificationModel: React.FC<NotificationModelProps> = ({
  isOpen,
  type = 'info',
  title,
  message,
  buttonText,
  buttonOnClick,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      default:
        return <InfoIcon className="w-6 h-6 text-cyan-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
          className="w-screen h-screen bg-black/50 backdrop-blur-sm relative"
        >
          <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[90vw] max-w-[400px]">
            {/* Background with glow effect */}
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transform -skew-x-2 rounded-lg" />
            
            {/* Content container */}
            <div className="relative border border-slate-700 bg-slate-900/50 rounded-lg p-1">
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-500" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-500" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-500" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-500" />

              <div className="p-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  {getIcon()}
                  <h2 className="text-cyan-500 font-mono text-lg uppercase tracking-wider">
                    {title}
                  </h2>
                </div>

                {/* Message */}
                <p className="text-slate-300 font-mono text-sm">
                  {message}
                </p>

                {/* Close button */}
                <button
                  onClick={buttonOnClick}
                  className="mt-4 w-full py-1.5 rounded font-mono text-sm
                    bg-cyan-500/20 border border-cyan-500 text-cyan-500 
                    hover:bg-cyan-500/30 transition-colors duration-300"
                >
                  {buttonText}
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-1 left-4 w-1/4 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
            <div className="absolute -top-1 right-4 w-1/4 h-0.5 bg-gradient-to-l from-cyan-500 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModel;
