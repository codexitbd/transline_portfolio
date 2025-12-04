import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHeader from "../components/PageHeader";
import { TbArrowRight, TbCalendar, TbClock } from "react-icons/tb";
import { blogPosts, categories, formatDate } from "../data/blogData";

gsap.registerPlugin(ScrollTrigger);

// Category colors
const categoryColors = {
  "regulatory": "#EF4444",
  "industry-insights": "#3B82F6",
  "company-news": "#F97316",
  "how-to": "#10B981",
  "case-studies": "#8B5CF6",
  "shipping-trade": "#06B6D4",
};

// News Card Component (same design as LatestNews)
const NewsCard = ({ article }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const color = categoryColors[article.category] || "#3B82F6";

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    const handleMouseEnter = () => {
      gsap.to(image, { scale: 1.1, duration: 0.6, ease: "power2.out" });
      gsap.to(card, {
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
      gsap.to(card, {
        y: 0,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="news-card group bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <div
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${article.image})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

        {/* Category badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: color }}
        >
          {article.categoryName}
        </div>

        {/* Read more floating button */}
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <TbArrowRight className="w-5 h-5" style={{ color }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <span className="flex items-center gap-1.5">
            <TbCalendar className="w-4 h-4" />
            {formatDate(article.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <TbClock className="w-4 h-4" />
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        {/* Read More Link */}
        <div className="flex items-center gap-2 font-semibold text-sm" style={{ color }}>
          <span>Read More</span>
          <TbArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ backgroundColor: color }}
      />
    </article>
  );
};

const NewsAndInsights = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef(null);
  const filtersRef = useRef(null);
  const gridRef = useRef(null);

  // Filter posts based on category
  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate filters
      gsap.fromTo(
        filtersRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: filtersRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards when filter changes
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".news-card");
    if (cards?.length) {
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageHeader
        title="News & Insights"
        subtitle="Stay updated with industry trends, company news, and expert logistics insights"
        backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2000&q=80"
      />

      {/* News Section */}
      <section ref={sectionRef} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter Tabs */}
          <div ref={filtersRef} className="mb-12">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {category.name}
                  <span
                    className={`ml-2 text-xs ${
                      activeCategory === category.id ? "text-gray-300" : "text-gray-400"
                    }`}
                  >
                    ({category.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-gray-500 mb-8">
            Showing <span className="font-semibold text-gray-900">{filteredPosts.length}</span> articles
          </p>

          {/* News Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default NewsAndInsights;