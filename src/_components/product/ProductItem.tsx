'use client';

import Image from "next/image";
import { MouseEvent, useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
type ProductItemProps = {
  item: {
    id: number;
    name: string;
    img: string;
    price: string;
    category: string;
    like: number;
    view: number;
    grade: string;
  }
}

const ProductItem = ({ item }: ProductItemProps) => {
  const [likes, setLikes] = useState(false);

  const handleLike = async (e: MouseEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    console.log(`${index}좋아요 클릭`);
    setLikes(!likes);
  }

  return (
    <div className="mb-3 mx-[12.5px] max-[625px]:mx-[5px]">
      <div className="mb-2  w-[213px] h-[213px] max-[865px]:w-[155px] max-[865px]:h-[155px] rounded-lg max-[625px]:w-[100px] max-[625px]:h-[100px] object-cover overflow-hidden relative" >
        <div className="w-full h-full rounded-lg bg-black bg-opacity-70 absolute opacity-0 hover:opacity-100 transition-all duration-[0.3s] ease-out  z-10">
          <div className="w-[30px] h-[30px] absolute right-2 top-2 rounded-full bg-white flex items-center justify-center" onClick={(e) => handleLike(e, item.id)}>
            {likes ? <FaHeart className="text-[red]" /> : <FaRegHeart className="text-[#D6D6D6]" />}
          </div>
          <div className="absolute flex items-center bottom-2 text-xs left-2 text-[#D6D6D6]">
            <div className="flex items-center">
              <FaRegHeart />
              <p className="ml-1">{item.like}</p>
            </div>
            <div className="flex items-center ml-2">
              <BsEye className="text-sm" />
              <p className="ml-1">{item.view}</p>
            </div>
          </div>
        </div>
        <Image src={item.img} fill sizes="1" className="w-[228px] h-[228px] object-cover mb-2" alt="물품이미지" priority />
      </div>
      <div>
        <div className="flex items-center">
          <p className="text-white text-[20px] leading-[24px] mb-[6px] max-[865px]:text-[16px] max-[625px]:text-[14px] max-[865px]:leading-none">{item.name}</p>
          <p className="ml-2 text-white text-[20px] leading-[24px]  mb-[6px] max-[865px]:text-[16px] max-[625px]:text-[14px] max-[865px]:leading-none">{item.grade}</p>
        </div>
        <p className="text-[#868686] text-[16px] leading-[24px] mb-[6px] max-[865px]:text-[16px] max-[625px]:text-[14px] max-[865px]:leading-none">{item.category}</p>
        <div className="flex items-center max-[625px]:block mb-[6px]">
          <p className="text-white text-nowrap">시작가&nbsp;</p>
          <p className="text-white text-nowrap text-[20px] leading-[24px] max-[865px]:text-[16px] max-[625px]:text-[14px] max-[865px]:leading-none">{item.price}</p>
        </div>
        <div className="flex items-center max-[625px]:block">
          <p className="text-[#D1B383] text-nowrap">현재가&nbsp;</p>
          <p className="text-[#D1B383] text-nowrap text-[20px] leading-[24px] max-[865px]:text-[16px] max-[625px]:text-[14px] max-[865px]:leading-none">{item.price}</p>
        </div>
      </div>
    </div>

  )
}

export default ProductItem