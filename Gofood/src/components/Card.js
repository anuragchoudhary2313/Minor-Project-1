import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const cart = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();

  const { options, item: foodItem, ImgSrc, foodName } = props;
  const priceOptions = Object.keys(options);

  // Initialize size on mount
  useEffect(() => {
    // default to the first available option to avoid empty size
    if (priceOptions && priceOptions.length > 0) {
      setSize(priceOptions[0]);
    } else if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, [priceOptions]);

  // Memoize final price calculation
  const finalPrice = useMemo(() => {
    const unit = Number(options[size] || 0);
    if (isNaN(unit)) return 0;
    return qty * unit;
  }, [qty, size, options]);

  // Removed unused click handler; navigation to login occurs during add-to-cart if necessary.

  const handleQty = (e) => {
    setQty(parseInt(e.target.value));
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    // require selecting a size
    if (!size) {
      alert('Please select a size before adding to cart');
      return;
    }

    // if user not logged in, redirect to login (do not redirect on select interactions)
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    // Check if item with same id and size already exists
    const existingItem = cart.find((item) => item.id === foodItem._id && item.size === size);

    if (existingItem) {
      // Update existing item
      await dispatch({
        type: 'UPDATE',
        id: foodItem._id,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    } else {
      // Add new item
      await dispatch({
        type: 'ADD',
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: ImgSrc,
      });
    }
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0,140,255,0.18)',
    borderRadius: '20px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '300px',
  };

  const imgStyle = {
    height: '200px',
    objectFit: 'cover',
    width: '100%',
    transition: 'transform 0.3s ease',
  };

  const selectStyle = {
    background: 'linear-gradient(135deg, #00c2ff 0%, #0088ff 100%)',
    border: 'none',
    borderRadius: '10px',
    padding: '8px 12px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #00e5a8 0%, #00c28a 100%)',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 24px',
    fontWeight: '600',
    color: 'white',
    width: '100%',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,210,150,0.36)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  return (
    <div
      className="modern-card"
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,140,255,0.28)';
        e.currentTarget.querySelector('img').style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        e.currentTarget.querySelector('img').style.transform = 'scale(1)';
      }}
    >
      <img src={ImgSrc} alt={foodName} style={imgStyle} loading="lazy" />
      <div style={{ padding: '20px' }}>
        <h5
          style={{
            color: '#fff',
            fontSize: '1.3rem',
            fontWeight: '700',
            marginBottom: '15px',
            background: 'linear-gradient(135deg, #00c2ff 0%, #0088ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {foodName}
        </h5>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            marginBottom: '15px',
            flexWrap: 'wrap',
          }}
        >
          <select
            style={selectStyle}
            onChange={handleQty}
            value={qty}
            aria-label="Select quantity"
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                Qty: {num}
              </option>
            ))}
          </select>

          <select
            style={selectStyle}
            ref={priceRef}
            onChange={handleOptions}
            value={size}
            aria-label="Select size"
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            {priceOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>

          <div
            style={{
              fontSize: '1.4rem',
              fontWeight: '700',
              color: '#00c28a',
              marginLeft: 'auto',
            }}
          >
            ₹{finalPrice}
          </div>
        </div>
        <button
          style={buttonStyle}
          onClick={handleAddToCart}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(52, 211, 153, 0.55)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(52, 211, 153, 0.4)';
          }}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}
