"use client";

import ProductDescription from "@/app/_components/productDetail/ProductDescription";
import ProductGallery from "@/app/_components/productDetail/ProductGallery";
import ProductInfo from "@/app/_components/productDetail/ProductInfo";
import ProductNotice from "@/app/_components/productDetail/ProductNotice";
import ProductSellerInfo from "@/app/_components/productDetail/ProductSellerInfo";

const ProductDetail = () => {
  return (
    <main className="flex flex-col items-center p-8 space-y-8">
      <div className="flex w-full max-w-6xl gap-8">
        {/* 이미지 갤러리 섹션 */}
        <ProductGallery />
        {/* 상품 정보 섹션 */}
        <ProductInfo />
      </div>
      <hr className="w-full max-w-6xl border-t-2" />
      {/* 작성자 정보 섹션 */}
      <ProductSellerInfo />
      <hr className="w-full max-w-6xl border-t-2" />
      {/* 상품 설명 섹션 */}
      <ProductDescription />
      <hr className="w-full max-w-6xl border-t-2" />
      {/* 주의사항 안내 섹션 */}
      <ProductNotice />
      <hr className="w-full max-w-6xl border-t-2" />
    </main>
  );
};

export default ProductDetail;
