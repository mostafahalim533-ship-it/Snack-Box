import { useState, useEffect, useRef } from "react";
import {
  X,
  Truck,
  ShoppingCart,
  Package,
  Gift,
  Users,
  Sparkles,
  Zap,
  CheckCircle,
  ChevronDown,
  ExternalLink,
  Play,
  Maximize2,
  Eye,
  Star,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import AutoScrollCarousel from "../components/AutoScrollCarousel";

// Helper function to calculate pricing
const calculatePricing = (salePrice: string) => {
  const salePriceNumeric = parseFloat(salePrice.replace("$", ""));
  // Following the formula: regularPrice = salePrice / 0.3 (since salePrice = regularPrice * 0.3)
  const regularPriceCalculated = salePriceNumeric / 0.3;

  // Round up to .99 - get the integer part and add .99
  const regularPriceRounded = Math.floor(regularPriceCalculated) + 0.99;

  return {
    salePrice: salePrice,
    regularPrice: `$${regularPriceRounded.toFixed(2)}`,
  };
};

// Star Rating Component
const StarRating = ({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount?: number;
}) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
      {reviewCount && (
        <span className="text-sm text-gray-600 ml-1">({reviewCount})</span>
      )}
    </div>
  );
};

const products = [
  {
    id: 1,
    name: "Gift a Snack Spread the Joy Snack Pack, Assorted College Care Package for Students, Office Party, 35 Count",
    shortName: "Gift a Snack – Spread the Joy Snack Pack",
    description:
      "Spread joy with the perfect gift for adults, teens, and college students. Premium assortment of chips, crackers, cookies, and candy in beautifully branded high-end packaging.",
    size: "35 ct",
    price: "$22.97",
    rating: 5,
    reviewCount: 286,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F77788b1b06194d9e9278b4a63bb3471e?format=webp&width=800",
    walmartLink:
      "https://www.walmart.com/ip/Gift-a-Snack-35-Count-Snacks-Box-with-Variety-Assortment-of-snack-packs-chips-variety-Crackers-Cookies-Candy/6277108895?classType=VARIANT",
    bulletPoints: [
      "Beautifully branded high-end packaging for an impressive gift.",
      "Convenient individual servings for on-the-go snacking.",
      "Includes a heartwarming greeting card for a personal touch.",
      "Spread joy with the perfect gift for adults, teens, and college students.",
      "Variety assortment of chips, crackers, cookies, and candy.",
      "Honesty is our main value - some snacks may be replaced for similar or more value.",
      "Gift a Snack - the ultimate snack box for any occasion.",
    ],
  },
  {
    id: 2,
    name: "Gift a Snack Chip Variety Snack Box – Snack Pack Variety Box, 42 Count",
    shortName: "Gift a Snack Chip Variety Snack Box",
    description:
      "Variety assortment of brands like Airheads, Cheez It, and Famous Amos. Contains 42 individually wrapped treats in high-end packaging with a greeting card.",
    size: "42 ct",
    price: "$23.96",
    rating: 5,
    reviewCount: 286,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2Fcd06d6ab52e341e2b57efd6b128aeeaa?format=webp&width=800",
    walmartLink:
      "https://www.walmart.com/ip/Gift-a-Snack-Chip-Variety-Snack-Box-Snack-Pack-Variety-Box-42-Count/5298521902?classType=VARIANT&athbdg=L1600",
    bulletPoints: [
      "The Gift a Snack Chip Variety Snack Box contains 42 individually wrapped treats, including chips, crackers, cookies, and candy.",
      "Variety assortment of brands like Airheads, Cheez It, and Famous Amos.",
      "Comes with a heartwarming greeting card and high-end packaging.",
      "Ideal for adults, teens, and college students, and suitable for on-the-go snacking.",
      "Some snacks may be replaced with similar or higher value items.",
      "Perfect as a care package or a convenient snack option.",
    ],
  },
  {
    id: 3,
    name: "Gift a Snack 52 Count Snack Box with Variety Snacks, Chips, Crackers, Cookies, Candy",
    shortName: "Gift a Snack 52 Count Snack Box",
    description:
      "52-count snack box filled with a diverse variety of sweet and salty treats. Beautifully branded high-end packaging perfect for gifts and care packages.",
    size: "52 ct",
    price: "$31.46",
    rating: 5,
    reviewCount: 286,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F5ff73d8278224c2ab0b862f059e3802c?format=webp&width=800",
    walmartLink:
      "https://www.walmart.com/ip/Gift-a-Snack-52-Count-Snack-Box-with-Variety-Snacks-Chips-Crackers-Cookies-Candy/5915077819?classType=VARIANT&athbdg=L1900",
    bulletPoints: [
      "Beautifully branded high-end packaging for an impressive gift.",
      "Convenient individual servings for on-the-go snacking.",
      "Includes a heartwarming greeting card for a personal touch.",
      "Spread joy with the perfect gift for adults, teens, and college students.",
      "Variety assortment of chips, crackers, cookies, and candy.",
      "Honesty is our main value - some snacks may be replaced for similar or more value.",
      "Gift a Snack - the ultimate snack box for any occasion.",
      "Mouthwatering treats inside - Airheads, Cheez It, Famous Amos, and more!",
    ],
  },
  {
    id: 4,
    name: "Ultimate Snack Box Variety Pack – 105 Count by Gift A Snack",
    shortName: "Ultimate Snack Box – 105 Count",
    description:
      "105-count pack with America's favorite candies, chips, crackers, and bars. Perfectly packaged in individual servings for on-the-go ease and ideal as a gift.",
    size: "105 ct",
    price: "$45.97",
    rating: 5,
    reviewCount: 286,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F936b74c9566f406ebebd96074d052d09?format=webp&width=800",
    walmartLink:
      "https://www.walmart.com/ip/Ultimate-Snack-Box-Variety-Pack-105-Count-by-Gift-A-Snack/14496505954?classType=VARIANT",
    bulletPoints: [
      "105-count pack with America's favorite candies, chips, crackers, and bars.",
      "Perfectly packaged in individual servings for on-the-go ease.",
      "Ideal gift for adults, teens, college students, or anyone who deserves a treat.",
    ],
  },
];

const features = [
  {
    title: "Huge Variety",
    description: "Over 30 types of snacks",
    icon: Package,
  },
  {
    title: "Luxury Packaging",
    description: "Perfect as a gift",
    icon: Gift,
  },
  {
    title: "For Everyone",
    description: "Kids, students, employees",
    icon: Users,
  },
  {
    title: "Fresh & Tasty",
    description: "Guaranteed quality",
    icon: Sparkles,
  },
  {
    title: "Easy to Order",
    description: "Fast shipping",
    icon: Zap,
  },
];

export default function Index() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const scrollToProducts = () => {
    document
      .getElementById("products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const openFirstProductModal = () => {
    setSelectedProduct(products[0]);
  };

  // Swipe to close functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -100; // Swipe down by more than 100px

    if (isDownSwipe) {
      setSelectedProduct(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      setShowFloatingButton(scrolled > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Control body overflow when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  // Robust TikTok embed initialization
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;

    const loadTikTokScript = () => {
      return new Promise<void>((resolve, reject) => {
        // Check if script already exists
        const existingScript = document.querySelector(
          'script[src*="tiktok.com/embed.js"]',
        );
        if (existingScript) {
          existingScript.remove();
        }

        // Create new script with cache-busting
        const script = document.createElement("script");
        script.src = `https://www.tiktok.com/embed.js?v=${Date.now()}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error("Failed to load TikTok script"));

        // Append to body instead of head
        document.body.appendChild(script);
      });
    };

    const initializeTikTokEmbeds = async () => {
      try {
        // Wait for script to load
        await loadTikTokScript();

        // Wait a bit for the script to initialize
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Try to render embeds with retry logic
        const attemptRender = () => {
          if ((window as any).tiktokEmbed?.lib?.render) {
            console.log("TikTok embeds initialized successfully");
            (window as any).tiktokEmbed.lib.render();
            return true;
          }
          return false;
        };

        // Retry logic
        const retry = () => {
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(
              `Retrying TikTok embed initialization (${retryCount}/${maxRetries})`,
            );

            if (!attemptRender()) {
              setTimeout(retry, 1000);
            }
          } else {
            console.error(
              "Failed to initialize TikTok embeds after maximum retries",
            );
          }
        };

        if (!attemptRender()) {
          retry();
        }
      } catch (error) {
        console.error("Error loading TikTok script:", error);
        // Retry the entire process
        if (retryCount < maxRetries) {
          setTimeout(initializeTikTokEmbeds, 2000);
        }
      }
    };

    // Start initialization after component mounts
    const timer = setTimeout(initializeTikTokEmbeds, 100);

    return () => {
      clearTimeout(timer);
      // Clean up script on unmount
      const script = document.querySelector(
        'script[src*="tiktok.com/embed.js"]',
      );
      if (script) {
        script.remove();
      }
    };
  }, []);

  // Reinitialize TikTok embeds when the section becomes visible
  useEffect(() => {
    const tiktokSection = document.querySelector(".tiktok-section");
    if (!tiktokSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Wait a bit, then try to reinitialize
            setTimeout(() => {
              if ((window as any).tiktokEmbed?.lib?.render) {
                console.log(
                  "Reinitializing TikTok embeds on section visibility",
                );
                (window as any).tiktokEmbed.lib.render();
              }
            }, 500);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(tiktokSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden py-6 px-4 sm:py-20 min-h-[90vh] flex items-center">
        {/* Advanced Geometric Background */}
        <div className="absolute inset-0">
          {/* Primary gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-50"></div>
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-logo-green/20 to-green-400/20 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-300/20 to-red-300/20 rounded-full blur-lg"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-lg"></div>
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left fade-in">
              {/* Logo with enhanced frame */}
              <div className="flex justify-center lg:justify-start mb-4 sm:mb-6">
                <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-5 rounded-2xl shadow-xl border border-gray-200/50 inline-block">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2Fcd932fcd18414ba798762d622c2b825c?format=webp&width=400&quality=90"
                    alt="Gift A Snack - Premium Snack Box Company Logo"
                    className="h-16 sm:h-20 lg:h-28 w-auto"
                    loading="eager"
                    fetchPriority="high"
                    width="200"
                    height="112"
                  />
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-logo-green/15 to-green-400/15 backdrop-blur-sm text-logo-green px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-logo-green/20">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">
                  Premium Quality Guaranteed
                </span>
                <span className="sm:hidden">Premium Quality</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-heading-red mb-4 sm:mb-6 leading-tight tracking-tight">
                <span className="block">Gift A Snack Box</span>
                <span className="block text-snack-dark-blue">
                  Perfect Gift for
                </span>
                <span className="block bg-gradient-to-r from-logo-green via-green-500 to-emerald-500 bg-clip-text text-transparent">
                  Snack Lovers
                </span>
              </h1>

              <p className="text-base sm:text-lg text-snack-dark-blue/80 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                <span className="hidden sm:inline">
                  Premium assortment of delicious snacks, beautifully packaged.
                  Perfect for gifts, office treats, and special occasions.
                </span>
                <span className="sm:hidden">
                  Premium snack boxes perfect for gifts and special occasions.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8">
                <button
                  onClick={scrollToProducts}
                  className="group relative bg-gradient-to-r from-logo-green to-green-500 hover:from-green-500 hover:to-emerald-500 text-white font-black px-8 sm:px-10 py-5 sm:py-6 rounded-2xl text-lg sm:text-xl transition-all duration-300 flex items-center justify-center gap-3 min-h-[64px] sm:min-h-[72px] touch-manipulation tap-highlight-none focus-visible-ring shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(155, 217, 91, 0.4))'
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-logo-green/50 to-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  <Package className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Shop Now</span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button className="border-2 border-logo-green text-logo-green hover:bg-logo-green hover:text-white font-bold px-8 sm:px-10 py-5 sm:py-6 rounded-2xl text-lg sm:text-xl transition-all duration-300 min-h-[64px] sm:min-h-[72px] touch-manipulation tap-highlight-none focus-visible-ring hover:shadow-lg transform hover:scale-105">
                  Learn More
                </button>
              </div>

              {/* Enhanced Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-sm text-snack-dark-blue/70">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-logo-green" />
                  <span className="hidden sm:inline font-medium">30+ Snack Varieties</span>
                  <span className="sm:hidden font-medium">30+ Varieties</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-logo-green" />
                  <span className="font-medium">Fast Shipping</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-logo-green" />
                  <span className="font-medium">Gift Ready</span>
                </div>
              </div>
            </div>

            {/* Enhanced Hero Image with 3D Effect */}
            <div className="slide-up relative">
              <div className="relative lg:scale-110 lg:translate-x-8">
                {/* 3D Background frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-logo-green/30 via-green-400/20 to-emerald-400/30 rounded-3xl transform rotate-3 blur-sm"></div>
                <div className="absolute -inset-2 bg-gradient-to-br from-orange-300/20 to-red-300/20 rounded-3xl transform -rotate-2 blur-sm"></div>

                {/* Main image container with overlap effect */}
                <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border border-white/50">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ffc09862a9f0941d4aeda13a8cb2480bc%2F9a927196010f464595d03440e3666d58?format=webp&width=900&quality=90"
                    alt="Gift A Snack premium variety snack boxes collection featuring chips, crackers, cookies and candy assortments"
                    className="relative z-10 w-full h-auto rounded-2xl transform transition-transform duration-500 hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                    width="700"
                    height="500"
                    style={{
                      filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))'
                    }}
                  />

                  {/* Floating elements for 3D effect */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-sm opacity-80 animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-md opacity-60 animate-pulse delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auto-Scrolling Banner Carousel */}
      <AutoScrollCarousel />

      {/* Enhanced Features & Benefits Section */}
      <section className="py-12 sm:py-20 px-4 relative overflow-hidden">
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-gray-50"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-br from-logo-green/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-gradient-to-br from-orange-300/20 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-heading-red mb-4 sm:mb-6 tracking-tight">
              Why Choose Gift A Snack Box?
            </h2>
            <p className="text-lg text-snack-dark-blue/80 max-w-2xl mx-auto leading-relaxed">
              Discover what makes our snack boxes the perfect choice for every
              occasion and celebration
            </p>
          </div>

          {/* Two Row Layout for Better Space Utilization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const colors = [
                'from-red-500 to-pink-500',
                'from-blue-500 to-cyan-500',
                'from-green-500 to-emerald-500',
                'from-purple-500 to-violet-500',
                'from-orange-500 to-yellow-500'
              ];

              return (
                <div
                  key={index}
                  className="group text-center transform transition-all duration-700 hover:scale-105"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
                  }}
                >
                  {/* Circular Icon Container with Colorful Design */}
                  <div className="relative mb-6">
                    {/* Outer glow ring */}
                    <div className={`absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-br ${colors[index]} rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>

                    {/* Main circular icon */}
                    <div className={`relative w-24 h-24 mx-auto bg-gradient-to-br ${colors[index]} rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:rotate-6`}>
                      <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />

                      {/* Inner highlight */}
                      <div className="absolute inset-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Floating particles effect */}
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse delay-300"></div>
                  </div>

                  {/* Title with enhanced styling */}
                  <h3 className="text-xl lg:text-2xl font-black text-heading-red mb-3 group-hover:text-snack-dark-blue transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description with better typography */}
                  <p className="text-base text-gray-600 leading-relaxed max-w-xs mx-auto group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className={`w-12 h-1 bg-gradient-to-r ${colors[index]} mx-auto mt-4 rounded-full opacity-60 group-hover:opacity-100 group-hover:w-16 transition-all duration-300`}></div>
                </div>
              );
            })}
          </div>

          {/* Additional visual element */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200/50">
              <Sparkles className="w-5 h-5 text-logo-green" />
              <span className="text-sm font-semibold text-gray-700">Trusted by thousands of happy customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Sizes Section */}
      <section
        id="products-section"
        className="py-6 sm:py-12 px-4 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-heading-red mb-2 sm:mb-3 tracking-tight">
              Choose Your Perfect Snack Box Size
            </h2>
            <p className="text-base text-snack-dark-blue/70 max-w-xl mx-auto">
              From small treats to large celebrations, we have the perfect size
              for every occasion
            </p>
          </div>

          {/* Mobile Horizontal Scroll - Modern E-commerce Design */}
          <div className="block sm:hidden">
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-6 w-max">
                {products.map((product, index) => {
                  const pricing = calculatePricing(product.price);
                  const savingsPercent = (
                    ((parseFloat(pricing.regularPrice.replace("$", "")) -
                      parseFloat(pricing.salePrice.replace("$", ""))) /
                      parseFloat(pricing.regularPrice.replace("$", ""))) *
                    100
                  ).toFixed(0);

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 w-[300px] flex-shrink-0 overflow-hidden group hover:scale-[1.03] active:scale-[0.98] relative"
                    >
                      {/* Full Image Fill with White Background */}
                      <div className="relative h-[320px] overflow-hidden bg-white p-4">
                        <img
                          src={`${product.image}&quality=95`}
                          alt={`${product.name} - Premium snack variety box with ${product.size} assorted treats perfect for gifting`}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl"
                          loading="lazy"
                          width="300"
                          height="320"
                        />

                        {/* Discount Badge - Enhanced */}
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-xl text-sm font-black shadow-xl">
                          -{savingsPercent}%
                        </div>

                        {/* Popular Badge */}
                        {index === 1 && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-xl">
                            🔥 Popular
                          </div>
                        )}

                        {/* Price Strip Overlay at Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 pb-6">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-2xl font-black text-white drop-shadow-lg">
                              {pricing.salePrice}
                            </span>
                            <span className="text-lg text-gray-200 line-through">
                              {pricing.regularPrice}
                            </span>
                          </div>
                          <div className="text-sm font-bold text-green-300">
                            Save $
                            {(
                              parseFloat(
                                pricing.regularPrice.replace("$", ""),
                              ) - parseFloat(pricing.salePrice.replace("$", ""))
                            ).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Compact Content Area */}
                      <div className="p-4 space-y-3">
                        {/* Product Title */}
                        <h3 className="font-bold text-gray-900 leading-tight text-base line-clamp-2 min-h-[40px]">
                          {product.shortName || product.name}
                        </h3>

                        {/* Box Contents Icons & Rating */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">🍪</span>
                            <span className="text-base">🍫</span>
                            <span className="text-base">🥨</span>
                            <span className="text-xs text-gray-500 ml-1 font-medium">
                              {product.size}
                            </span>
                          </div>

                          {/* Ratings - compact */}
                          {product.rating && (
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600 ml-1">
                                ({product.reviewCount})
                              </span>
                            </div>
                          )}
                        </div>

                        {/* View Details Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Scroll indicator */}
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                ← Swipe to see more boxes →
              </span>
            </div>
          </div>

          {/* Desktop/Tablet Grid - Modern E-commerce Design */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => {
              const pricing = calculatePricing(product.price);
              const savingsPercent = (
                ((parseFloat(pricing.regularPrice.replace("$", "")) -
                  parseFloat(pricing.salePrice.replace("$", ""))) /
                  parseFloat(pricing.regularPrice.replace("$", ""))) *
                100
              ).toFixed(0);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:scale-[1.03] cursor-pointer relative"
                >
                  {/* Full Image Fill with White Background */}
                  <div className="relative h-[240px] lg:h-[280px] overflow-hidden bg-white p-3 lg:p-4">
                    <img
                      src={`${product.image}&quality=95`}
                      alt={`${product.name} - Premium snack variety box with ${product.size} assorted treats perfect for gifting`}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl"
                      loading="lazy"
                      width="320"
                      height="280"
                    />

                    {/* Enhanced Discount Badge */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-2.5 py-1 rounded-xl text-xs font-black shadow-xl">
                      -{savingsPercent}%
                    </div>

                    {/* Popular Badge */}
                    {index === 1 && (
                      <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-xl text-xs font-bold shadow-lg">
                        🔥 Popular
                      </div>
                    )}

                    {/* Out of Stock Overlay */}
                    {product.outOfStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-t-2xl">
                        <div className="bg-white px-3 py-1.5 rounded-xl">
                          <span className="text-red-600 font-bold text-xs">
                            Out of Stock
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Area - 30% of card area, clean and minimal */}
                  <div className="p-3 lg:p-4 space-y-2 lg:space-y-3">
                    {/* Product Title - Bold, clean typography */}
                    <h3 className="font-bold text-gray-900 leading-tight text-sm lg:text-base line-clamp-2 min-h-[36px] lg:min-h-[40px]">
                      {product.shortName || product.name}
                    </h3>

                    {/* Box Contents Icons - playful visual */}
                    <div className="flex items-center gap-1">
                      <span className="text-sm lg:text-base">���</span>
                      <span className="text-sm lg:text-base">🍫</span>
                      <span className="text-sm lg:text-base">🥨</span>
                      <span className="text-xs text-gray-500 ml-2 font-medium">
                        {product.size}
                      </span>
                    </div>

                    {/* Price Section - Prominent and bold */}
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg lg:text-xl font-black text-red-500">
                          {pricing.salePrice}
                        </span>
                        <span className="text-sm lg:text-base text-gray-400 line-through">
                          {pricing.regularPrice}
                        </span>
                      </div>
                      <div className="text-xs lg:text-sm font-bold text-green-600">
                        Save $
                        {(
                          parseFloat(pricing.regularPrice.replace("$", "")) -
                          parseFloat(pricing.salePrice.replace("$", ""))
                        ).toFixed(2)}
                      </div>
                    </div>

                    {/* Ratings - compact */}
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 lg:w-3.5 lg:h-3.5 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">
                          ({product.reviewCount})
                        </span>
                      </div>
                    )}

                    {/* View Details Button - Vibrant, full-width */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 lg:py-3 rounded-xl text-xs lg:text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />
      {/* TikTok Videos Section */}
      <section
        className="tiktok-section py-6 sm:py-12 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-6 sm:mb-10 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
              Watch Gift A Snack on TikTok
            </h2>
            <p className="text-base text-gray-300 max-w-xl mx-auto">
              See our snack boxes in action and get inspired for your next order
            </p>
          </div>

          {/* Call to action for videos */}
          <div className="text-center mb-6 sm:mb-8">
            <a
              href="https://tiktok.com/@nut.cravings"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Play className="w-4 h-4" />
              Follow us on TikTok
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* First TikTok Video */}
            <div
              className="tiktok-embed-container mb-8 lg:mb-0"
              dangerouslySetInnerHTML={{
                __html: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nut.cravings/video/7522097145223187725" data-video-id="7522097145223187725" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@nut.cravings" href="https://www.tiktok.com/@nut.cravings?refer=embed">@nut.cravings</a> Gift A Snack - Assorted Healthy Treats, Granola Bars, Chips, Candies &amp; More | Perfect for Gifting &amp; Care Packages <a title="giftasnack" target="_blank" href="https://www.tiktok.com/tag/giftasnack?refer=embed">#GiftASnack</a> <a title="snackbox" target="_blank" href="https://www.tiktok.com/tag/snackbox?refer=embed">#SnackBox</a> <a title="healthytreats" target="_blank" href="https://www.tiktok.com/tag/healthytreats?refer=embed">#HealthyTreats</a> <a title="carepackage" target="_blank" href="https://www.tiktok.com/tag/carepackage?refer=embed">#CarePackage</a> <a title="giftboxideas" target="_blank" href="https://www.tiktok.com/tag/giftboxideas?refer=embed">#GiftBoxIdeas</a> <a title="snacklovers" target="_blank" href="https://www.tiktok.com/tag/snacklovers?refer=embed">#SnackLovers</a> <a title="granolabars" target="_blank" href="https://www.tiktok.com/tag/granolabars?refer=embed">#GranolaBars</a> <a title="chipsandcandy" target="_blank" href="https://www.tiktok.com/tag/chipsandcandy?refer=embed">#ChipsAndCandy</a> <a title="snacktime" target="_blank" href="https://www.tiktok.com/tag/snacktime?refer=embed">#SnackTime</a> <a title="foodgiftbox" target="_blank" href="https://www.tiktok.com/tag/foodgiftbox?refer=embed">#FoodGiftBox</a> <a title="assortedsnacks" target="_blank" href="https://www.tiktok.com/tag/assortedsnacks?refer=embed">#AssortedSnacks</a> <a title="giftingmadeeasy" target="_blank" href="https://www.tiktok.com/tag/giftingmadeeasy?refer=embed">#GiftingMadeEasy</a> <a title="snacksurprise" target="_blank" href="https://www.tiktok.com/tag/snacksurprise?refer=embed">#SnackSurprise</a> <a title="collegecarepackage" target="_blank" href="https://www.tiktok.com/tag/collegecarepackage?refer=embed">#CollegeCarePackage</a> <a title="corporategifts" target="_blank" href="https://www.tiktok.com/tag/corporategifts?refer=embed">#CorporateGifts</a> <a title="snackaddict" target="_blank" href="https://www.tiktok.com/tag/snackaddict?refer=embed">#SnackAddict</a> <a target="_blank" title="♬ Product introduction, commercials, information, summer(1284254) - yutaka.T" href="https://www.tiktok.com/music/Product-introduction-commercials-information-summer-1284254-7133249539493857281?refer=embed">♬ Product introduction, commercials, information, summer(1284254) - yutaka.T</a> </section> </blockquote>`,
              }}
            />

            {/* Second TikTok Video */}
            <div
              className="tiktok-embed-container mb-8 lg:mb-0"
              dangerouslySetInnerHTML={{
                __html: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nut.cravings/video/7521731881373682958" data-video-id="7521731881373682958" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@nut.cravings" href="https://www.tiktok.com/@nut.cravings?refer=embed">@nut.cravings</a> Gift A Snack - Assorted Healthy Treats, Granola Bars, Chips, Candies &amp; More | Perfect for Gifting &amp; Care Packages <a title="giftasnack" target="_blank" href="https://www.tiktok.com/tag/giftasnack?refer=embed">#GiftASnack</a><a title="snackbox" target="_blank" href="https://www.tiktok.com/tag/snackbox?refer=embed">#SnackBox</a><a title="healthysnacking" target="_blank" href="https://www.tiktok.com/tag/healthysnacking?refer=embed">#HealthySnacking</a><a title="carepackage" target="_blank" href="https://www.tiktok.com/tag/carepackage?refer=embed">#CarePackage</a><a title="snacklovers" target="_blank" href="https://www.tiktok.com/tag/snacklovers?refer=embed">#SnackLovers</a><a title="giftideas" target="_blank" href="https://www.tiktok.com/tag/giftideas?refer=embed">#GiftIdeas</a><a title="snacktime" target="_blank" href="https://www.tiktok.com/tag/snacktime?refer=embed">#SnackTime</a><a title="treatyourself" target="_blank" href="https://www.tiktok.com/tag/treatyourself?refer=embed">#TreatYourself</a> <a target="_blank" title="♬ Product introduction, commercials, information, summer(1284254) - yutaka.T" href="https://www.tiktok.com/music/Product-introduction-commercials-information-summer-1284254-7133249539493857281?refer=embed">♬ Product introduction, commercials, information, summer(1284254) - yutaka.T</a> </section> </blockquote>`,
              }}
            />

            {/* Third TikTok Video */}
            <div
              className="tiktok-embed-container mb-8 lg:mb-0"
              dangerouslySetInnerHTML={{
                __html: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nut.cravings/video/7520248009863580983" data-video-id="7520248009863580983" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@nut.cravings" href="https://www.tiktok.com/@nut.cravings?refer=embed">@nut.cravings</a> Gift A Snack - Assorted Healthy Treats, Granola Bars, Chips, Candies &amp; More | Perfect for Gifting &amp; Care Packages <a title="giftasnack" target="_blank" href="https://www.tiktok.com/tag/giftasnack?refer=embed">#GiftASnack</a><a title="snackbox" target="_blank" href="https://www.tiktok.com/tag/snackbox?refer=embed">#SnackBox</a><a title="healthysnacks" target="_blank" href="https://www.tiktok.com/tag/healthysnacks?refer=embed">#HealthySnacks</a><a title="carepackage" target="_blank" href="https://www.tiktok.com/tag/carepackage?refer=embed">#CarePackage</a><a title="snackgiftbox" target="_blank" href="https://www.tiktok.com/tag/snackgiftbox?refer=embed">#SnackGiftBox</a><a title="treatyourself" target="_blank" href="https://www.tiktok.com/tag/treatyourself?refer=embed">#TreatYourself</a><a title="snacktime" target="_blank" href="https://www.tiktok.com/tag/snacktime?refer=embed">#SnackTime</a><a title="granolabars" target="_blank" href="https://www.tiktok.com/tag/granolabars?refer=embed">#GranolaBars</a><a title="snacklover" target="_blank" href="https://www.tiktok.com/tag/snacklover?refer=embed">#SnackLover</a><a title="giftingideas" target="_blank" href="https://www.tiktok.com/tag/giftingideas?refer=embed">#GiftingIdeas</a> <a title="tiktokmademebuyit" target="_blank" href="https://www.tiktok.com/tag/tiktokmademebuyit?refer=embed">#TikTokMadeMeBuyIt</a> <a target="_blank" title="♬ Cowboy Sunday - Amanda Rosa" href="https://www.tiktok.com/music/Cowboy-Sunday-7057541372371093505?refer=embed">♬ Cowboy Sunday - Amanda Rosa</a> </section> </blockquote>`,
              }}
            />
          </div>
        </div>
      </section>

      {/* Final Call-to-Action Section */}
      <section className="py-6 sm:py-12 px-4 bg-gradient-to-br from-blue-100 via-blue-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-logo-green/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="card-enhanced p-4 sm:p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-heading-red mb-3 sm:mb-4 tracking-tight">
              Ready to Experience the Tastiest Gift A Snack Box?
            </h2>
            <p className="text-base text-snack-dark-blue/80 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied customers. Choose your perfect size
              and order now from Walmart.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4 sm:mb-6">
              <button
                onClick={scrollToProducts}
                className="bg-logo-green hover:bg-green-500 text-white font-bold px-6 sm:px-8 py-4 sm:py-3 rounded-xl text-base button-enhanced flex items-center justify-center gap-2 min-h-[56px] sm:min-h-[48px]"
              >
                <ShoppingCart className="w-5 h-5" />
                Order Now
              </button>
              <button
                onClick={openFirstProductModal}
                className="border-2 border-logo-green text-logo-green hover:bg-logo-green hover:text-white font-bold px-6 sm:px-8 py-4 sm:py-3 rounded-xl text-base transition-all duration-300 min-h-[56px] sm:min-h-[48px]"
              >
                View Products
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-snack-dark-blue/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-logo-green" />
                30+ Premium Snacks
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-logo-green" />
                Gift-Ready Packaging
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-logo-green" />
                Fast US Shipping
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-logo-green" />
                Satisfaction Guaranteed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Boosters */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Fast Shipping */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 bg-logo-green/10 text-logo-green px-4 py-2 rounded-xl">
              <Truck className="w-5 h-5" />
              <span className="text-sm font-semibold">
                Fast & Guaranteed Shipping Across the United States
              </span>
            </div>
          </div>

          {/* Payment Icons */}
          <div className="text-center">
            <p className="text-gray-600 mb-4 text-sm font-semibold">
              Secure Payment Methods
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="w-16 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg hover:shadow-xl transition-shadow">
                VISA
              </div>
              <div className="w-16 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg hover:shadow-xl transition-shadow">
                MC
              </div>
              <div className="w-16 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg hover:shadow-xl transition-shadow">
                PayPal
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-snack-dark-blue text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-heading-red">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-logo-green transition-colors text-sm"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#products-section"
                    className="hover:text-logo-green transition-colors text-sm"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-logo-green transition-colors text-sm"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-logo-green transition-colors text-sm"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-heading-red">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://tiktok.com/@nut.cravings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-logo-green transition-colors text-sm"
                >
                  TikTok
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-logo-green transition-colors text-sm"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-logo-green transition-colors text-sm"
                >
                  Facebook
                </a>
              </div>
            </div>

            {/* Walmart Link */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-heading-red">
                Order Now
              </h3>
              <a
                href={products[0].walmartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-logo-green hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-semibold button-enhanced"
              >
                Order from Walmart
              </a>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-4 text-center">
            <p className="text-sm">
              &copy; 2025 Snack Box. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Buy Now Button (Desktop & Mobile) */}
      {showFloatingButton && (
        <button
          onClick={openFirstProductModal}
          className="fixed bottom-4 right-4 sm:bottom-4 sm:right-4 bg-logo-green hover:bg-green-500 text-white font-bold px-4 sm:px-4 py-3 sm:py-2.5 rounded-xl sm:rounded-xl shadow-xl z-50 transition-all duration-200 transform hover:scale-105 button-enhanced flex items-center gap-2 min-h-[56px] sm:min-h-[44px] min-w-[56px] sm:min-w-[44px]"
        >
          <ShoppingCart className="w-5 h-5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline text-sm">Buy Now</span>
          <span className="sm:hidden text-sm font-semibold">Buy</span>
        </button>
      )}

      {/* Restructured Modal - 40/60 Desktop Layout */}
      {selectedProduct && (
        <>
          {/* Modal Backdrop with Blur Effect */}
          <div
            className="fixed inset-0 bg-black/60 z-50"
            style={{ backdropFilter: 'blur(5px)' }}
            onClick={() => setSelectedProduct(null)}
          ></div>

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8">
            <div
              className="bg-white w-full h-full lg:w-auto lg:h-auto lg:max-w-6xl lg:max-h-[90vh] shadow-2xl lg:rounded-3xl relative overflow-hidden"
              style={{
                animation: "modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                maxHeight: "calc(100vh - 40px)"
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 group-hover:scale-110 transition-all" />
              </button>

              {/* Mobile swipe indicator */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-2 mb-4 lg:hidden"></div>

              {/* Desktop Layout: 40% Image | 60% Details */}
              <div className="flex flex-col lg:grid lg:grid-cols-5 h-full">
                {/* Image Section - 40% on Desktop, Full Width on Mobile */}
                <div className="lg:col-span-2 relative bg-gradient-to-br from-gray-50 to-gray-100 lg:bg-gray-50">
                  {/* Mobile: Full Width Image at Top */}
                  <div className="lg:hidden w-full h-[40vh] relative p-4 flex items-center justify-center">
                    <div className="relative w-full max-w-sm mx-auto h-full">
                      <img
                        src={`${selectedProduct.image}&quality=90`}
                        alt={`${selectedProduct.name} - Detailed view`}
                        className="w-full h-full object-contain rounded-2xl shadow-lg"
                        loading="lazy"
                        width="400"
                        height="400"
                        style={{
                          animation: "imageZoomIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
                          filter: "drop-shadow(0 20px 25px rgba(0,0,0,0.15))"
                        }}
                      />
                      {/* Mobile Discount Badge */}
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1.5 rounded-xl text-sm font-black shadow-lg">
                        -{(
                          ((parseFloat(
                            calculatePricing(selectedProduct.price).regularPrice.replace("$", "")
                          ) - parseFloat(
                            calculatePricing(selectedProduct.price).salePrice.replace("$", "")
                          )) / parseFloat(
                            calculatePricing(selectedProduct.price).regularPrice.replace("$", "")
                          )) * 100
                        ).toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Fixed Height Image Container - 100% of modal height */}
                  <div className="hidden lg:flex h-full p-8 items-center justify-center relative">
                    <div className="relative w-full h-full max-w-md mx-auto flex items-center justify-center">
                      <img
                        src={`${selectedProduct.image}&quality=90`}
                        alt={`${selectedProduct.name} - Detailed view`}
                        className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                        loading="lazy"
                        width="400"
                        height="400"
                        style={{
                          animation: "imageZoomIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
                          filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.2))"
                        }}
                      />
                      {/* Desktop Discount Badge */}
                      <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-black shadow-xl">
                        -{(
                          ((parseFloat(
                            calculatePricing(selectedProduct.price).regularPrice.replace("$", "")
                          ) - parseFloat(
                            calculatePricing(selectedProduct.price).salePrice.replace("$", "")
                          )) / parseFloat(
                            calculatePricing(selectedProduct.price).regularPrice.replace("$", "")
                          )) * 100
                        ).toFixed(0)}%
                      </div>
                      {/* Premium Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-2xl pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Details Section - 60% on Desktop */}
                <div className="lg:col-span-3 flex flex-col h-full relative">
                  {/* Scrollable Content Area */}
                  <div
                    className="flex-1 overflow-y-auto p-4 lg:p-8 pb-28 lg:pb-32"
                    style={{
                      maxHeight: "calc(100vh - 40px)"
                    }}
                  >
                    {/* Title + Rating */}
                    <div className="mb-6">
                      <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight mb-4">
                        {selectedProduct.shortName || selectedProduct.name}
                      </h2>

                      {/* Rating with gold stars */}
                      {selectedProduct.rating && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${i < selectedProduct.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 font-medium">
                            ({selectedProduct.reviewCount} reviews)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price Section */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100">
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-4xl lg:text-5xl font-black text-red-500">
                          {calculatePricing(selectedProduct.price).salePrice}
                        </span>
                        <span className="text-2xl lg:text-3xl text-gray-400 line-through">
                          {calculatePricing(selectedProduct.price).regularPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                          Save $
                          {(
                            parseFloat(calculatePricing(selectedProduct.price).regularPrice.replace("$", "")) -
                            parseFloat(calculatePricing(selectedProduct.price).salePrice.replace("$", ""))
                          ).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🍪</span>
                          <span className="text-lg">🍫</span>
                          <span className="text-lg">🥨</span>
                          <span className="text-sm text-gray-500 ml-2 font-medium">
                            {selectedProduct.size}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Product Description */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">About this product</h3>
                      {selectedProduct.bulletPoints ? (
                        <ul className="space-y-4">
                          {selectedProduct.bulletPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </div>
                              <span className="text-base text-gray-700 leading-relaxed">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-700 leading-relaxed text-base">
                          {selectedProduct.description}
                        </p>
                      )}
                    </div>

                    {/* What's Included */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What's included</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Package className="w-5 h-5 text-green-600" />
                          <span className="text-base text-gray-700">Premium variety of snacks ({selectedProduct.size})</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Gift className="w-5 h-5 text-green-600" />
                          <span className="text-base text-gray-700">Beautiful gift packaging</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-base text-gray-700">Greeting card included</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Truck className="w-5 h-5 text-green-600" />
                          <span className="text-base text-gray-700">Fast shipping across the US</span>
                        </div>
                      </div>
                    </div>

                    {/* Shipping & Returns */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Shipping & Returns</h3>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                          <span className="text-base text-gray-700">Free shipping on orders over $35</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                          <span className="text-base text-gray-700">30-day satisfaction guarantee</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                          <span className="text-base text-gray-700">Secure packaging guarantee</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sticky Buy Button - Inside Details Column (Desktop) / Fixed at Bottom (Mobile) */}
                  <div className="lg:sticky lg:bottom-0 fixed bottom-0 left-0 right-0 lg:relative bg-white border-t border-gray-200 p-4 lg:p-6 shadow-lg lg:shadow-none lg:border-t lg:rounded-b-3xl z-40">
                    <a
                      href={selectedProduct.walmartLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 lg:py-5 text-center rounded-2xl text-lg lg:text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                      <ShoppingCart className="w-6 h-6" />
                      <div className="flex flex-col">
                        <span className="font-black">BUY NOW ON</span>
                        <span className="font-black text-yellow-300">WALMART</span>
                      </div>
                      <div className="bg-yellow-400 text-blue-800 px-3 py-1.5 rounded-full text-base font-black">
                        {calculatePricing(selectedProduct.price).salePrice}
                      </div>
                    </a>

                    {/* Trust indicators */}
                    <div className="flex items-center justify-center gap-4 lg:gap-6 mt-3 text-xs lg:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                        <span className="hidden sm:inline">Fast Shipping</span>
                        <span className="sm:hidden">Shipping</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                        <span className="hidden sm:inline">Secure Payment</span>
                        <span className="sm:hidden">Secure</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                        <span className="hidden sm:inline">Easy Returns</span>
                        <span className="sm:hidden">Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
