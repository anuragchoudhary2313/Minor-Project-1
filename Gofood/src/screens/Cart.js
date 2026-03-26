import React, { useState } from 'react';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { API_ENDPOINTS, apiCall } from '../utils/api';

export default function Cart() {
  const cartData = useCart();
  const dispatch = useDispatchCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (cartData.length === 0) {
    return (
      <div className="gf-cart gf-cart--empty">
        <h3>Your cart is empty</h3>
        <p>Add some delicious food to get started.</p>
      </div>
    );
  }

  const handleCheckOut = async () => {
    setLoading(true);
    setError('');

    try {
      const userEmail = localStorage.getItem('userEmail');

      if (!userEmail) {
        setError('Please login first');
        return;
      }

      const response = await apiCall(API_ENDPOINTS.PLACE_ORDER, {
        method: 'POST',
        body: JSON.stringify({
          order_data: cartData,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (response.success) {
        dispatch({ type: 'DROP' });
        alert('Order placed successfully!');
      } else {
        setError(response.error || 'Failed to place order');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeQuantity = (food, index, delta) => {
    const currentQty = Number(food.qty) || 1;

    if (delta < 0 && currentQty <= 1) {
      dispatch({ type: 'REMOVE', index });
      return;
    }

    const unitPrice = Number((food.price / currentQty).toFixed(2));
    const priceDelta = Number((unitPrice * delta).toFixed(2));

    dispatch({
      type: 'UPDATE',
      id: food.id,
      qty: delta,
      size: food.size,
      price: priceDelta,
    });
  };

  const totalPrice = cartData.reduce((total, food) => total + food.price, 0);

  return (
    <div className="gf-cart">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="gf-cart__list" aria-label="Items in your cart">
        {cartData.map((food, index) => (
          <article className="gf-cart__item" key={`${food.id || food.name}-${index}`}>
            <div className="gf-cart__media">
              {food.img ? (
                <img src={food.img} alt={food.name} loading="lazy" />
              ) : (
                <div className="gf-cart__media-fallback" aria-hidden="true">
                  GF
                </div>
              )}
            </div>

            <div className="gf-cart__item-main">
              <div className="gf-cart__item-title-wrap">
                <h4 className="gf-cart__item-title">{food.name}</h4>
                <span className="gf-cart__chip">{food.size}</span>
              </div>
              <p className="gf-cart__meta">Qty {food.qty} x {food.size}</p>
            </div>

            <div className="gf-cart__item-right">
              <div className="gf-cart__qty-controls" aria-label={`Quantity controls for ${food.name}`}>
                <button
                  type="button"
                  className="gf-cart__qty-btn"
                  onClick={() => handleChangeQuantity(food, index, -1)}
                  aria-label={`Decrease quantity of ${food.name}`}
                >
                  -
                </button>
                <span className="gf-cart__qty-value">{food.qty}</span>
                <button
                  type="button"
                  className="gf-cart__qty-btn"
                  onClick={() => handleChangeQuantity(food, index, 1)}
                  aria-label={`Increase quantity of ${food.name}`}
                >
                  +
                </button>
              </div>

              <strong className="gf-cart__price">₹{food.price}</strong>
              <button
                type="button"
                className="gf-cart__remove"
                onClick={() => dispatch({ type: 'REMOVE', index })}
                aria-label={`Remove ${food.name}`}
              >
                <Delete fontSize="small" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="gf-cart__summary">
        <div>
          <p className="gf-cart__summary-label">Total</p>
          <h3 className="gf-cart__summary-total">₹{totalPrice}</h3>
        </div>
        <button className="gf-btn gf-btn--success gf-cart__checkout" onClick={handleCheckOut} disabled={loading}>
          {loading ? 'Processing...' : 'Checkout'}
        </button>
      </div>
    </div>
  );
}
