'use client';

import { useBiddingStore } from "@/store";
import Image from "next/image";
import { useState } from "react";

const FinalModal = () => {
  const [isChecked, setIsChecked] = useState(1);
  const { setIsBidding } = useBiddingStore();

  const handleMovePage = () => {
    // if (isChecked === 1) {
    //   Router.push('/payment');
    // } else {
    //   Router.push('/');
    // };
    setIsBidding(false);
  }

  return (
    <div className="absolute w-full">
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="w-[400px]  rounded-xl bg-[#242424] border border-[#D1B383]  p-5 transition-all duration-[0.3s] ease-out animate-scale-up">
          <div className="text-4xl text-center text-white">
            <div className="flex flex-col items-center justify-center">
              <p className="mx-7">{isChecked === 1 ? '최종 입찰자' : '다른 상품 보기'}</p>
              <div className={`w-[220px] h-[30px] mt-2 relative ${isChecked === 1 ? 'block' : 'hidden'}`}>
                <Image src={'/images/detailModal01.png'} fill sizes="1" alt="이미지" />
              </div>
            </div>
            <p className="my-3 text-[16px]">{isChecked === 1 ? `${'민영님 '}최종 입찰을 축하드립니다!` : '다른 인기 상품 경매에 참여하세요!'}</p>
          </div>
          <div className="flex flex-col justify-start mt-6">
            <div className="flex items-center bg-white rounded-xl p-4">
              <div className="w-[100px] h-[100px] rounded-xl object-cover bg-[gray] relative overflow-hidden">
                <Image src={isChecked === 1 ? '/images/item05.jpg' : '/images/item01.png'} fill sizes="1" className="object-cover" alt="모달 이미지" />
              </div>
              <div className="ml-3">
                <div className="flex items-center font-bold text-lg">
                  <p className="mr-2">{isChecked === 1 ? 'S' : 'A'}</p>
                  <p>{isChecked === 1 ? '나이키 에어 맥스' : '프라다 가방'}</p>
                </div>
                <div className="mt-5">
                  <p className="mr-2 text-[#868686]">{isChecked === 1 ? '최종 입찰가' : '현재 입찰가'}</p>
                  <p>{isChecked === 1 ? '1,200,000원' : '2,000,000원'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <button
              className="w-[200px] h-[50px] rounded-xl outline-none bg-[#D1B383] hover:bg-white border border-[#D1B383] text-white hover:text-[#D1B383]" onClick={handleMovePage}>{isChecked === 1 ? '결제하기' : '입찰하기'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalModal