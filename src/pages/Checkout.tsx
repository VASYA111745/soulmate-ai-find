import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TEXTS } from "@/config/app";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") ?? "";
  const amount = searchParams.get("amount") ?? "";

  const heading = useMemo(() => {
    if (plan === "premium") return `${TEXTS.pricing.premium}: пробный доступ за 1₽`;
    if (plan === "premium-ai") return `${TEXTS.pricing.premiumAI}: оплата`;
    return "Оплата подписки";
  }, [plan]);

  const description = useMemo(() => {
    if (plan === "premium") {
      return "Получите 7 дней полного доступа к Премиум за символическую оплату 1₽.";
    }
    if (plan === "premium-ai") {
      return "Полный доступ к ИИ-помощнику и расширенные функции уже сегодня.";
    }
    return "Выберите подходящий план и завершите оплату.";
  }, [plan]);

  const formattedAmount = amount ? `${amount}₽` : "";

  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-24 md:pb-12">
      <div className="max-w-2xl mx-auto">
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-2xl font-bold gradient-text">{heading}</CardTitle>
            <p className="text-muted-foreground">{description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {formattedAmount && (
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{formattedAmount}</span>
                <span className="text-muted-foreground">/ месяц</span>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Перенаправим на защищённую страницу оплаты. После подтверждения подписка активируется автоматически.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button size="lg" className="w-full md:w-auto">
                Перейти к оплате
              </Button>
              <Button variant="outline" size="lg" className="w-full md:w-auto" asChild>
                <Link to="/pricing">Вернуться к тарифам</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
