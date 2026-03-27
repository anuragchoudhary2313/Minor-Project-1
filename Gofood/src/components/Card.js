import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingCart, Star } from 'lucide-react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const cart = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const { options, item: foodItem } = props;
  const priceOptions = Object.keys(options);
  const isWaterItem = foodItem.img && foodItem.img.includes('beverage_water_bottle');
  const fallbackImage =
    isWaterItem
      ? '/images/food/beverage_water_bottle.jpg'
      : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format';
  
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Check if item is currently in cart
  const existingItem = cart.find((item) => item.id === foodItem._id && item.size === size);

  useEffect(() => {
    if (priceOptions.length > 0) {
      setSize(prev => prev || priceOptions[0]);
    }
  }, [priceOptions]);

  const finalPrice = useMemo(() => {
    const unit = Number(options[size] || 0);
    return qty * unit;
  }, [qty, size, options]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    animate(x, 0, { duration: 0.5 });
    animate(y, 0, { duration: 0.5 });
  };

  const handleAddToCart = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    if (existingItem) {
      await dispatch({ type: 'UPDATE', id: foodItem._id, price: finalPrice, qty: qty, size: size });
    } else {
      await dispatch({ type: 'ADD', id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: foodItem.img });
    }
  };

  const incrementQty = () => setQty(prev => prev + 1);
  const decrementQty = () => setQty(prev => prev > 1 ? prev - 1 : 1);

  return (
    <motion.article 
      className="card-3d-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
    >
      <div className="card h-100 shadow-elite border-0" style={{ background: 'var(--color-surface)' }}>
        <div
          className="card__image-wrap"
          style={{
            perspective: '1000px',
            background: isWaterItem ? 'linear-gradient(180deg, #e8f8ff 0%, #cfeeff 100%)' : undefined
          }}
        >
          <motion.img 
            src={foodItem.img} 
            className="card__image" 
            alt={foodItem.name} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
            style={{ 
              x: useTransform(x, [-100, 100], [5, -5]), 
              y: useTransform(y, [-100, 100], [5, -5]),
              scale: isWaterItem ? 0.94 : 1.1,
              objectFit: isWaterItem ? 'contain' : 'cover',
              objectPosition: isWaterItem ? 'center center' : 'center',
              padding: isWaterItem ? '10px 20px 0' : 0
            }}
          />
          <div className="card__badge">
            <span className="badge bg-white text-primary fw-bold shadow-sm d-flex align-items-center gap-1">
              <Star size={12} fill="currentColor" /> 4.8
            </span>
          </div>
        </div>
        
        <div className="card__content d-flex flex-column p-4">
          <div className="d-flex align-items-center gap-2 mb-2">
            <div className={`diet-indicator ${foodItem.isVeg ? 'veg' : 'non-veg'}`}>
              <div className="diet-dot"></div>
            </div>
            <h5 className="card__title mb-0" style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }}>{foodItem.name}</h5>
          </div>
          <p className="card__desc small mb-4" style={{ color: 'var(--color-text-muted)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {foodItem.description}
          </p>
          
          <div className="d-flex gap-3 mb-4">
            <div className="flex-grow-1">
              <label htmlFor={`size-${foodItem._id}`} className="d-block mb-1 small fw-bold text-muted">SIZE</label>
              <select 
                id={`size-${foodItem._id}`} 
                className="form-select form-select-sm border-0 bg-light rounded-3" 
                value={size} 
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => (
                  <option key={data} value={data}>{data.charAt(0).toUpperCase() + data.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="card__footer mt-auto pt-4 border-top">
             <div className="card__price-wrap">
                <span className="card__price-label d-block small text-muted">Price</span>
                <span className="card__price h4 fw-black m-0" style={{ color: 'var(--color-cta)' }}>₹{finalPrice}</span>
             </div>

             <div className="ms-auto">
               <AnimatePresence mode="wait">
                 {existingItem ? (
                   <motion.div 
                     key="stepper"
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.8, opacity: 0 }}
                     className="d-flex align-items-center gap-2 bg-light rounded-pill p-1"
                   >
                     <button onClick={decrementQty} className="btn btn-sm btn-white rounded-circle shadow-sm p-1"><Minus size={14} /></button>
                     <span className="px-2 fw-bold">{qty}</span>
                     <button onClick={incrementQty} className="btn btn-sm btn-primary rounded-circle shadow-sm p-1"><Plus size={14} /></button>
                   </motion.div>
                 ) : (
                   <motion.button 
                     key="add-btn"
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.8, opacity: 0 }}
                     whileTap={{ scale: 0.95 }}
                     className="btn btn-primary rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm fw-bold" 
                     onClick={handleAddToCart}
                   >
                     <ShoppingCart size={18} /> Add
                   </motion.button>
                 )}
               </AnimatePresence>
             </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
