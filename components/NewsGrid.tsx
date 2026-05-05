import React from 'react';
import { NewsItem } from '../types';
import { Icons } from './Icons';

interface NewsGridProps {
  items: NewsItem[];
  isLoading: boolean;
}

const NewsGrid: React.FC<NewsGridProps> = ({ items, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-96 animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
     return (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <Icons.Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700">لا توجد أخبار حاليًا</h3>
            <p className="text-gray-500">حاول تحديث الصفحة أو التحقق من الاتصال</p>
        </div>
     )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <article 
          key={item.id} 
          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full"
        >
          <div className="relative h-56 overflow-hidden">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4">
                <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {item.category.toUpperCase()}
                </span>
            </div>
          </div>
          
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-china-red font-medium">{item.timestamp}</span>
                <button className="text-gray-400 hover:text-china-red transition-colors">
                    <Icons.Share2 size={16} />
                </button>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-china-red transition-colors">
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
      ))}
    </div>
  );
};

export default NewsGrid;