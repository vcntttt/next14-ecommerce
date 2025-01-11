import { CartProduct } from "@/interfaces/products";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeFromCart: (product: CartProduct) => void;

  getSummary: () => {
    totalItems: number;
    subTotal: number;
    tax: number;
    total: number;
  }
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      items: 0,

      addToCart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. Se que el producto existe por talla... tengo que incrementar
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      removeFromCart: (product: CartProduct) => {
        const { cart } = get();

        const updatedCartProducts = cart.filter(
          (item) => {
            return item.slug !== product.slug || item.size !== product.size;
          }
        );

        set({ cart: updatedCartProducts });
      },
      getSummary: () => {
        const { cart } = get();

        const totalItems = cart.reduce((total,item) => total + item.quantity, 0)
        const subTotal = cart.reduce((subTotal, item) => subTotal + (item.price * item.quantity), 0);
        const tax = subTotal * 0.15;
        const total = subTotal + tax;

        return {
          totalItems,
          subTotal,
          tax,
          total
        }

      },
    }),
    {
      name: "cart",
    }
  )
);
