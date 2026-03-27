import React from 'react';

export default function Footer() {
  return (
    <footer className="gf-footer">
      <div className="gf-footer__container">
        <div className="gf-footer__grid">
          <div className="pe-lg-5">
            <h3 className="gf-footer__title">About GoFood</h3>
            <p className="gf-footer__text">
              We are dedicated to bringing the finest culinary experiences directly to your doorstep. 
              Our mission is to bridge the gap between world-class chefs and food enthusiasts everywhere.
            </p>
            <div className="gf-footer__social">
              <a href="https://facebook.com" className="gf-footer__social-link" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://twitter.com" className="gf-footer__social-link" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="https://instagram.com" className="gf-footer__social-link" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="gf-footer__title">Quick Links</h3>
            <a href="/" className="gf-footer__link">Home</a>
            <a href="/#menu" className="gf-footer__link">Browse Menu</a>
            <a href="/myorder" className="gf-footer__link">My Orders</a>
            <a href="/#contact-us" className="gf-footer__link">Contact</a>
          </div>

          <div>
            <h3 className="gf-footer__title">Support</h3>
            <a href="/" className="gf-footer__link">Help Center</a>
            <a href="/" className="gf-footer__link">Contact Us</a>
            <a href="/" className="gf-footer__link">Privacy Policy</a>
            <a href="/" className="gf-footer__link">Terms of Service</a>
          </div>

          <div>
            <h3 className="gf-footer__title">Stay Updated</h3>
            <p className="gf-footer__text">Subscribe to get special offers and menu updates.</p>
            <form className="gf-footer__newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email Address" aria-label="Email Address" />
              <button type="submit">Join</button>
            </form>
          </div>
        </div>

        <div className="gf-footer__bottom">
          <p>© 2026 GoFood Inc. Made with passion for food lovers.</p>
          <div className="gf-footer__bottom-links">
            <a href="/" className="gf-footer__link mb-0">Privacy</a>
            <a href="/" className="gf-footer__link mb-0">Terms</a>
            <a href="/" className="gf-footer__link mb-0">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
