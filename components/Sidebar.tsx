import React from 'react';
import { Icons } from './Icons';

interface SidebarProps {
  summary: string;
}

const data = [
  { name: 'AI', value: 85 },
  { name: 'EVs', value: 92 },
  { name: 'Space', value: 65 },
  { name: '5G', value: 78 },
];

const Sidebar: React.FC<SidebarProps> = ({ summary }) => {
  return (
    <aside className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900 to-china-dark text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <Icons.Zap className="absolute top-0 left-0 w-32 h-32 text-white/5 -translate-x-6 -translate-y-6" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4 text-china-gold">
            <Icons.Newspaper size={20} />
            <h3 className="font-bold text-lg">ملخص التحرير</h3>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed font-light mb-4 min-h-[80px]">
            {summary}
          </p>
          <div className="text-xs text-gray-400">تحديث محلي ثابت بدون خدمات توليد</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Icons.TrendingUp className="text-china-red" size={20} />
          مؤشرات النمو التقني
        </h3>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{item.name}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-china-red transition-all duration-500"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-china-gold/10 border border-china-gold/30 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-china-dark mb-2">النشرة البريدية</h3>
        <p className="text-sm text-gray-600 mb-4">اشترك لتصلك أحدث تطورات الصناعة والتقنية أسبوعيًا</p>
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
