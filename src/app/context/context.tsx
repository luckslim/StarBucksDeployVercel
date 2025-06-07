"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Products } from "../page";
import { toast } from "react-toastify";

interface CartContextType {
  cart: Products[];
  AddToCart: (product: Products, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  calculateTotal:()=>string;
}
interface CartProviderProps {
  children: ReactNode;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Products[]>([]);

  function notify(productName: string, quantity: number) {
    toast(`(${quantity}) ${productName} Adicionado ao Carrinho!`);
  }
  function AddToCart(product: Products, quantity: number) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    return notify(product.name, quantity);
  }
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  const calculateTotal = () => {
    return cart
        .reduce((total, product) => total + product.price * product.quantity, 0)
        .toFixed(2);
};
  return (
    <CartContext.Provider
      value={{
        cart,
        AddToCart,
        removeFromCart,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
