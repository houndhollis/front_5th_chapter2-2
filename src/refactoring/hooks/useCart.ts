// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const matchedItem = prev.find((item) => item.product.id === product.id);
      if (matchedItem) {
        return prev.map((item) =>
          item.product.id === matchedItem.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const cartItem: CartItem = {
        product: product,
        quantity: 1,
      };
      return [...prev, cartItem];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => {
      const item = prev.find((item) => item.product.id === productId);
      if (item) {
        return updateCartItemQuantity(prev, productId, newQuantity);
      }
      return prev;
    });
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
