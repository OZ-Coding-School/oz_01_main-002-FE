'use client';
import { useUserProducts } from "@/api/productApi";
import { useProductStore } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

type Product = {
  id: number;
  grade: string;
  name: string;
  img: string;
  startPrice?: number;
  winner_bid_price: number;
  category: string;
  commission?: number;
}

const Bidding = () => {
  const [productItem, setProductItem] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { data } = useUserProducts();
  const { setPaymentUserProducts } = useProductStore();
  const router = useRouter();
  const productImg = '/images/item05.jpg';
  const handleCheck = (e: ChangeEvent<HTMLInputElement>, product: Product) => {
    if (e.target.checked) {
      setProductItem([...productItem, { id: product.id, grade: product.grade, name: product.name, img: product.img, winner_bid_price: product.winner_bid_price, category: product.category, commission: product.winner_bid_price * 0.1 }]);
    } else {
      setProductItem(productItem.filter((p) => p.id !== product.id));
    }
  }

  const totalCommission = productItem.reduce((acc, product) => acc + product.commission!, 0);
  const totalPrice = productItem.reduce((acc, product) => acc + product.winner_bid_price, 0);

  useEffect(() => {
    setTotalAmount(totalPrice + totalCommission);
  }, [productItem])

  const handleMovePayment = () => {
    setPaymentUserProducts(productItem);
    router.push('/payment');
  }

  console.log('뭐가 들어있나', data);

  console.log(productItem);
  console.log('어마어마', totalAmount);
  return (
    <div>
      <div className="flex justify-between relative">
        <div className="w-[500px]">
          {data?.data.filter((item: any) => item.winner_user_id === Number(localStorage.getItem('user_id'))).map((product: any) => (
            <div key={product.id} className="flex items-center justify-between border-b last:border-b-0">
              <div className="mr-2">
                <input type="checkbox" className="w-[20px] h-[20px] accent-[#D1B383]" onChange={(e) => handleCheck(e, product)} />
              </div>
              <div className="flex items-center mt-6 mb-4">
                <div className="w-[130px] h-[130px] bg-[gray] object-cover rounded-lg relative overflow-hidden">
                  <Image src={product.img ? product.img : productImg} fill sizes="1" className="object-cover" alt="판매이미지" />
                </div>
                <div className="ml-4">
                  <div>
                    <div className="flex items-center">
                      <p>등급</p>
                      <p className="ml-2 font-bold">{product.grade}</p>
                    </div>
                    <p className="font-bold">{product.name}</p>
                  </div>
                  <div className="my-1">
                    <p className="text-sm text-[#868686]">{product.category}</p>
                  </div>
                  <div>
                    <div className="flex text-sm items-center">
                      <p className="">시작가</p>
                      <p className="ml-2 text-[#868686]">{`${product.bid_price.toLocaleString()}원`}</p>
                    </div>
                    <div className="flex items-center">
                      <p>입찰가</p>
                      <p className="ml-2">{`${product.winner_bid_price.toLocaleString()}원`}</p>
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
              <button className="w-full h-[50px] mt-3 border rounded-lg" onClick={() => handleMovePayment()}>결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bidding