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
      <div className="m-5 w-100 text-center">
        <h3 className="fs-3">Your cart is empty!</h3>
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

  const totalPrice = cartData.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      {error && (
        <div className="alert alert-danger m-3" role="alert">
          {error}
        </div>
      )}

      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Size</th>
              <th scope="col">Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>₹{food.price}/-</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger p-0"
                    onClick={() => dispatch({ type: 'REMOVE', index: index })}
                    aria-label={`Remove ${food.name}`}
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <h3 className="fs-2">Total Price: ₹{totalPrice}/-</h3>
        </div>

        <button className="btn btn-success btn-lg mt-5" onClick={handleCheckOut} disabled={loading}>
          {loading ? 'Processing...' : 'Check Out'}
        </button>
      </div>
    </div>
  );
}
