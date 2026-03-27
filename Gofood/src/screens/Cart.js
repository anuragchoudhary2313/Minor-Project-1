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
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--color-background)', padding: 'var(--space-xl)' }}>
        <div style={{ background: '#fff', padding: '48px', borderRadius: '24px', textAlign: 'center', boxShadow: 'var(--shadow-md)', maxWidth: '500px', width: '100%' }}>
          <h3 style={{ fontFamily: 'Playfair Display SC', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '16px' }}>Your cart is empty</h3>
          <p style={{ color: 'var(--color-text)', opacity: 0.8, fontSize: '1.1rem' }}>Add some delicious food to get started.</p>
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    setLoading(true);
    setError('');

    try {
      const userEmail = localStorage.getItem('userEmail');
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please login first');
        return;
      }

      const response = await apiCall(API_ENDPOINTS.PLACE_ORDER, {
        method: 'POST',
        body: JSON.stringify({
          order_data: cartData,
          email: userEmail || `guest-${token.slice(0, 8)}@gofood.com`,
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
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', padding: 'var(--space-2xl) var(--space-md)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-xl)' }}>
        <h2 style={{ fontFamily: 'Playfair Display SC', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '24px', borderBottom: '2px solid #E2E8F0', paddingBottom: '16px' }}>Your Order</h2>
        
        {error && (
          <div style={{ padding: '16px', background: '#FEE2E2', color: '#DC2626', borderRadius: '12px', marginBottom: '24px', fontWeight: 600 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {cartData.map((food, index) => (
            <article key={`${food.id || food.name}-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '16px', border: '1px solid #E2E8F0', borderRadius: '16px', background: '#F8FAFC' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: '#E2E8F0' }}>
                {food.img ? (
                  <img src={food.img} alt={food.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontWeight: 800 }}>GF</div>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h4 style={{ margin: 0, color: 'var(--color-text)', fontWeight: 800, fontSize: '1.2rem' }}>{food.name}</h4>
                  <span style={{ fontSize: '0.8rem', background: '#DBEAFE', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>{food.size}</span>
                </div>
                <p style={{ margin: 0, color: '#64748B', fontSize: '0.9rem', fontWeight: 600 }}>Qty {food.qty} × {food.size}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                  <button type="button" onClick={() => handleChangeQuantity(food, index, -1)} style={{ border: 'none', background: 'transparent', padding: '8px 12px', cursor: 'pointer', color: 'var(--color-text)', fontWeight: 800 }}>-</button>
                  <span style={{ padding: '0 8px', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>{food.qty}</span>
                  <button type="button" onClick={() => handleChangeQuantity(food, index, 1)} style={{ border: 'none', background: 'transparent', padding: '8px 12px', cursor: 'pointer', color: 'var(--color-text)', fontWeight: 800 }}>+</button>
                </div>

                <strong style={{ fontSize: '1.3rem', color: 'var(--color-cta)', fontWeight: 900, minWidth: '80px', textAlign: 'right' }}>₹{food.price}</strong>
                
                <button type="button" onClick={() => dispatch({ type: 'REMOVE', index })} style={{ border: 'none', background: '#FEE2E2', color: '#EF4444', padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                  <Delete fontSize="small" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid #E2E8F0', paddingTop: '24px' }}>
          <div>
            <p style={{ margin: 0, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Total Amount</p>
            <h3 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '2.5rem', fontWeight: 900 }}>₹{totalPrice}</h3>
          </div>
          <button className="btn-primary" onClick={handleCheckOut} disabled={loading} style={{ padding: '16px 48px', fontSize: '1.2rem', borderRadius: '12px', background: 'var(--color-cta)', boxShadow: 'var(--shadow-md)' }}>
            {loading ? 'Processing...' : 'Checkout & Pay'}
          </button>
        </div>
      </div>
    </div>
  );
}
