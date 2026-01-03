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
      if (!userEmail) {
        setError('Please login to view your orders');
        return;
      }

      const response = await apiCall(API_ENDPOINTS.GET_MY_ORDERS, {
        method: 'POST',
        body: JSON.stringify({ email: userEmail }),
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
      <>
        <Navbar />
        <div className="container text-center mt-5 pt-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5 pt-5">
          <div className="alert alert-danger" role="alert">
            {error}
            <button className="btn btn-success mt-3 d-block mx-auto" onClick={fetchMyOrders}>
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!orderData || !orderData.order_data || orderData.order_data.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5 pt-5">
          <h3>No orders yet!</h3>
          <p>Start ordering delicious food from GoFood.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">My Orders</h2>
        <div className="row">
          {orderData.order_data
            .slice(0)
            .reverse()
            .map((order, orderIndex) => (
              <div key={orderIndex} className="col-12 mb-4">
                {order.map((item, itemIndex) => {
                  if (item.Order_date) {
                    return (
                      <div key={itemIndex} className="alert alert-info" role="alert">
                        <strong>Order Date:</strong> {item.Order_date}
                        <hr />
                      </div>
                    );
                  }

                  return (
                    <div key={itemIndex} className="col-12 col-md-6 col-lg-3">
                      <div className="card mt-3" style={{ width: '16rem', maxHeight: '360px' }}>
                        {item.img && (
                          <img
                            src={item.img}
                            className="card-img-top"
                            alt={item.name}
                            style={{ height: '120px', objectFit: 'fill' }}
                            loading="lazy"
                          />
                        )}
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className="container w-100 p-0">
                            <span className="badge bg-success m-1">Qty: {item.qty}</span>
                            <span className="badge bg-info m-1">{item.size}</span>
                            <div className="fs-5 mt-2">₹{item.price}/-</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
