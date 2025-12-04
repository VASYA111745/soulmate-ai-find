import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { assistantChat, type ChatMessage } from "@/services/ai";
import { TEXTS } from "@/config/app";
import { cn } from "@/lib/utils";

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Привет! 👋 Я твой персональный помощник по знакомствам. Могу помочь составить первое сообщение, улучшить профиль или подготовиться к свиданию. О чём хочешь поговорить?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await assistantChat([...messages, userMessage]);
      
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="min-h-screen pt-4 md:pt-8 px-4 pb-24 md:pb-8">
      <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan flex items-center justify-center">
              <Sparkles size={24} className="text-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{TEXTS.aiAssistant.title}</h1>
              <p className="text-sm text-muted-foreground">{TEXTS.aiAssistant.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Suggestions sidebar - desktop only */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card variant="glass" className="h-full p-4">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={16} className="text-primary" />
                <span className="text-sm font-medium">Частые вопросы</span>
              </div>
              <div className="space-y-2">
                {TEXTS.aiAssistant.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left text-sm p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat area */}
          <Card variant="glass" className="flex-1 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      message.role === "user"
                        ? "bg-gradient-to-r from-neon-purple/80 to-neon-pink/80 rounded-br-md"
                        : "bg-secondary/60 rounded-bl-md"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={14} className="text-primary" />
                        <span className="text-xs font-medium text-primary">ИИ-помощник</span>
                      </div>
                    )}
                    <div className="text-sm whitespace-pre-wrap">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/60 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-primary animate-pulse" />
                      <span className="text-sm text-muted-foreground">Думаю...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Mobile suggestions */}
            <div className="lg:hidden px-4 pb-2">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {TEXTS.aiAssistant.suggestions.slice(0, 3).map((suggestion, index) => (
                  <button
                    key={index}
                    className="flex-shrink-0 text-xs px-3 py-2 rounded-full bg-secondary/50 hover:bg-secondary/70 transition-colors whitespace-nowrap"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-glass-border/30">
              <div className="flex gap-2">
                <Input
                  placeholder={TEXTS.aiAssistant.placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage(inputValue)}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  variant="gradient"
                  size="icon"
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
