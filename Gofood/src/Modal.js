import React from 'react';
import ReactDom from 'react-dom';

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div className="gf-modal-overlay" onClick={onClose} aria-hidden="true" />
      <div className="gf-modal" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <button className="gf-modal__close" onClick={onClose} aria-label="Close cart">
          X
        </button>
        <div className="gf-modal__content">{children}</div>
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
