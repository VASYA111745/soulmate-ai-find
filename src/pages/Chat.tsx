import { useState } from "react";
import { Send, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar-custom";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { generateOpeningLines, type UserProfile } from "@/services/ai";
import { cn } from "@/lib/utils";
import { TEXTS } from "@/config/app";

interface ChatPreview {
  id: string;
  user: UserProfile;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
}

interface Message {
  id: string;
  content: string;
  isOwn: boolean;
  timestamp: Date;
}

const mockChats: ChatPreview[] = [
  {
    id: "1",
    user: {
      id: "1",
      name: "Анна",
      age: 25,
      city: "Москва",
      bio: "",
      interests: ["Путешествия", "Книги"],
      photos: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"],
    },
    lastMessage: "Привет! Как твои дела?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unread: true,
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Мария",
      age: 27,
      city: "СПб",
      bio: "",
      interests: ["Музыка", "Кино"],
      photos: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"],
    },
    lastMessage: "Было здорово поболтать! 😊",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: false,
  },
];

const mockMessages: Message[] = [
  { id: "1", content: "Привет! Увидела, что ты тоже любишь путешествовать", isOwn: false, timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  { id: "2", content: "Привет! Да, это моя страсть 🌍 Где ты была в последний раз?", isOwn: true, timestamp: new Date(Date.now() - 1000 * 60 * 25) },
  { id: "3", content: "В Португалии! Лиссабон просто потрясающий", isOwn: false, timestamp: new Date(Date.now() - 1000 * 60 * 20) },
  { id: "4", content: "Ооо, я тоже хочу туда! Порекомендуешь что-нибудь?", isOwn: true, timestamp: new Date(Date.now() - 1000 * 60 * 15) },
  { id: "5", content: "Привет! Как твои дела?", isOwn: false, timestamp: new Date(Date.now() - 1000 * 60 * 5) },
];

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleSelectChat = (chat: ChatPreview) => {
    setSelectedChat(chat);
    setShowAiSuggestions(false);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isOwn: true,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setInputValue("");
    setShowAiSuggestions(false);
  };

  const handleAiSuggest = async () => {
    if (!selectedChat) return;
    
    setShowAiSuggestions(true);
    setLoadingSuggestions(true);
    
    const lines = await generateOpeningLines({ otherProfile: selectedChat.user });
    setAiSuggestions(lines.map(l => l.text));
    setLoadingSuggestions(false);
  };

  const useSuggestion = (text: string) => {
    sendMessage(text);
  };

  // Mobile: show list or chat
  // Desktop: show both
  return (
    <div className="h-screen md:h-[calc(100vh-2rem)] flex flex-col md:flex-row md:pt-8 md:px-4 md:pb-8">
      {/* Chat list */}
      <div
        className={cn(
          "w-full md:w-80 md:mr-4 flex-shrink-0",
          selectedChat && "hidden md:block"
        )}
      >
        <div className="glass-card h-full md:rounded-3xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-glass-border/30">
            <h1 className="text-xl font-bold">Сообщения</h1>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {mockChats.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <p>{TEXTS.chat.noMessages}</p>
              </div>
            ) : (
              mockChats.map((chat) => (
                <button
                  key={chat.id}
                  className={cn(
                    "w-full p-4 flex items-center gap-3 hover:bg-secondary/30 transition-colors text-left",
                    selectedChat?.id === chat.id && "bg-secondary/50"
                  )}
                  onClick={() => handleSelectChat(chat)}
                >
                  <Avatar
                    src={chat.user.photos[0]}
                    name={chat.user.name}
                    size="lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{chat.user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className={cn(
                      "text-sm truncate",
                      chat.unread ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Chat window */}
      <div
        className={cn(
          "flex-1 flex flex-col",
          !selectedChat && "hidden md:flex"
        )}
      >
        {selectedChat ? (
          <div className="glass-card h-full md:rounded-3xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-glass-border/30 flex items-center gap-3">
              <button
                className="md:hidden p-2 -ml-2 hover:bg-secondary/50 rounded-lg"
                onClick={handleBack}
              >
                <ArrowLeft size={20} />
              </button>
              <Avatar
                src={selectedChat.user.photos[0]}
                name={selectedChat.user.name}
              />
              <div>
                <h2 className="font-medium">{selectedChat.user.name}</h2>
                <p className="text-xs text-muted-foreground">Онлайн</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  content={message.content}
                  isOwn={message.isOwn}
                  timestamp={message.timestamp}
                />
              ))}
            </div>

            {/* AI Suggestions */}
            {showAiSuggestions && (
              <div className="px-4 pb-2 animate-slide-up">
                <div className="glass-card p-3 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-primary" />
                    <span className="text-xs font-medium">ИИ-подсказки</span>
                  </div>
                  {loadingSuggestions ? (
                    <p className="text-sm text-muted-foreground">Генерируем варианты...</p>
                  ) : (
                    <div className="space-y-2">
                      {aiSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="w-full text-left text-sm p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                          onClick={() => useSuggestion(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-glass-border/30">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAiSuggest}
                  className={showAiSuggestions ? "bg-primary/20" : ""}
                >
                  <Sparkles size={18} />
                </Button>
                <Input
                  placeholder={TEXTS.chat.typeMessage}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage(inputValue)}
                  className="flex-1"
                />
                <Button
                  variant="gradient"
                  size="icon"
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex glass-card h-full rounded-3xl items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Выберите чат для начала общения</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
