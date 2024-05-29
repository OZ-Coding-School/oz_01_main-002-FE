'use client';

import { useUserProducts } from '@/api/productApi';
import { MyProductsType } from '@/type/ProductType';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowDownUp } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";

const MyPageMyProducts = () => {
  const { data, isLoading } = useUserProducts();

  return (
    <div className="w-full rounded-xl px-8 py-4 bg-white mb-5">
      <div className="flex items-center">
        <p className="text-[24px] font-semibold">나의 상품</p>
        <Link href={'/myPage/myProducts'}>
          <div className="w-[80px] h-[30px] bg-[#F6F6F6] flex justify-center cursor-pointer items-center rounded-full ml-7">
            <MdKeyboardArrowRight />
            <p>더보기</p>
          </div>
        </Link>
      </div>
      <div className="border border-x-0 p-4 mt-3">
        <div className="flex items-center justify-between ml-[80px] max-[920px]:ml-0">
          <div className="flex items-center justify-between">
            <div className="w-[90px]">
              <LuArrowDownUp />
            </div>
            <div className='text-nowrap '>
              <p>상품명</p>
            </div>
          </div>
          <div className="w-full ml-[26%] max-[920px]:ml-[35%] flex items-center justify-between max-[670px]:justify-end">
            <div className='mx-[10px] text-nowrap max-[920px]:hidden'>
              <p>카테고리</p>
            </div>
            <div className='mx-[10px] text-nowrap'>
              <p>가격</p>
            </div>
            <div className='mx-[10px] text-nowrap max-[670px]:hidden'>
              <p>상태</p>
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
          </div> : data?.data.slice(0, 3).map((product: MyProductsType) => (
            <div key={product.id} className="flex items-center justify-between ml-[80px] max-[920px]:ml-0 my-[6px]">
              <div className="flex items-center">
                <div className="w-[106px]">
                  <div className="w-[50px] h-[50px] relative rounded-lg overflow-hidden">
                    <Image src={product.img ? product.img : '/images/item05.jpg'} fill sizes='1' className='object-cover' alt='나의 등록 아이템' />
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
                <div className={`w-[115px] text-nowrap text-end max-[670px]:rounded-lg max-[670px]:flex max-[670px]:items-center max-[670px]:justify-center max-[670px]:h-[40px] ${product.status ? 'max-[670px]:bg-[#D1B383] max-[670px]:cursor-pointer max-[670px]:text-white' : product.status === '검수완료' ? 'bg-blue-600' : 'bg-red-700'}`}>
                  <p>{product.bid_price.toLocaleString()}원</p>
                </div>
                <div className='w-[175px] flex items-center justify-end max-[670px]:hidden'>
                  <div className={`flex justify-center items-center border rounded-lg w-[70px] h-[40px] ${product.status ? 'bg-[#D1B383] cursor-pointer' : product.status === '검수완료' ? 'bg-blue-600' : 'bg-red-700'}`}>
                    <p className="text-white">{product.status}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default MyPageMyProducts