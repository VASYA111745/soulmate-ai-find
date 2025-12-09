import { Link, useLocation } from "react-router-dom";
import { Home, User, MessageCircle, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { APP_CONFIG } from "@/config/app";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/feed", icon: Home, label: "Лента" },
  { path: "/chat", icon: MessageCircle, label: "Чаты" },
  { path: "/ai-agent", icon: Sparkles, label: "AI" },
  { path: "/profile", icon: User, label: "Профиль" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = location.pathname === "/";

  if (isLanding) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border/30">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan" />
              <span className="text-xl font-bold gradient-text">{APP_CONFIG.name}</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Тарифы
              </Link>
              <Link to="/safety" className="text-muted-foreground hover:text-foreground transition-colors">
                Безопасность
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="sm">Войти</Button>
              </Link>
              <Link to="/auth?mode=register">
                <Button variant="gradient" size="sm">Начать</Button>
              </Link>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-card border-t border-glass-border/30 animate-slide-up">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link
                to="/pricing"
                className="block py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Тарифы
              </Link>
              <Link
                to="/safety"
                className="block py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Безопасность
              </Link>
              <div className="flex gap-3 pt-2">
                <Link to="/auth" className="flex-1">
                  <Button variant="outline" className="w-full">Войти</Button>
                </Link>
                <Link to="/auth?mode=register" className="flex-1">
                  <Button variant="gradient" className="w-full">Начать</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 flex-col items-center py-6 glass-card border-r border-glass-border/30 z-50">
        <Link to="/" className="mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan" />
        </Link>

        <nav className="flex flex-col gap-4 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300",
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <item.icon size={24} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-glass-border/30 z-50 safe-area-pb">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 min-w-[60px]",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <item.icon size={22} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
