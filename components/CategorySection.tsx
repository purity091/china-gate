import React, { useEffect, useRef, useState } from 'react';
import { Category, NewsItem } from '../types';
import { getNewsByCategory } from '../services/newsService';
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
          void loadData();
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
    setItems(getNewsByCategory(category, 5));
    setLoading(false);
    setLoaded(true);
  };

  const renderLayout = () => {
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
