"use client";

const ConfirmationPage = () => {
  const orderInfo = {
    orderNumber: "2022020428178381",
    name: "김료니",
    phone: "01012345678",
    address: "서울특별시 서대문구 성산로",
    points: {
      total: 478,
      basic: 289,
      extra: 189,
      review: 350,
    },
  };

  const productInfo = {
    title: "나이키 블랙",
    category: "",
    price: 18900,
    originalPrice: 201900,
    discount: 183000,
    image: "https://placehold.co/50x50",
  };

  const paymentDetails = {
    amount: 18900,
  };

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
              {orderInfo.name}
              <br />
              {orderInfo.phone}
              <br />
              {orderInfo.address}
            </p>
            <h3 className="text-lg font-semibold mb-2">결제 방식</h3>
            <div className="text-gray-800">
              <p className="mb-2 pl-4">보유 코인으로 결제 </p>
              <p className="mb-2 pl-4 w-1/5">
                내 보유 코인{" "}
                <span className="float-right">{orderInfo.points.basic}원</span>
              </p>
            </div>
          </div>
          {/* 오른쪽 영역 결제 완료 정보 */}
          <div className="border p-4 rounded-lg shadow-sm bg-white">
            <div className="flex items-center mb-4">
              <h3 className="ml-2 text-lg font-semibold">결제 상품</h3>
            </div>
            <div className="flex items-center mb-4">
              <img
                src={productInfo.image}
                alt="product"
                className="w-12 h-12 rounded mr-4"
              />
              <div>
                <p className="text-gray-800">{productInfo.title}</p>
                <p className="text-gray-500 text-sm">{productInfo.category}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-800">
                주문금액{" "}
                <span className="float-right font-bold text-[#D1B383]">
                  {productInfo.price.toLocaleString()}원
                </span>
              </p>
              <p className="text-gray-500 text-sm pl-4">
                총 상품가격{" "}
                <span className="float-right">
                  {productInfo.originalPrice.toLocaleString()}원
                </span>
              </p>
              <p className="text-gray-500 text-sm pl-4">
                배송비 <span className="float-right">0원</span>
              </p>
              <p className="text-gray-500 text-sm pl-4">
                수수료{" "}
                <span className="float-right">
                  {productInfo.discount.toLocaleString()}원
                </span>
              </p>
            </div>
            <div className="border-t-2 pt-4">
              <p className="text-gray-800">결제상세</p>
              <p className="text-gray-500 text-sm pl-4">
                보유 코인으로 결제{" "}
                <span className="float-right">
                  -{paymentDetails.amount.toLocaleString()}원
                </span>
              </p>
              <p className="text-gray-500 text-sm pl-4">
                남은 코인
                <span className="float-right">
                  {paymentDetails.amount.toLocaleString()}원
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
