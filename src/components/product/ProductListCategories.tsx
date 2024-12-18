"use client";

import { useOnclickOutside } from "@/hooks/useOnClickOutSide";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProductListCategory from "./ProductListCategory";
import { categories } from "@/data/data";

const ProductListCategories = () => {
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsClicked(window.innerWidth >= 1135);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useOnclickOutside(ref, () => {
    setIsClicked(false);
  });
  return (
    <div className="relative ">
      <div className="relative w-[120px] h-[50px] hidden max-[1135px]:block">
        <div
          className="w-[120px] ml-5 h-[50px] border border-[#D1B383] transition-all duration-[0.3s] ease-out rounded-lg bg-[#D1B383] hover:bg-white hover:text-[#D1B383] relative flex justify-center cursor-pointer text-white items-center"
          onClick={() => setIsClicked(!isClicked)}
        >
          <p>카테고리</p>
        </div>
        <div
          className={`absolute w-[120px] h-[50px] left-5 top-0 rounded-lg ${
            isClicked ? "block" : "hidden"
          }`}
        />
      </div>
      <div
        ref={ref}
        className={`w-full  max-[1135px]:w-[120px] h-[50px] border-x-0  z-10 bg-[#222] flex items-center justify-center max-[1135px]:block max-[1135px]:absolute max-[1135px]:top-[51px] max-[1135px]:left-5 ${
          isClicked ? "max-[1135px]:block" : "max-[1135px]:hidden"
        }`}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={{
              pathname: `/productList`,
              query: {
                name: category.name,
              },
            }}
          >
            <ProductListCategory
              category={category.name}
              setIsClicked={setIsClicked}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListCategories;
