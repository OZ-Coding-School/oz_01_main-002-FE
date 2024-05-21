'use client';

import { useProductStore } from '@/store';
import { MdKeyboardArrowRight } from "react-icons/md";
const MoreButton = () => {

  const { setMenuNumber } = useProductStore();

  return (
    <div className="w-[80px] h-[30px] bg-[#F6F6F6] flex justify-center items-center cursor-pointer rounded-full ml-7" onClick={() => setMenuNumber(2)}>
      <MdKeyboardArrowRight />
      <p>더보기</p>
    </div>
  )
}

export default MoreButton