import React from 'react';
import { NewsItem } from '../types';
import { Icons } from './Icons';
import NewsCard from './NewsCard';

interface LayoutProps {
  title: string;
  icon: React.ElementType;
  items: NewsItem[];
  loading: boolean;
  onViewMore?: () => void;
}

// 1. Bento Grid (Best for AI, Quantum - shows complexity)
export const BentoGridSection: React.FC<LayoutProps> = ({ title, icon: Icon, items, loading }) => {
  return (
    <div className="py-8">
      <SectionHeader title={title} icon={Icon} />
      {loading ? (
         <LoadingSkeleton type="bento" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[500px]">
            {/* Main Featured Item */}
            {items[0] && (
                <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl">
                    <img src={items[0].imageUrl} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={items[0].title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 p-6 text-white">
                        <span className="text-china-gold text-xs font-bold mb-2 block">{items[0].category.toUpperCase()}</span>
                        <h3 className="text-2xl font-bold mb-2 leading-tight">{items[0].title}</h3>
                        <p className="text-gray-300 text-sm line-clamp-2">{items[0].summary}</p>
                    </div>
                </div>
            )}
            {/* Secondary Items */}
            <div className="md:col-span-2 md:row-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.slice(1, 5).map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-48 md:h-auto">
                        <div>
                             <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2">{item.title}</h4>
                             <p className="text-xs text-gray-500 line-clamp-3">{item.summary}</p>
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
                            <span className="text-[10px] text-gray-400">{item.timestamp}</span>
                            <Icons.ChevronLeft size={14} className="text-china-red" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

// 2. Immersive Dark Section (Best for Space, Telecom)
export const ImmersiveSection: React.FC<LayoutProps> = ({ title, icon: Icon, items, loading }) => {
    return (
        <div className="py-12 -mx-4 px-4 bg-slate-900 text-white my-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="absolute right-0 top-0 w-96 h-96 bg-china-red blur-[120px] rounded-full mix-blend-screen" />
                 <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-600 blur-[100px] rounded-full mix-blend-screen" />
            </div>
            
            <div className="container mx-auto relative z-10">
                <div className="flex items-center gap-3 mb-8 text-china-gold">
                    <Icon size={28} />
                    <h2 className="text-3xl font-bold">{title}</h2>
                </div>

                {loading ? <LoadingSkeleton type="grid" dark /> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {items.slice(0, 4).map((item) => (
                            <div key={item.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors group">
                                <div className="h-40 overflow-hidden">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2 leading-snug text-gray-100 group-hover:text-china-gold transition-colors">{item.title}</h3>
                                    <p className="text-xs text-gray-400 line-clamp-3">{item.summary}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

// 3. Wide Showcase (Best for Engineering, Infrastructure - emphasizes scale)
export const WideShowcaseSection: React.FC<LayoutProps> = ({ title, icon: Icon, items, loading }) => {
    return (
        <div className="py-8">
            <SectionHeader title={title} icon={Icon} />
            {loading ? <LoadingSkeleton type="wide" /> : (
                <div className="space-y-6">
                    {items.slice(0, 3).map((item, idx) => (
                        <div key={item.id} className={`flex flex-col md:flex-row gap-6 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full">
                                    {item.timestamp}
                                </div>
                            </div>
                            <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-china-red transition-colors">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">{item.summary}</p>
                                <button className="self-start flex items-center gap-2 text-sm font-bold text-china-dark hover:gap-3 transition-all">
                                    قراءة التقرير الكامل
                                    <Icons.ChevronLeft size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// 4. Standard Grid (Fallback & General)
export const StandardGridSection: React.FC<LayoutProps> = ({ title, icon: Icon, items, loading }) => {
    return (
        <div className="py-8">
             <SectionHeader title={title} icon={Icon} />
             {loading ? <LoadingSkeleton type="grid" /> : (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {items.slice(0, 3).map(item => <NewsCard key={item.id} item={item} />)}
                 </div>
             )}
        </div>
    )
}


// --- Helpers ---

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: React.ElementType }) => (
    <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-china-red/5 flex items-center justify-center text-china-red">
            <Icon size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <button className="text-sm font-bold text-gray-400 hover:text-china-red flex items-center gap-1 transition-colors">
          المزيد
          <Icons.ChevronLeft size={16} />
        </button>
    </div>
);

const LoadingSkeleton = ({ type, dark }: { type: 'grid' | 'bento' | 'wide', dark?: boolean }) => {
    const bgClass = dark ? 'bg-white/10' : 'bg-gray-100';
    
    if (type === 'bento') return (
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[500px] animate-pulse">
            <div className={`md:col-span-2 md:row-span-2 rounded-2xl ${bgClass}`} />
            <div className={`md:col-span-2 md:row-span-2 grid grid-cols-2 gap-4`}>
                <div className={`rounded-xl ${bgClass}`} />
                <div className={`rounded-xl ${bgClass}`} />
                <div className={`rounded-xl ${bgClass}`} />
                <div className={`rounded-xl ${bgClass}`} />
            </div>
        </div>
    );

    if (type === 'wide') return (
        <div className="space-y-6 animate-pulse">
             {[1, 2].map(i => (
                 <div key={i} className={`h-64 rounded-2xl ${bgClass}`} />
             ))}
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className={`h-80 rounded-2xl ${bgClass}`} />)}
        </div>
    );
};
