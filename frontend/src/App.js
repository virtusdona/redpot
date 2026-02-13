import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import "./App.css";

// Constants for buy links
const BUY_LINK = "PLACEHOLDER_LINK";

// Asset URLs - using original URLs with proper encoding
const ASSETS = {
  logoVideo: "https://customer-assets.emergentagent.com/job_65e85e7a-4b3f-463c-875b-799d45d15f52/artifacts/aiivcbzs_logo%20animation.mp4",
  soloSlider: "/solo-slider.png",
  doubleSlider: "/double-slider.png",
};

// Products data
const PRODUCTS = [
  {
    id: "solo",
    name: "SOLO BOMB",
    price: "₱65",
    description: "A birria brisket slider made with tender shredded beef, Filipino chiles, and melted cheese, finished with a light glaze and served with warm consome for dipping.",
    bgWord: "SOLO",
    image: ASSETS.soloSlider,
  },
  {
    id: "double",
    name: "DOUBLE BOMB",
    price: "₱100",
    description: "Two birria brisket sliders with melted cheese and a savory glaze, paired with a side of rich consome for a fuller, shareable serving.",
    bgWord: "DOUBLE",
    image: ASSETS.doubleSlider,
  },
];

// Navigation Component
const Navigation = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "order", label: "Order" },
    { id: "about", label: "About" },
  ];

  return (
    <nav
      data-testid="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-brand-bg/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            data-testid="nav-logo"
            onClick={() => scrollToSection("home")}
            className="font-heading font-bold text-xl md:text-2xl text-brand-red tracking-wider hover:brightness-110 transition-all"
          >
            RED POT
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(1).map((link) => (
              <button
                key={link.id}
                data-testid={`nav-link-${link.id}`}
                onClick={() => scrollToSection(link.id)}
                className="relative font-heading text-sm tracking-wider text-brand-text hover:text-brand-white transition-colors group"
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-brand-red transition-all duration-300 ${
                    activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Cart Icon (Visual Only) */}
          <div className="flex items-center space-x-4">
            <button
              data-testid="cart-icon"
              className="text-brand-text hover:text-brand-white transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-brand-text hover:text-brand-white transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-brand-bg/95 backdrop-blur-sm"
            >
              <div className="py-4 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    data-testid={`mobile-nav-link-${link.id}`}
                    onClick={() => scrollToSection(link.id)}
                    className="block w-full text-left font-heading text-sm tracking-wider text-brand-text hover:text-brand-red transition-colors py-2"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle video loading
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleCanPlay = () => {
        video.play().catch(() => setVideoError(true));
      };
      
      const handleError = () => {
        setVideoError(true);
      };
      
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      {/* Video Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={animationStarted ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 mb-6"
      >
        {!videoError ? (
          <video
            ref={videoRef}
            data-testid="logo-video"
            src={ASSETS.logoVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
            onError={() => setVideoError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-brand-red/20 flex items-center justify-center mb-2">
                <span className="font-display text-4xl md:text-5xl text-brand-red">RP</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* BIRRIA BOMB Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={animationStarted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="text-center"
      >
        <h1
          data-testid="hero-title"
          className="font-display text-3xl md:text-4xl lg:text-5xl text-brand-red tracking-wider"
        >
          BIRRIA BOMB
        </h1>
        <motion.div
          initial={{ width: 0 }}
          animate={animationStarted ? { width: "100%" } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="h-1 bg-brand-red mt-3 mx-auto"
        />
      </motion.div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product, index, onBuyClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      data-testid={`product-card-${product.id}`}
      className="relative min-h-[80vh] flex items-center overflow-hidden py-16 md:py-24"
    >
      {/* Background Word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 0.08, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-[20vw] md:text-[18vw] text-brand-text whitespace-nowrap select-none"
        >
          {product.bgWord}
        </motion.span>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Desktop Layout */}
        <div className={`hidden md:grid md:grid-cols-2 gap-8 items-center ${isEven ? "" : "direction-rtl"}`}>
          {/* Button Side (Left on even, Right on odd) */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`flex flex-col items-center ${isEven ? "md:items-start" : "md:items-end"}`}
          >
            <button
              data-testid={`buy-now-${product.id}`}
              onClick={() => onBuyClick(product)}
              className="bg-brand-red text-brand-text font-heading font-bold tracking-wider px-8 py-3 rounded-sm hover:brightness-110 transition-all transform hover:scale-105"
            >
              BUY NOW
            </button>
          </motion.div>

          {/* Product Image (Center) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md object-contain drop-shadow-2xl"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Desktop Right Side Info */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`hidden md:block absolute ${isEven ? "right-12" : "left-12"} top-1/2 -translate-y-1/2 max-w-xs`}
        >
          <p className="text-brand-gold font-heading text-lg mb-2">{product.price}</p>
          <h3 className="font-heading font-bold text-2xl text-brand-white mb-4">{product.name}</h3>
          <p className="font-body text-sm text-brand-text leading-relaxed">{product.description}</p>
        </motion.div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-xs object-contain drop-shadow-2xl mx-auto"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h3 className="font-heading font-bold text-xl text-brand-white mb-2">{product.name}</h3>
            <p className="font-body text-sm text-brand-text leading-relaxed mb-4 px-4">
              {product.description}
            </p>
            <p className="text-brand-gold font-heading text-lg">{product.price}</p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            data-testid={`buy-now-mobile-${product.id}`}
            onClick={() => onBuyClick(product)}
            className="bg-brand-red text-brand-text font-heading font-bold tracking-wider px-8 py-3 rounded-sm hover:brightness-110 transition-all"
          >
            BUY NOW
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Order Section Component
const OrderSection = ({ onBuyClick }) => {
  return (
    <section id="order" data-testid="order-section" className="py-8">
      {PRODUCTS.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onBuyClick={onBuyClick}
        />
      ))}
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      data-testid="about-section"
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          data-testid="about-title"
          className="font-heading font-bold text-2xl md:text-3xl text-brand-white mb-8 text-center"
        >
          About Red Pot Kitchen
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 font-body text-sm md:text-base text-brand-text leading-relaxed"
        >
          <p>
            Red Pot Kitchen is a food concept focused on creating bold, flavorful comfort food designed for students and everyday consumers. Built on the idea of accessibility and quality, the brand aims to deliver satisfying meals that balance affordability with strong taste and consistent presentation.
          </p>
          <p>
            The company was founded with the goal of transforming trending food concepts into practical, locally adapted products. By using Filipino ingredients and efficient cooking methods, Red Pot Kitchen develops dishes that remain enjoyable even after some time, making them ideal for busy environments. The signature birria sliders represent this vision by combining slow cooked brisket, locally sourced chiles, and cheese in a compact finger food format.
          </p>
          <p>
            Red Pot Kitchen prioritizes a clear production process from sourcing to service, ensuring that each product maintains flavor, texture, and value. The brand continues to focus on innovation, adapting global food trends into approachable offerings that suit the taste and lifestyle of its customers.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer data-testid="footer" className="py-8 border-t border-brand-bg/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <p className="font-body text-xs text-brand-text/60">
          &copy; {new Date().getFullYear()} Red Pot Kitchen. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// Order Modal Component
const OrderModal = ({ isOpen, onClose, product }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        data-testid="order-modal"
        className="bg-brand-bg border-brand-bg/50 max-w-2xl w-[90vw]"
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-brand-white text-xl">
            Order {product?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {/* Iframe placeholder for Tally form */}
          <div
            data-testid="order-form-placeholder"
            className="w-full h-96 bg-brand-bg/50 border border-brand-text/10 rounded-sm flex items-center justify-center"
          >
            <div className="text-center">
              <p className="font-body text-brand-text/60 mb-2">Order Form</p>
              <p className="font-body text-xs text-brand-text/40">
                Tally form will be embedded here
              </p>
              <p className="font-body text-xs text-brand-text/40 mt-2">
                Link: {BUY_LINK}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "order", "about"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-brand-bg" data-testid="app-container">
      <Navigation activeSection={activeSection} />
      <main>
        <HeroSection />
        <OrderSection onBuyClick={handleBuyClick} />
        <AboutSection />
      </main>
      <Footer />
      <OrderModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
}

export default App;
