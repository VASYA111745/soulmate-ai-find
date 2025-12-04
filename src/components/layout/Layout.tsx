import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isAuth = location.pathname === "/auth";

  return (
    <div className="min-h-screen bg-background">
      {!isAuth && <Navbar />}
      <main
        className={cn(
          "min-h-screen",
          !isLanding && !isAuth && "md:ml-20 pb-20 md:pb-0"
        )}
      >
        {children}
      </main>
    </div>
  );
}
