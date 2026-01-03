import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const cart = useCart();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.location.href = '/';
  };

  const navbarStyle = {
    background: 'linear-gradient(90deg, rgba(4,7,11,0.96) 0%, rgba(7,17,26,0.96) 100%)',
    backdropFilter: 'blur(14px)',
    boxShadow: '0 8px 40px rgba(0,140,255,0.14)',
    borderBottom: '1px solid rgba(0,140,255,0.12)',
    position: 'fixed',
    zIndex: '1000',
    width: '100%',
    padding: '1rem 0',
    top: 0,
  };

  const brandStyle = {
    fontSize: '1.8rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #00c2ff 0%, #0088ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '2px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
  };

  const linkStyle = {
    color: '#e0e0e0',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '25px',
    position: 'relative',
  };

  const buttonBaseStyle = {
    border: 'none',
    borderRadius: '25px',
    padding: '12px 28px',
    fontWeight: '700',
    color: 'white',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    fontSize: '0.95rem',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  };

  const cartButtonStyle = {
    ...buttonBaseStyle,
    background: 'linear-gradient(135deg, #00c2ff 0%, #0088ff 100%)',
    boxShadow: '0 6px 20px rgba(0,140,255,0.36)',
  };

  const loginButtonStyle = {
    ...buttonBaseStyle,
    background: 'linear-gradient(135deg, #00c2ff 0%, #0088ff 100%)',
    boxShadow: '0 6px 20px rgba(0,140,255,0.36)',
  };

  const signupButtonStyle = {
    ...buttonBaseStyle,
    background: 'linear-gradient(135deg, #00e5a8 0%, #00c28a 100%)',
    boxShadow: '0 6px 20px rgba(0,210,150,0.28)',
  };

  const logoutButtonStyle = {
    ...buttonBaseStyle,
    background: 'linear-gradient(135deg, #ff8a00 0%, #ff4d4d 100%)',
    boxShadow: '0 6px 20px rgba(255,90,40,0.36)',
  };

  return (
    <>
      <nav style={navbarStyle}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo */}
            <Link
              to="/"
              style={brandStyle}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              <span>🍔</span>
              GoFood
            </Link>

            {/* Navigation Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <Link
                to="/"
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.target.style.color = '#00c2ff';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.background = 'rgba(0,140,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#e0e0e0';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.background = 'transparent';
                }}
              >
                🏠 Home
              </Link>

              {isLoggedIn && (
                <Link
                  to="/myorder"
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#00c2ff';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.background = 'rgba(0,140,255,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#e0e0e0';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.background = 'transparent';
                  }}
                >
                  📦 My Orders
                </Link>
              )}
            </div>

            {/* Right Side Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                style={cartButtonStyle}
                onClick={() => setCartView(true)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 36px rgba(0,140,255,0.48)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0,140,255,0.36)';
                }}
              >
                <ShoppingCartIcon style={{ fontSize: '1.2rem' }} />
                <span>Cart ({cart.length})</span>
              </button>

              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    style={loginButtonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 12px 36px rgba(0,140,255,0.48)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 20px rgba(0,140,255,0.36)';
                    }}
                  >
                    🔐 Login
                  </Link>
                  <Link
                    to="/signup"
                    style={signupButtonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 12px 36px rgba(0,210,150,0.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 20px rgba(0,210,150,0.32)';
                    }}
                  >
                    ✨ Signup
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  style={logoutButtonStyle}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 36px rgba(255,90,40,0.48)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(255,90,40,0.36)';
                  }}
                >
                  👋 Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div style={{ height: '70px' }} />

      {cartView && (
        <Modal onClose={() => setCartView(false)}>
          <Cart />
        </Modal>
      )}
    </>
  );
}
