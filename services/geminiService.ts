import { GoogleGenAI } from "@google/genai";
import { Category, NewsItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to extract JSON from markdown code blocks if present
const cleanJson = (text: string): string => {
  const match = text.match(/```json\n([\s\S]*?)\n```/);
  return match ? match[1] : text;
};

export const fetchNewsFromGemini = async (category: Category, limit: number = 5): Promise<NewsItem[]> => {
  const categoryPrompts = {
    [Category.LATEST]: "آخر التطورات التكنولوجية والهندسية العامة في الصين",
    [Category.ENGINEERING]: "مشاريع البنية التحتية والهندسة العملاقة الجديدة والجسور والأنفاق في الصين",
    [Category.AI]: "تطورات الذكاء الاصطناعي والروبوتات في الصين",
    [Category.EV]: "صناعة السيارات الكهربائية والبطاريات في الصين",
    [Category.SPACE]: "برنامج الفضاء الصيني ومحطة الفضاء تيانجونج واستكشاف القمر",
    [Category.ENERGY]: "الطاقة المتجددة في الصين، الطاقة الشمسية، طاقة الرياح، والطاقة النووية",
    [Category.TELECOM]: "تطورات شبكات 5G و 6G وتكنولوجيا الاتصالات في الصين",
    [Category.BIOTECH]: "التكنولوجيا الحيوية، الهندسة الوراثية، والابتكارات الطبية في الصين",
    [Category.AGRITECH]: "الزراعة الذكية، استخدام الدرون في الزراعة، والأمن الغذائي التكنولوجي في الصين",
    [Category.QUANTUM]: "الحوسبة الكمومية، الرقائق الإلكترونية المتقدمة، والفيزياء في الصين",
    [Category.ECONOMY]: "الاقتصاد الرقمي، العملة الرقمية، والتكنولوجيا المالية في الصين"
  };

  const promptTopic = categoryPrompts[category];
  
  // We use search grounding to get real facts, then format it.
  const prompt = `
    Find ${limit} distinct, recent, and factual news items about: ${promptTopic}.
    Focus on strong engineering ideas and technological breakthroughs showing China's development.
    
    After finding the information, format the response strictly as a JSON array of objects.
    Do not add any text outside the JSON block.
    
    The JSON object format:
    {
      "id": "unique_string_id",
      "title": "Arabic Title (Make it catchy and professional)",
      "summary": "Arabic Summary (2-3 sentences max)",
      "timestamp": "Date (YYYY-MM-DD)",
      "imageUrl": "Keywords for an image search (in English, e.g. 'high speed train china')"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    if (!text) return [];

    const jsonString = cleanJson(text);
    
    // Parse JSON
    try {
      const parsedItems = JSON.parse(jsonString);
      // Map to add category and placeholder images
      return parsedItems.map((item: any) => ({
        ...item,
        category: category,
        imageUrl: `https://picsum.photos/seed/${item.id}/800/600` // Using consistent placeholder
      }));
    } catch (e) {
      console.error("Failed to parse Gemini JSON response", e);
      return [];
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return empty array to handle gracefully in UI
    return [];
  }
};

export const generateMarketAnalysis = async (): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "Provide a brief, insightful analysis (in Arabic) of the current week's trend in Chinese technology. Focus on one major keyword (e.g., export growth, new patent, chip breakthrough). Limit to 50 words.",
        });
        return response.text || "لا توجد تحليلات متاحة حاليًا.";
    } catch (e) {
        return "جاري تحديث البيانات...";
    }
}
