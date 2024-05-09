const ProductInfo = () => {
  return (
    <section className="flex flex-col w-2/5 space-y-4 p-4">
      {/* 상품등급, 상품명, 카테고리, 시작가, 현재가, 마감시간, 남은 시간 */}
      <div>
        <span className="text-gray-600 font-medium">상품등급</span>
        <h2 className="text-2xl font-bold mb-4">상품명</h2>

        <ul className="space-y-2">
          <li className="flex gap-8 items-center">
            <label htmlFor="category" className="font-medium">
              카테고리:
            </label>
            <span>신발</span>
          </li>
          <hr />
          <li className="flex gap-8 items-center">
            <label htmlFor="starting-price" className="font-medium">
              시작가:
            </label>
            <span>100,000원</span>
          </li>
          <li className="flex gap-8 items-center">
            <label htmlFor="current-price" className="font-medium">
              현재가:
            </label>
            <span>120,000원</span>
          </li>
          <li className="flex gap-8 items-center">
            <label htmlFor="closing-time" className="font-medium">
              마감시간:
            </label>
            <span>2024년 5월 15일 18시</span>
          </li>
          <li className="flex gap-8 items-center justify-center">
            <span>3일 12시간 5분 </span>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
              입찰하기
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProductInfo;
