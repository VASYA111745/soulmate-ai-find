import { ArrowRight, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config/app";

const blogPosts = [
  {
    id: "1",
    title: "Как написать идеальное первое сообщение",
    excerpt: "5 проверенных стратегий, которые помогут начать разговор и получить ответ",
    category: "Советы",
    readTime: "5 мин",
    author: "Команда NovaDate AI",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
    date: "28 ноя 2024",
  },
  {
    id: "2",
    title: "История Анны и Дмитрия: как ИИ помог найти любовь",
    excerpt: "Реальная история пары, которая познакомилась благодаря нашему алгоритму совместимости",
    category: "Истории успеха",
    readTime: "7 мин",
    author: "Редакция",
    image: "https://images.unsplash.com/photo-1522098543979-ffc7f79a56c4?w=600",
    date: "25 ноя 2024",
  },
  {
    id: "3",
    title: "10 ошибок в профиле, которые отпугивают людей",
    excerpt: "Разбираем типичные ошибки и показываем, как их исправить с помощью ИИ",
    category: "Профиль",
    readTime: "6 мин",
    author: "Команда NovaDate AI",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600",
    date: "20 ноя 2024",
  },
  {
    id: "4",
    title: "Как ИИ помогает находить совместимых партнёров",
    excerpt: "Заглядываем под капот нашего алгоритма и объясняем, как работает подбор",
    category: "Технологии",
    readTime: "8 мин",
    author: "Техническая команда",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600",
    date: "15 ноя 2024",
  },
  {
    id: "5",
    title: "Безопасные первые свидания: полный гид",
    excerpt: "Всё, что нужно знать о безопасности при встрече с новым человеком",
    category: "Безопасность",
    readTime: "6 мин",
    author: "Команда безопасности",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600",
    date: "10 ноя 2024",
  },
  {
    id: "6",
    title: "Тренды онлайн-знакомств 2025",
    excerpt: "Что изменится в мире дейтинга и как подготовиться к новым возможностям",
    category: "Тренды",
    readTime: "5 мин",
    author: "Редакция",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
    date: "5 ноя 2024",
  },
];

const categories = ["Все", "Советы", "Истории успеха", "Профиль", "Технологии", "Безопасность"];

export default function Blog() {
  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Блог <span className="gradient-text">{APP_CONFIG.name}</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Советы по знакомствам, истории успеха и последние новости из мира ИИ-дейтинга
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                category === "Все"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured post */}
        <Card variant="glass" className="mb-8 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="tag-chip">{blogPosts[0].category}</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock size={14} />
                  {blogPosts[0].readTime}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                {blogPosts[0].title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User size={14} />
                  {blogPosts[0].author}
                  <span>•</span>
                  {blogPosts[0].date}
                </div>
                <Button variant="gradient" size="sm">
                  Читать
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} variant="glass" className="overflow-hidden hover-lift group">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Загрузить ещё
          </Button>
        </div>
      </div>
    </div>
  );
}
