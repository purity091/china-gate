import React from 'react';
import { NewsItem } from '../types';
import { Icons } from './Icons';

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  return (
    <article 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {item.category.toUpperCase()}
            </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-china-red font-medium">{item.timestamp}</span>
            <button className="text-gray-400 hover:text-china-red transition-colors">
                <Icons.Share2 size={16} />
            </button>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-china-red transition-colors">
          {item.title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
          {item.summary}
        </p>
        
        <div className="pt-4 border-t border-gray-100 mt-auto">
            <button className="text-china-dark font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                اقرأ التفاصيل
                <Icons.ChevronLeft size={16} />
            </button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;