'use client';

import Image from "next/image";
import { MouseEvent, useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type ProductItemProps = {
  id: number;
  name: string;
  img: string;
  startPrice: string;
  price: string;
  category: string;
  like: number;
  view: number;
  grade: string;
}

type ProductListType = {
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
  images: string[]
}

const ProductListItem = ({ item }: { item: ProductListType }) => {
  const [likes, setLikes] = useState(false);

  const handleLike = async (e: MouseEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setLikes(!likes);
  }

  return (
    <div className="mb-3 mx-[27.5px] ">
      <div className="mb-2  w-[228px] h-[228px] max-[585px]:w-[170px] max-[585px]:h-[170px]  object-cover relative" >
        <div className="w-full h-full rounded-lg bg-black bg-opacity-70 absolute opacity-0 hover:opacity-100 transition-all duration-[0.3s] ease-out  z-10">
          <div className="w-[30px] h-[30px] absolute right-2 top-2 rounded-full bg-white flex items-center justify-center" onClick={(e) => handleLike(e, item.id)}>
            {likes ? <FaHeart className="text-[red]" /> : <FaRegHeart className="text-[#D6D6D6]" />}
          </div>
          <div className="absolute flex items-center bottom-2 text-xs left-2 text-[#D6D6D6]">
            <div className="flex items-center">
              <FaRegHeart />
              {/* <p className="ml-1">{item.like}</p> */}
            </div>
            <div className="flex items-center ml-2">
              <BsEye className="text-sm" />
              {/* <p className="ml-1">{item.view}</p> */}
            </div>
          </div>
        </div>
        <Image src={item.images[0]} fill sizes="1" className="w-[228px] h-[228px] object-cover mb-2 rounded-[8px]" alt="물품이미지" priority />
      </div>
      <div>
        <div className="flex items-center">
          <p className="text-white text-[20px] leading-[24px] mb-[6px] max-[585px]:text-[16px]  max-[865px]:leading-none">{item.product_name}</p>
          <p className="ml-2 text-white text-[20px] leading-[24px] mb-[6px] max-[585px]:text-[16px] max-[865px]:leading-none">{item.product_grade}</p>
        </div>
        <p className="text-[#868686] text-[16px] leading-[24px] mb-[6px] max-[585px]:text-[14px] max-[865px]:leading-none">{item.category}</p>
        <p className="text-white text-[20px] leading-[24px] max-[585px]:text-[16px] max-[865px]:leading-none mb-[6px]">시작가 {item.product_bid_price.toLocaleString()}원</p>
        <p className="text-[#D1B383] text-[20px] leading-[24px] max-[585px]:text-[16px] max-[865px]:leading-none">현재가 {item.final_price.toLocaleString()}원</p>
      </div>
    </div>

  )
}

export default ProductListItem