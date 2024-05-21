"use client";
import { useProductStore } from "@/store";
import Image from "next/image";

function PaymentPage() {
  const { paymentUserProducts } = useProductStore();

  const userInfo = {
    name: "료니",
    address: "서울특별시 서대문구 성산로",
    phone: "01012345678",
  };

  const coins = 1000; // 보유 코인
  const totalPrice = paymentUserProducts.reduce(
    (total, item) => total + item.price,
    0
  ); // 상품 총 금액
  const totalShipping = 10000; // 배송비
  const totalCommission = paymentUserProducts.reduce(
    (acc, product) => acc + product.commission!,
    0
  ); // 수수료
  const totalAmount = totalPrice + totalShipping; // 총 결제 금액

  return (
    <div className="container mx-auto p-8">
      <div className="text-3xl font-semibold my-2">
        <p>주문/결제</p>
      </div>
      <div className="border-2 border-[#D1B383] mb-5" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 왼쪽 영역 상품 정보, 구매자 정보, 결제 정보 */}
        <div className="flex flex-col gap-3">
          <div className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">주문 상품 정보</h2>
            {paymentUserProducts.map((item) => (
              <div key={item.id} className="flex items-center mt-6 mb-4">
                <div className="w-[130px] h-[130px] bg-[gray] object-cover rounded-lg relative overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="1"
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  {/* 등급 */}
                  <div className="flex gap-3 justify-start font-bold">
                    <label htmlFor="grade" className="font-medium">
                      등급
                    </label>
                    <p>{item.grade}</p>
                  </div>
                  {/* 상품명 */}
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  {/* 카테고리 */}
                  <p className="text-gray-500">{item.category}</p>
                  {/* 입찰가 */}
                  <div className="flex gap-8 justify-between">
                    <label htmlFor="totalAmount" className="font-medium">
                      입찰가
                    </label>
                    <span>{item.price.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="border p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">받는 사람 정보</h2>
              <div className="flex justify-between items-center mb-2">
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-lg">
                    {userInfo.name}
                    <span className="ml-2 px-2 py-1 text-gray-600 rounded-md text-sm border">
                      기본 배송지
                    </span>
                  </p>
                  <p className="text-gray-600">{userInfo.phone} </p>
                  <p className="text-gray-600">{userInfo.address}</p>
                </div>
                <button className="border rounded px-2 py-1">변경</button>
              </div>
              <input
                type="text"
                className="w-full border p-2 rounded mt-2"
                placeholder="메모를 입력해 주세요."
              />
            </div>
          </div>

          <div className="border p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-bold mb-4">결제 정보</h2>
            <div className="flex justify-between items-center mb-2">
              <p className="font-bold text-lg flex items-center">내 코인</p>
              <p className="text-gray-600">보유: {coins}원</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <input
                type="text"
                className="w-2/3 border p-2 rounded text-black-600"
                // placeholder={`${coins}원`}
                placeholder="사용할 코인을 입력해 주세요."
              />
              <button className="ml-2 border p-2 rounded text-black-500">
                전액사용
              </button>
            </div>
          </div>
        </div>
        {/* 오른쪽 영역 최종 결제 금액 정보 */}
        <div className="relative">
          <div className="sticky top-8 p-6 border rounded-lg shadow-sm">
            <div className="text-2xl my-2">
              <h2 className="font-bold">결제 금액</h2>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <p>총 상품 가격</p>
                <p>{totalPrice.toLocaleString()}원</p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <p>총 수수료</p>
                <p>{totalCommission.toLocaleString()}원</p>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <p>총 배송비</p>
                <p>{totalShipping.toLocaleString()}원</p>
              </div>
              <div className="text-end py-2">
                <p>{(totalPrice + totalCommission).toLocaleString()}원</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-auto border rounded px-2 py-1 font-bold mt-4"
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
