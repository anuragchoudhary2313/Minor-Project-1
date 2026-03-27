import React, { useEffect, useState, useCallback } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { API_ENDPOINTS, apiCall } from '../utils/api';

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const userEmail = localStorage.getItem('userEmail');
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please login to view your orders');
        return;
      }

      const response = await apiCall(API_ENDPOINTS.GET_MY_ORDERS, {
        method: 'POST',
        body: JSON.stringify({ email: userEmail || `guest-${token.slice(0, 8)}@gofood.com` }),
      });

      if (response.success) {
        setOrderData(response.orderData);
      } else {
        setError(response.error || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Fetch orders error:', err);
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  if (loading) {
    return (
      <div style={{ background: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.2rem' }}>Loading Orders...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-xl)' }}>
          <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#DC2626', padding: '32px', borderRadius: '16px', textAlign: 'center', maxWidth: '400px', width: '100%', boxShadow: 'var(--shadow-md)' }}>
            <h4 style={{ margin: '0 0 16px', fontWeight: 700 }}>{error}</h4>
            <button className="btn-primary" style={{ background: '#DC2626' }} onClick={fetchMyOrders}>
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!orderData || !orderData.order_data || orderData.order_data.length === 0) {
    return (
      <div style={{ background: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-xl)' }}>
          <div style={{ background: '#ffffff', padding: '48px', borderRadius: '24px', textAlign: 'center', maxWidth: '500px', width: '100%', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontFamily: 'Playfair Display SC', color: 'var(--color-primary)', fontWeight: 800, margin: '0 0 16px' }}>No orders yet!</h3>
            <p style={{ color: 'var(--color-text)', opacity: 0.8, margin: 0 }}>Start ordering delicious food from GoFood.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: 'var(--space-2xl) 24px', maxWidth: '1220px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontFamily: 'Playfair Display SC', color: 'var(--color-primary)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '40px', borderBottom: '2px solid #E2E8F0', paddingBottom: '16px' }}>My Orders</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {orderData.order_data
            .slice(0)
            .reverse()
            .map((orderGroup, orderIndex) => {
              
              // Extract order date object
              const dateObj = orderGroup.find(item => item.Order_date);
              const items = orderGroup.filter(item => !item.Order_date);
              
              if (!items.length) return null;

              return (
                <div key={orderIndex} style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid #E2E8F0' }}>
                  {dateObj && (
                    <div style={{ marginBottom: '24px', display: 'inline-block', background: '#DBEAFE', color: 'var(--color-primary)', padding: '8px 16px', borderRadius: '8px', fontWeight: 700 }}>
                      Ordered on: {dateObj.Order_date}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
                    {items.map((item, itemIndex) => (
                      <div key={itemIndex} style={{ border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', background: '#F8FAFC', transition: 'transform 0.2s', cursor: 'default' }}>
                        {item.img ? (
                          <div style={{ height: '140px', overflow: 'hidden', background: '#E2E8F0' }}>
                            <img src={item.img} alt={item.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        ) : (
                          <div style={{ height: '140px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>
                            GoFood
                          </div>
                        )}
                        <div style={{ padding: '20px' }}>
                          <h4 style={{ margin: '0 0 12px', color: 'var(--color-text)', fontWeight: 800, fontSize: '1.2rem' }}>{item.name}</h4>
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.8rem', background: '#E0E7FF', color: 'var(--color-primary)', padding: '4px 10px', borderRadius: '999px', fontWeight: 700 }}>Qty: {item.qty}</span>
                            <span style={{ fontSize: '0.8rem', background: '#FEF3C7', color: '#B45309', padding: '4px 10px', borderRadius: '999px', fontWeight: 700 }}>{item.size}</span>
                          </div>
                          <div style={{ fontSize: '1.4rem', color: 'var(--color-cta)', fontWeight: 900 }}>₹{item.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
