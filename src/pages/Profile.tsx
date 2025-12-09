import { useState, useEffect, useCallback } from "react";
import { Edit2, Camera, Plus, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { suggestProfileImprovements, type ProfileSuggestion } from "@/services/ai";
import { TEXTS } from "@/config/app";

const mockProfile = {
  name: "Алексей",
  age: 28,
  city: "Москва",
  bio: "Инженер по образованию, путешественник по призванию. Люблю горы, кофе и хорошие разговоры.",
  interests: ["Путешествия", "Кофе", "Горы", "Технологии", "Фотография"],
  photos: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  ],
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockProfile);
  const [suggestions, setSuggestions] = useState<ProfileSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);

  const loadSuggestions = useCallback(async () => {
    setLoadingSuggestions(true);
    const data = await suggestProfileImprovements(profile);
    setSuggestions(data);
    setLoadingSuggestions(false);
  }, [profile]);

  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-yellow-500';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle size={16} className="text-destructive" />;
      case 'medium': return <AlertCircle size={16} className="text-yellow-500" />;
      default: return <CheckCircle size={16} className="text-success" />;
    }
  };

  return (
    <div className="min-h-screen pt-4 md:pt-8 px-4 pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{TEXTS.profile.myProfile}</h1>
          <Button
            variant={isEditing ? "gradient" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              "Сохранить"
            ) : (
              <>
                <Edit2 size={18} />
                {TEXTS.profile.edit}
              </>
            )}
          </Button>
        </div>

        {/* Profile card */}
        <Card variant="glass">
          <CardContent className="pt-6">
            {/* Photos */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                {TEXTS.profile.photos}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {profile.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-2xl overflow-hidden relative group"
                  >
                    <img
                      src={photo}
                      alt={`Фото ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon">
                          <Camera size={20} />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                {profile.photos.length < 5 && (
                  <button className="aspect-square rounded-2xl border-2 border-dashed border-glass-border flex items-center justify-center hover:border-primary/50 transition-colors">
                    <Plus size={24} className="text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Basic info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {profile.name}, {profile.age}
                  </h2>
                  <p className="text-muted-foreground">{profile.city}</p>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  {TEXTS.profile.about}
                </h3>
                {isEditing ? (
                  <textarea
                    className="w-full p-3 rounded-xl border border-glass-border bg-glass/30 text-foreground resize-none h-24"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                ) : (
                  <p className="text-foreground/80">{profile.bio}</p>
                )}
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  {TEXTS.profile.interests}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <span key={interest} className="tag-chip">
                      {interest}
                    </span>
                  ))}
                  {isEditing && (
                    <button className="tag-chip border-dashed">
                      <Plus size={14} className="mr-1" />
                      Добавить
                    </button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card variant="gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles size={20} className="text-primary" />
              {TEXTS.profile.aiTips}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSuggestions ? (
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                Анализируем профиль...
              </div>
            ) : (
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 rounded-xl bg-background/30"
                  >
                    {getPriorityIcon(suggestion.priority)}
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${getPriorityColor(suggestion.priority)}`}>
                        {suggestion.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <Card variant="glass">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Статистика профиля</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold gradient-text">156</div>
                <div className="text-sm text-muted-foreground">Просмотров</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">42</div>
                <div className="text-sm text-muted-foreground">Лайков</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">12</div>
                <div className="text-sm text-muted-foreground">Совпадений</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
