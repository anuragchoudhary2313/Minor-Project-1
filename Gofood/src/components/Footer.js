import React from 'react';

export default function Footer() {
  const footerStyle = {
    background: 'linear-gradient(135deg, rgba(5, 8, 15, 0.92) 0%, rgba(11, 18, 36, 0.92) 100%)',
    backdropFilter: 'blur(10px)',
    borderTop: '2px solid rgba(0,140,255,0.12)',
    padding: '60px 20px 40px',
    marginTop: '80px',
    color: '#e0e0e0',
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
  };

  const sectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  };

  const sectionTitleStyle = {
    fontSize: '1.3rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #00c2ff 0%, #0088ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px',
  };

  const linkStyle = {
    color: '#b0b0c0',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'block',
    marginBottom: '12px',
  };

  const socialIconStyle = {
    display: 'flex',
    gap: '15px',
    marginTop: '20px',
  };

  const socialLinkStyle = {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00c2ff 0%, #0088ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontSize: '1.2rem',
    boxShadow: '0 6px 20px rgba(0,140,255,0.28)',
  };

  const dividerStyle = {
    height: '1px',
    background:
      'linear-gradient(90deg, transparent 0%, rgba(0,140,255,0.12) 50%, transparent 100%)',
    margin: '40px 0',
  };

  const bottomStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(0,140,255,0.12)',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Main Footer Content */}
        <div style={sectionStyle}>
          {/* About */}
          <div>
            <h3 style={sectionTitleStyle}>🍔 About GoFood</h3>
            <p style={{ color: '#b0b0c0', lineHeight: '1.8', marginBottom: '15px' }}>
              Your favorite food delivery service. Order from the best restaurants and get your food
              delivered fast!
            </p>
            <div style={socialIconStyle}>
              <a
                href="/"
                style={socialLinkStyle}
                title="Facebook"
                onMouseEnter={(e) => (e.target.style.transform = 'translateY(-3px)')}
                onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
              >
                f
              </a>
              <a
                href="/"
                style={socialLinkStyle}
                title="Twitter"
                onMouseEnter={(e) => (e.target.style.transform = 'translateY(-3px)')}
                onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
              >
                𝕏
              </a>
              <a
                href="/"
                style={socialLinkStyle}
                title="Instagram"
                onMouseEnter={(e) => (e.target.style.transform = 'translateY(-3px)')}
                onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
              >
                📷
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={sectionTitleStyle}>🔗 Quick Links</h3>
            <a
              href="/"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#00c2ff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b0b0c0';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              Home
            </a>
            <a
              href="/"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#00c2ff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b0b0c0';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              Browse Menu
            </a>
            <a
              href="/"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#00c2ff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b0b0c0';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              My Orders
            </a>
            <a
              href="/"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#00c2ff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b0b0c0';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              Cart
            </a>
          </div>

          {/* Support */}
          <div>
            <h3 style={sectionTitleStyle}>💬 Support</h3>
            <a
              href="/"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#00c2ff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b0b0c0';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              Help Center
            </a>
            <a
              href="/"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#00c2ff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b0b0c0';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              Contact Us
            </a>
            <a
              href="/"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#00c2ff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b0b0c0';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              Privacy Policy
            </a>
            <a
              href="/"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#00c2ff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b0b0c0';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              Terms & Conditions
            </a>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={sectionTitleStyle}>📧 Newsletter</h3>
            <p style={{ color: '#b0b0c0', marginBottom: '15px' }}>
              Subscribe to get special offers and updates!
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(0,140,255,0.14)',
                  borderRadius: '25px',
                  padding: '12px 20px',
                  color: '#fff',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#00c2ff')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(0,140,255,0.14)')}
              />
              <button
                style={{
                  background: 'linear-gradient(135deg, #00c2ff 0%, #0088ff 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '12px 20px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 20px rgba(0,140,255,0.28)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 30px rgba(0,140,255,0.48)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,140,255,0.28)';
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={dividerStyle} />

        {/* Bottom Section */}
        <div style={bottomStyle}>
          <p style={{ margin: 0 }}>
            © 2026{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00c2ff 0%, #0088ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700',
              }}
            >
              GoFood
            </span>{' '}
            Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem' }}>
            <a href="/" style={{ ...linkStyle, marginBottom: 0 }}>
              Privacy
            </a>
            <a href="/" style={{ ...linkStyle, marginBottom: 0 }}>
              Terms
            </a>
            <a href="/" style={{ ...linkStyle, marginBottom: 0 }}>
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
