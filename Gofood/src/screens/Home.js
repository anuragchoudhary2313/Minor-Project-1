import React, { useEffect, useState, useCallback } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { API_ENDPOINTS, apiCall } from '../utils/api';

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

  if (loading) {
    return (
      <>
        <Navbar />
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.06), transparent 35%), radial-gradient(circle at 80% 0%, rgba(0,140,255,0.08), transparent 35%), linear-gradient(180deg, #04070b 0%, #07111a 100%)',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              animation: 'pulse 2s infinite',
            }}
          >
            <h2
              style={{
                background: 'linear-gradient(135deg, #00c2ff 0%, #0088ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '2rem',
                fontWeight: '800',
                marginBottom: '20px',
              }}
            >
              🍔 Loading Delicious Food...
            </h2>
            <div
              style={{
                width: '50px',
                height: '50px',
                border: '5px solid rgba(0,140,255,0.24)',
                borderTop: '5px solid #00c2ff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto',
              }}
            ></div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.06), transparent 35%), radial-gradient(circle at 80% 0%, rgba(0,140,255,0.08), transparent 35%), linear-gradient(180deg, #04070b 0%, #07111a 100%)',
            padding: '20px',
          }}
        >
          <div
            style={{
              background: 'rgba(238, 9, 121, 0.2)',
              border: '1px solid rgba(238, 9, 121, 0.5)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '500px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#ff6a00', marginBottom: '20px' }}>{error}</h3>
            <button
              style={{
                background: 'linear-gradient(135deg, #00c2ff 0%, #0088ff 100%)',
                border: 'none',
                borderRadius: '50px',
                padding: '15px 40px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
              }}
              onClick={loadFoodItems}
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #04070b 0%, #07111a 100%)',
        minHeight: '100vh',
      }}
    >
      <Navbar />

      {/* Modern Hero Section */}
      <div
        style={{
          position: 'relative',
          height: '60vh',
          minHeight: '500px',
          overflow: 'hidden',
          marginTop: '70px',
        }}
      >
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ height: '100%' }}
        >
          <div className="carousel-inner" style={{ height: '100%' }}>
            <div className="carousel-item active" style={{ height: '100%' }}>
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200"
                className="d-block w-100"
                style={{
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(40%)',
                }}
                alt="Pizza"
              />
            </div>
            <div className="carousel-item" style={{ height: '100%' }}>
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200"
                className="d-block w-100"
                style={{
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(40%)',
                }}
                alt="Biryani"
              />
            </div>
            <div className="carousel-item" style={{ height: '100%' }}>
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200"
                className="d-block w-100"
                style={{
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(40%)',
                }}
                alt="Food"
              />
            </div>
          </div>

          {/* Hero Content */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '10',
              width: '90%',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #00c2ff 0%, #0088ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '20px',
                animation: 'fadeInUp 0.8s ease-out',
              }}
            >
              🍔 GoFood Delights
            </h1>
            <p
              style={{
                color: '#e0e0e0',
                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                marginBottom: '30px',
                animation: 'fadeInUp 1s ease-out',
              }}
            >
              Order your favorite food with just a few clicks!
            </p>

            {/* Modern Search Bar */}
            <div
              style={{
                display: 'flex',
                gap: '10px',
                maxWidth: '600px',
                margin: '0 auto',
                animation: 'fadeInUp 1.2s ease-out',
              }}
            >
              <input
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0,140,255,0.18)',
                  borderRadius: '50px',
                  padding: '15px 25px',
                  color: '#fff',
                  fontSize: '1.1rem',
                  outline: 'none',
                }}
                type="search"
                placeholder="🔍 Search your favorite food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = '#00c2ff')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(0,140,255,0.18)')}
              />
              {search && (
                <button
                  style={{
                    background: 'linear-gradient(135deg, #ff8a00 0%, #ff4d4d 100%)',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '15px 30px',
                    color: 'white',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSearch('')}
                >
                  ✕ Clear
                </button>
              )}
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      {/* Food Items Section */}
      <div style={{ padding: '60px 20px' }}>
        <div className="container">
          {foodCat.length > 0 ? (
            foodCat.map((category) => {
              const filteredItems = foodItems.filter(
                (item) =>
                  item.CategoryName === category.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())
              );

              if (filteredItems.length === 0 && search) return null;

              return (
                <div key={category._id || category.CategoryName} style={{ marginBottom: '60px' }}>
                  <h2
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: '800',
                      background: 'linear-gradient(135deg, #00c2ff 0%, #0088ff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: '20px',
                      animation: 'slideInLeft 0.6s ease-out',
                    }}
                  >
                    {category.CategoryName === 'Biryani' && '🍚 '}
                    {category.CategoryName === 'Pizza' && '🍕 '}
                    {category.CategoryName === 'Starter' && '🥗 '}
                    {category.CategoryName === 'Dessert' && '🍰 '}
                    {category.CategoryName}
                  </h2>
                  <div
                    style={{
                      height: '4px',
                      background: 'linear-gradient(90deg, #00c2ff 0%, transparent 100%)',
                      marginBottom: '30px',
                      borderRadius: '10px',
                    }}
                  />
                  {filteredItems.length > 0 ? (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '30px',
                        justifyItems: 'center',
                      }}
                    >
                      {filteredItems.map((item) => (
                        <div key={item._id} style={{ animation: 'fadeInUp 0.6s ease-out' }}>
                          <Card
                            foodName={item.name}
                            item={item}
                            options={item.options[0]}
                            ImgSrc={item.img}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '40px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '20px',
                        border: '1px solid rgba(0,140,255,0.18)',
                      }}
                    >
                      <p style={{ color: '#e0e0e0', fontSize: '1.2rem' }}>No items found</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                border: '1px solid rgba(0,140,255,0.18)',
              }}
            >
              <h3
                style={{
                  color: '#00c2ff',
                  fontSize: '1.5rem',
                  marginBottom: '15px',
                }}
              >
                No categories available
              </h3>
              <p style={{ color: '#e0e0e0' }}>
                Please check back later for delicious food options!
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
