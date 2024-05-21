'use client';

import { Dispatch, SetStateAction, useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";

type HistoryProps = {
  title: string,
  setMenuNumber?: Dispatch<SetStateAction<number>>;
}

const History = ({ title, setMenuNumber }: HistoryProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="w-full border rounded-xl px-8 py-4 bg-white mb-5">
      <div className="flex items-center">
        <p className="text-[24px] font-semibold">{title}</p>
        <div className="w-[80px] h-[30px] bg-[#F6F6F6] flex justify-center cursor-pointer items-center rounded-full ml-7" onClick={() => title === '입찰 내역' || title === '판매 내역' ? setMenuNumber!(1) : setMenuNumber!(6)}>
          <MdKeyboardArrowRight />
          <p>더보기</p>
        </div>
      </div>
      <div className="border border-x-0 p-4 mt-3">
        <div className="flex items-center ml-[80px]">
          <div className="flex items-center w-[350px]">
            <div className="w-[90px]">
              <LuArrowDownUp />
            </div>
            <div className="">
              <p>상품명</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[135px]">
              <p>카테고리</p>
            </div>
            <div className="w-[200px]">
              <p>가격</p>
            </div>
            <div className={`${title === '나의 상품' ? 'block' : 'hidden'}`}>
              <p>상태</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center ml-[80px]">
          <div className="flex items-center w-[366px]">
            <div className="w-[106px]">
              <div className="w-[50px] h-[50px] bg-[gray]"></div>
            </div>
            <div className="">
              <p>옷</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[135px]">
              <p>신발</p>
            </div>
            <div className="w-[185px]">
              <p>12,000,000원</p>
            </div>
            <div className={`${title === '나의 상품' ? 'block' : 'hidden'}`}>
              <div className={`flex justify-center items-center border rounded-lg w-[70px] h-[40px] ${isChecked ? 'bg-[green] cursor-pointer' : 'bg-red-700'}`} onClick={() => setIsChecked(!isChecked)}>
                <p className="text-white">{isChecked ? '검수완료' : '검수중'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default History