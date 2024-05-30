export type ProductInsertType = {
  title: string,
  category: number,
  min_price: number | string,
  content: string,
  date: number,
  grade: string,
};

export type ProductInsertType1 = {
  name: string,
  category_id: number,
  bid_price: number | string,
  content: string,
  duration: number,
  grade: string,
  status: string,
  modify: boolean,
};

export type ProductInsertType2 = {
  name: string,
  category_id: number,
  bid_price: number | string,
  content: string,
  duration: number,
  grade: string,
  status: string,
  modify: boolean,
  file: File | null,
};

export type MyProductsType = {
  name: string,
  content: string,
  bid_price: number,
  duration: number,
  user_id: number,
  status: string,
  modify: boolean,
  grade: string,
  category_id: number,
  category: string,
  is_approved: boolean,
  images: any,
  id: number
  winner_bid_price?: number | null,
  winner_nickname?: string | null,
  winner_user_id?: number | null,
}

export type UpdateProductType = {
  id: number,
  updateData: {
    content?: string,
    bid_price?: string | number,
    duration?: number,
    status?: string,
  }
}

export type ProductListType = {
  id: number;
  product_id: number;
  product_name: string;
  product_grade: string;
  product_bid_price: number;
  category: string;
  start_time: string;
  end_time: string;
  charge: number;
  final_price: number;
  status: boolean;
  is_active: string;
  images: string[],
}

export type AuctionProductDetailType = {
  data: {
    category: string;
    charge: number;
    end_time: string;
    final_price: number;
    id: number;
    is_active: string;
    user_nickname: string;
    user_content: string;
    product_bid_price: number;
    product_grade: string;
    product_content: string;
    product_id: number;
    product_name: string;
    start_time: string;
    status: boolean;
    product_images: string[],
    user_image: string,
  }
}

export type AuctionStatusType = {
  auctionId: string | undefined;
  status: boolean;
  isActive: string;

}

export type WinnerPostType = {
  product_id: number,
  auction_id: number,
  bid_price: number,
}