import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChefHat, Star, Users, Utensils, ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './HomeLanding.css';

const stats = [
  { value: '120+', label: 'Signature Dishes', icon: <Utensils size={28} />, color: '#F59E0B' },
  { value: '8.5K+', label: 'Elite Reviews', icon: <Star size={28} />, color: '#10B981' },
  { value: '42K+', label: 'Gourmet Lovers', icon: <Users size={28} />, color: '#3B82F6' },
  { value: '9+', label: 'Years of Excellence', icon: <ChefHat size={28} />, color: '#EC4899' },
];

const features = [
  { title: "Gourmet Quality", desc: "Chef-crafted recipes using premium ingredients.", icon: <Zap className="text-amber-500" /> },
  { title: "Safe & Secure", desc: "Hygienic preparation and contactless delivery.", icon: <ShieldCheck className="text-green-500" /> },
  { title: "Made with Love", desc: "Traditional flavors prepared with passion.", icon: <Heart className="text-red-500" /> }
];

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="landing-root">
      <Navbar />

      {/* Hero Section */}
      <section className="landing-hero" id="home">
        <div className="landing-hero-overlay" />
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="landing-hero-image-container"
        >
          <img src="/landing/dishes-hero.png" alt="Restaurant dishes" className="landing-hero-image" />
        </motion.div>
        
        <div className="landing-container landing-hero-content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="landing-pill">✨ The Ultimate Food Experience</span>
            <h1 className="display-1 fw-black mb-4">Crafting <span className="text-gradient"> Culinary</span> <br/>Masterpieces</h1>
            <p className="lead mb-5 text-balance">
              Experience the fusion of traditional techniques and modern flair. 
              Our chef-crafted menu promises a journey of flavors in every bite.
            </p>
            <div className="d-flex flex-wrap gap-4 align-items-center">
              <Link to="/menu" className="landing-cta px-5 py-3 shadow-lg">
                Explore The Menu <ArrowRight size={20} className="ms-2" />
              </Link>
              <Link to="/signup" className="glass-btn px-5 py-3">
                Become a Member
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Stats Section */}
      <section className="py-5 bg-dots">
        <div className="landing-container py-5">
          <div className="text-center mb-5">
            <span className="section-subtitle">Our Impact</span>
            <h2 className="display-4 fw-black">Trusted by Thousands</h2>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-grid"
          >
            {stats.map((item, idx) => (
              <motion.div 
                key={item.label}
                variants={fadeInUp}
                className={`bento-item bento-item-${idx+1}`}
                style={{ '--accent-color': item.color }}
              >
                <div className="bento-icon-wrap">
                  {item.icon}
                </div>
                <div>
                  <h3 className="bento-value">{item.value}</h3>
                  <p className="bento-label">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 overflow-hidden">
        <div className="landing-container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="about-image-stack"
              >
                <div className="about-main-image shadow-elite">
                   <img src="/landing/restaurant-about-us.png" alt="Chef plating" />
                </div>
                <div className="about-floating-card shadow-lg">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-3 text-amber-600">
                      <ChefHat size={32} />
                    </div>
                    <div>
                      <div className="fw-black h4 mb-0">Master Chef</div>
                      <div className="small text-muted">Amanat Ullah</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <div className="ps-lg-4">
                <span className="section-subtitle text-start">Why Choose Us</span>
                <h2 className="display-4 fw-black mb-5">Excellence in Every Dish</h2>
                
                <div className="d-flex flex-column gap-4">
                  {features.map((f, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="feature-card-elite"
                    >
                      <div className="feature-icon">{f.icon}</div>
                      <div>
                        <h4 className="fw-black mb-1">{f.title}</h4>
                        <p className="mb-0 text-muted">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-5 mb-5">
        <div className="landing-container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cta-banner-elite"
          >
            <div className="position-relative z-1 text-center py-5">
              <h2 className="display-3 fw-black text-white mb-4">Ready for a Gourmet Journey?</h2>
              <p className="lead text-white opacity-80 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                Join our elite community and get exclusive access to signature recipes and member-only events.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/menu" className="btn btn-light btn-lg rounded-pill px-5 py-3 fw-black">
                  Start Ordering Now
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 fw-bold">
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
