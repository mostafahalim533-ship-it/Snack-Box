import { useState, useEffect } from 'react';
import { X, Truck, Star, ShoppingCart, Package, Gift, Users, Sparkles, Zap, CheckCircle } from 'lucide-react';
import TestimonialsCarousel from '../components/TestimonialsCarousel';

const products = [
  {
    id: 1,
    name: "Gift a Snack Chip Variety Snack Box - 35 Count",
    description: "A delicious assortment of individually wrapped snacks including chips, crackers, cookies, and candy. Perfect for gifting, office snacks, or on-the-go treats.",
    size: "35 ct",
    price: "$22.97",
    image: "https://cdn.builder.io/api/v1/image/assets%2Ffc09862a9f0941d4aeda13a8cb2480bc%2F76e7178c1b7c45408f2a30a4b0e82398?format=webp&width=800",
    walmartLink: "https://goto.walmart.com/c/5610446/565706/9383?veh=aff&sharedid=mp_16964_2016489964_q6f5b_h7ap1ka_A0FC4ECE545F34A0AC91A1F0010E9041&u=https%3A%2F%2Fwww.walmart.com%2Fip%2F5298521902%3FselectedSellerId%3D16964%26selectedOfferId%3DA0FC4ECE545F34A0AC91A1F0010E9041"
  },
  {
    id: 2,
    name: "Gift a Snack Chip Variety Snack Box - 42 Count",
    description: "Includes 42 premium snacks from brands like Airheads, Cheez It, and Famous Amos. Comes in high-end packaging with a greeting card. Great for students, employees, and family members.",
    size: "42 ct",
    price: "$23.96",
    image: "https://cdn.builder.io/api/v1/image/assets%2Ffc09862a9f0941d4aeda13a8cb2480bc%2F33bc0d42cb3a44dcae9b83d1dbaba20d?format=webp&width=800",
    walmartLink: "https://goto.walmart.com/c/5610446/565706/9383?veh=aff&sharedid=mp_16964_2016489964_ai3se_ims37kq_ACF1D44511903907A6802D948A4EFE22&u=https%3A%2F%2Fwww.walmart.com%2Fip%2F6277108895%3FselectedSellerId%3D16964%26selectedOfferId%3DACF1D44511903907A6802D948A4EFE22"
  },
  {
    id: 3,
    name: "Gift a Snack Chip Variety Snack Box - 52 Count",
    description: "52-count snack box filled with a diverse variety of sweet and salty treats. Ideal for care packages, corporate gifts, or family movie nights.",
    size: "52 ct",
    price: "$31.46",
    image: "https://cdn.builder.io/api/v1/image/assets%2Ffc09862a9f0941d4aeda13a8cb2480bc%2Fd638853bf5cf4db3a185ce3a305f2a54?format=webp&width=800",
    walmartLink: "https://goto.walmart.com/c/5610446/565706/9383?veh=aff&sharedid=mp_16964_2016489964_gjxxi_oa60h68_B7E6E4A96EDA37A6A1D11E1083EBED26&u=https%3A%2F%2Fwww.walmart.com%2Fip%2F5915077819%3FselectedSellerId%3D16964%26selectedOfferId%3DB7E6E4A96EDA37A6A1D11E1083EBED26"
  }
];

const features = [
  {
    title: "Huge Variety",
    description: "Over 30 types of snacks",
    icon: Package
  },
  {
    title: "Luxury Packaging",
    description: "Perfect as a gift",
    icon: Gift
  },
  {
    title: "For Everyone",
    description: "Kids, students, employees",
    icon: Users
  },
  {
    title: "Fresh & Tasty",
    description: "Guaranteed quality",
    icon: Sparkles
  },
  {
    title: "Easy to Order",
    description: "Fast shipping",
    icon: Zap
  }
];


const tiktokVideos = [
  {
    cite: "https://www.tiktok.com/@nut.cravings/video/7522097145223187725",
    videoId: "7522097145223187725"
  },
  {
    cite: "https://www.tiktok.com/@nut.cravings/video/7521731881373682958",
    videoId: "7521731881373682958"
  },
  {
    cite: "https://www.tiktok.com/@nut.cravings/video/7517286609797025054",
    videoId: "7517286609797025054"
  }
];

export default function Index() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const scrollToProducts = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openFirstProductModal = () => {
    setSelectedProduct(products[0]);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      setShowFloatingButton(scrolled > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'fill-snack-gold text-snack-gold' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-50 py-24 px-4 sm:py-40">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left fade-in">
              <div className="inline-flex items-center gap-2 bg-snack-green/10 text-snack-green px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <CheckCircle className="w-4 h-4" />
                Premium Quality Guaranteed
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-snack-red mb-6 leading-tight">
                Snack Box
                <span className="block text-snack-dark-blue">Perfect Gift for</span>
                <span className="block bg-gradient-to-r from-snack-green to-green-600 bg-clip-text text-transparent">Snack Lovers</span>
              </h1>

              <p className="text-lg sm:text-xl text-snack-dark-blue/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Premium assortment of delicious snacks, beautifully packaged. Perfect for gifts, office treats, and special occasions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <button
                  onClick={scrollToProducts}
                  className="bg-snack-green hover:bg-green-600 text-white font-bold px-8 py-4 rounded-2xl text-lg button-enhanced flex items-center justify-center gap-2"
                >
                  <Package className="w-5 h-5" />
                  Shop Now
                </button>
                <button className="border-2 border-snack-green text-snack-green hover:bg-snack-green hover:text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-300">
                  Learn More
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-snack-dark-blue/60">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-snack-green" />
                  30+ Snack Varieties
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-snack-green" />
                  Fast Shipping
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-snack-green" />
                  Gift Ready
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-snack-green/20 to-green-400/20 rounded-2xl transform rotate-6"></div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ffc09862a9f0941d4aeda13a8cb2480bc%2F9a927196010f464595d03440e3666d58?format=webp&width=800"
                  alt="Snack Box Collection"
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl image-hover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-snack-red mb-4">
              Why Choose Snack Box?
            </h2>
            <p className="text-lg text-snack-dark-blue/70 max-w-2xl mx-auto">
              Discover what makes our snack boxes the perfect choice for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center card-enhanced p-8 hover:scale-105 transition-all duration-300">
                  <div className="feature-icon mb-6">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-snack-dark-blue mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Sizes Section */}
      <section id="products-section" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-snack-red mb-4">
              Choose Your Perfect Box Size
            </h2>
            <p className="text-lg text-snack-dark-blue/70 max-w-2xl mx-auto">
              From small treats to large celebrations, we have the perfect size for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={product.id} className="card-enhanced overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover image-hover"
                  />
                  {index === 1 && (
                    <div className="absolute top-4 right-4 bg-snack-green text-white px-3 py-1 rounded-full text-sm font-bold">
                      Popular
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-snack-dark-blue mb-4 line-clamp-2 group-hover:text-snack-green transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-3xl font-bold text-snack-red">{product.price}</span>
                    <span className="text-lg text-white font-semibold bg-snack-green px-4 py-2 rounded-full">{product.size}</span>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-snack-green hover:bg-green-600 text-white font-bold py-4 rounded-2xl button-enhanced text-lg flex items-center justify-center gap-2"
                  >
                    <Package className="w-5 h-5" />
                    Open Your Box
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-snack-red mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-snack-dark-blue/70 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-enhanced p-8 hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-snack-green to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-snack-dark-blue text-lg">{testimonial.name}</h4>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed relative">
                  <span className="text-snack-green text-4xl absolute -top-2 -left-2 opacity-20">“</span>
                  {testimonial.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TikTok Videos Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-100/50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-snack-red mb-4">
              Watch Snack Box on TikTok
            </h2>
            <p className="text-lg text-snack-dark-blue/70 max-w-2xl mx-auto">
              See our snack boxes in action and get inspired for your next order
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiktokVideos.map((video, index) => (
              <div key={index} className="card-enhanced overflow-hidden hover:scale-105 transition-all duration-300 bg-white">
                <div className="aspect-[9/16] w-full max-w-[400px] mx-auto">
                  <blockquote
                    className="tiktok-embed w-full h-full"
                    cite={video.cite}
                    data-video-id={video.videoId}
                    style={{
                      maxWidth: '100%',
                      minWidth: '300px',
                      height: '100%',
                      margin: '0',
                      borderRadius: '12px',
                      display: 'block'
                    }}
                  >
                    <section></section>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call-to-Action Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-100 via-blue-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-snack-green/10 to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="card-enhanced p-12 bg-white/80 backdrop-blur-sm">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-snack-red mb-6">
              Ready to Experience the Tastiest Snack Box?
            </h2>
            <p className="text-xl text-snack-dark-blue/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers. Choose your perfect size and order now from Walmart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={scrollToProducts}
                className="bg-snack-green hover:bg-green-600 text-white font-bold px-12 py-4 rounded-2xl text-xl button-enhanced flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-6 h-6" />
                Order Now
              </button>
              <button
                onClick={openFirstProductModal}
                className="border-2 border-snack-green text-snack-green hover:bg-snack-green hover:text-white font-bold px-12 py-4 rounded-2xl text-xl transition-all duration-300"
              >
                View Products
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-snack-dark-blue/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-snack-green" />
                30+ Premium Snacks
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-snack-green" />
                Gift-Ready Packaging
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-snack-green" />
                Fast US Shipping
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-snack-green" />
                Satisfaction Guaranteed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Boosters */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Fast Shipping */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-4 bg-snack-green/10 text-snack-green px-8 py-4 rounded-2xl">
              <Truck className="w-8 h-8" />
              <span className="text-lg font-semibold">Fast & Guaranteed Shipping Across the United States</span>
            </div>
          </div>

          {/* Payment Icons */}
          <div className="text-center">
            <p className="text-gray-600 mb-8 text-lg font-semibold">Secure Payment Methods</p>
            <div className="flex justify-center items-center gap-6">
              <div className="w-20 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg hover:shadow-xl transition-shadow">
                VISA
              </div>
              <div className="w-20 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg hover:shadow-xl transition-shadow">
                MC
              </div>
              <div className="w-20 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg hover:shadow-xl transition-shadow">
                PayPal
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-snack-dark-blue text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-snack-green transition-colors text-lg">Home</a></li>
                <li><a href="#products-section" className="hover:text-snack-green transition-colors text-lg">Products</a></li>
                <li><a href="#" className="hover:text-snack-green transition-colors text-lg">Testimonials</a></li>
                <li><a href="#" className="hover:text-snack-green transition-colors text-lg">Contact Us</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
              <div className="flex gap-6">
                <a href="https://tiktok.com/@nut.cravings" target="_blank" rel="noopener noreferrer" className="hover:text-snack-green transition-colors text-lg">
                  TikTok
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-snack-green transition-colors text-lg">
                  Instagram
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-snack-green transition-colors text-lg">
                  Facebook
                </a>
              </div>
            </div>

            {/* Walmart Link */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Order Now</h3>
              <a
                href={products[0].walmartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-snack-green hover:bg-green-600 text-white px-8 py-3 rounded-2xl transition-colors duration-200 text-lg font-semibold button-enhanced"
              >
                Order from Walmart
              </a>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-10 text-center">
            <p className="text-lg">&copy; 2025 Snack Box. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Buy Now Button (Desktop & Mobile) */}
      {showFloatingButton && (
        <button
          onClick={openFirstProductModal}
          className="fixed bottom-6 right-6 bg-snack-green hover:bg-green-600 text-white font-bold px-6 py-4 rounded-2xl shadow-2xl z-50 transition-all duration-200 transform hover:scale-105 button-enhanced flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline">Buy Now</span>
          <span className="sm:hidden">Buy</span>
        </button>
      )}

      {/* Enhanced Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl slide-up border border-snack-green/20">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-snack-green/5 to-snack-green/10 p-6 border-b border-snack-green/20">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-snack-green rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-snack-dark-blue">Product Details</h3>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-3 hover:bg-red-50 hover:text-red-500 rounded-full transition-all duration-200 group"
                >
                  <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            <div className="p-8 overflow-y-auto max-h-[calc(95vh-120px)]">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Product Image */}
                <div className="">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-snack-green/5 to-snack-green/10 p-4">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover rounded-xl image-hover"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-3xl font-bold text-snack-dark-blue mb-4 leading-tight">
                      {selectedProduct.name}
                    </h4>

                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl font-bold text-snack-red">{selectedProduct.price}</span>
                      <span className="bg-snack-green text-white font-bold px-4 py-2 rounded-full text-lg">
                        {selectedProduct.size}
                      </span>
                    </div>
                  </div>

                  <div className="bg-snack-light-gray/50 p-6 rounded-2xl">
                    <h5 className="font-semibold text-snack-dark-blue mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-snack-green" />
                      Product Description
                    </h5>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h5 className="font-semibold text-snack-dark-blue flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-snack-green" />
                      What's Included
                    </h5>
                    <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-snack-green" />
                        Premium variety of snacks
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-snack-green" />
                        Beautiful gift packaging
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-snack-green" />
                        Greeting card included
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={selectedProduct.walmartLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-snack-green to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 text-center rounded-2xl text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    Buy Now on Walmart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
