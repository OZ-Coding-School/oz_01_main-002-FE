"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ProductBanner = () => {
  const [page, setPage] = useState<number>(0);
  const images = [
    "/images/LuisvitonBag.webp",
    "/images/macBook.webp",
    "/images/miumiuBag.webp",
    "/images/pufurm.webp",
    "/images/celineBag.webp",
  ];

  useEffect(() => {
    let int = setInterval(() => {
      setPage((prev) => (prev + 1 >= images.length ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(int);
  }, []);

  const handlePrevImage = () => {
    setPage((prev) => (prev - 1 >= 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setPage((prev) => (prev + 1 >= images.length ? 0 : prev + 1));
  };

  return (
    <div className=" flex justify-center items-center ">
      <div className="absolute w-full h-[400px] mt-[500px] max-w-[1200px]">
        <Image
          className="w-full object-cover object-center rounded-md"
          layout="fill"
          alt="Image"
          src={images[page]}
        />
        <div className="absolute bottom-8 left-10 ml-4 mr-4 py-3 px-6 bg-black bg-opacity-50 rounded-lg">
          <h2 className="text-4xl text-white">우리동네 경매장</h2>
          <p className="text-2xl mt-4 text-purple-200">Needed by someone</p>
        </div>
      </div>
      <div className="flex justify-center items-center relative">
        <div className="absolute top-[250px] right-[620px]">
          <button
            onClick={handlePrevImage}
            className="inline-block transition-transform hover:-translate-x-1 motion-reduce:transform-none cursor-pointer hover:text-violet-500 text-3xl font-semibold"
          >
            &lt;
          </button>
        </div>
        <div className="absolute top-[250px] left-[620px]">
          <button
            onClick={handleNextImage}
            className="inline-block transition-transform hover:translate-x-1 motion-reduce:transform-none cursor-pointer hover:text-violet-500 text-3xl font-semibold"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
