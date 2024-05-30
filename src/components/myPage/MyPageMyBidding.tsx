'use client';

import { useUserProducts } from "@/api/productApi";
import Image from "next/image";
import Link from "next/link";
import { LuArrowDownUp } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";

const MyPageMyBidding = () => {
  const { data, isLoading } = useUserProducts();

  return (
    <div className="w-full rounded-xl px-8 py-4 bg-white mb-5">
      <div className="flex items-center">
        <p className="text-[24px] font-semibold">입찰 내역</p>
        <Link href={'/myPage/order/bidding'}>
          <div className="w-[80px] h-[30px] bg-[#F6F6F6] flex justify-center cursor-pointer items-center rounded-full ml-7">
            <MdKeyboardArrowRight />
            <p>더보기</p>
          </div>
        </Link>
      </div>
      <div className="border border-x-0 p-4 mt-3">
        <div className="flex items-center justify-between ml-[80px] max-[920px]:ml-0">
          <div className="max-[920px]:w-full flex items-center ">
            <div className="w-[90px]">
              <LuArrowDownUp />
            </div>
            <div className='text-nowrap'>
              <p>상품명</p>
            </div>
          </div>
          <div className="w-full ml-[26%] max-[920px]:ml-[35%] flex items-center justify-between max-[920px]:justify-end">
            <div className='mx-[10px] text-nowrap max-[920px]:hidden'>
              <p>카테고리</p>
            </div>
            <div className='mx-[10px] text-nowrap'>
              <p>가격</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {isLoading ?
          <div className='flex justify-center items-center'>
            <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-t from-[#D1B383] to-white flex justify-center items-center animate-spin">
              <div className="w-[55px] h-[55px] rounded-full bg-white"></div>
            </div>
          </div> :
          <div className="flex flex-col-reverse">
            {data?.data.filter((item: any) => item.status === '결제대기' && item.winner_user_id === Number(localStorage.getItem('user_id'))).slice(-3).map((product: any) => (
              <div key={product.id} className="flex items-center justify-between ml-[80px] max-[920px]:ml-0 my-[6px]">
                <div className=" flex items-center">
                  <div className="w-[106px]">
                    <div className="w-[50px] h-[50px] relative rounded-lg overflow-hidden">
                      <Image src={product.images[0] ? product.images[0] : '/images/item05.jpg'} fill sizes='1' className='object-cover' alt='나의 등록 아이템' />
                    </div>
                  </div>
                  <div className="text-nowrap text-ellipsis line-clamp-1">
                    <p>{product.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-[100px] max-[920px]:hidden">
                    <p>{product.category}</p>
                  </div>
                  <div className="max-[920px]:hidden w-[175px]" />
                  <div className={`w-[115px] text-nowrap text-end`}>
                    <p>{product.bid_price.toLocaleString()}원</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default MyPageMyBidding