'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const MainCarousel = () => {
  const [images, setImages] = useState(0);

  const auctionItems = [
    { id: 1, name: '샤넬 가방', img: '/images/item03.jpg', price: '6,750,000원', category: '가방' },
    { id: 2, name: '샤넬 라운드티', img: '/images/item04.jpg', price: '650,000원', category: '옷' },
    { id: 3, name: '나이키 신발', img: '/images/item05.jpg', price: '640,000원', category: '신발' },
    { id: 4, name: '로렉스 시계', img: '/images/item01.png', price: '15,000,000원', category: '시계' },
  ];

  useEffect(() => {
    let time = setInterval(() => {
      setImages(prev => prev + 1 >= auctionItems.length ? 0 : prev + 1);
    }, 5000)
    return () => {
      clearInterval(time);
    }
  }, [])


  const next = () => {
    setImages(prev => prev + 1 >= auctionItems.length ? 0 : prev + 1);
  }

  const prev = () => {
    setImages(prev => prev - 1 < 0 ? auctionItems.length - 1 : prev - 1);
  }

  return (
    <div>
      <div className="w-full pb-[33.765%] object-cover z-[1] relative">
        <div className="z-[1] flex justify-center items-center cursor-pointer w-[100px] h-[200px] hover:bg-black hover:bg-opacity-50 absolute left-0 top-1/2 transform -translate-y-1/2" onClick={prev}>
          <IoIosArrowBack className="text-white text-[64px]" />
        </div>
        <div className="z-[1] flex justify-center items-center cursor-pointer w-[100px] h-[200px] hover:bg-black hover:bg-opacity-50 absolute right-0 top-1/2 transform -translate-y-1/2" onClick={next}>
          <IoIosArrowForward className="text-white text-[64px]" />
        </div>
        <Image src={auctionItems[images].img} fill sizes="1" className="object-cover" alt="슬라이드이미지" priority />
        {/* <div className="absolute bottom-[100px] left-[200px]">
          <p className="z-20 font-[CoolGuy-Medium] text-[#D1B383] drop-shadow-[0_4px_4px_rgba(255,255,255,0.8)] font-bold text-[80px]">{auctionItems[images].name}</p>
          <p className="z-20 font-[CoolGuy-Medium] text-[#D1B383] drop-shadow-[0_4px_4px_rgba(255,255,255,0.8)] font-bold text-[80px]">{auctionItems[images].price}</p>
        </div> */}
      </div>
    </div>
  )
}

export default MainCarousel