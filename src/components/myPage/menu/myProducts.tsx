'use client';

import { useProductStore } from "@/store";
import { RiArrowGoBackFill } from "react-icons/ri";

const MyProducts = () => {
  const { setMenuNumber } = useProductStore();
  return (
    <div className="w-full max-w-[900px] h-[1000px] bg-white rounded-xl px-10">
      <div className="py-5 hidden text-2xl cursor-pointer max-[1200px]:block" onClick={() => setMenuNumber(0)}>
        <RiArrowGoBackFill />
      </div>
      <div className="h-[64px] max-[1200px]:hidden" />
      <div className="text-3xl font-semibold my-2">
        <p>나의 상품</p>
      </div>
      <div className="border-2 border-[#D1B383]" />
    </div>
  )
}

export default MyProducts