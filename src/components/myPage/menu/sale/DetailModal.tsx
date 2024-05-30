import { useGetProduct } from "@/api/productApi";
import { useOnclickOutside } from "@/hooks/useOnClickOutSide";
import Image from "next/image";
import { useEffect, useRef } from "react";

type DetailModalProps = {
  productId: number;
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
}

const DetailModal = ({ isClicked, productId, setIsClicked }: DetailModalProps) => {
  const { data, refetch } = useGetProduct(productId);
  const ref = useRef(null);
  useEffect(() => {
    console.log('된다');
    refetch();
  }, [isClicked === true])

  useOnclickOutside(ref, () => {
    setIsClicked(false);
  })

  return (
    <div className="absolute w-full">
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="w-[900px] bg-gray-500 rounded-lg transition-all duration-[0.1s] ease-out animate-scale-up z-10 p-4" ref={ref}>
          {data && <p className="text-white">zz</p>}
          <div className="w-[250px] h-[250px] rounded-lg relative overflow-hidden">
            <Image src={'/images/item05.jpg'} fill sizes="1" className="object-cover" alt="모달이미지" />
          </div>
          <div>
            <p>상품명</p>
            <p>시작가</p>
            <p>최종입찰가</p>
            <p>카테고리</p>
            <p>상품설명</p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailModal