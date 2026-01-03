import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case 'REMOVE':
      return state.filter((_, index) => index !== action.index);

    case 'DROP':
      return [];

    case 'UPDATE':
      return state.map((food) => {
        if (food.id === action.id && food.size === action.size) {
          return {
            ...food,
            qty: parseInt(action.qty) + parseInt(food.qty),
            price: action.price + food.price,
          };
        }
        return food;
      });

    default:
      console.error('Unknown action type:', action.type);
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const useDispatchCart = () => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useDispatchCart must be used within a CartProvider');
  }
  return context;
};
