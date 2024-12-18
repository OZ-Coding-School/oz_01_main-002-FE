"use client";

import { useGetAuctionProducts } from "@/api/productApi";
import MainCarousel from "@/components/main/MainCarousel";
import ProductItem from "@/components/product/ProductItem";
import { data, mainCategories } from "@/data/data";
import { ProductListType } from "@/type/ProductType";
import Image from "next/image";
import Link from "next/link";

const MainPage = () => {
  // const { data } = useGetAuctionProducts();
  return (
    <div className="bg-[#222] w-full">
      <MainCarousel />
      <div className="h-[97px] max-[625px]:h-[50px]" />
      <div className="flex justify-center max-w-[1181px] max-[1200px]:max-w-[877px] max-[865px]:max-w-[637px] max-[625px]:max-w-[477px] mx-auto flex-wrap">
        {mainCategories.map((category) => (
          <Link
            key={category.id}
            href={{
              pathname: category.link,
              query: {
                name: category.name,
              },
            }}
          >
            <div className="mb-[26px]">
              <div className="w-[261px] h-[261px] relative object-cover max-[1200px]:w-[180px] max-[1200px]:h-[180px] max-[865px]:w-[120px] max-[865px]:h-[120px] max-[625px]:w-[80px] max-[625px]:h-[80px] mb-2 overflow-hidden rounded-[8px] mx-[16px]">
                <Image
                  src={category.img}
                  fill
                  sizes="1"
                  className="object-cover bg-white"
                  alt="카테고리 이미지"
                />
              </div>
              <p className="text-[#D1B383] text-[24px] leading-[29px] ml-[16px] max-[1200px]:text-[20px] max-[625px]:text-[16px]">
                {category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="h-[153px]" />
      <div className="w-full flex justify-center mb-10">
        <div className="flex flex-col items-center justify-center">
          <p className="text-5xl leading-[58px] text-white mb-[20px] max-[865px]:text-[32px] max-[865px]:leading-none">
            인기상품
          </p>
          <div className="border border-[#D1B383] w-20 mb-[20px]"></div>
          <p className="text-[24px] leading-[29px] text-[#868686] mb-[20px] max-[865px]:text-[16px] max-[865px]:leading-none">
            경매 상품들 중 인기상품들 입니다.
          </p>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-[560px] h-[560px] max-[865px]:w-[360px] max-[865px]:h-[360px] max-[625px]:w-[260px] max-[625px]:h-[260px] object-cover mb-2 rounded-[8px] relative overflow-hidden">
          <Image src={"/images/image001.png"} fill sizes="1" alt="item01" />
        </div>
        <div className="ml-[60px] max-[625px]:ml-[10px]">
          {data &&
            data?.data
              .filter((item: ProductListType) => item.is_active !== "결제대기")
              .filter((item: ProductListType) => item.is_active !== "경매종료")
              .slice(0, 2)
              .map((item: ProductListType) => (
                <Link
                  key={item.id}
                  href={{
                    pathname: `/productList/detail`,
                    query: {
                      id: item.id,
                      productId: item.product_id,
                    },
                  }}
                >
                  <ProductItem item={item} />
                </Link>
              ))}
        </div>
      </div>
      <div className="h-[158px]" />
      <div className="w-full flex justify-center mb-10">
        <div className="flex flex-col items-center justify-center">
          <p className="text-5xl leading-[58px] text-white mb-[20px] max-[865px]:text-[32px] max-[865px]:leading-none">
            경매상품
          </p>
          <div className="border border-[#D1B383] w-20 mb-[20px]"></div>
          <p className="text-[24px] leading-[29px] text-[#868686] mb-[20px] max-[865px]:text-[16px] max-[865px]:leading-none">
            경매가 진행중인 상품들 입니다.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="mr-[47.5px] max-[1200px]:mr-[0px] max-w-[510px] flex flex-wrap justify-center">
          {data &&
            data?.data
              .filter((item: ProductListType) => item.is_active !== "결제대기")
              .filter((item: ProductListType) => item.is_active !== "경매종료")
              .slice(0, 4)
              .map((item: ProductListType) => (
                <Link
                  key={item.id}
                  href={{
                    pathname: `/productList/detail`,
                    query: {
                      id: item.id,
                      productId: item.product_id,
                    },
                  }}
                >
                  <ProductItem item={item} />
                </Link>
              ))}
        </div>
        <div className="w-[560px] h-[560px] max-[1200px]:hidden max-[865px]:w-[390px] max-[865px]:h-[390px] max-[625px]:w-[280px] max-[625px]:h-[280px] object-cover mb-2 rounded-[8px] overflow-hidden relative">
          <Image src={"/images/image002.png"} fill sizes="1" alt="item01" />
        </div>
      </div>
      <div className="h-[38px]" />
      <Link
        href={{
          pathname: "/productList",
          query: {
            id: "list",
          },
        }}
      >
        <div className="flex justify-center">
          <div className="w-[118px] h-[50px] max-[625px]:w-[80px] max-[625px]:h-[40px] rounded-full bg-[#D1B383] flex justify-center text-white items-center transition-all duration-[0.3s] ease-out border-[2px] border-[#D1B383] hover:bg-white hover:text-[#D1B383]">
            <p className="text-[20px] max-[625px]:text-[16px]">more</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MainPage;
