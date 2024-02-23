import { create } from 'zustand';

import { CartProduct } from '@/interfaces';
// persist nos permite guardar en el localStorage
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  //Métodos ----
  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // Primero revisamos que el producto exista en el carrito con la talla seleccionada (
        // esto lo hacemos para independizar los productos de las tallas
        // ejemplo: para una camisa podemos llevar 2 talles diferentes, los cuales serán 2 productos diferentes
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        // -- si el producto no existe lo agrego --
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // -- en este punto ya se que el producto existe, solo queda incrementar la cantidad
        const updateCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updateCartProduct });
      },
    }),
    { name: 'shopping-cart' }
  )
);
