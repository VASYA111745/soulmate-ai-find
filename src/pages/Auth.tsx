import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { APP_CONFIG, TEXTS } from "@/config/app";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "register");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth - replace with actual auth logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: isLogin ? "Добро пожаловать!" : "Аккаунт создан!",
      description: isLogin ? "Вы успешно вошли в аккаунт" : "Теперь заполните профиль",
    });
    
    setIsLoading(false);
    navigate(isLogin ? "/feed" : "/onboarding");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-background to-neon-pink/10" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-neon-purple/30 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-neon-pink/20 rounded-full blur-[100px]" />

      <div className="w-full max-w-md relative z-10 animate-scale-in">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>На главную</span>
        </Link>

        <Card variant="glass" className="overflow-hidden">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan" />
            </div>
            <CardTitle className="text-2xl gradient-text">{APP_CONFIG.name}</CardTitle>
            <CardDescription>
              {isLogin ? "Войдите, чтобы продолжить" : "Создайте аккаунт"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Toggle */}
            <div className="flex p-1 rounded-xl bg-secondary/50">
              <button
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  isLogin
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setIsLogin(true)}
              >
                {TEXTS.auth.login}
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  !isLogin
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setIsLogin(false)}
              >
                {TEXTS.auth.register}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Имя
                  </label>
                  <Input
                    placeholder="Как тебя зовут?"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  {TEXTS.auth.email}
                </label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  {TEXTS.auth.password}
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  {TEXTS.auth.forgotPassword}
                </button>
              )}

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Загрузка..." : isLogin ? "Войти" : "Создать аккаунт"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-glass-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  {TEXTS.auth.orContinueWith}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full" disabled>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full" disabled>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Apple
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
