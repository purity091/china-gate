import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import FeaturedNews from './components/FeaturedNews';
import Sidebar from './components/Sidebar';
import CategorySection from './components/CategorySection';
import Ticker from './components/Ticker';
import { Category, NewsItem } from './types';
import { getEditorialSummary, getFeaturedNews, getTickerItems } from './services/newsService';
import { Icons } from './components/Icons';

const App: React.FC = () => {
  const [heroNews, setHeroNews] = useState<NewsItem | undefined>(undefined);
  const [tickerItems, setTickerItems] = useState<string[]>([]);
  const [loadingHero, setLoadingHero] = useState<boolean>(true);
  const [editorialSummary, setEditorialSummary] = useState<string>("");

  useEffect(() => {
    setLoadingHero(true);
    setHeroNews(getFeaturedNews());
    setTickerItems(getTickerItems());
    setEditorialSummary(getEditorialSummary());
    setLoadingHero(false);
  }, []);

  const handleScrollToCategory = (category: Category) => {
    const element = document.getElementById(`section-${category}`);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    } else if (category === Category.LATEST) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sections = [
    { id: Category.AI, title: 'الذكاء الاصطناعي والروبوتات', icon: Icons.Cpu, layout: 'bento' },
    { id: Category.ENGINEERING, title: 'الهندسة والبنية التحتية', icon: Icons.Train, layout: 'wide' },
    { id: Category.SPACE, title: 'الفضاء الصيني', icon: Icons.Rocket, layout: 'immersive' },
    { id: Category.EV, title: 'السيارات الكهربائية', icon: Icons.Zap, layout: 'standard' },
    { id: Category.QUANTUM, title: 'الحوسبة الكمية والرقائق', icon: Icons.Atom, layout: 'bento' },
    { id: Category.TELECOM, title: 'الاتصالات وشبكات المستقبل', icon: Icons.Wifi, layout: 'immersive' },
    { id: Category.ENERGY, title: 'الطاقة النظيفة والمتجددة', icon: Icons.Leaf, layout: 'wide' },
    { id: Category.BIOTECH, title: 'التكنولوجيا الحيوية', icon: Icons.Activity, layout: 'standard' },
    { id: Category.AGRITECH, title: 'الزراعة الذكية', icon: Icons.Sprout, layout: 'standard' },
    { id: Category.ECONOMY, title: 'الاقتصاد الرقمي', icon: Icons.TrendingUp, layout: 'wide' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-right" dir="rtl">
      <Header onScrollToCategory={handleScrollToCategory} />

      <Ticker items={tickerItems} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div id={`section-${Category.LATEST}`}>
          <FeaturedNews item={heroNews} isLoading={loadingHero} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative">
          <div className="w-full lg:w-3/4 space-y-4">
            {sections.map((section) => (
              <CategorySection
                key={section.id}
                category={section.id as Category}
                title={section.title}
                icon={section.icon}
                layoutType={section.layout as 'standard' | 'bento' | 'immersive' | 'wide'}
              />
            ))}
          </div>

          <aside className="w-full lg:w-1/4">
            <div className="sticky top-24 space-y-8">
              <Sidebar summary={editorialSummary} />
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-china-red text-china-gold rounded flex items-center justify-center font-bold">CN</div>
                <h2 className="text-xl font-bold">بوابة الصين</h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                منصة عربية تركز على أخبار الهندسة والتقنية والصناعة في الصين عبر محتوى ثابت ومنظم داخل الموقع.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">أقسام الموقع</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {sections.slice(0, 5).map((section) => (
                  <li
                    key={section.id}
                    onClick={() => handleScrollToCategory(section.id as Category)}
                    className="hover:text-china-red cursor-pointer"
                  >
                    {section.title}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">تواصل معنا</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>info@chinatechgate.com</li>
                <li>Twitter / X</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} بوابة الصين التقنية. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
