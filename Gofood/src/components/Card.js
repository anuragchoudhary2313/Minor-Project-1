import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const cart = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  const { options, item: foodItem, ImgSrc, foodName } = props;
  const priceOptions = Object.keys(options);

  // Initialize size on mount
  useEffect(() => {
    if (priceOptions && priceOptions.length > 0) {
      setSize(priceOptions[0]);
    }
  }, [priceOptions]);

  // Memoize final price calculation
  const finalPrice = useMemo(() => {
    const unit = Number(options[size] || 0);
    if (isNaN(unit)) return 0;
    return qty * unit;
  }, [qty, size, options]);

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

  return (
    <article className="landing-food-card">
      <div className="landing-food-card__media">
        <span className="landing-food-card__badge">Chef Pick</span>
        <img src={ImgSrc} alt={foodName} loading="lazy" />
      </div>

      <div className="landing-food-card__body">
        <h4>{foodName}</h4>
        <p className="landing-food-card__subtitle">Freshly prepared and served hot</p>

        <div className="landing-food-card__controls">
          <label>
            Qty
            <select onChange={handleQty} value={qty} aria-label="Select quantity">
              {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>

          <label>
            Size
            <select onChange={handleOptions} value={size} aria-label="Select size">
              {priceOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="landing-food-card__footer">
          <p className="landing-food-card__price">₹{finalPrice}</p>
          <button className="landing-food-card__cta" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
