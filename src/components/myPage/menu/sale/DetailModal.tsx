import { useGetProduct } from "@/api/productApi";
import { useOnclickOutside } from "@/hooks/useOnClickOutSide";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
type DetailModalProps = {
  productId: number;
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
}

const DetailModal = ({ isClicked, productId, setIsClicked }: DetailModalProps) => {
  const { data, refetch } = useGetProduct(productId);
  const [images, setImages] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    console.log('된다');
    refetch();
  }, [isClicked === true])
  console.log(data);

  const next = () => {
    setImages(prev => prev + 1 >= data?.data.images.length ? 0 : prev + 1);
  }

  const prev = () => {
    setImages(prev => prev - 1 < 0 ? data?.data.images.length - 1 : prev - 1);
  }

  useOnclickOutside(ref, () => {
    setIsClicked(false);
  })
  console.log(data?.data.images.length)
  return (
    <div className="absolute w-full">
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md">
        <div className="w-[500px] max-[500px]:w-[400px] rounded-lg transition-all bg-white duration-[0.1s] ease-out animate-scale-up p-4" ref={ref}>
          {data &&
            <div className="flex flex-col items-center">
              <div className="w-[450px] max-[500px]:w-[350px] h-[300px] rounded-lg relative overflow-hidden">
                {data?.data.images.length !== 1 ? <div className="z-[1] flex justify-center items-center cursor-pointer w-[60px] h-[200px] text-gray-100 hover:text-gray-300 hover:bg-black hover:bg-opacity-50 absolute left-0 top-1/2 transform -translate-y-1/2" onClick={prev}>
                  <IoIosArrowBack className="text-[64px]" />
                </div> : null}
                {data?.data.images.length !== 1 ? <div className="z-[1] flex justify-center items-center cursor-pointer w-[60px] h-[200px] text-gray-100 hover:text-gray-300 hover:bg-black hover:bg-opacity-50 absolute right-0 top-1/2 transform -translate-y-1/2" onClick={next}>
                  <IoIosArrowForward className=" text-[64px]" />
                </div> : null}
                <Image src={data.data.images[images]} fill sizes="1" className="object-cover" alt="모달이미지" />
              </div>
              <div className="mt-2 w-[450px]  max-[500px]:w-[350px]">
                <div className="flex items-center text-lg my-1">
                  <p className="font-bold">등급</p>
                  <p className="ml-2 text-base text-[#D1B383]">{data?.data.grade}</p>
                </div>
                <div className="flex items-center text-lg my-1">
                  <p className="font-bold">상품명</p>
                  <p className="ml-2 text-base">{data?.data.name}</p>
                </div>
                <div className="flex items-center text-lg my-1">
                  <p className="font-bold ">최종입찰가</p>
                  <p className="ml-2 text-base">{data?.data.bid_price.toLocaleString()}원</p>
                </div>
                <div className="flex items-center  text-[#868686] text-sm my-1">
                  <p className="font-bold">카테고리</p>
                  <p className="ml-2 text-base">{data?.data.category}</p>
                </div>
                <div className="flex flex-col whitespace-pre-wrap text-lg mt-3">
                  <p className="font-bold mt-1 ">상세정보</p>
                  <p className="text-base">{data?.data.content}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default DetailModal