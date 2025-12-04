import { Check, Sparkles, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_CONFIG, TEXTS } from "@/config/app";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free",
    name: TEXTS.pricing.free,
    price: "0",
    description: "Начни знакомиться бесплатно",
    icon: Zap,
    features: [
      { text: "10 лайков в день", included: true },
      { text: "Базовые фильтры", included: true },
      { text: "Просмотр совместимости", included: true },
      { text: "3 ИИ-подсказки в день", included: true },
      { text: "Расширенные фильтры", included: false },
      { text: "Безлимит лайков", included: false },
      { text: "ИИ-помощник", included: false },
      { text: "Приоритетная поддержка", included: false },
    ],
    cta: "Текущий план",
    popular: false,
    disabled: true,
  },
  {
    id: "premium",
    name: TEXTS.pricing.premium,
    price: "699",
    description: "Для серьёзных знакомств",
    icon: Crown,
    features: [
      { text: "100 лайков в день", included: true },
      { text: "Базовые фильтры", included: true },
      { text: "Просмотр совместимости", included: true },
      { text: "20 ИИ-подсказок в день", included: true },
      { text: "Расширенные фильтры", included: true },
      { text: "Кто тебя лайкнул", included: true },
      { text: "ИИ-помощник (базовый)", included: true },
      { text: "Приоритетная поддержка", included: false },
    ],
    cta: "Попробовать бесплатно",
    popular: true,
    disabled: false,
  },
  {
    id: "premium-ai",
    name: TEXTS.pricing.premiumAI,
    price: "1299",
    description: "Максимум возможностей ИИ",
    icon: Sparkles,
    features: [
      { text: "Безлимит лайков", included: true },
      { text: "Базовые фильтры", included: true },
      { text: "Просмотр совместимости", included: true },
      { text: "Безлимит ИИ-подсказок", included: true },
      { text: "Расширенные фильтры", included: true },
      { text: "Кто тебя лайкнул", included: true },
      { text: "ИИ-помощник (полный)", included: true },
      { text: "Приоритетная поддержка", included: true },
    ],
    cta: "Попробовать бесплатно",
    popular: false,
    disabled: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-24 md:pb-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Выбери свой <span className="gradient-text">план</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Начни бесплатно и переходи на премиум, когда будешь готов получить больше возможностей
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              variant={plan.popular ? "gradient" : "glass"}
              className={cn(
                "relative overflow-hidden",
                plan.popular && "scale-105 md:scale-110"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan py-1 text-center">
                  <span className="text-xs font-semibold text-foreground">Популярный выбор</span>
                </div>
              )}
              
              <CardHeader className={plan.popular ? "pt-10" : ""}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center",
                    plan.popular
                      ? "bg-foreground/10"
                      : "bg-primary/20"
                  )}>
                    <plan.icon size={20} className={plan.popular ? "text-foreground" : "text-primary"} />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}₽</span>
                  <span className="text-muted-foreground">{TEXTS.pricing.perMonth}</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className={cn(
                        "flex items-center gap-2 text-sm",
                        !feature.included && "text-muted-foreground"
                      )}
                    >
                      <div className={cn(
                        "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0",
                        feature.included
                          ? "bg-success/20 text-success"
                          : "bg-muted/30 text-muted-foreground"
                      )}>
                        <Check size={12} />
                      </div>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "gradient" : "outline"}
                  className="w-full"
                  disabled={plan.disabled}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Частые вопросы</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Можно ли отменить подписку?",
                a: "Да, подписку можно отменить в любой момент. Вы продолжите пользоваться премиум-функциями до конца оплаченного периода.",
              },
              {
                q: "Как работает пробный период?",
                a: "7 дней бесплатного доступа ко всем функциям выбранного плана. Оплата спишется только после окончания пробного периода.",
              },
              {
                q: "Чем отличается Премиум от Премиум + ИИ?",
                a: "Премиум + ИИ даёт неограниченный доступ к ИИ-функциям: подсказки в чатах, советы по профилю и персональный ИИ-коуч.",
              },
              {
                q: "Есть ли скидки?",
                a: "При оплате за год вы получаете 2 месяца бесплатно. Также следите за специальными предложениями в приложении.",
              },
            ].map((item, index) => (
              <Card key={index} variant="glass" className="p-6">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
