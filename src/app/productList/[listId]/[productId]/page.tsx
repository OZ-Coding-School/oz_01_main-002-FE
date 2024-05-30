'use client';

import { useGetAuctionProductDetail, useGetWinnerUser } from "@/api/productApi";
import BidInfo from "@/components/productDetail/BidInfo";
import Chat from "@/components/productDetail/Chat";
import CountDown from "@/components/productDetail/CountDown";
import DetailImage from "@/components/productDetail/DetailImage";
import ModalContainer from "@/components/productDetail/ModalContainer";
import ProductInfo from "@/components/productDetail/ProductInfo";
import UserInfo from "@/components/productDetail/UserInfo";
import { useWinnerStore } from "@/store";
import { useEffect } from "react";

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  console.log('params', params);
  const auctionId = params.productId.split('3D')[1];
  const productId = params.productId.split('id')[0];
  const { data, isLoading, refetch: itemRefetch } = useGetAuctionProductDetail(auctionId);
  const { data: winnerData, refetch: winnerRefetch } = useGetWinnerUser(productId);
  console.log('ss', data);
  console.log('auctionId', auctionId);
  const { setWinner } = useWinnerStore();
  useEffect(() => {
    setWinner(winnerData?.data.winner);
  }, [winnerData])

  if (!auctionId) return <div className="w-full h-[calc(100vh-150px)] flex justify-center items-center">
    <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-t from-[#D1B383] to-white flex justify-center items-center animate-spin">
      <div className="w-[65px] h-[65px] rounded-full bg-[#222]"></div>
    </div>
  </div>
  if (!data) return <div className="w-full h-[calc(100vh-150px)] flex justify-center items-center">
    <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-t from-[#D1B383] to-white flex justify-center items-center animate-spin">
      <div className="w-[65px] h-[65px] rounded-full bg-[#222]"></div>
    </div>
  </div>
  return (
    <div className="w-full bg-[#222]">
      <div className="w-full max-w-[1240px] max-[1255px]:max-w-[850px] max-[855px]:max-w-[602px] max-[640px]:max-w-[452px] mx-auto">
        <div className="h-[32px]" />
        <div>
          <div className="w-full h-[50px] flex items-center justify-center">
            <CountDown
              productId={data.data.product_id}
              endTime={data.data.end_time}
              refetch={winnerRefetch}
              auctionId={auctionId}
              itemRefetch={itemRefetch}
              active={data.data.is_active}
            />
          </div>
          <div className="flex flex-wrap justify-between mt-8">
            <div>
              <DetailImage productImages={data.data.product_images} />
              <ProductInfo
                productGrade={data.data.product_grade}
                productName={data.data.product_name}
                ProductCategory={data.data.category}
                ProductBidPrice={data.data.product_bid_price}
                ProductFinalPrice={data.data.final_price}
              />
            </div>
            <Chat productId={productId} auctionId={auctionId} finalPrice={data.data.final_price} refetch={itemRefetch} />
          </div>
          <UserInfo user={data.data} />
          <div className="h-4" />
          <div className="ml-3 mr-6 max-[855px]:ml-0 max-[855px]:mr-0">
            <div className={`w-full pt-4 pb-10 px-4 bg-white whitespace-pre-wrap rounded-lg 'h-[500px]' : ''}`}>
              <p>{data.data.product_content}</p>
            </div>
          </div>
          <div className="h-4" />
          <BidInfo />
        </div>
      </div>
      <ModalContainer itemStatus={data.data.status} active={data.data.is_active} auctionId={auctionId} itemRefetch={itemRefetch} />
    </div>
  )
}

export default ProductDetail