import React from 'react';

export default function Footer() {
  return (
    <footer className="gf-footer">
      <div className="gf-footer__container">
        <div className="gf-footer__grid">
          <div>
            <h3 className="gf-footer__title">About GoFood</h3>
            <p className="gf-footer__text">
              Your favorite food delivery service. Discover top restaurants and enjoy reliable,
              quick delivery.
            </p>
            <div className="gf-footer__social" aria-label="Social links">
              <a href="/" className="gf-footer__social-link" title="Facebook" aria-label="Facebook">
                f
              </a>
              <a href="/" className="gf-footer__social-link" title="X" aria-label="X">
                X
              </a>
              <a href="/" className="gf-footer__social-link" title="Instagram" aria-label="Instagram">
                ig
              </a>
            </div>
          </div>

          <div>
            <h3 className="gf-footer__title">Quick Links</h3>
            <a href="/" className="gf-footer__link">
              Home
            </a>
            <a href="/#menu" className="gf-footer__link">
              Browse Menu
            </a>
            <a href="/myorder" className="gf-footer__link">
              My Orders
            </a>
            <a href="/#contact-us" className="gf-footer__link">
              Contact
            </a>
          </div>

          <div>
            <h3 className="gf-footer__title">Support</h3>
            <a href="/" className="gf-footer__link">
              Help Center
            </a>
            <a href="/" className="gf-footer__link">
              Contact Us
            </a>
            <a href="/" className="gf-footer__link">
              Privacy Policy
            </a>
            <a href="/" className="gf-footer__link">
              Terms & Conditions
            </a>
          </div>

          <div>
            <h3 className="gf-footer__title">Newsletter</h3>
            <p className="gf-footer__text">Get offers and menu updates in your inbox.</p>
            <form className="gf-footer__newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" aria-label="Email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="gf-footer__bottom">
          <p>© 2026 GoFood Inc. All rights reserved.</p>
          <div className="gf-footer__bottom-links">
            <a href="/" className="gf-footer__link gf-footer__link--inline">
              Privacy
            </a>
            <a href="/" className="gf-footer__link gf-footer__link--inline">
              Terms
            </a>
            <a href="/" className="gf-footer__link gf-footer__link--inline">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
