import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "The best gift I've ever given my friend! Elegant packaging and the products are fresh and super tasty.",
    name: "Sarah M.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "I bought the box for my office and everyone loved the wide variety of snacks.",
    name: "Mike R.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Fast delivery, excellent quality, and I recommend it to everyone.",
    name: "Jessica L.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Perfect for our family movie nights! The kids absolutely love the variety of treats in each box.",
    name: "Amanda K.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Outstanding quality and presentation. This snack box exceeded all my expectations!",
    name: "David P.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Great customer service and amazing products. Will definitely order again for upcoming holidays.",
    name: "Lisa T.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? "fill-snack-gold text-snack-gold" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default function TestimonialsCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-sliding testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Increased to 6 seconds for better readability

    return () => clearInterval(interval);
  }, []);

  // Navigation functions
  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  return (
    <section className="py-10 sm:py-20 px-4 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-heading-red mb-2 sm:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg text-snack-dark-blue/70 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Desktop: Show 3 testimonials */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {[0, 1, 2].map((offset) => {
            const testimonialIndex =
              (currentTestimonial + offset) % testimonials.length;
            const testimonial = testimonials[testimonialIndex];
            return (
              <div
                key={testimonialIndex}
                className="card-enhanced p-6 lg:p-8 hover:scale-105 transition-all duration-500"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    className="w-16 h-16 rounded-full object-cover mr-4 shadow-lg border-2 border-logo-green/20"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold text-heading-red text-lg">
                      {testimonial.name}
                    </h4>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
                <p className="text-gray-700 text-base lg:text-lg leading-relaxed relative">
                  <span className="text-logo-green text-4xl absolute -top-2 -left-2 opacity-20">
                    "
                  </span>
                  {testimonial.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile: Single testimonial with swipe navigation */}
        <div className="md:hidden relative">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="card-enhanced p-6 transition-all duration-500 relative">
              {/* Swipe indicator */}
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 bg-logo-green/10 text-logo-green px-3 py-1 rounded-full text-xs">
                  <span>← Swipe for more reviews →</span>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={`${testimonials[currentTestimonial].name} avatar`}
                  className="w-16 h-16 rounded-full object-cover mr-4 shadow-lg border-2 border-logo-green/20"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-heading-red text-lg">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <StarRating
                    rating={testimonials[currentTestimonial].rating}
                  />
                </div>
              </div>
              <p className="text-gray-700 text-base leading-relaxed relative">
                <span className="text-logo-green text-4xl absolute -top-2 -left-2 opacity-20">
                  "
                </span>
                {testimonials[currentTestimonial].text}
              </p>
            </div>
          </div>

          {/* Navigation arrows for mobile */}
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-logo-green p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-logo-green p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-6 sm:mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentTestimonial
                  ? "bg-logo-green shadow-lg"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile testimonial counter */}
        <div className="md:hidden text-center mt-4">
          <span className="text-sm text-gray-600">
            {currentTestimonial + 1} of {testimonials.length}
          </span>
        </div>
      </div>
    </section>
  );
}
