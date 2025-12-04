import { Heart, X, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/services/ai";

interface ProfileCardProps {
  profile: UserProfile;
  compatibilityScore?: number;
  onLike?: () => void;
  onSkip?: () => void;
  onSuperLike?: () => void;
  className?: string;
  isAnimating?: 'left' | 'right' | null;
}

export function ProfileCard({
  profile,
  compatibilityScore,
  onLike,
  onSkip,
  onSuperLike,
  className,
  isAnimating,
}: ProfileCardProps) {
  return (
    <Card
      variant="glass"
      className={cn(
        "relative overflow-hidden max-w-sm w-full mx-auto",
        isAnimating === 'left' && "animate-swipe-left",
        isAnimating === 'right' && "animate-swipe-right",
        className
      )}
    >
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-3xl">
        <img
          src={profile.photos[0] || "/placeholder.svg"}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Compatibility badge */}
        {compatibilityScore && (
          <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-full">
            <span className="text-sm font-semibold gradient-text">{compatibilityScore}%</span>
            <span className="text-xs text-muted-foreground ml-1">совместимость</span>
          </div>
        )}

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-2xl font-bold text-foreground">
            {profile.name}, {profile.age}
          </h3>
          <p className="text-sm text-muted-foreground">{profile.city}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <p className="text-sm text-foreground/80 line-clamp-2">{profile.bio}</p>
        
        {/* Interests */}
        <div className="flex flex-wrap gap-2">
          {profile.interests.slice(0, 4).map((interest) => (
            <span key={interest} className="tag-chip">
              {interest}
            </span>
          ))}
          {profile.interests.length > 4 && (
            <span className="tag-chip">+{profile.interests.length - 4}</span>
          )}
        </div>

        {/* Action buttons */}
        {(onLike || onSkip || onSuperLike) && (
          <div className="flex justify-center gap-4 pt-2">
            {onSkip && (
              <Button
                variant="skip"
                size="iconLg"
                className="rounded-full"
                onClick={onSkip}
              >
                <X size={28} />
              </Button>
            )}
            {onSuperLike && (
              <Button
                variant="superLike"
                size="iconLg"
                className="rounded-full"
                onClick={onSuperLike}
              >
                <Star size={24} />
              </Button>
            )}
            {onLike && (
              <Button
                variant="like"
                size="iconLg"
                className="rounded-full"
                onClick={onLike}
              >
                <Heart size={28} />
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
