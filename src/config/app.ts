// App Configuration - Easy to change branding
export const APP_CONFIG = {
  name: "Lovio",
  tagline: "Познакомься с теми, кто действительно тебе подходит",
  description: "ИИ-сервис знакомств нового поколения",
  version: "1.0.0",
  
  // Branding
  brand: {
    primaryColor: "neon-purple",
    accentColor: "neon-pink",
  },
  
  // Features
  features: {
    aiMatching: true,
    aiAssistant: true,
    videoChat: false, // Coming soon
    verification: true,
  },
  
  // Limits
  limits: {
    free: {
      likesPerDay: 10,
      messagesPerDay: 20,
      aiSuggestions: 3,
    },
    premium: {
      likesPerDay: 100,
      messagesPerDay: -1, // Unlimited
      aiSuggestions: 20,
    },
    premiumAI: {
      likesPerDay: -1, // Unlimited
      messagesPerDay: -1,
      aiSuggestions: -1,
    },
  },
} as const;

export const TEXTS = {
  hero: {
    title: "Познакомься с теми, кто действительно тебе подходит",
    subtitle: "ИИ анализирует интересы, ценности и стиль общения, чтобы найти идеальные совпадения",
    ctaPrimary: "Начать",
    ctaSecondary: "Как это работает",
  },
  auth: {
    login: "Вход",
    register: "Регистрация",
    email: "Email",
    password: "Пароль",
    forgotPassword: "Забыли пароль?",
    orContinueWith: "или продолжить с",
    noAccount: "Нет аккаунта?",
    hasAccount: "Уже есть аккаунт?",
  },
  onboarding: {
    welcome: "Добро пожаловать в",
    letsStart: "Давай познакомимся!",
    tellAboutYourself: "Расскажи о себе",
    whatLookingFor: "Кого ты ищешь?",
    interests: "Твои интересы",
    personality: "Личностный профиль",
    almostDone: "Почти готово!",
  },
  feed: {
    compatibility: "Совместимость",
    calculatedByAI: "расчитано ИИ",
    like: "Нравится",
    skip: "Пропустить",
    superLike: "Супер лайк",
  },
  chat: {
    aiSuggestion: "ИИ-подсказка",
    typeMessage: "Напишите сообщение...",
    noMessages: "Начните общение первым!",
  },
  profile: {
    myProfile: "Мой профиль",
    edit: "Редактировать",
    photos: "Фотографии",
    about: "О себе",
    interests: "Интересы",
    aiTips: "Советы от ИИ",
  },
  pricing: {
    free: "Бесплатный",
    premium: "Премиум",
    premiumAI: "Премиум + ИИ",
    tryFree: "Попробовать 7 дней бесплатно",
    perMonth: "/ месяц",
  },
  safety: {
    title: "Безопасность и приватность",
    subtitle: "Мы заботимся о твоей безопасности",
  },
  aiAssistant: {
    title: "ИИ-помощник",
    subtitle: "Персональный коуч по знакомствам",
    placeholder: "Спросите что-нибудь...",
    suggestions: [
      "Как написать первое сообщение?",
      "Как улучшить профиль?",
      "Как подготовиться к свиданию?",
      "О чём говорить на первой встрече?",
    ],
  },
} as const;
