import { useState, useEffect } from "react";
import { Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { getMatchRecommendations, type MatchRecommendation } from "@/services/ai";
import { useToast } from "@/hooks/use-toast";

export default function Feed() {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<MatchRecommendation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [animating, setAnimating] = useState<'left' | 'right' | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    setIsLoading(true);
    const data = await getMatchRecommendations("user-1");
    setRecommendations(data);
    setIsLoading(false);
  };

  const handleAction = async (action: 'like' | 'skip' | 'superlike') => {
    const current = recommendations[currentIndex];
    
    setAnimating(action === 'skip' ? 'left' : 'right');
    
    setTimeout(() => {
      setAnimating(null);
      
      if (action === 'like' || action === 'superlike') {
        toast({
          title: action === 'superlike' ? "💫 Супер лайк!" : "❤️ Лайк отправлен!",
          description: `Вы лайкнули ${current.user.name}`,
        });
      }
      
      if (currentIndex < recommendations.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        toast({
          title: "Анкеты закончились",
          description: "Возвращайся позже за новыми рекомендациями!",
        });
      }
    }, 300);
  };

  const currentMatch = recommendations[currentIndex];

  return (
    <div className="min-h-screen pt-4 md:pt-8 px-4 pb-24 md:pb-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Рекомендации</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Sparkles size={14} className="text-primary" />
              Подобрано ИИ специально для тебя
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="glass-card p-4 rounded-2xl mb-6 animate-slide-up">
            <h3 className="font-semibold mb-3">Фильтры</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Возраст</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="number"
                    placeholder="От"
                    className="flex-1 h-10 px-3 rounded-lg border border-glass-border bg-glass/30 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    className="flex-1 h-10 px-3 rounded-lg border border-glass-border bg-glass/30 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Город</label>
                <input
                  type="text"
                  placeholder="Любой"
                  className="w-full h-10 px-3 rounded-lg border border-glass-border bg-glass/30 text-sm mt-1"
                />
              </div>
              <Button variant="gradient" size="sm" className="w-full">
                Применить
              </Button>
            </div>
          </div>
        )}

        {/* Card stack */}
        <div className="relative min-h-[500px] flex items-center justify-center">
          {isLoading ? (
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink animate-pulse-glow mx-auto mb-4" />
              <p className="text-muted-foreground">Загружаем рекомендации...</p>
            </div>
          ) : currentMatch ? (
            <>
              {/* Background card preview */}
              {currentIndex < recommendations.length - 1 && (
                <div className="absolute top-4 scale-95 opacity-50 pointer-events-none">
                  <ProfileCard
                    profile={recommendations[currentIndex + 1].user}
                    compatibilityScore={recommendations[currentIndex + 1].compatibilityScore}
                  />
                </div>
              )}
              
              {/* Current card */}
              <ProfileCard
                profile={currentMatch.user}
                compatibilityScore={currentMatch.compatibilityScore}
                onLike={() => handleAction('like')}
                onSkip={() => handleAction('skip')}
                onSuperLike={() => handleAction('superlike')}
                isAnimating={animating}
              />
            </>
          ) : (
            <div className="text-center glass-card p-8 rounded-3xl">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">На сегодня всё!</h3>
              <p className="text-muted-foreground mb-4">
                Возвращайся завтра за новыми рекомендациями
              </p>
              <Button variant="outline" onClick={loadRecommendations}>
                Обновить
              </Button>
            </div>
          )}
        </div>

        {/* Match reasons */}
        {currentMatch && (
          <div className="mt-6 glass-card p-4 rounded-2xl animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm font-medium">Почему вы подходите</span>
            </div>
            <ul className="space-y-2">
              {currentMatch.matchReasons.map((reason, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
