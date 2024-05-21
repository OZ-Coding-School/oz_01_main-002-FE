import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type Product = {
  id: number;
  grade: string;
  title: string;
  img: string;
  startPrice?: number;
  price: number;
  category: string;
  commission?: number;
}

type State = {
  menuNumber: number;
  setMenuNumber: (number: number) => void;
  paymentUserProducts: Product[];
  setPaymentUserProducts: (products: Product[]) => void;
}

export const useProductStore = create<State>()(
  devtools(persist((set) => ({
    menuNumber: 0,
    setMenuNumber: (number) => set({ menuNumber: number }),
    paymentUserProducts: [],
    setPaymentUserProducts: (products) => set({ paymentUserProducts: products }),
  }), {
    name: 'user_products',
    storage: createJSONStorage(() => sessionStorage),
  }
  )))