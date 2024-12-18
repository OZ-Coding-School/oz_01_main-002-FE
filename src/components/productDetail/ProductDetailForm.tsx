"use client";

import { useGetAuctionProductDetail, useGetWinnerUser } from "@/api/productApi";
import { useWinnerStore } from "@/store";
import { useEffect } from "react";
import BidInfo from "./BidInfo";
import Chat from "./Chat";
import CountDown from "./CountDown";
import DetailImage from "./DetailImage";
import ModalContainer from "./ModalContainer";
import ProductInfo from "./ProductInfo";
import UserInfo from "./UserInfo";
import { data } from "@/data/data";
import { ProductListType } from "@/type/ProductType";

type ProductDetailFormProps = {
  auctionId: string;
  productId: string;
};

const ProductDetailForm = ({
  auctionId,
  productId,
}: ProductDetailFormProps) => {
  // const { data, isLoading, refetch: itemRefetch } = useGetAuctionProductDetail(auctionId);
  const detailData = data.data
    .filter((item) => item.product_id === Number(productId))
    .map((item) => item)[0];
  console.log("detailData", detailData);
  const { data: winnerData, refetch: winnerRefetch } =
    useGetWinnerUser(productId);

  const { setWinner } = useWinnerStore();
  useEffect(() => {
    setWinner(winnerData?.data.winner);
  }, [winnerData]);

  if (!auctionId)
    return (
      <div className="w-full h-[calc(100vh-150px)] flex justify-center items-center">
        <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-t from-[#D1B383] to-white flex justify-center items-center animate-spin">
          <div className="w-[65px] h-[65px] rounded-full bg-[#222]"></div>
        </div>
      </div>
    );
  if (!data)
    return (
      <div className="w-full h-[calc(100vh-150px)] flex justify-center items-center">
        <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-t from-[#D1B383] to-white flex justify-center items-center animate-spin">
          <div className="w-[65px] h-[65px] rounded-full bg-[#222]"></div>
        </div>
      </div>
    );
  return (
    <div className="w-full bg-[#222]">
      <div className="w-full max-w-[1240px] max-[1255px]:max-w-[850px] max-[855px]:max-w-[602px] max-[640px]:max-w-[452px] mx-auto">
        <div className="h-[32px]" />
        <div>
          <div className="w-full h-[50px] flex items-center justify-center">
            <CountDown
              productId={detailData.product_id}
              endTime={detailData.end_time}
              refetch={winnerRefetch}
              auctionId={auctionId}
              // itemRefetch={itemRefetch}
              active={detailData.is_active}
            />
          </div>
          <div className="flex flex-wrap justify-between mt-8">
            <div>
              <DetailImage productImages={detailData.product_images} />
              <ProductInfo
                productGrade={detailData.product_grade}
                productName={detailData.product_name}
                ProductCategory={detailData.category}
                ProductBidPrice={detailData.product_bid_price}
                ProductFinalPrice={detailData.final_price}
              />
            </div>
            <Chat
              productId={productId}
              auctionId={auctionId}
              finalPrice={detailData.final_price}
              // refetch={itemRefetch}
            />
          </div>
          {/* <UserInfo user={data.data} /> */}
          <div className="h-4" />
          <div className="ml-3 mr-6 max-[855px]:ml-0 max-[855px]:mr-0">
            <div
              className={`w-full pt-4 pb-10 px-4 bg-white whitespace-pre-wrap rounded-lg 'h-[500px]' : ''}`}
            >
              {/* <p>{data.data.product_content}</p> */}
            </div>
          </div>
          <div className="h-4" />
          <BidInfo />
        </div>
      </div>
      <ModalContainer
        itemStatus={detailData.status}
        active={detailData.is_active}
        auctionId={auctionId}
        // itemRefetch={itemRefetch}
      />
    </div>
  );
};

export default ProductDetailForm;
