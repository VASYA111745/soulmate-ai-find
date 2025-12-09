import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Heart,
  Users,
  Zap,
  MessageCircle,
  Brain,
  Quote,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_CONFIG, TEXTS } from "@/config/app";

const features = [
  {
    icon: Sparkles,
    title: "ИИ-подбор пар",
    description: "Алгоритмы анализируют интересы, ценности и стиль общения для идеальных совпадений",
  },
  {
    icon: MessageCircle,
    title: "Умные подсказки",
    description: "ИИ поможет составить первое сообщение и поддержать интересный разговор",
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Верификация профилей, модерация и защита личных данных",
  },
  {
    icon: Users,
    title: "Качественная аудитория",
    description: "Сообщество людей, серьёзно настроенных на знакомства",
  },
];

const stats = [
  { value: "2M+", label: "Пользователей" },
  { value: "94%", label: "Точность ИИ" },
  { value: "50K+", label: "Пар в месяц" },
];

const aiPrompts = [
  "Помоги улучшить мой профиль",
  "Придумай первое сообщение этому человеку",
  "Подготовь меня к первому свиданию",
  "Подскажи, как вежливо завершить диалог",
];

const testimonials = [
  {
    name: "Анна и Дмитрий",
    city: "Москва",
    story: "Познакомились через подборку AI Matchmaker и нашли общие ценности уже на первом созвоне.",
    result: "Вместе 8 месяцев",
  },
  {
    name: "Мария",
    city: "Санкт-Петербург",
    story: "ИИ подсказал, как обновить профиль и что написать первому матчу. Получила 3 свидания за неделю.",
    result: "+120% больше откликов",
  },
  {
    name: "Илья",
    city: "Казань",
    story: "Использую подсказки в чатах, чтобы поддерживать диалог и чувствовать себя увереннее.",
    result: "5 тёплых знакомств",
  },
];

const pricingPreview = [
  {
    id: "free",
    name: "Бесплатный",
    features: ["Базовая лента", "Ограниченные лайки", "3 ИИ-подсказки"],
  },
  {
    id: "premium",
    name: "Премиум",
    features: ["Больше лайков", "Расширенные фильтры", "Приоритет в выдаче"],
  },
  {
    id: "premium_ai",
    name: "Премиум + AI",
    highlighted: true,
    features: ["Полный доступ к AI", "Глубокий анализ профиля", "Ежедневные подборки"],
  },
];

const safetyTips = [
  "Проверка личности и фото",
  "Сообщить о подозрительном профиле в один клик",
  "Чёткие советы по безопасным встречам",
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-background to-neon-pink/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/30 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                <Sparkles size={16} className="text-neon-pink" />
                <span className="text-sm text-muted-foreground">Powered by AI</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">
                  {TEXTS.hero.title.split("С ИИ-подбором")[0]}
                </span>
                <br />
                <span className="text-foreground">С ИИ-подбором.</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl">
                {TEXTS.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth?mode=register">
                  <Button variant="gradient" size="xl" className="w-full sm:w-auto">
                    {TEXTS.hero.ctaPrimary}
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    {TEXTS.hero.ctaSecondary}
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Mockup */}
            <div className="relative hidden lg:block animate-float">
              <Card variant="glass" className="max-w-xs mx-auto overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <img
                    src="/images/hero-pool.svg"
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  
                  <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-full">
                    <span className="text-sm font-semibold gradient-text">94%</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold">Анна, 25</h3>
                    <p className="text-sm text-muted-foreground">Москва</p>
                    <div className="flex gap-2 mt-2">
                      <span className="tag-chip text-xs">Путешествия</span>
                      <span className="tag-chip text-xs">Книги</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 glass-card p-3 rounded-2xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Heart className="text-neon-pink" fill="currentColor" />
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card p-4 rounded-2xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <Zap className="text-neon-cyan" />
                  <span className="text-sm font-medium">Новое совпадение!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Как это <span className="gradient-text">работает</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Три простых шага к значимым знакомствам
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Создай профиль",
                description: "Заполни анкету и пройди короткий тест личности. ИИ использует эти данные для точного подбора.",
              },
              {
                step: "02",
                title: "Получи рекомендации",
                description: "Алгоритм анализирует совместимость и показывает профили с высоким потенциалом.",
              },
              {
                step: "03",
                title: "Начни общение",
                description: "Используй ИИ-подсказки для первых сообщений и развивай отношения.",
              },
            ].map((item, index) => (
              <Card
                key={item.step}
                variant="glass"
                className="p-6 hover-lift"
              >
                <div className="text-5xl font-bold gradient-text mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agent preview */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 via-transparent to-neon-cyan/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm text-primary flex items-center gap-2 mb-2">
                <Sparkles size={16} /> AI Matchmaker
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Знакомства с персональным AI-агентом
              </h2>
              <p className="text-muted-foreground max-w-2xl mt-3">
                Помогаем в подборе пар, оформлении профиля и переписке. Попробуйте готовые подсказки или общайтесь с агентом как с личным коучем.
              </p>
            </div>
            <Link to="/ai-agent">
              <Button variant="gradient" size="lg" className="flex items-center gap-2">
                Открыть AI-агента
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card variant="glass" className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Brain className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Попробуйте</p>
                  <h3 className="text-xl font-semibold">Готовые запросы</h3>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {aiPrompts.map((prompt) => (
                  <div key={prompt} className="p-4 rounded-2xl bg-secondary/40 border border-glass-border/60">
                    <p className="text-sm text-muted-foreground">{prompt}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-dashed border-primary/40 p-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-primary">Подбор пары</p>
                  <p className="text-sm text-muted-foreground">Совместимость с Анной: 92%</p>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <BadgeCheck size={18} />
                  <span className="text-sm">рассчитано AI</span>
                </div>
              </div>
            </Card>

            <Card variant="glass" className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm text-primary">
                <Sparkles size={16} />
                AI-чат
              </div>
              <div className="space-y-3">
                {[
                  { role: "assistant", text: "Привет! Я помогу оформить профиль и подобрать первые сообщения." },
                  { role: "user", text: "Как вежливо закончить диалог?" },
                  { role: "assistant", text: "Скажи, что было приятно общаться, но сейчас мало времени. Предложи вернуться к разговору позже." },
                ].map((message, index) => (
                  <div
                    key={index}
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.role === "assistant"
                        ? "bg-secondary/60 rounded-bl-md"
                        : "bg-gradient-to-r from-neon-purple/80 to-neon-pink/80 text-foreground rounded-br-md ml-auto"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 text-xs text-primary mb-1">
                        <Sparkles size={14} /> AI-агент
                      </div>
                    )}
                    <p className="text-sm text-foreground/90">{message.text}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-secondary/40 border border-glass-border/60 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Подсказок от AI</p>
                  <p className="text-lg font-semibold">3 доступны на бесплатном плане</p>
                </div>
                <Link to="/pricing">
                  <Button variant="outline" size="sm">Расширить</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Почему <span className="gradient-text">{APP_CONFIG.name}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Современные технологии для настоящих знакомств
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                variant="glass"
                className="p-6 hover-lift group"
              >
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-20 bg-secondary/20 border-y border-glass-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm text-primary mb-2 flex items-center gap-2">
                <Users size={16} /> Истории пользователей
              </p>
              <h2 className="text-3xl font-bold">Найди любовь с NovaDate AI</h2>
              <p className="text-muted-foreground max-w-2xl mt-2">
                Реальные отзывы и результаты людей, которые воспользовались AI-подбором и подсказками в чатах.
              </p>
            </div>
            <Link to="/blog" className="text-primary hover:underline flex items-center gap-1 text-sm">
              Читать больше историй <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <Card key={item.name} variant="glass" className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Quote size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.city}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex-1">{item.story}</p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <BadgeCheck size={16} /> {item.result}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm text-primary mb-2 flex items-center gap-2">
                <Sparkles size={16} /> Планы для разного опыта
              </p>
              <h2 className="text-3xl font-bold">Выберите подходящий доступ</h2>
              <p className="text-muted-foreground max-w-xl mt-2">
                Начните бесплатно или возьмите Премиум + AI, чтобы открыть безлимитные подсказки и глубокий анализ профиля.
              </p>
            </div>
            <Link to="/pricing">
              <Button variant="outline">Смотреть все тарифы</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPreview.map((plan) => (
              <Card
                key={plan.id}
                variant={plan.highlighted ? "gradient" : "glass"}
                className="p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  {plan.highlighted && (
                    <span className="text-xs px-2 py-1 rounded-full bg-foreground/10 text-foreground">Топ выбор</span>
                  )}
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Shield size={14} className="text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/pricing">
                  <Button variant={plan.highlighted ? "default" : "outline"} className="w-full">
                    {plan.highlighted ? "Попробовать 7 дней" : "Подробнее"}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety preview */}
      <section className="py-20 bg-secondary/20 border-y border-glass-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm text-primary mb-2 flex items-center gap-2">
                <ShieldCheck size={16} /> Безопасность
              </p>
              <h2 className="text-3xl font-bold">Мы заботимся о твоей приватности</h2>
              <p className="text-muted-foreground max-w-2xl mt-2">
                Проверка профилей, инструменты блокировки и советы по безопасным встречам встроены в продукт.
              </p>
            </div>
            <Link to="/safety">
              <Button variant="outline" size="sm">Подробнее</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {safetyTips.map((tip) => (
              <Card key={tip} variant="glass" className="p-4 flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Shield size={18} className="text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{tip}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card variant="gradient" className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Готов найти свою <span className="gradient-text">половинку</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Присоединяйся к миллионам пользователей, которые уже нашли любовь с помощью ИИ
            </p>
            <Link to="/auth?mode=register">
              <Button variant="gradient" size="xl">
                Начать бесплатно
                <ArrowRight size={20} />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-glass-border/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan" />
              <span className="font-bold">{APP_CONFIG.name}</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/pricing" className="hover:text-foreground transition-colors">Тарифы</Link>
              <Link to="/safety" className="hover:text-foreground transition-colors">Безопасность</Link>
              <Link to="/blog" className="hover:text-foreground transition-colors">Блог</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 {APP_CONFIG.name}. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
