'use client';

import { useGetAuctionProductDetail } from "@/api/productApi";
import BidInfo from "@/components/productDetail/BidInfo";
import Chat from "@/components/productDetail/Chat";
import CountDown from "@/components/productDetail/CountDown";
import DetailImage from "@/components/productDetail/DetailImage";
import ModalContainer from "@/components/productDetail/ModalContainer";
import ProductInfo from "@/components/productDetail/ProductInfo";
import UserInfo from "@/components/productDetail/UserInfo";

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const auctionId = params.productId.slice(7);
  const productId = params.productId.split('id')[0];
  const { data, isLoading, refetch } = useGetAuctionProductDetail(auctionId);

  if (!data) return <div>로딩중...</div>
  return (
    <div className="w-full bg-[#222]">
      <div className="w-full max-w-[1240px] max-[1255px]:max-w-[850px] max-[855px]:max-w-[602px] max-[640px]:max-w-[452px] mx-auto">
        <div className="h-[32px]" />
        <div>
          <div className="w-full h-[50px] flex items-center justify-center">
            <CountDown endTime={data.data.end_time} />
          </div>
          <div className="flex flex-wrap justify-between mt-8">
            <div>
              <DetailImage />
              <ProductInfo
                productGrade={data.data.product_grade}
                productName={data.data.product_name}
                ProductCategory={data.data.category}
                ProductBidPrice={data.data.product_bid_price}
                ProductFinalPrice={data.data.final_price}
              />
            </div>
            <Chat productId={productId} auctionId={auctionId} finalPrice={data.data.final_price} refetch={refetch} />
          </div>
          <UserInfo userNickname={data.data.user_nickname} userContent={data.data.user_content} />
          <div className="h-4" />
          <div className="ml-3 mr-6 max-[855px]:ml-0 max-[855px]:mr-0">
            <div className={`w-full p-4 bg-white rounded-lg ${data.data.product_content.length < 1000 ? 'h-[500px]' : ''}`}>
              <p>{data.data.product_content}</p>
            </div>
          </div>
          <div className="h-4" />
          <BidInfo />
        </div>
      </div>
      <ModalContainer />
    </div>
  )
}

export default ProductDetail