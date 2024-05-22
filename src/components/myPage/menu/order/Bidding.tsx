import { useProductStore } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

type Product = {
  id: number;
  grade: string;
  title: string;
  img: string;
  startPrice?: number;
  price: number;
  category: string;
  commission?: number;
};

const Bidding = () => {
  const [productItem, setProductItem] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleViewDetailsBidding = (id: number) => {
    router.push(`/product/${id}`);
  };

  const { setPaymentUserProducts } = useProductStore();
  const router = useRouter();
  const products = [
    {
      id: 1,
      grade: "C",
      title: "나이키 신발",
      img: "/images/item05.jpg",
      startPrice: 600000,
      price: 640000,
      category: "신발",
    },
    {
      id: 2,
      grade: "S",
      title: "로렉스 시계",
      img: "/images/item01.png",
      startPrice: 14500000,
      price: 15000000,
      category: "시계",
    },
    {
      id: 3,
      grade: "S",
      title: "샤넬 가방",
      img: "/images/item03.jpg",
      startPrice: 6500000,
      price: 6750000,
      category: "가방",
    },
    {
      id: 4,
      grade: "A",
      title: "샤넬 라운드티",
      img: "/images/item04.jpg",
      startPrice: 500000,
      price: 650000,
      category: "옷",
    },
  ];

  const handleCheck = (e: ChangeEvent<HTMLInputElement>, product: Product) => {
    if (e.target.checked) {
      setProductItem([
        ...productItem,
        {
          id: product.id,
          grade: product.grade,
          title: product.title,
          img: product.img,
          price: product.price,
          category: product.category,
          commission: product.price * 0.1,
        },
      ]);
    } else {
      setProductItem(productItem.filter((p) => p.id !== product.id));
    }
  };

  const totalCommission = productItem.reduce(
    (acc, product) => acc + product.commission!,
    0
  );
  const totalPrice = productItem.reduce(
    (acc, product) => acc + product.price,
    0
  );

  useEffect(() => {
    setTotalAmount(totalPrice + totalCommission);
  }, [productItem]);

  const handleMovePayment = () => {
    setPaymentUserProducts(productItem);
    router.push("/payment");
  };

  console.log(productItem);
  console.log("어마어마", totalAmount);
  return (
    <div>
      <div className="flex justify-between relative">
        <div className="w-[500px]">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b last:border-b-0"
            >
              <div className="mr-2">
                <input
                  type="checkbox"
                  className="w-[20px] h-[20px] accent-[#D1B383]"
                  onChange={(e) => handleCheck(e, product)}
                />
              </div>
              <div className="flex items-center mt-6 mb-4">
                <div className="w-[130px] h-[130px] bg-[gray] object-cover rounded-lg relative overflow-hidden">
                  <Image
                    src={product.img}
                    fill
                    sizes="1"
                    className="object-cover"
                    alt="판매이미지"
                  />
                </div>
                <div className="ml-4">
                  <div>
                    <div className="flex items-center">
                      <p>등급</p>
                      <p className="ml-2 font-bold">{product.grade}</p>
                    </div>
                    <p className="font-bold">{product.title}</p>
                  </div>
                  <div className="my-1">
                    <p className="text-sm text-[#868686]">{product.category}</p>
                  </div>
                  <div>
                    <div className="flex text-sm items-center">
                      <p className="">시작가</p>
                      <p className="ml-2 text-[#868686]">{`${product.startPrice.toLocaleString()}원`}</p>
                    </div>
                    <div className="flex items-center">
                      <p>입찰가</p>
                      <p className="ml-2">{`${product.price.toLocaleString()}원`}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[150px] h-[50px] border flex justify-center items-center rounded-lg ml-5 cursor-pointer">
                <p>상품 보기</p>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky w-[300px] top-[91px] h-fit">
          <div className="border rounded-lg p-3">
            <div>
              <div className="text-2xl my-2">
                <p className="font-bold">결제 금액</p>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <p>총 상품 가격</p>
                  <p>{totalPrice.toLocaleString()}원</p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p>총 수수료</p>
                  <p>{totalCommission.toLocaleString()}원</p>
                </div>
                <div className="flex justify-between items-center border-b py-2">
                  <p>총 배송비</p>
                  <p>0원</p>
                </div>
                <div className="text-end py-2">
                  <p>{(totalPrice + totalCommission).toLocaleString()}원</p>
                </div>
              </div>
            </div>
            <div>
              <button
                className="w-full h-[50px] mt-3 border rounded-lg"
                onClick={() => handleMovePayment()}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bidding;
