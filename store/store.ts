import type { Product } from '@/sanity.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      // Dodaje proizvod u korpu ili povećava količinu ako već postoji
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          // Ako proizvod postoji, povećaj količinu
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            // Ako proizvod ne postoji, dodaj ga sa količinom 1
            return {
              items: [...state.items, { product, quantity: 1 }],
            };
          }
        }),

      // Uklanja proizvod iz korpe prema ID-u
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                // Smanji količinu ako je veća od 1
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),

      // Briše sve proizvode iz korpe
      clearBasket: () => set({ items: [] }),

      // Vraća ukupnu cenu svih proizvoda u korpi
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        ),

      // Vraća količinu određenog proizvoda prema ID-u
      getItemCount: (productId) => {
        const found = get().items.find(
          (item) => item.product._id === productId
        );
        return found ? found.quantity : 0;
      },

      // Vraća sve proizvode grupisane (ovde samo vraća listu, možeš prilagoditi po potrebi)
      getGroupedItems: () => get().items,
    }),
    {
      name: 'cart-storage', // name of the item in storage
    }
  )
);

export default useCartStore;
