import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCart();
  const isLoggedIn = !!localStorage.getItem('token');

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.location.href = '/';
  };

  return (
    <>
      <nav className={`gf-header ${menuOpen ? 'is-menu-open' : ''}`}>
        <div className="gf-header__container">
          <Link to="/" className="gf-header__brand" aria-label="GoFood Home">
            <span className="gf-header__brand-icon" aria-hidden="true">
              🍔
            </span>
            <span className="gf-header__brand-text">GoFood</span>
          </Link>

          <button
            type="button"
            className={`gf-header__menu-toggle ${menuOpen ? 'is-open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-controls="gf-header-mobile-nav"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <div
            id="gf-header-mobile-nav"
            className={`gf-header__links ${menuOpen ? 'is-open' : ''}`}
            role="navigation"
            aria-label="Primary navigation"
          >
            <Link to="/" className="gf-header__link" onClick={closeMenu}>
              Home
            </Link>
            {isLoggedIn && (
              <Link to="/myorder" className="gf-header__link" onClick={closeMenu}>
                My Orders
              </Link>
            )}
          </div>

          <div className={`gf-header__actions ${menuOpen ? 'is-open' : ''}`}>
            <button
              className="gf-btn gf-btn--primary"
              onClick={() => {
                setCartView(true);
                closeMenu();
              }}
            >
              <ShoppingCartIcon style={{ fontSize: '1.1rem' }} />
              <span>Cart</span>
              <span className="gf-header__cart-count">{cart.length}</span>
            </button>

            {!isLoggedIn ? (
              <>
                <Link to="/login" className="gf-btn gf-btn--primary gf-btn--soft" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/signup" className="gf-btn gf-btn--success" onClick={closeMenu}>
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
                className="gf-btn gf-btn--danger"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className={`gf-header-spacer ${menuOpen ? 'is-menu-open' : ''}`} />

      {cartView && (
        <Modal onClose={() => setCartView(false)}>
          <Cart />
        </Modal>
      )}
    </>
  );
}
