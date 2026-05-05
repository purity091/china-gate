import React, { useState } from 'react';
import { Category } from '../types';
import { Icons } from './Icons';

interface HeaderProps {
  onScrollToCategory: (c: Category) => void;
}

const Header: React.FC<HeaderProps> = ({ onScrollToCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'الرئيسية', value: Category.LATEST, icon: Icons.Newspaper },
    { label: 'بنية تحتية', value: Category.ENGINEERING, icon: Icons.Train },
    { label: 'ذكاء اصطناعي', value: Category.AI, icon: Icons.Cpu },
    { label: 'طاقة نظيفة', value: Category.ENERGY, icon: Icons.Leaf },
    { label: 'سيارات', value: Category.EV, icon: Icons.Zap },
    { label: 'فضاء', value: Category.SPACE, icon: Icons.Rocket },
    { label: 'اتصالات', value: Category.TELECOM, icon: Icons.Wifi },
    { label: 'كمومية', value: Category.QUANTUM, icon: Icons.Atom },
    { label: 'حيوية', value: Category.BIOTECH, icon: Icons.Activity },
    { label: 'زراعة', value: Category.AGRITECH, icon: Icons.Sprout },
    { label: 'اقتصاد', value: Category.ECONOMY, icon: Icons.TrendingUp },
  ];

  const handleNavClick = (category: Category) => {
    onScrollToCategory(category);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer flex-shrink-0" 
            onClick={() => handleNavClick(Category.LATEST)}
          >
            <div className="w-10 h-10 bg-china-red text-china-gold rounded-lg flex items-center justify-center font-bold text-2xl shadow-md transform hover:scale-105 transition-transform">
              CN
            </div>
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold text-gray-900 leading-none">بوابة الصين</h1>
              <p className="text-xs text-gray-500 mt-0.5">نافذة العرب التكنولوجية</p>
            </div>
          </div>

          {/* Desktop/Tablet Nav - Horizontal Scroll for many items */}
          <nav className="hidden md:flex items-center flex-1 overflow-x-auto mx-4 scrollbar-hide">
            <div className="flex items-center gap-1 p-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.value}
                    onClick={() => handleNavClick(item.value)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap text-gray-600 hover:bg-gray-100 hover:text-china-red focus:bg-china-red/10 focus:text-china-red"
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Actions & Mobile Menu Button */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="p-2 text-gray-500 hover:text-china-red transition-colors">
              <Icons.Search size={20} />
            </button>
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-16 shadow-lg animate-fade-in-down h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
               const Icon = item.icon;
               return (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-right text-gray-700 hover:bg-gray-50"
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
               )
            })}
          </div>
        </div>
      )}
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </header>
  );
};

export default Header;