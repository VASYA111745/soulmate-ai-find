// AI Service Module - Mock implementations for future API integration
// Replace these functions with actual API calls when backend is ready

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  bio: string;
  interests: string[];
  photos: string[];
  personalityTraits?: Record<string, number>;
}

export interface MatchRecommendation {
  user: UserProfile;
  compatibilityScore: number;
  matchReasons: string[];
}

export interface ProfileSuggestion {
  type: 'photo' | 'bio' | 'interests' | 'general';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface OpeningLine {
  text: string;
  style: 'funny' | 'thoughtful' | 'flirty' | 'casual';
  basedOn?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Simulated delay for realistic UX
const simulateDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get AI-powered match recommendations
 */
export async function getMatchRecommendations(userId: string): Promise<MatchRecommendation[]> {
  await simulateDelay(800);
  
  // Mock data - replace with actual API call
  return [
    {
      user: {
        id: '1',
        name: 'Анна',
        age: 25,
        city: 'Москва',
        bio: 'Люблю путешествия, книги и хороший кофе ☕',
        interests: ['Путешествия', 'Книги', 'Кофе', 'Йога', 'Фотография'],
        photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'],
      },
      compatibilityScore: 94,
      matchReasons: ['Общие интересы в путешествиях', 'Похожий стиль общения', 'Совпадение ценностей'],
    },
    {
      user: {
        id: '2',
        name: 'Мария',
        age: 27,
        city: 'Санкт-Петербург',
        bio: 'Дизайнер, меломан, вечный оптимист 🎨',
        interests: ['Дизайн', 'Музыка', 'Искусство', 'Кино', 'Кулинария'],
        photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'],
      },
      compatibilityScore: 87,
      matchReasons: ['Творческий склад ума', 'Любовь к искусству', 'Позитивный настрой'],
    },
    {
      user: {
        id: '3',
        name: 'Елена',
        age: 24,
        city: 'Москва',
        bio: 'IT-специалист днём, танцовщица ночью 💃',
        interests: ['Технологии', 'Танцы', 'Спорт', 'Настолки', 'Сериалы'],
        photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'],
      },
      compatibilityScore: 82,
      matchReasons: ['Баланс работы и хобби', 'Активный образ жизни', 'Интерес к технологиям'],
    },
  ];
}

/**
 * Calculate compatibility score between two profiles
 */
export async function getCompatibilityScore(
  userProfile: UserProfile,
  otherProfile: UserProfile
): Promise<{ score: number; reasons: string[] }> {
  await simulateDelay(300);
  
  // Mock calculation - replace with AI model
  const commonInterests = userProfile.interests.filter(
    i => otherProfile.interests.includes(i)
  );
  
  const baseScore = 60;
  const interestBonus = commonInterests.length * 8;
  const score = Math.min(baseScore + interestBonus + Math.random() * 15, 99);
  
  const reasons = [
    commonInterests.length > 0 ? `${commonInterests.length} общих интересов` : null,
    'Совместимый стиль общения',
    'Похожие жизненные цели',
  ].filter(Boolean) as string[];
  
  return { score: Math.round(score), reasons };
}

/**
 * Get AI suggestions for profile improvement
 */
export async function suggestProfileImprovements(
  userProfile: Partial<UserProfile>
): Promise<ProfileSuggestion[]> {
  await simulateDelay(600);
  
  const suggestions: ProfileSuggestion[] = [];
  
  if (!userProfile.photos || userProfile.photos.length < 3) {
    suggestions.push({
      type: 'photo',
      title: 'Добавь больше фотографий',
      description: 'Профили с 3+ фото получают на 40% больше лайков. Покажи себя в разных ситуациях!',
      priority: 'high',
    });
  }
  
  if (!userProfile.bio || userProfile.bio.length < 50) {
    suggestions.push({
      type: 'bio',
      title: 'Расскажи больше о себе',
      description: 'Добавь деталей в описание профиля. Что тебя вдохновляет? Чем занимаешься в свободное время?',
      priority: 'high',
    });
  }
  
  if (!userProfile.interests || userProfile.interests.length < 5) {
    suggestions.push({
      type: 'interests',
      title: 'Добавь интересы',
      description: 'Укажи минимум 5 интересов, чтобы ИИ мог лучше подобрать совместимые профили.',
      priority: 'medium',
    });
  }
  
  suggestions.push({
    type: 'general',
    title: 'Совет дня',
    description: 'Используй конкретные примеры вместо общих фраз. Вместо "люблю путешествовать" напиши "мечтаю увидеть северное сияние в Исландии".',
    priority: 'low',
  });
  
  return suggestions;
}

/**
 * Generate opening lines for a conversation
 */
export async function generateOpeningLines(context: {
  otherProfile: UserProfile;
  userProfile?: UserProfile;
}): Promise<OpeningLine[]> {
  await simulateDelay(500);
  
  const { otherProfile } = context;
  const interests = otherProfile.interests;
  
  const lines: OpeningLine[] = [
    {
      text: `Привет! Заметил(а), что тебе нравится ${interests[0]?.toLowerCase() || 'путешествовать'}. Какое место произвело на тебя самое сильное впечатление?`,
      style: 'thoughtful',
      basedOn: interests[0],
    },
    {
      text: 'Привет! У тебя потрясающая улыбка на фото 😊 Как проходит твой день?',
      style: 'flirty',
    },
    {
      text: `Окей, я должен(а) признаться: ${interests[1] || 'кино'} — это именно то, что заставило меня написать. Расскажи, что смотришь сейчас?`,
      style: 'casual',
      basedOn: interests[1],
    },
    {
      text: 'Слушай, у меня важный вопрос: пицца с ананасами — да или нет? От этого зависит наше будущее 🍕',
      style: 'funny',
    },
  ];
  
  return lines;
}

/**
 * AI Assistant chat function
 */
export async function assistantChat(
  messageHistory: ChatMessage[]
): Promise<string> {
  await simulateDelay(1000);
  
  const lastMessage = messageHistory[messageHistory.length - 1];
  
  if (!lastMessage || lastMessage.role !== 'user') {
    return 'Привет! Я твой персональный помощник по знакомствам. Чем могу помочь?';
  }
  
  const query = lastMessage.content.toLowerCase();
  
  // Mock responses based on keywords
  if (query.includes('первое сообщение') || query.includes('написать')) {
    return `Отличный вопрос! Вот несколько советов для первого сообщения:

1. **Начни с конкретики** — упомяни что-то из профиля человека
2. **Задай открытый вопрос** — дай повод для ответа
3. **Будь собой** — искренность всегда привлекает
4. **Избегай банальностей** — "Привет, как дела?" редко работает

Хочешь, я помогу составить сообщение для конкретного человека?`;
  }
  
  if (query.includes('профиль') || query.includes('улучшить')) {
    return `Для привлекательного профиля важно:

📸 **Фотографии:**
- Главное фото — улыбка, хорошее освещение
- Покажи хобби и увлечения
- Минимум 3-4 разнообразных снимка

✍️ **Описание:**
- Будь конкретным в интересах
- Добавь немного юмора
- Напиши, что ищешь

Хочешь, чтобы я оценил твой профиль?`;
  }
  
  if (query.includes('свидание') || query.includes('встреча')) {
    return `Подготовка к первому свиданию:

☕ **Место:** Выбери нейтральное и удобное место (кафе, парк)
⏰ **Время:** Дневное время для первой встречи безопаснее
👔 **Внешний вид:** Комфортная одежда, в которой ты себя хорошо чувствуешь
💬 **Темы:** Подготовь пару интересных вопросов и историй

Главное — расслабься и будь собой! Нервничать нормально 😊`;
  }
  
  return `Интересный вопрос! Давай разберёмся вместе. 

Я могу помочь с:
- Составлением первых сообщений
- Советами по улучшению профиля
- Подготовкой к свиданиям
- Анализом совместимости

О чём ты хотел(а) бы узнать подробнее?`;
}

/**
 * Analyze personality based on questionnaire answers
 */
export async function analyzePersonality(
  answers: Record<string, string>
): Promise<Record<string, number>> {
  await simulateDelay(700);
  
  // Mock personality analysis
  return {
    openness: 75 + Math.random() * 20,
    conscientiousness: 60 + Math.random() * 25,
    extraversion: 50 + Math.random() * 40,
    agreeableness: 70 + Math.random() * 20,
    emotionalStability: 65 + Math.random() * 25,
  };
}
