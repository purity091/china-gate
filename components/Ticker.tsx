import React from 'react';
import { Icons } from './Icons';

interface TickerProps {
  items: string[];
}

const Ticker: React.FC<TickerProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div className="bg-china-dark text-white text-sm py-2 overflow-hidden relative flex items-center z-40 border-b border-china-red/30">
      <div className="absolute right-0 bg-china-dark z-10 px-4 font-bold text-china-gold flex items-center gap-2 shadow-lg h-full">
        <Icons.Zap size={14} className="animate-pulse" />
        موجز سريع
      </div>
      <div className="whitespace-nowrap animate-ticker flex gap-8 pr-32">
        {items.concat(items).map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-2 text-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-china-red"></span>
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); } 
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Ticker;