"use client";
import { useProductStore } from "@/_store";
import Image from "next/image";
import { useRouter } from "next/navigation";

function PaymentPage() {
  const { paymentUserProducts } = useProductStore();
  const router = useRouter();

  const handleMoveConfirmation = () => {
    router.push("/payment/confirmation");
  };

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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8 max-w-screen-lg px-4 md:px-8">
        <div className="text-3xl font-semibold my-2">
          <p>주문 / 결제</p>
        </div>
        <div className="border-2 border-[#D1B383] mb-5" />

        <div className="flex flex-col gap-8">
          {/* 주문 상품 정보 */}
          <div className="border p-4 rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-bold mb-4">주문 상품 정보</h2>
            {paymentUserProducts.map((item) => (
              <div
                key={item.id}
                className="flex items-center mt-6 mb-4 pl-4 pr-4"
              >
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
          {/* 받는 사람 정보 */}
          <div className="border p-4 rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-bold mb-4">받는 사람 정보</h2>
            <div className="flex justify-between gap-3 items-center mb-2 pl-4 pr-4">
              <div className=" flex flex-col gap-1">
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
            <div className="flex justify-between items-center mb-2  pl-4 pr-4">
              <input
                type="text"
                className="w-full border rounded p-2 text-gray-800 placeholder-gray-400"
                placeholder="메모를 입력해 주세요."
              />
            </div>
          </div>
          {/* 결제 정보 */}
          <div className="border p-4 rounded-md shadow-sm bg-white">
            <h2 className="text-xl font-bold mb-4">결제 정보</h2>
            <div className="flex justify-between items-center mb-2">
              <p className="font-bold text-lg flex items-center pl-4 pr-4">
                내 코인
              </p>
              <p className="text-gray-600 pr-4">보유: {coins}원</p>
            </div>
            <div className="flex justify-between items-center mb-2  pl-4 pr-4">
              <input
                type="text"
                className="w-2/3 border p-2 rounded text-black-600"
                placeholder="사용할 코인을 입력해 주세요."
              />
              <button className="ml-2 border p-2 rounded text-black-500">
                전액사용
              </button>
            </div>
          </div>
          {/* 결제 금액 */}
          <div className="border p-4 rounded-lg shadow-sm bg-white">
            <div className="text-2xl my-2">
              <h2 className="font-bold">결제 금액</h2>
            </div>
            <div className="pl-4 pr-4">
              <div className="flex justify-between items-center ">
                <p>총 상품 가격</p>
                <p>{totalPrice.toLocaleString()}원</p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <p>수수료</p>
                <p>{totalCommission.toLocaleString()}원</p>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <p>배송비</p>
                <p>{totalShipping.toLocaleString()}원</p>
              </div>
              <div className="text-end py-2">
                <p>{(totalPrice + totalCommission).toLocaleString()}원</p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-1/2 h-auto border rounded px-2 py-1 font-bold mt-4"
                onClick={() => handleMoveConfirmation()}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
