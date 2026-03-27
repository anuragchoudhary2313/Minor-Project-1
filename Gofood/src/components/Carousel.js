import React from 'react';

export default function Carousel() {
  return (
    <div style={{ padding: 'var(--space-2xl) 0', backgroundColor: 'var(--color-background)' }}>
      <div className="container position-relative">
        <div 
          style={{
            background: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop) center/cover',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            height: '500px',
            position: 'relative'
          }}
        >
          {/* Overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(30, 64, 175, 0.9) 0%, rgba(30, 64, 175, 0.4) 100%)' }}></div>
          
          <div className="position-absolute top-50 start-0 translate-middle-y text-white" style={{ padding: '0 5%' }}>
            <h1 className="hero-title" style={{ color: '#fff' }}>Discover Delicious Food<br/> Delivered Fast.</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '32px', maxWidth: '600px' }}>
              Order your favorite meals from top-rated restaurants near you. Fast delivery, fresh food.
            </p>
            
            <form className="d-flex" onSubmit={(e) => e.preventDefault()} style={{ maxWidth: '400px', gap: '8px' }}>
              <input
                className="input"
                type="search"
                placeholder="Search for restaurants or dishes..."
                aria-label="Search"
                style={{ marginBottom: 0 }}
              />
              <button className="btn-primary" type="submit" style={{ flexShrink: 0 }}>
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
