interface ProductInfoProps {
  product: Product;
}

type Product = {
  grade: string; // 상품등급
  name: string; // 상품명
  category: string; // 카테고리
  startingPrice: number; // 시작가
  currentPrice: number; // 현재가
  closingTime: string; // 마감시간
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <section className="flex flex-col w-2/5 space-y-4 p-4">
      {/* 상품등급, 상품명, 카테고리, 시작가, 현재가, 마감시간, 남은 시간 */}
      <div>
        <span className="text-gray-600 font-medium">{product.grade}급</span>
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

        <ul className="space-y-2">
          <li className="flex gap-8 items-center">
            <label htmlFor="category" className="font-medium">
              카테고리:
            </label>
            <span>{product.category}</span>
          </li>
          <hr />
          <li className="flex gap-8 items-center">
            <label htmlFor="starting-price" className="font-medium">
              시작가:
            </label>
            <span>{product.startingPrice}원</span>
          </li>
          <li className="flex gap-8 items-center">
            <label htmlFor="current-price" className="font-medium">
              현재가:
            </label>
            <span>{product.currentPrice}원</span>
          </li>
          <li className="flex gap-8 items-center">
            <label htmlFor="closing-time" className="font-medium">
              마감시간:
            </label>
            <span>{product.closingTime}</span>
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
