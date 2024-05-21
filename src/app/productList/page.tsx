import ProductListCategory from "@/_components/product/ProductListCategory";
import ProductListItem from "@/_components/product/ProductListItem";
import Link from "next/link";

const ProductList = () => {

  const auctionItems = [
    { id: 1, name: '샤넬 가방', img: '/images/item03.jpg', startPrice: '6,500,000원', price: '6,750,000원', category: '가방', like: 12, view: 30, grade: 'A' },
    { id: 2, name: '샤넬 라운드티', img: '/images/item04.jpg', startPrice: '500,000원', price: '650,000원', category: '옷', like: 62, view: 22, grade: 'B' },
    { id: 3, name: '나이키 신발', img: '/images/item05.jpg', startPrice: '600,000원', price: '640,000원', category: '신발', like: 22, view: 150, grade: 'C' },
    { id: 4, name: '로렉스 시계', img: '/images/item01.png', startPrice: '14,500,000원', price: '15,000,000원', category: '시계', like: 22, view: 80, grade: 'S' },
    { id: 5, name: '샤넬 가방', img: '/images/item03.jpg', startPrice: '6,500,000원', price: '6,750,000원', category: '가방', like: 12, view: 30, grade: 'A' },
    { id: 6, name: '샤넬 라운드티', img: '/images/item04.jpg', startPrice: '500,000원', price: '650,000원', category: '옷', like: 62, view: 22, grade: 'B' },
    { id: 7, name: '나이키 신발', img: '/images/item05.jpg', startPrice: '600,000원', price: '640,000원', category: '신발', like: 22, view: 150, grade: 'C' },
    { id: 8, name: '로렉스 시계', img: '/images/item01.png', startPrice: '14,500,000원', price: '15,000,000원', category: '시계', like: 22, view: 80, grade: 'S' },
    { id: 9, name: '샤넬 가방', img: '/images/item03.jpg', startPrice: '6,500,000원', price: '6,750,000원', category: '가방', like: 12, view: 30, grade: 'A' },
    { id: 10, name: '샤넬 라운드티', img: '/images/item04.jpg', startPrice: '500,000원', price: '650,000원', category: '옷', like: 62, view: 22, grade: 'B' },
    { id: 11, name: '나이키 신발', img: '/images/item05.jpg', startPrice: '600,000원', price: '640,000원', category: '신발', like: 22, view: 150, grade: 'C' },
    { id: 12, name: '로렉스 시계', img: '/images/item01.png', startPrice: '14,500,000원', price: '15,000,000원', category: '시계', like: 22, view: 80, grade: 'S' },
    { id: 13, name: '샤넬 가방', img: '/images/item03.jpg', startPrice: '6,500,000원', price: '6,750,000원', category: '가방', like: 12, view: 30, grade: 'A' },
    { id: 14, name: '샤넬 라운드티', img: '/images/item04.jpg', startPrice: '500,000원', price: '650,000원', category: '옷', like: 62, view: 22, grade: 'B' },
    { id: 15, name: '나이키 신발', img: '/images/item05.jpg', startPrice: '600,000원', price: '640,000원', category: '신발', like: 22, view: 150, grade: 'C' },
    { id: 16, name: '로렉스 시계', img: '/images/item01.png', startPrice: '14,500,000원', price: '15,000,000원', category: '시계', like: 22, view: 80, grade: 'S' },
  ];

  const categories = [
    { id: 1, name: '가방', img: '/images/item02.jpg' },
    { id: 2, name: '시계', img: '/images/item01.png' },
    { id: 3, name: '상의', img: '/images/cate04.jpg' },
    { id: 4, name: '하의', img: '/images/cate03.jpg' },
    { id: 5, name: '나이키', img: '/images/cate02.png' },
    { id: 6, name: '아디다스', img: '/images/cate01.svg' },
    { id: 7, name: '카메라', img: '/images/cate05.png' },
    { id: 8, name: '주얼리', img: '/images/cate06.png' },
  ];

  return (
    <div className="bg-[#222] w-full">
      <div className="w-full h-[70px] border-x-0 bg-[#222] flex items-center justify-center">
        {categories.map((category) => (
          <ProductListCategory key={category.id} category={category} />
        ))}
      </div>
      <div className="w-full max-w-[1240px] mx-auto mb-12">
        <div className="my-[25px]">
          <p className="text-[24px] pl-[10px] leading-[29px] text-white">인기상품</p>
        </div>
        <div className="flex justify-center">
          <div className="mb-3 mx-[10px]">
            <div className="w-[228px] h-[228px] bg-white mb-2"></div>
            <p className="text-white text-[20px] leading-[24px] mb-[6px]">제목입니다</p>
            <p className="text-[#868686] text-[20px] leading-[24px] mb-[6px]">카테고리</p>
            <p className="text-[#D1B383] text-[20px] leading-[24px]">가격</p>
          </div>
          <div className="mb-3 mx-[10px]">
            <div className="w-[228px] h-[228px] bg-white mb-2"></div>
            <p className="text-white text-[20px] leading-[24px] mb-[6px]">제목입니다</p>
            <p className="text-[#868686] text-[20px] leading-[24px] mb-[6px]">카테고리</p>
            <p className="text-[#D1B383] text-[20px] leading-[24px]">가격</p>
          </div>
          <div className="mb-3 mx-[10px]">
            <div className="w-[228px] h-[228px] bg-white mb-2"></div>
            <p className="text-white text-[20px] leading-[24px] mb-[6px]">제목입니다</p>
            <p className="text-[#868686] text-[20px] leading-[24px] mb-[6px]">카테고리</p>
            <p className="text-[#D1B383] text-[20px] leading-[24px]">가격</p>
          </div>
          <div className="mb-3 mx-[10px]">
            <div className="w-[228px] h-[228px] bg-white mb-2"></div>
            <p className="text-white text-[20px] leading-[24px] mb-[6px]">제목입니다</p>
            <p className="text-[#868686] text-[20px] leading-[24px] mb-[6px]">카테고리</p>
            <p className="text-[#D1B383] text-[20px] leading-[24px]">가격</p>
          </div>
          <div className="mb-3 mx-[10px]">
            <div className="w-[228px] h-[228px] bg-white mb-2"></div>
            <p className="text-white text-[20px] leading-[24px] mb-[6px]">제목입니다</p>
            <p className="text-[#868686] text-[20px] leading-[24px] mb-[6px]">카테고리</p>
            <p className="text-[#D1B383] text-[20px] leading-[24px]">가격</p>
          </div>
        </div>
      </div>
      <div className="h-[50px]" />
      <div className="w-full max-w-[1240px] mx-auto">
        <div className="my-[25px]">
          <p className="text-[24px] pl-[10px] leading-[29px] text-white">경매상품</p>
        </div>
        <div className="w-full flex flex-wrap mx-auto max-w-[1132px]">
          {auctionItems.map((item) => (
            <Link key={item.id} href={`productList/${item.id}`}>
              <ProductListItem item={item} />
            </Link>
          ))}
        </div>
      </div>
      <Link href={'/productInsert'}>
        <div className="fixed bottom-16 right-40 w-[80px] h-[80px] flex justify-center items-center hover:scale-105 hover:bg-white hover:text-[#D1B383] rounded-full bg-[#D1B383] text-white transition-all duration-[0.3s] ease-out">물품등록</div>
      </Link>
    </div>
  )
}

export default ProductList