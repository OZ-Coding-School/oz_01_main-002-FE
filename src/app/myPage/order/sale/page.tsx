'use client';

import { useUserProducts } from "@/api/productApi";
import DetailModal from "@/components/myPage/menu/sale/DetailModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Sale = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [productId, setProductId] = useState(0);
  const { data, isLoading } = useUserProducts();

  const handleMore = (id: number) => {
    setIsClicked(!isClicked);
    setProductId(id);
  }

  return (
    <div className="relative">
      {data && data.data.filter((item: any) => item.status === '결제완료').map((product: any) => (
        <div key={product.id} className="flex items-center justify-between border-b last:border-b-0 relative">
          <Link href={'/'} className="hidden max-[630px]:block bg-opacity-45 w-[350px] h-[130px] rounded-lg z-10 absolute mt-2"></Link>
          <div className="flex items-center mt-6 mb-4">
            <div className="w-[130px] h-[130px] bg-[gray] object-cover rounded-lg relative overflow-hidden">
              <Image
                src={product.images[0]}
                fill
                sizes="1"
                className="object-cover"
                alt="판매이미지"
              />
            </div>
            <div className="ml-4">
              <div>
                <div className="flex items-center">
                  <p>등급</p>
                  <p className="ml-2 font-bold">{product.grade}</p>
                </div>
                <p className="font-bold">{product.name}</p>
              </div>
              <div className="my-1">
                <p className="text-sm text-[#868686]">{product.category}</p>
              </div>
              <div>
                <div className="flex items-center">
                  <p className="text-sm">시작가</p>
                  <p className="ml-2 text-sm text-[#868686]">
                    {product.startPrice}
                  </p>
                </div>
                <div className="flex items-center">
                  <p>판매가</p>
                  <p className="ml-2">{product.winner_bid_price}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[150px] h-[50px] border flex justify-center items-center rounded-lg mr-1 cursor-pointer max-[630px]:hidden" onClick={() => handleMore(product.id)}>
            <p>상품 보기</p>
          </div>
        </div>
      ))}
      {isClicked && productId !== 0 && <DetailModal isClicked={isClicked} setIsClicked={setIsClicked} productId={productId} />}
    </div>
  );
};

export default Sale;
