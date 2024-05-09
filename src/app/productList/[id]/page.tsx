"use client";

import Image from "next/image";
import { useState } from "react";

const imageList = [
  "/images/cat-5183427_1280.jpg",
  "/images/cat-84621142.jpeg",
  "/images/cat-birthday_cat_sad.jpg",
];

const ProductDetail = () => {
  // 현재 표시할 메인 이미지를 관리할 상태
  const [currentImage, setCurrentImage] = useState(imageList[0]);

  // 이미지 전환 애니메이션을 위한 상태
  const [opacity, setOpacity] = useState(1);

  // 이미지 전환 애니메이션 적용 - 바로 이미지가 바뀌면 부자연스러우니까 0.5초 후에 변경, 서서히 나타남
  const changeImage = (src: string) => {
    setOpacity(0);
    setTimeout(() => {
      setCurrentImage(src);
      setOpacity(1);
    }, 500);
  };

  return (
    <main className="flex flex-col items-center p-8 space-y-8">
      <div className="flex w-full max-w-6xl gap-8">
        {/* 이미지 갤러리 섹션 */}
        <section className="flex gap-4 w-3/5">
          {/* 썸네일 이미지 */}
          <div className="flex flex-col gap-4 basis-1/5 relative">
            {imageList.map((src, index) => (
              <div
                key={index}
                onClick={() => changeImage(src)}
                className="relative  w-full h-[100px] cursor-pointer transform transition-transform duration-300 hover:scale-110 active:brightness-75"
              >
                <Image src={src} alt="" layout="fill" objectFit="cover" />
              </div>
            ))}
          </div>
          {/* 메인 이미지 */}
          <div
            className={`relative flex-1 h-[480px] transition-opacity duration-300 ease-in-out ${
              opacity === 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={currentImage}
              alt=""
              // width={800}
              // height={480}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </section>
        {/* 상품 정보 섹션 */}
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
      </div>
      <hr className="w-full max-w-6xl border-t-2" />
      {/* 작성자 정보 섹션 */}
      <section className="flex items-center w-full max-w-6xl gap-4 p-4">
        {/* 작성자 프로필 이미지, 작성자 닉네임, 작성자 소개글 */}
        <Image
          src="/images/cat-5183427_1280.jpg"
          alt=""
          width={100}
          height={100}
          className="rounded-full"
        />
        <h3>작성자 닉네임</h3>
        <p>작성자 소개글</p>
      </section>
      <hr className="w-full max-w-6xl border-t-2" />
      {/* 상품 설명 섹션 */}
      <section className="flex items-center w-full max-w-6xl gap-4 p-4">
        <p>작성자가 작성한 설명</p>
      </section>
      <hr className="w-full max-w-6xl border-t-2" />
      {/* 주의사항 안내 섹션 */}
      <section className="flex items-center w-full max-w-6xl gap-4 p-4">
        <p>주의사항 안내</p>
      </section>
      <hr className="w-full max-w-6xl border-t-2" />
    </main>
  );
};

export default ProductDetail;
