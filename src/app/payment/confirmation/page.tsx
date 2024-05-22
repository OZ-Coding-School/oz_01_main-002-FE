"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface OrderInfo {
  orderNumber: string; // 주문 번호
  recipient: {
    // 받는 사람 정보
    name: string;
    phone: string;
    address: string;
  };
  paymentMethod: string; // 결제 방법
  products: {
    // 상품 목록
    title: string;
    category: string;
    price: number;
    originalPrice: number;
    shippingFee: number;
    commission: number;
    image: string;
  }[];
  totalPrice: number; // 총 상품 금액
  totalCommission: number; // 수수료
  totalAmount: number; // 총 결제 금액
  paymentDetails: {
    deductedAmount: number; // 차감 금액
    remainingCoins: number; // 잔여 코인
  };
}

const ConfirmationPage = () => {
  const [orderInfo, setOrderInfo] = useState<OrderInfo>();

  useEffect(() => {
    const mockOrderInfo = {
      orderNumber: "2022020428178381",
      recipient: {
        name: "김료니",
        phone: "01012345678",
        address: "서울특별시 서대문구 성산로",
      },
      paymentMethod: "보유 코인으로 결제",
      products: [
        {
          title: "나이키 블랙",
          category: "운동화",
          price: 18900,
          originalPrice: 201900,
          shippingFee: 0,
          commission: 183000,
          image: "/images/item05.jpg",
        },
      ],
      totalPrice: 18900, // 상품 총 금액
      totalCommission: 1890, // 수수료
      totalAmount: 20790, // 총 결제 금액
      paymentDetails: {
        deductedAmount: 20790,
        remainingCoins: 79210,
      },
    };
    setOrderInfo(mockOrderInfo);
  }, []);

  if (!orderInfo) return <div>Loading...</div>;

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
            <h2 className="text-xl font-bold mb-4">결제 정보</h2>
            <p className="text-black-500 mb-4 pl-4">{orderInfo.orderNumber}</p>
            <h3 className="text-lg font-semibold mb-2">받는 사람 정보</h3>
            <p className="text-gray-800 mb-4 pl-4">
              {orderInfo.recipient.name}
              <br />
              {orderInfo.recipient.phone}
              <br />
              {orderInfo.recipient.address}
            </p>
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
            {orderInfo.products.map((product) => (
              <div className="flex items-center mb-4  pl-4" key={product.title}>
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-gray-800">{product.title}</p>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                </div>
              </div>
            ))}
            <div className="mb-4">
              <p className="text-gray-800">
                총 상품 금액{" "}
                <span className="float-right font-bold text-[#D1B383]">
                  {orderInfo.totalPrice.toLocaleString()}원
                </span>
              </p>
              <p className="text-gray-500 text-sm pl-4">
                총 결제 금액{" "}
                <span className="float-right">
                  {orderInfo.totalAmount.toLocaleString()}원
                </span>
              </p>
              <p className="text-gray-500 text-sm pl-4">
                배송비 <span className="float-right">0원</span>
              </p>
              <p className="text-gray-500 text-sm pl-4">
                수수료{" "}
                <span className="float-right">
                  {orderInfo.totalCommission.toLocaleString()}원
                </span>
              </p>
            </div>
            <div className="border-t-2 pt-4">
              <p className="text-gray-800">결제상세</p>
              <p className="text-gray-500 text-sm pl-4">
                보유 코인으로 결제{" "}
                <span className="float-right">
                  -{orderInfo.paymentDetails.deductedAmount.toLocaleString()}원
                </span>
              </p>
              <p className="text-gray-500 text-sm pl-4">
                잔여 코인
                <span className="float-right">
                  {orderInfo.paymentDetails.remainingCoins.toLocaleString()}원
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <div className="flex justify-center gap-5">
            <button className="bg-white h-auto border rounded px-2 py-1 font-bold mt-4">
              마이페이지로 돌아가기
            </button>
            <button className="bg-white h-auto border rounded px-2 py-1 font-bold mt-4">
              주문 상세 확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
