import React from 'react';
import { Icons } from './Icons';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface SidebarProps {
    aiSummary: string;
}

const data = [
  { name: 'AI', value: 85 },
  { name: 'EVs', value: 92 },
  { name: 'Space', value: 65 },
  { name: '5G', value: 78 },
];

const Sidebar: React.FC<SidebarProps> = ({ aiSummary }) => {
  return (
    <aside className="space-y-8">
      {/* AI Insight Card */}
      <div className="bg-gradient-to-br from-gray-900 to-china-dark text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <Icons.Zap className="absolute top-0 left-0 w-32 h-32 text-white/5 -translate-x-6 -translate-y-6" />
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 text-china-gold">
                <Icons.Cpu size={20} />
                <h3 className="font-bold text-lg">تحليل الذكاء الاصطناعي</h3>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed font-light mb-4 min-h-[80px]">
                {aiSummary || "جاري تحليل البيانات الصينية..."}
            </p>
            <div className="text-xs text-gray-400 flex items-center gap-1">
                تم التوليد بواسطة Gemini
            </div>
        </div>
      </div>

      {/* Stats Chart */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Icons.TrendingUp className="text-china-red" size={20} />
            مؤشرات النمو التقني
        </h3>
        <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={40} tick={{fill: '#666'}} />
                    <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        cursor={{fill: '#f3f4f6'}}
                    />
                    <Bar dataKey="value" fill="#DE2910" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Subscribe Box */}
      <div className="bg-china-gold/10 border border-china-gold/30 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-china-dark mb-2">النشرة البريدية</h3>
        <p className="text-sm text-gray-600 mb-4">اشترك لتصلك أحدث ابتكارات الصين أسبوعيًا</p>
        <div className="flex gap-2">
            <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="flex-1 px-4 py-2 rounded-lg text-sm border-none focus:ring-2 focus:ring-china-red outline-none"
            />
            <button className="bg-china-red text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-china-dark transition-colors">
                اشترك
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;