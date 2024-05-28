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
  is_approved: boolean,
  img: string,
  id: number
}

export type UpdateProductType = {
  id: number,
  updateData: {
    content: string,
    bid_price: string | number,
    duration: number,
    status: string,
  }
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
  }
}

export type WinnerPostType = {
  product_id: number,
  auction_id: number,
  bid_price: number,
}