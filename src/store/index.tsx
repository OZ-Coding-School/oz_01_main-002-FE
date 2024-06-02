import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type Product = {
  id: number;
  grade: string;
  name: string;
  images: string;
  startPrice?: number;
  winner_bid_price: number;
  category: string;
  commission?: number;
}

type State = {
  paymentUserProducts: Product[];
  setPaymentUserProducts: (products: Product[]) => void;
}

type BiddingState = {
  isBidding: boolean;
  setIsBidding: (isBidding: boolean) => void;
}


type winnerState = {
  winner: string;
  setWinner: (winner: string) => void;
  productId: string;
  setProductId: (productId: string) => void;
  itemStatus: boolean | undefined;
  setItemStatus: (itemStatus: boolean) => void;
}

type ProductIdState = {
  productId: number;
  setProductId: (productId: number) => void;
};

export const useProductStore = create<State>()(
  devtools(persist((set) => ({
    paymentUserProducts: [],
    setPaymentUserProducts: (products) => set({ paymentUserProducts: products }),
  }), {
    name: 'user_products',
    storage: createJSONStorage(() => sessionStorage),
  }
  ))
)

export const useBiddingStore = create<BiddingState>((set) => ({
  isBidding: false,
  setIsBidding: (isBidding: boolean) => set({ isBidding }),
}))

export const useProductIdStore = create<ProductIdState>()(
  devtools(persist((set) => ({
    productId: 0,
    setProductId: (productId: number) => set({ productId }),
  }), {
    name: 'user_product_id',
    storage: createJSONStorage(() => sessionStorage),
  }
  ))
)

export const useWinnerStore = create<winnerState>((set) => ({
  winner: '',
  itemStatus: true,
  productId: '',
  setProductId: (productId: string) => set({ productId }),
  setItemStatus: (itemStatus: boolean) => set({ itemStatus }),
  setWinner: (winner: string) => set({ winner }),
}))