import React from 'react';
import { NewsItem } from '../types';
import { Icons } from './Icons';

interface FeaturedNewsProps {
  item?: NewsItem;
  isLoading: boolean;
}

const FeaturedNews: React.FC<FeaturedNewsProps> = ({ item, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full h-96 bg-gray-200 animate-pulse rounded-2xl mb-8 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 p-8 w-full md:w-2/3 space-y-4">
           <div className="h-8 bg-gray-300 rounded w-3/4"></div>
           <div className="h-4 bg-gray-300 rounded w-full"></div>
           <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden group shadow-xl mb-12">
      {/* Background Image */}
      <img 
        src={item.imageUrl} 
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-china-dark/90 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 right-0 p-6 md:p-10 w-full md:w-3/4 lg:w-2/3 text-white">
        <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-china-red text-white text-xs font-bold uppercase rounded-full tracking-wider">
                خبر رئيسي
            </span>
            <span className="text-gray-300 text-sm flex items-center gap-1">
                <Icons.Globe size={14} />
                {item.timestamp}
            </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 font-sans">
          {item.title}
        </h2>
        
        <p className="text-lg text-gray-200 line-clamp-2 md:line-clamp-3 mb-6 font-light">
          {item.summary}
        </p>

        <button className="flex items-center gap-2 text-china-gold hover:text-white transition-colors font-bold group/btn">
          <span>اقرأ المزيد</span>
          <Icons.ChevronLeft size={20} className="transition-transform group-hover/btn:-translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedNews;