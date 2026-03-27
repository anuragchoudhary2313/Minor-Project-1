import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'react-lottie-player';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Shimmer from '../components/Shimmer';
import { 
  ResponsiveContainer, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  AreaChart, 
  Area, 
  Tooltip 
} from 'recharts';
import { API_ENDPOINTS, apiCall } from '../utils/api';

const radarData = [
  { subject: 'Spice', A: 120, fullMark: 150 },
  { subject: 'Aroma', A: 150, fullMark: 150 },
  { subject: 'Texture', A: 86, fullMark: 150 },
  { subject: 'Saffron', A: 99, fullMark: 150 },
  { subject: 'Value', A: 85, fullMark: 150 },
];

const trendData = [
  { name: 'Mon', orders: 400 },
  { name: 'Tue', orders: 300 },
  { name: 'Wed', orders: 600 },
  { name: 'Thu', orders: 800 },
  { name: 'Fri', orders: 500 },
  { name: 'Sat', orders: 900 },
  { name: 'Sun', orders: 1100 },
];

export default function Menu() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');
  const [dietFilter, setDietFilter] = useState('all'); // all, veg, non-veg
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFoodItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(API_ENDPOINTS.GET_FOOD_DATA, { method: 'POST' });
      if (response.success && response.data) {
        setFoodItems(response.data[0] || []);
        setFoodCat(response.data[1] || []);
      }
    } catch (err) {
      setError('Failed to load menu. Please try again later.');
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  }, []);

  useEffect(() => {
    loadFoodItems();
  }, [loadFoodItems]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const allItemsEmpty = !loading && foodCat.length > 0 && foodCat.every(category => 
    foodItems.filter(item => 
      item.CategoryName === category.CategoryName && 
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (dietFilter === 'all' || (dietFilter === 'veg' ? item.isVeg : !item.isVeg))
    ).length === 0
  );

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <main style={{ paddingBottom: '80px' }}>
        <div className="container">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="explore-dashboard mt-4"
          >
            <header className="mb-5">
              <h1 className="display-4 fw-bold mb-2" style={{ color: 'var(--color-primary)' }}>Explore Menu</h1>
              <p className="lead text-muted">Discover our kitchen&apos;s heartbeat through data and craft.</p>
            </header>

            <div className="explore-grid">
              <div className="featured-dish-card shadow-lg">
                <img src="/featured_biryani.png" alt="Featured Biryani" className="featured-dish-image" />
                <div className="featured-dish-content">
                  <span className="badge bg-warning text-dark mb-2 fw-bold">CHEF&apos;S SPECIAL</span>
                  <h2 className="display-6 fw-bold mb-2">Hyderabadi Royal Biryani</h2>
                  <p className="mb-4 opacity-90">Slow-cooked saffron rice with tender chicken, infused with 32 hand-picked spices.</p>
                  <div className="d-flex align-items-center gap-4">
                    <div className="text-center">
                      <h4 className="mb-0 fw-bold text-white">4.9/5</h4>
                      <small className="opacity-75">Rating</small>
                    </div>
                    <div className="text-center">
                      <h4 className="mb-0 fw-bold text-white">12k+</h4>
                      <small className="opacity-75">Orders</small>
                    </div>
                    <button className="btn btn-light ms-auto fw-bold px-4 rounded-pill">Order Now</button>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column gap-3">
                <div className="chart-card flex-grow-1 shadow-sm">
                   <h3 className="chart-title">Dish Profile</h3>
                   <div style={{ width: '100%', height: '220px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="var(--color-border)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                        <Radar
                          name="Biryani"
                          dataKey="A"
                          stroke="var(--color-cta)"
                          fill="var(--color-cta)"
                          fillOpacity={0.5}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                   </div>
                </div>
                
                <div className="chart-card flex-grow-1 shadow-sm">
                   <h3 className="chart-title text-primary">Weekly Trends</h3>
                   <div style={{ width: '100%', height: '140px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <defs>
                          <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip contentStyle={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '12px' }} />
                        <Area type="monotone" dataKey="orders" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorOrders)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="row justify-content-center my-5"
          >
            <div className="col-md-8 col-lg-6">
              <div className="d-flex flex-column align-items-center gap-4">
                <div className="position-relative w-100">
                  <input
                    type="search"
                    className="form-control form-control-lg shadow-sm search-input-elite"
                    style={{ borderRadius: '20px', height: '60px' }}
                    placeholder="What are you craving today?"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="position-absolute top-50 translate-middle-y" style={{ left: '25px', color: 'var(--color-primary)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </div>
                </div>

                <div className="filter-toggle-container p-1 bg-white shadow-sm d-flex position-relative overflow-hidden mb-2" style={{ borderRadius: '16px', border: '1px solid var(--color-border)', width: 'fit-content' }}>
                  {['all', 'veg', 'non-veg'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setDietFilter(type)}
                      className={`btn rounded-3 px-4 py-2 fw-bold text-uppercase transition-all d-flex align-items-center gap-2 ${
                        dietFilter === type 
                          ? (type === 'veg' ? 'bg-success-subtle text-success border-success' : type === 'non-veg' ? 'bg-danger-subtle text-danger border-danger' : 'bg-primary-subtle text-primary border-primary')
                          : 'text-muted border-transparent opacity-75'
                      }`}
                      style={{ 
                        fontSize: '0.75rem', 
                        border: '2px solid transparent',
                        minWidth: '110px',
                        justifyContent: 'center'
                      }}
                    >
                      {type === 'veg' && (
                        <div className="diet-indicator veg" style={{ width: '12px', height: '12px', borderWidth: '1.5px' }}>
                          <div className="diet-dot" style={{ width: '5px', height: '5px' }}></div>
                        </div>
                      )}
                      {type === 'non-veg' && (
                        <div className="diet-indicator non-veg" style={{ width: '12px', height: '12px', borderWidth: '1.5px' }}>
                          <div className="diet-dot" style={{ width: '5px', height: '5px' }}></div>
                        </div>
                      )}
                      {type === 'all' ? 'All Dishes' : type === 'veg' ? 'Pure Veg' : 'Non-Veg'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="row g-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="col-12 col-md-6 col-lg-3">
                  <Shimmer />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center py-4 rounded-4 shadow-sm">
              {error}
              <button className="btn btn-primary d-block mx-auto mt-3 rounded-pill" onClick={loadFoodItems}>Retry</button>
            </div>
          ) : (
            <>
              {allItemsEmpty && search && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-5"
                >
                  <Lottie
                    play
                    loop
                    path="https://assets10.lottiefiles.com/packages/lf20_6sxyjyjj.json"
                    style={{ height: '300px', width: '300px', margin: '0 auto' }}
                  />
                  <h3 className="mt-4 fw-black text-primary">No dishes found!</h3>
                  <p className="text-muted text-center mx-auto" style={{ maxWidth: "400px" }}>
                    {`Try searching for something else, like "Biryani" or "Pizza". We're sure to have something you love!`}
                  </p>
                  <button className="btn btn-outline-primary rounded-pill mt-3 px-4 fw-bold" onClick={() => setSearch('')}>Clear Search</button>
                </motion.div>
              )}

              {foodCat.map((category) => {
                const filteredItems = foodItems.filter(
                  (item) =>
                    item.CategoryName === category.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase()) &&
                    (dietFilter === 'all' || (dietFilter === 'veg' ? item.isVeg : !item.isVeg))
                );

                if (filteredItems.length === 0) return null;

                return (
                  <motion.section 
                    key={category._id || category.CategoryName} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-5"
                  >
                    <div className="d-flex align-items-center mb-4">
                      <h2 className="h3 fw-bold mb-0 me-3">{category.CategoryName}</h2>
                      <div className="flex-grow-1" style={{ height: '2px', background: 'linear-gradient(to right, var(--color-primary), transparent)' }} />
                    </div>
                    
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="row g-4"
                    >
                      <AnimatePresence>
                        {filteredItems.map((item) => (
                          <motion.div 
                            key={item._id || item.name} 
                            layout
                            variants={itemVariants}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              item={item}
                              options={item.options[0]}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </motion.section>
                );
              })}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
