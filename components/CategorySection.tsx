import React, { useState, useEffect, useRef } from 'react';
import { Category, NewsItem } from '../types';
import { fetchNewsFromGemini } from '../services/geminiService';
import { BentoGridSection, ImmersiveSection, StandardGridSection, WideShowcaseSection } from './SectionLayouts';

interface CategorySectionProps {
  category: Category;
  title: string;
  icon: React.ElementType;
  layoutType?: 'standard' | 'bento' | 'immersive' | 'wide';
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, title, icon, layoutType = 'standard' }) => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loaded && !loading) {
          loadData();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [loaded, loading]);

  const loadData = async () => {
    setLoading(true);
    // Fetch 5 items to support larger layouts like Bento
    const news = await fetchNewsFromGemini(category, 5);
    setItems(news);
    setLoading(false);
    setLoaded(true);
  };

  const renderLayout = () => {
      // If loaded but no items, return null or empty state (handled inside components usually, or here)
      if (loaded && items.length === 0) return null;

      const props = { title, icon, items, loading };

      switch (layoutType) {
          case 'bento':
              return <BentoGridSection {...props} />;
          case 'immersive':
              return <ImmersiveSection {...props} />;
          case 'wide':
              return <WideShowcaseSection {...props} />;
          default:
              return <StandardGridSection {...props} />;
      }
  };

  return (
    <section 
      id={`section-${category}`} 
      ref={sectionRef} 
      className="scroll-mt-24"
    >
      {renderLayout()}
    </section>
  );
};

export default CategorySection;