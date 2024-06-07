'use client';

import { useAuctionPutStatus, useGetAuctionProductDetail, useGetAuctionProducts, useUpdateProduct } from "@/api/productApi";
import { useGetUser } from "@/api/userApi";
import { useWinnerStore } from "@/store";
import { ProductListType } from "@/type/ProductType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FinalModalProps = {
  auctionId: string | undefined;
  itemRefetch: () => void;
};

const FinalModal = ({ auctionId, itemRefetch }: FinalModalProps) => {
  const loader = ({ src }: { src: string }) => {
    return src;
  };
  const { data } = useGetUser();
  const { winner } = useWinnerStore();
  const { mutate: activeStatus } = useAuctionPutStatus();
  const router = useRouter();
  const { data: auctionList } = useGetAuctionProducts();
  const { data: detailData } = useGetAuctionProductDetail(auctionId!);
  const [randomItem, setRandomItem] = useState<ProductListType>();
  const { mutate: productStatusUpdate } = useUpdateProduct();
  const handleMovePage = () => {
    if (data?.data.nickname === winner) {
      activeStatus({ auctionId: auctionId, status: false, isActive: '결제대기' }, {
        onSuccess: () => {
          productStatusUpdate({
            id: detailData?.data.product_id!,
            updateData: {
              status: "결제대기"
            }
          }, {
            onSuccess: () => {
              itemRefetch();
              router.push('/myPage/order/bidding');
            }
          })
        }
      });
    } else {
      activeStatus({ auctionId: auctionId, status: false, isActive: '결제대기' }, {
        onSuccess: () => {
          productStatusUpdate({
            id: detailData?.data.product_id!,
            updateData: {
              status: '결제대기'
            }
          }, {
            onSuccess: () => {
              itemRefetch();
              router.push(`/productList/detail/?id=${randomItem?.product_id}&productId=${randomItem?.id}`);
            }
          })
        }
      });
    };
  }

  useEffect(() => {
    const random = Math.floor(Math.random() * auctionList?.data.length);
    setRandomItem(auctionList?.data[random]);
  }, [auctionList])

  return (
    <div className="absolute w-full">
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="w-[400px]  rounded-xl bg-[#242424] border border-[#D1B383]  p-5 transition-all duration-[0.3s] ease-out animate-scale-up">
          <div className="text-4xl text-center text-white">
            <div className="flex flex-col items-center justify-center">
              <p className="mx-7">{data?.data.nickname === winner ? '최종 입찰자' : '다른 상품 보기'}</p>
              <div className={`w-[220px] h-[30px] mt-2 relative ${data?.data.nickname === winner ? 'block' : 'hidden'}`}>
                <Image src={data?.data.nickname === winner ? '/images/detailModal01.png' : '/images/detailModal01.png'} fill sizes="1" alt="이미지" />
              </div>
            </div>
            <p className="my-3 text-[16px]">{data?.data.nickname === winner ? `${winner}님 최종 입찰을 축하드립니다!` : '다른 인기 상품 경매에 참여하세요!'}</p>
          </div>
          <div className="flex flex-col justify-start mt-6">
            <div className="flex items-center bg-white rounded-xl p-4">
              <div className="w-[100px] h-[100px] rounded-xl object-cover bg-[gray] relative overflow-hidden">
                {data?.data.nickname === winner ? (
                  detailData?.data.product_images[0] && (
                    <Image src={detailData?.data.product_images[0]} fill sizes="1" className="object-cover" alt="모달 이미지" loader={loader} priority />
                  )
                ) : (
                  randomItem?.product_images[0] && (
                    <Image src={randomItem?.product_images[0]} fill sizes="1" className="object-cover" alt="모달 이미지" loader={loader} priority />
                  )
                )}
              </div>
              <div className="ml-3">
                <div className="flex items-center font-bold text-lg">
                  <p className="mr-2">{data?.data.nickname === winner ? detailData?.data.product_grade : randomItem?.product_grade}</p>
                  <p>{data?.data.nickname === winner ? detailData?.data.product_name : randomItem?.product_name}</p>
                </div>
                <div className="mt-5">
                  <p className="mr-2 text-[#868686]">{data?.data.nickname === winner ? '최종 입찰가' : '현재 입찰가'}</p>
                  <p>{data?.data.nickname === winner ? detailData?.data.final_price.toLocaleString() : randomItem?.final_price.toLocaleString()}원</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <button
              className="w-[200px] h-[50px] rounded-xl outline-none bg-[#D1B383] hover:bg-white border border-[#D1B383] text-white hover:text-[#D1B383]" onClick={handleMovePage}>{data?.data.nickname === winner ? '결제하기' : '입찰하기'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalModal