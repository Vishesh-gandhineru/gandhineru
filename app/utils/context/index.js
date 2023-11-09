"use client";

import React, { useEffect, useState } from "react";

export const AppContext = React.createContext([{}, () => {}]);

export const AppProvider = (props) => {
  const [cart, setCart] = useState({
    cartItems: [],
    totalQtn: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    const loadCart = async () => {
      if (typeof window !== "undefined") {
        let cartData = localStorage.getItem("next-cart");
        cartData =
          cartData !== null
            ? JSON.parse(cartData)
            : { cartItems: [], totalQtn: 0, totalPrice: 0 };
        setCart(cartData);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("next-cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <AppContext.Provider value={[cart, setCart]}>
      {props.children}
    </AppContext.Provider>
  );
};
