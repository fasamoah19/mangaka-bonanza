import { Cart } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";



/**
 * This function serves as global state for adding and removing elements from the cart
 * 
 * @returns state and dispatch function
 */
export function globalCartStorage() {
  const [cart, setCart] = useState<number[]>([])
  useEffect(() => {
    setCart([])
  }, [])

  const setValue = (value: number[]) => {
    setCart(value)
  }

  return [cart, setValue] as const;
}

// Context for the cart value
const CartContext = createContext<Cart>([]);
// Context for the function that adds and removes elements from the cart
const SetCartContext = createContext<(value: Cart) => void>(() => {});

/**
 * Context for the values currently in the cart array
 * 
 * @returns Context
 */
export function useCartContext() {
  return useContext(CartContext);
}

/**
 * Context for the function that adds and removes items from the cart array
 * 
 * @returns Context
 */
export function useSetCartContext() {
  return useContext(SetCartContext);
}

/**
 * Context Provider for adding and removing elements from the Cart array
 * 
 * @param param0 The page view
 * @returns CartContextProvider component
 */
export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [cart, setCart] = globalCartStorage()

  return (
    <CartContext.Provider value={cart}>
      <SetCartContext.Provider value={setCart}>
        {children}
      </SetCartContext.Provider>
    </CartContext.Provider>
  );
}
