'use client';

import Chat from "@/components/productDetail/Chat";
import CountDown from "@/components/productDetail/CountDown";
import DetailImage from "@/components/productDetail/DetailImage";
import ModalContainer from "@/components/productDetail/ModalContainer";
import { useState } from "react";

const ProductDetail = () => {
  const [itemPrice, setItemPrice] = useState(20000);
  return (
    <div className="w-full bg-[#222]">
      <div className="w-full max-w-[1240px] mx-auto">
        <div className="h-[32px]" />
        <div>
          <div className="w-full h-[50px] flex items-center justify-center">
            <CountDown />
          </div>
          <div className="flex justify-between mt-8">
            <div>
              <DetailImage />
              <div className="w-full m-3">
                <div className="flex items-center my-2">
                  <div className="mr-2">
                    <p className="text-4xl text-white">S</p>
                  </div>
                  <div>
                    <p className="text-4xl text-white">나이키 에어 맥스</p>
                  </div>
                </div>
                <div className="w-full border border-[#868686]" />
                <div className="flex justify-between">
                  <div className=" flex items-center my-4">
                    <p className="text-[#D1B383] text-[20px] leading-none">카테고리</p>
                    <p className="text-white text-[20px] leading-none ml-11">옷</p>
                  </div>
                  <div className="m-3">
                    <div className=" flex justify-between  items-center my-4">
                      <p className="text-[#D1B383] text-[20px] leading-none">시작가</p>
                      <p className="text-white text-[20px] leading-none ml-16">12000,000원</p>
                    </div>
                    <div className="flex justify-between items-center my-4">
                      <p className="text-[#D1B383] text-[20px] leading-none">현재가</p>
                      <p className="text-white text-[20px] leading-none ml-16">{itemPrice.toLocaleString()}원</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Chat productId={'2'} itemPrice={itemPrice} setItemPrice={setItemPrice} />
          </div>
          <div className="ml-3 mr-6">
            <div className="border border-[#868686] pr-3" />
            <div className="my-3 box-border flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-[80px] h-[80px] bg-[#868686] rounded-full"></div>
                <div className="ml-4 text-[20px] text-white">
                  <p>유저 닉네임</p>
                </div>
              </div>
              <div className="mr-8 text-white">
                <p>유저 설명</p>
              </div>
            </div>
            <div className="border border-[#868686] pr-3" />
          </div>
          <div className="h-4" />
          <div className="ml-3 mr-6">
            <div className="w-full border p-4 text-white">
              <p>설명</p>
              <p>설명</p>
              <p>설명</p>
              <p>설명</p>
              <p>설명</p>
            </div>
          </div>
        </div>
      </div>
      <ModalContainer />
    </div>
  )
}

export default ProductDetail