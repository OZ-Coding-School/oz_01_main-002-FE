"use client";

import { useGetUser } from "@/api/userApi";
import { useProductStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ConfirmationPage = () => {
  const { data, refetch } = useGetUser();
  const router = useRouter();
  const { paymentUserProducts } = useProductStore();
  const totalPrice = paymentUserProducts.reduce(
    (total, item) => total + item.winner_bid_price,
    0
  );
  const totalCommission = paymentUserProducts.reduce(
    (acc, product) => acc + product.commission!,
    0
  );

  const loader = ({ src }: { src: string }) => {
    return src;
  };

  useEffect(() => {
    if (paymentUserProducts.length === 0) {
      router.push('/');
      return;
    }
    refetch();
  }, [paymentUserProducts])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8 max-w-screen-lg px-4 md:px-8">
        <div className="text-3xl font-semibold my-2">
          <p>주문 / 결제</p>
        </div>
        <div className="border-2 border-[#D1B383] mb-5" />
        <div className="text-center mb-8">
          <h2 className="text-black-500 text-3xl font-bold">
            결제가 정상적으로 <span className="text-[#D1B383]">완료</span>{" "}
            되었습니다.
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          {/* 왼쪽 영역 주문 정보, 배송지 정보, 결제 방식 */}
          <div className="border p-4 rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-bold mb-2">결제 정보</h2>
            <p className="text-black-500 mb-4 pl-4">12312312312</p>
            <h3 className="text-lg font-semibold mb-2">받는 사람 정보</h3>
            <p className="text-gray-800 mb-1 pl-4">{data?.data.name}</p>
            <p className="text-gray-800 mb-1 pl-4">{data?.data.contact}</p>
            <p className="text-gray-800 mb-4 pl-4">{data?.data.address}</p>
            <h3 className="text-lg font-semibold mb-2">결제 방식</h3>
            <div className="text-gray-800">
              <p className="mb-2 pl-4">보유 코인으로 결제 </p>
            </div>
          </div>
          {/* 오른쪽 영역 결제 완료 정보 */}
          <div className="border p-4 rounded-lg shadow-sm bg-white">
            <div className="flex items-center mb-4">
              <h3 className="ml-2 text-lg font-semibold">결제 상품</h3>
            </div>
            {paymentUserProducts.map((product) => (
              <div className="flex items-center mb-4  pl-4" key={product.id}>
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden relative">
                  <Image
                    src={product.img}
                    alt='상품 이미지'
                    fill
                    sizes="1"
                    className="object-cover"
                    loader={loader}
                  />
                </div>
                <div className="ml-4">
                  <p className="text-gray-800">{product.name}</p>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                </div>
              </div>
            ))}
            <div className="mb-4">
              <p className="text-gray-800">
                총 상품 금액
                <span className="float-right font-bold text-[#D1B383]">
                  {totalPrice.toLocaleString()}원
                </span>
              </p>
              <p className="text-gray-500 text-sm pl-4 my-1">
                총 결제 금액
                <span className="float-right">
                  {totalPrice.toLocaleString()}원
                </span>
              </p>
              <p className="text-gray-500 text-sm pl-4">
                배송비 <span className="float-right">0원</span>
              </p>
              <p className="text-gray-500 text-sm pl-4 my-1">
                수수료
                <span className="float-right">
                  {totalCommission.toLocaleString()}원
                </span>
              </p>
            </div>
            <div className="border-t-2 pt-4">
              <p className="text-gray-800">결제상세</p>
              <p className="text-gray-500 text-sm pl-4 my-1">
                보유 코인으로 결제
                <span className="float-right">
                  -{'100,000'}원
                </span>
              </p>
              <p className="text-gray-500 text-sm pl-4">
                잔여 코인
                <span className="float-right">
                  {'0'}원
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/myPage">
            <button className="bg-[#D1B383] h-[50px] text-white rounded-lg px-3 py-2 font-bold mt-4">
              마이페이지로 돌아가기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
