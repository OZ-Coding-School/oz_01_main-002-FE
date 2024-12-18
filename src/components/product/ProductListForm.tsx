"use client";

import { ProductListType } from "@/type/ProductType";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductListItem from "./ProductListItem";
import { data } from "@/data/data";
import { selectCategory } from "@/services/productList";

type ProductListFormProps = {
  categoryName: string;
};

const ProductListForm = ({ categoryName }: ProductListFormProps) => {
  // const { data, refetch: auctionCategories } = useGetAuctionProductsCategories(paramsId);
  const [productList, setProductList] = useState<
    ProductListType[] | undefined
  >();

  useEffect(() => {
    selectCategory(categoryName, setProductList, data);
  }, [categoryName]);

  console.log("리스트", productList);
  return (
    <div>
      <div className="w-full max-w-[1240px] max-[1260px]:max-w-[1000px] max-[1015px]:max-w-[750px] max-[765px]:max-w-[500px] max-[520px]:max-w-[250px] mx-auto mb-12">
        <div className="my-[25px]">
          <p className="text-[24px] ml-5 leading-[29px] max-[764px]:text-center max-[764px]:pl-0 text-white">
            인기상품
          </p>
        </div>
        <div className="w-full flex mx-auto flex-wrap">
          {productList &&
            productList
              .filter((item) => item.is_active !== "결제대기")
              .filter((item) => item.is_active !== "경매종료")
              .slice(0, 5)
              .map((item) => (
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
                  <div className="w-full max-w-[228px] max-[1260px]:w-[180px] max-[1015px]:w-[220px] mb-6 mx-[10px] max-[1015px]:mx-[15px]">
                    <div className="w-[228px] h-[228px] max-[1260px]:w-[180px] max-[1260px]:h-[180px] max-[1015px]:w-[220px] max-[1015px]:h-[220px] bg-white mb-2 relative rounded-lg overflow-hidden">
                      <Image
                        src={
                          item.product_images[0]
                            ? item.product_images[0]
                            : "/images/no_image.png"
                        }
                        fill
                        sizes="1"
                        className="object-cover"
                        alt="인기상품 이미지"
                      />
                    </div>
                    <div className="">
                      <p className="text-white text-[20px] leading-[24px] mb-[6px]">
                        {item.product_name}
                      </p>
                      <p className="text-[#868686] text-[20px] leading-[24px] mb-[6px]">
                        {item.category}
                      </p>
                      <p className="text-white text-[20px] leading-[24px] text-nowrap">
                        시작가 {item.product_bid_price.toLocaleString()}원
                      </p>
                      <p className="text-[#D1B383] text-[20px] leading-[24px] text-nowrap">
                        현재가 {item.final_price.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
      <div className="h-[50px]" />
      <div className="w-full max-w-[1240px] mx-auto">
        <div className="my-[25px]">
          <p className="text-[24px] ml-[10px] max-[1150px]:ml-[10%] leading-[29px] text-white">
            경매상품
          </p>
        </div>
        <div className="w-full flex flex-wrap  mx-auto max-w-[1132px] max-[1150px]:max-w-[850px] max-[865px]:max-w-[566px] max-[585px]:max-w-[450px]">
          {productList &&
            productList
              .filter((item) => item.is_active !== "결제대기")
              .filter((item) => item.is_active !== "경매종료")
              .map((item) => (
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
                  <ProductListItem item={item} />
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListForm;
