import { Shield, Lock, Eye, AlertTriangle, UserCheck, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_CONFIG, TEXTS } from "@/config/app";

const safetyFeatures = [
  {
    icon: UserCheck,
    title: "Верификация профилей",
    description: "Мы проверяем подлинность фотографий и личных данных пользователей для защиты от фейковых аккаунтов.",
  },
  {
    icon: Lock,
    title: "Шифрование данных",
    description: "Все ваши личные данные и переписки защищены современным шифрованием и не передаются третьим лицам.",
  },
  {
    icon: Eye,
    title: "Контроль приватности",
    description: "Вы сами решаете, какую информацию показывать. Настройте видимость профиля и личных данных.",
  },
  {
    icon: AlertTriangle,
    title: "Система жалоб",
    description: "Мгновенная реакция на нарушения. Блокировка подозрительных аккаунтов и модерация контента 24/7.",
  },
];

const rules = [
  {
    title: "Будьте уважительны",
    description: "Относитесь к другим пользователям так, как хотели бы, чтобы относились к вам.",
  },
  {
    title: "Используйте реальные фото",
    description: "Загружайте только свои актуальные фотографии. Фейковые фото приводят к бану.",
  },
  {
    title: "Не отправляйте нежелательный контент",
    description: "Запрещены оскорбления, спам, откровенный контент без согласия собеседника.",
  },
  {
    title: "Сообщайте о нарушениях",
    description: "Если заметили подозрительное поведение, используйте кнопку жалобы.",
  },
  {
    title: "Встречайтесь безопасно",
    description: "Первые встречи — в общественных местах. Сообщите друзьям, куда идёте.",
  },
];

export default function Safety() {
  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-24 md:pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 mb-6">
            <Shield size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {TEXTS.safety.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {TEXTS.safety.subtitle}. В {APP_CONFIG.name} мы делаем всё, чтобы вы могли знакомиться безопасно и комфортно.
          </p>
        </div>

        {/* Safety features */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {safetyFeatures.map((feature) => (
            <Card key={feature.title} variant="glass" className="hover-lift">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <feature.icon size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community rules */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Правила сообщества</h2>
          <Card variant="glass">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {rules.map((rule, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{rule.title}</h3>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card variant="gradient" className="text-center p-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-foreground/10 mb-4">
            <Heart size={28} className="text-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">Советы для первого свидания</h2>
          <ul className="text-muted-foreground text-sm space-y-2 max-w-md mx-auto text-left">
            <li>• Встречайтесь в общественном месте</li>
            <li>• Расскажите другу или подруге о своих планах</li>
            <li>• Приезжайте на своём транспорте или такси</li>
            <li>• Доверяйте своей интуиции</li>
            <li>• Не торопитесь сообщать личные данные</li>
          </ul>
        </Card>

        {/* Contact */}
        <div className="text-center mt-12 text-muted-foreground">
          <p>Если у вас возникли вопросы по безопасности, свяжитесь с нами:</p>
          <p className="font-medium text-foreground mt-2">safety@novadate.ai</p>
        </div>
      </div>
    </div>
  );
}
