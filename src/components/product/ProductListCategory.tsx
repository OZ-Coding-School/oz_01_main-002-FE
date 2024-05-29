'use client';

import { MouseEvent } from "react";

type ProductListCategoryProps = {
  category: string;
  setIsClicked: (value: boolean) => void;
}
const ProductListCategory = ({ category, setIsClicked }: ProductListCategoryProps) => {
  const handleSearch = (e: MouseEvent<HTMLDivElement>, name: string) => {
    // e.stopPropagation();
    setIsClicked(false);
  }
  return (
    <div className="w-[100px] h-[50px] bg-[#D1B383] cursor-pointer  text-white rounded-full hover:bg-[#D1B383] hover:text-[18px] transition-all duration-[0.3s] ease-out flex justify-center items-center mx-[27.5px] max-[1260px]:mx-[20px] max-[1135px]:w-[120px] max-[1135px]:mx-[0px] max-[1135px]:rounded-none max-[1135px]:last:rounded-b-lg max-[1135px]:first:rounded-t-lg max-[1135px]:bg-[#222] max-[1135px]:border max-[1135px]:border-[#D1B383]" onClick={(e) => handleSearch(e, category)}>{category}</div>
  )
}

export default ProductListCategory