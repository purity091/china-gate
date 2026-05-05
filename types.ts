export enum Category {
  LATEST = 'latest',
  ENGINEERING = 'engineering',
  AI = 'ai',
  EV = 'ev',
  SPACE = 'space',
  ENERGY = 'energy',
  TELECOM = 'telecom',
  BIOTECH = 'biotech',
  AGRITECH = 'agritech',
  QUANTUM = 'quantum',
  ECONOMY = 'economy'
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: Category;
  timestamp: string;
  imageUrl?: string;
  sourceUrl?: string; // If available from grounding
}

export interface ChartDataPoint {
  name: string;
  value: number;
}
