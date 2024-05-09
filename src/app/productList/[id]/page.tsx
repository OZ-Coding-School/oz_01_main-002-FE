"use client";

import ProductDescription from "@/app/_components/productDetail/ProductDescription";
import ProductGallery from "@/app/_components/productDetail/ProductGallery";
import ProductInfo from "@/app/_components/productDetail/ProductInfo";
import ProductNotice from "@/app/_components/productDetail/ProductNotice";
import ProductSellerInfo from "@/app/_components/productDetail/ProductSellerInfo";

const dummyProductDetail = {
  images: [
    "/images/cat-5183427_1280.jpg",
    "/images/cat-84621142.jpeg",
    "/images/cat-birthday_cat_sad.jpg",
  ],
  product: {
    grade: "S",
    name: "나이키 에어 맥스",
    category: "신발",
    startingPrice: 120000,
    currentPrice: 135000,
    closingTime: "2024-05-15T18:00:00Z",
    description: "작성자가 작성한 설명 - Product Detail",
  },
  seller: {
    nickname: "고양이 바니",
    content: "츄르를 좋아합니다.",
    profileImage: "/images/cat-84621142.jpeg", //
  },
  notice: "주의사항 안내 \n - Product Detail ",
};

const ProductDetail = () => {
  return (
    <main className="flex flex-col items-center p-8 space-y-8">
      <div className="flex w-full max-w-6xl gap-8">
        {/* 이미지 갤러리 섹션 */}
        <ProductGallery images={dummyProductDetail.images} />
        {/* 상품 정보 섹션 */}
        <ProductInfo product={dummyProductDetail.product} />
      </div>
      <hr className="w-full max-w-6xl border-t-2" />
      {/* 작성자 정보 섹션 */}
      <ProductSellerInfo seller={dummyProductDetail.seller} />
      <hr className="w-full max-w-6xl border-t-2" />
      {/* 상품 설명 섹션 */}
      <ProductDescription
        description={dummyProductDetail.product.description}
      />
      <hr className="w-full max-w-6xl border-t-2" />
      {/* 주의사항 안내 섹션 */}
      <ProductNotice content={dummyProductDetail.notice} />
      <hr className="w-full max-w-6xl border-t-2" />
    </main>
  );
};

export default ProductDetail;
