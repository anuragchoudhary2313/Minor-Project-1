import React, { useEffect, useState, useCallback } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { API_ENDPOINTS, apiCall } from '../utils/api';
import './HomeLanding.css';

const stats = [
  { value: '9+', label: 'Years of Experience' },
  { value: '120+', label: 'Dishes in Our Menu' },
  { value: '8.5K+', label: 'Customer Reviews' },
  { value: '42K+', label: 'Happy Customers' },
];

const services = [
  {
    title: 'Fine Dine Experience',
    description: 'Elevated flavors and chef-crafted dishes for special evenings and celebrations.',
    image: '/landing/free-blog-1.png',
  },
  {
    title: 'Fast Delivery',
    description: 'Your favorites arrive hot and fresh with quick doorstep delivery in your area.',
    image: '/landing/free-blog-2.png',
  },
  {
    title: 'Private Events',
    description: 'Host birthdays, meetings, and gatherings with custom menu planning and service.',
    image: '/landing/free-blog-3.png',
  },
];

const chefs = [
  { name: 'Ethan Ward', role: 'Executive Chef', image: '/landing/chef-1.png' },
  { name: 'Olivia Stone', role: 'Pastry Specialist', image: '/landing/chef-2.png' },
  { name: 'Lucas Gray', role: 'Sous Chef', image: '/landing/chef-3.png' },
  { name: 'Mia Foster', role: 'Kitchen Lead', image: '/landing/chef-4.png' },
];

const faqs = [
  {
    q: 'Do you offer table reservations?',
    a: 'Yes. You can reserve your table in advance for lunch and dinner slots based on availability.',
  },
  {
    q: 'Can I place custom food requests?',
    a: 'Absolutely. Add your request while ordering and our team will do the best possible customization.',
  },
  {
    q: 'Do you deliver late night orders?',
    a: 'Delivery timing depends on your location. Most zones are available until 11 PM daily.',
  },
];

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFoodItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiCall(API_ENDPOINTS.GET_FOOD_DATA, {
        method: 'POST',
      });

      if (response.success && response.data) {
        setFoodItems(response.data[0] || []);
        setFoodCat(response.data[1] || []);
      }
    } catch (err) {
      console.error('Failed to load food items:', err);
      setError('Failed to load food items. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFoodItems();
  }, [loadFoodItems]);

  return (
    <div className="landing-root">
      <Navbar />

      <section className="landing-hero" id="home">
        <div className="landing-hero-overlay" />
        <img src="/landing/dishes-hero.png" alt="Restaurant dishes" className="landing-hero-image" />
        <div className="landing-container landing-hero-content">
          <span className="landing-pill">Serving Food Lovers Since 2016</span>
          <h1>Savor Every Bite. Savor Every Moment.</h1>
          <p>
            Welcome to a dining experience where flavor, freshness, and hospitality come together.
            Every plate is made to impress.
          </p>
          <a href="#menu" className="landing-cta">
            Explore Menu
          </a>
        </div>
      </section>

      <section className="landing-about" id="about-us">
        <div className="landing-container">
          <div className="landing-headline">
            <h2>About Us</h2>
            <p>
              Our achievement story stands as a testament to teamwork and perseverance. We have
              faced challenges, celebrated victories, and created a consistent dining standard.
            </p>
          </div>

          <div className="landing-about-media">
            <img src="/landing/restaurant-about-us.png" alt="Restaurant interior" />
          </div>

          <div className="landing-stats-grid">
            {stats.map((item) => (
              <div key={item.label} className="landing-stat-card">
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-services" id="services">
        <div className="landing-container">
          <div className="landing-headline">
            <h2>Crafting Moments, Serving You</h2>
            <p>
              From unforgettable flavors to seamless service, we are here to make every meal feel
              special.
            </p>
          </div>
          <div className="landing-service-grid">
            {services.map((service) => (
              <article key={service.title} className="landing-service-card">
                <img src={service.image} alt={service.title} />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-team" id="team">
        <div className="landing-container">
          <div className="landing-headline">
            <h2>Meet Our Team</h2>
            <p>The experts behind every delicious experience.</p>
          </div>
          <div className="landing-chef-grid">
            {chefs.map((chef) => (
              <article key={chef.name} className="landing-chef-card">
                <img src={chef.image} alt={chef.name} />
                <h3>{chef.name}</h3>
                <p>{chef.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-faq" id="faqs">
        <div className="landing-container">
          <div className="landing-headline">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions about your dining and ordering experience.</p>
          </div>
          <div className="landing-faq-list">
            {faqs.map((item) => (
              <details key={item.q} className="landing-faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-menu" id="menu">
        <div className="landing-container">
          <div className="landing-headline">
            <h2>Order From Our Menu</h2>
            <p>Search and discover your favorite dishes.</p>
          </div>

          <div className="landing-search-wrap">
            <input
              className="landing-search"
              type="search"
              placeholder="Search your favorite food"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="landing-clear" onClick={() => setSearch('')}>
                Clear
              </button>
            )}
          </div>

          {loading && <div className="landing-state-box">Loading delicious food...</div>}

          {error && (
            <div className="landing-state-box landing-state-error">
              <p>{error}</p>
              <button className="landing-cta" onClick={loadFoodItems}>
                Retry
              </button>
            </div>
          )}

          {!loading && !error && foodCat.length > 0 &&
            foodCat.map((category) => {
              const filteredItems = foodItems.filter(
                (item) =>
                  item.CategoryName === category.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())
              );

              if (filteredItems.length === 0 && search) {
                return null;
              }

              return (
                <div key={category._id || category.CategoryName} className="landing-category-block">
                  <h3>{category.CategoryName}</h3>
                  <div className="landing-food-grid">
                    {filteredItems.map((item) => (
                      <Card
                        key={item._id}
                        foodName={item.name}
                        item={item}
                        options={item.options[0]}
                        ImgSrc={item.img}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

          {!loading && !error && foodCat.length === 0 && (
            <div className="landing-state-box">No categories available right now.</div>
          )}
        </div>
      </section>

      <section className="landing-contact" id="contact-us">
        <div className="landing-container landing-contact-box">
          <h2>Ready to Reserve Your Table?</h2>
          <p>Enjoy handcrafted meals and warm hospitality in a cozy atmosphere.</p>
          <a href="#menu" className="landing-cta">
            Book A Table
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
