'use client';

import { useOnclickOutside } from "@/hooks/useOnClickOutSide";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProductListCategory from "./ProductListCategory";

const ProductListCategories = () => {
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsClicked(window.innerWidth >= 1135);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 2, name: '가방', img: '/images/item02.jpg' },
    { id: 3, name: '시계', img: '/images/item01.png' },
    { id: 4, name: '상의', img: '/images/cate04.jpg' },
    { id: 5, name: '하의', img: '/images/cate03.jpg' },
    { id: 6, name: '나이키', img: '/images/cate02.png' },
    { id: 7, name: '아디다스', img: '/images/cate01.svg' },
    { id: 8, name: '카메라', img: '/images/cate05.png' },
    { id: 9, name: '주얼리', img: '/images/cate06.png' },
  ];
  useOnclickOutside(ref, () => {
    setIsClicked(false);
  })
  return (
    <div className="relative ">
      <div className="relative w-[120px] h-[50px] hidden max-[1135px]:block">
        <div className="w-[120px] ml-5 h-[50px] border border-[#D1B383] transition-all duration-[0.3s] ease-out rounded-lg bg-[#D1B383] hover:bg-white hover:text-[#D1B383] relative flex justify-center cursor-pointer text-white items-center" onClick={() => setIsClicked(!isClicked)}>
          <p>카테고리</p>
        </div>
        <div className={`absolute w-[120px] h-[50px] left-5 top-0 rounded-lg ${isClicked ? 'block' : 'hidden'}`} />
      </div>
      <div ref={ref} className={`w-full  max-[1135px]:w-[120px] h-[50px] border-x-0  z-10 bg-[#222] flex items-center justify-center max-[1135px]:block max-[1135px]:absolute max-[1135px]:top-[51px] max-[1135px]:left-5 ${isClicked ? 'max-[1135px]:block' : 'max-[1135px]:hidden'}`}>
        {categories.map((category) => (
          <Link key={category.id} href={{
            pathname: `/productList`,
            query: {
              id: category.id
            }
          }}>
            <ProductListCategory category={category.name} setIsClicked={setIsClicked} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductListCategories