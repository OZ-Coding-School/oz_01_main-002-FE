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
  paymentUserProducts: Product[];
  setPaymentUserProducts: (products: Product[]) => void;
}

type NumberState = {
  menuNumber: number;
  setMenuNumber: (number: number) => void;
}

export const useProductStore = create<State>()(
  devtools(persist((set) => ({
    paymentUserProducts: [],
    setPaymentUserProducts: (products) => set({ paymentUserProducts: products }),
  }), {
    name: 'user_products',
    storage: createJSONStorage(() => sessionStorage),
  }
  )))

export const useMenuNumberStore = create<NumberState>((set) => ({
  menuNumber: 0,
  setMenuNumber: (number) => set({ menuNumber: number }),
}))