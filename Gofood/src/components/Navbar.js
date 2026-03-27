import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, LogOut, Menu } from 'lucide-react';
import { useCart } from './ContextReducer';
import { useTheme } from '../context/ThemeContext';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cart = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <>
      <nav className={`navbar-elite ${scrolled ? 'scrolled' : ''}`}>
        <div className="container-fluid d-flex justify-content-between align-items-center p-0">
          <Link to="/" className="brand-logo-text d-flex align-items-center gap-2">
            <div className="d-flex align-items-center justify-content-center" 
                 style={{ 
                   background: 'var(--color-primary)', 
                   width: '38px', 
                   height: '38px', 
                   borderRadius: '10px', 
                   color: 'white',
                   boxShadow: '0 8px 16px -4px rgba(37, 99, 235, 0.4)'
                 }}>
              <ShoppingCart size={20} strokeWidth={3} />
            </div>
            <span>GoFood</span>
          </Link>

          <div className="d-none d-lg-flex gap-4 align-items-center">
            <Link to="/" className="gf-header__link">Home</Link>
            <Link to="/menu" className="gf-header__link">Explore</Link>
            {isLoggedIn && <Link to="/myorder" className="gf-header__link">Orders</Link>}
          </div>

          <div className="d-flex align-items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="btn btn-link p-2 text-decoration-none"
              style={{ color: 'var(--color-text-muted)', transition: 'transform 0.3s ease' }}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
            </button>

            {/* Cart Button */}
            <button
              className="btn d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm"
              style={{ 
                background: 'var(--color-surface)', 
                color: 'var(--color-text)', 
                border: '1px solid var(--color-border)',
                fontWeight: 700
              }}
              onClick={() => setCartView(true)}
            >
              <div style={{ position: 'relative' }}>
                <ShoppingCart size={18} />
                {cart.length > 0 && (
                  <span style={{ 
                    position: 'absolute', 
                    top: '-8px', 
                    right: '-8px', 
                    background: 'var(--color-cta)', 
                    color: 'white', 
                    fontSize: '0.65rem', 
                    minWidth: '18px', 
                    height: '18px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 900
                  }}>
                    {cart.length}
                  </span>
                )}
              </div>
              <span className="d-none d-sm-inline">Cart</span>
            </button>

            {!isLoggedIn ? (
              <Link to="/login" className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm">
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger border-0 rounded-circle p-2 d-flex align-items-center justify-content-center"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            )}
            
            <button className="btn d-lg-none p-2" style={{ color: 'var(--color-text)' }}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content jump */}
      <div style={{ height: '100px' }} />

      {cartView && (
        <Modal onClose={() => setCartView(false)}>
          <Cart />
        </Modal>
      )}
    </>
  );
}
