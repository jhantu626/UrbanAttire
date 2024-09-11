import {createContext, useState} from 'react';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [carts, setCarts] = useState([]);

  const addCart = item => {
    const updatedCart = carts || [];
    const itemExist = updatedCart.find(cart => item.id === cart.id);

    // Check if item doesn't exist in the cart array
    if (!itemExist) {
      setCarts([...carts, item]); // Spread carts into a new array and add the new item
    }
  };

  const removeCart = item => {
    setCarts(carts.filter(cart => cart.id !== item.id));
  };

  return (
    <CartContext.Provider value={{carts, setCarts, addCart, removeCart}}>
      {children}
    </CartContext.Provider>
  );
};
