import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TbArrowRight, TbCalendar, TbClock } from "react-icons/tb";
import news1 from "../assets/hero-1.webp";
import news2 from "../assets/hero-3.webp";
import news3 from "../assets/hero-4.webp";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 1,
    image: news1,
    date: "November 28, 2024",
    readTime: "5 min read",
    category: "Industry Insights",
    title: "Global Shipping Trends: What to Expect in 2025",
    excerpt:
      "Explore the emerging trends shaping the future of global logistics, from AI-powered tracking to sustainable shipping practices.",
    color: "#3B82F6",
  },
  {
    id: 2,
    image: news2,
    date: "November 15, 2024",
    readTime: "4 min read",
    category: "Company News",
    title: "Transline Expands Operations to Southeast Asia",
    excerpt:
      "We're excited to announce new partnerships and warehousing facilities across major Southeast Asian ports.",
    color: "#10B981",
  },
  {
    id: 3,
    image: news3,
    date: "November 5, 2024",
    readTime: "6 min read",
    category: "Expert Tips",
    title: "Reducing Customs Delays: A Complete Guide",
    excerpt:
      "Learn proven strategies to streamline your customs clearance process and avoid costly shipment delays.",
    color: "#8B5CF6",
  },
];

const NewsCard = ({ article, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(image, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(card, {
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
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
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

        {/* Category badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: article.color }}
        >
          {article.category}
        </div>

        {/* Read more floating button */}
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <TbArrowRight
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ color: article.color }}
          />
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <span className="flex items-center gap-1.5">
            <TbCalendar className="w-4 h-4" />
            {article.date}
          </span>
          <span className="flex items-center gap-1.5">
            <TbClock className="w-4 h-4" />
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        {/* Read More Link */}
        <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: article.color }}>
          <span>Read More</span>
          <TbArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ backgroundColor: article.color }}
      />
    </article>
  );
};

const LatestNews = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cards = gridRef.current.querySelectorAll(".news-card");

    gsap.set(title, { opacity: 0, y: 40 });
    gsap.set(subtitle, { opacity: 0, y: 30 });
    gsap.set(cards, { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.3"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #d1d5db 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Latest News & Insights
            </h2>
            <p ref={subtitleRef} className="text-gray-600 text-lg max-w-xl">
              Stay updated with industry trends, company news, and expert logistics insights.
            </p>
          </div>

          {/* View All button */}
          <a
            href="/news"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors duration-300"
          >
            View All Articles
            <TbArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* News Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
