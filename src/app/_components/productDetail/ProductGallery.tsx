import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  // 현재 표시할 메인 이미지를 관리할 상태
  const [currentImage, setCurrentImage] = useState(images[0]);

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
    <section className="flex gap-4 w-3/5">
      {/* 썸네일 이미지 */}
      <div className="flex flex-col gap-4 basis-1/5 relative">
        {images.map((src, index) => (
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
  );
};

export default ProductGallery;
