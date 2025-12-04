import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { APP_CONFIG, TEXTS } from "@/config/app";
import { useToast } from "@/hooks/use-toast";
import { analyzePersonality } from "@/services/ai";

const interests = [
  "Путешествия", "Кино", "Музыка", "Спорт", "Книги", "Кулинария",
  "Искусство", "Технологии", "Природа", "Йога", "Фотография", "Танцы",
  "Игры", "Настолки", "Вино", "Кофе", "Животные", "Волонтёрство",
];

const personalityQuestions = [
  {
    question: "Как ты предпочитаешь проводить выходные?",
    options: ["Активный отдых на природе", "Уютный вечер дома", "Встречи с друзьями", "Культурные мероприятия"],
  },
  {
    question: "Что важнее в отношениях?",
    options: ["Общие интересы", "Эмоциональная близость", "Независимость", "Совместные планы на будущее"],
  },
  {
    question: "Как ты относишься к спонтанности?",
    options: ["Обожаю сюрпризы!", "Планирую, но открыт к изменениям", "Предпочитаю всё планировать", "Зависит от настроения"],
  },
  {
    question: "Идеальное первое свидание?",
    options: ["Кофе и разговоры", "Прогулка в парке", "Ужин в ресторане", "Что-то необычное (квест, выставка)"],
  },
  {
    question: "Что тебя вдохновляет?",
    options: ["Творчество и искусство", "Природа и путешествия", "Общение с людьми", "Достижение целей"],
  },
];

const steps = [
  { id: "basics", title: "Основное" },
  { id: "interests", title: "Интересы" },
  { id: "about", title: "О себе" },
  { id: "personality", title: "Тест" },
  { id: "complete", title: "Готово" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    gender: "",
    lookingFor: "",
    interests: [] as string[],
    bio: "",
    weekend: "",
    personalityAnswers: {} as Record<string, string>,
  });

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handlePersonalityAnswer = (questionIndex: number, answer: string) => {
    setFormData(prev => ({
      ...prev,
      personalityAnswers: {
        ...prev.personalityAnswers,
        [questionIndex]: answer,
      },
    }));
  };

  const nextStep = async () => {
    if (currentStep === steps.length - 2) {
      // Analyze personality before completing
      setIsAnalyzing(true);
      await analyzePersonality(formData.personalityAnswers);
      setIsAnalyzing(false);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    toast({
      title: "Профиль создан!",
      description: "Теперь можно начинать знакомства",
    });
    navigate("/feed");
  };

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case "basics":
        return (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Имя</label>
              <Input
                placeholder="Как тебя зовут?"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Возраст</label>
                <Input
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Город</label>
                <Input
                  placeholder="Москва"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Пол</label>
              <div className="grid grid-cols-2 gap-3">
                {["Мужской", "Женский"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`p-3 rounded-xl border transition-all ${
                      formData.gender === option
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-glass-border bg-glass/20 text-muted-foreground hover:border-primary/50"
                    }`}
                    onClick={() => setFormData({ ...formData, gender: option })}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Кого ищешь?</label>
              <div className="grid grid-cols-3 gap-3">
                {["Мужчин", "Женщин", "Всех"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`p-3 rounded-xl border transition-all ${
                      formData.lookingFor === option
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-glass-border bg-glass/20 text-muted-foreground hover:border-primary/50"
                    }`}
                    onClick={() => setFormData({ ...formData, lookingFor: option })}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "interests":
        return (
          <div className="space-y-4 animate-fade-in">
            <p className="text-sm text-muted-foreground">
              Выбери минимум 5 интересов, чтобы ИИ мог подобрать подходящие анкеты
            </p>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  className={`px-4 py-2 rounded-full border transition-all ${
                    formData.interests.includes(interest)
                      ? "border-primary bg-primary/20 text-foreground"
                      : "border-glass-border bg-glass/20 text-muted-foreground hover:border-primary/50"
                  }`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Выбрано: {formData.interests.length} / 5+
            </p>
          </div>
        );

      case "about":
        return (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Расскажи о себе
              </label>
              <textarea
                className="w-full h-32 p-4 rounded-xl border border-glass-border bg-glass/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none resize-none"
                placeholder="Чем увлекаешься? Что важно в жизни? Чего ищешь в отношениях?"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Как проводишь выходные?
              </label>
              <textarea
                className="w-full h-24 p-4 rounded-xl border border-glass-border bg-glass/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none resize-none"
                placeholder="Опиши идеальные выходные..."
                value={formData.weekend}
                onChange={(e) => setFormData({ ...formData, weekend: e.target.value })}
              />
            </div>
          </div>
        );

      case "personality":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles size={16} className="text-primary" />
              <span>ИИ использует эти ответы для подбора совместимых пар</span>
            </div>
            {personalityQuestions.map((q, qIndex) => (
              <div key={qIndex} className="space-y-3">
                <p className="font-medium">{q.question}</p>
                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`p-3 rounded-xl border text-left transition-all ${
                        formData.personalityAnswers[qIndex] === option
                          ? "border-primary bg-primary/10"
                          : "border-glass-border bg-glass/20 hover:border-primary/50"
                      }`}
                      onClick={() => handlePersonalityAnswer(qIndex, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "complete":
        return (
          <div className="text-center space-y-6 animate-scale-in py-8">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan flex items-center justify-center mx-auto">
              <Check size={40} className="text-foreground" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Профиль готов!</h3>
              <p className="text-muted-foreground">
                ИИ уже анализирует твой профиль и подбирает подходящие анкеты
              </p>
            </div>
            <Button variant="gradient" size="lg" onClick={completeOnboarding}>
              Перейти к анкетам
              <ArrowRight size={20} />
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-background to-neon-pink/10" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-neon-purple/30 rounded-full blur-[100px]" />

      <div className="w-full max-w-lg relative z-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`h-2 w-2 rounded-full transition-all ${
                    index <= currentStep ? 'bg-primary scale-125' : 'bg-glass-border'
                  }`}
                />
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all ${
                      index < currentStep ? 'bg-primary' : 'bg-glass-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {steps[currentStep].title}
          </p>
        </div>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-1">
                {currentStep === 0 && `${TEXTS.onboarding.welcome} ${APP_CONFIG.name}!`}
                {currentStep === 1 && TEXTS.onboarding.interests}
                {currentStep === 2 && TEXTS.onboarding.tellAboutYourself}
                {currentStep === 3 && TEXTS.onboarding.personality}
              </h2>
            </div>

            {renderStep()}

            {currentStep < steps.length - 1 && (
              <div className="flex gap-3 mt-6">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft size={18} />
                    Назад
                  </Button>
                )}
                <Button
                  variant="gradient"
                  className="flex-1"
                  onClick={nextStep}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles size={18} className="animate-spin" />
                      Анализируем...
                    </>
                  ) : (
                    <>
                      Далее
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
