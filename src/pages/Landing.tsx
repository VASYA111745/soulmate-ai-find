import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Heart, Users, Zap, MessageCircle } from "lucide-react";
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
                <span className="gradient-text">{TEXTS.hero.title.split('.')[0]}.</span>
                <br />
                <span className="text-foreground">С ИИ-подбором.</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg">
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
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
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
