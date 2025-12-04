import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  content: string;
  isOwn: boolean;
  timestamp?: Date;
}

export function ChatBubble({ content, isOwn, timestamp }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex mb-3",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl",
          isOwn
            ? "bg-gradient-to-r from-neon-purple/80 to-neon-pink/80 rounded-br-md"
            : "bg-secondary/60 backdrop-blur-sm rounded-bl-md"
        )}
      >
        <p className="text-sm text-foreground">{content}</p>
        {timestamp && (
          <p className="text-xs text-muted-foreground mt-1">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
}
