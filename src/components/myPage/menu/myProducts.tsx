'use client';

import { useMenuNumberStore, useProductIdStore } from "@/store";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

type MyProducts = {
  name: string,
  content: string,
  bid_price: number,
  duration: number,
  user_id: number,
  status: string,
  modify: boolean,
  grade: string,
  category_id: number,
  img: string,
  id: number
}

const MyProducts = () => {
  const router = useRouter();
  const [myItems, setMyItems] = useState<MyProducts[]>([]);
  const products = [
    { id: 1, grade: 'S', title: '샤넬 가방', img: '/images/item03.jpg', startPrice: '6,500,000원', price: '6,750,000원', category: '가방', status: '검수중' },
    { id: 2, grade: 'A', title: '샤넬 라운드티', img: '/images/item04.jpg', startPrice: '500,000원', price: '650,000원', category: '옷', status: '검수완료' },
    { id: 3, grade: 'C', title: '나이키 신발', img: '/images/item05.jpg', startPrice: '600,000원', price: '640,000원', category: '신발', status: '경매중' },
    { id: 4, grade: 'S', title: '로렉스 시계', img: '/images/item01.png', startPrice: '14,500,000원', price: '15,000,000원', category: '시계', status: '판매완료' },
  ];
  const { setMenuNumber } = useMenuNumberStore();
  const { setProductId } = useProductIdStore();

  const handleMyProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/products/user/2');
      console.log(response);
      setMyItems(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async (id: number) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/products/${id}`, {
        status: '검수완료',
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log(response);
      if (response.status === 200) {
        handleMyProducts();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) router.push('/login');
    handleMyProducts();
  }, [])


  const handleProductCheck = (id: number) => {
    setProductId(id);
    router.push('/productInsert/2');
  }

  return (
    <div className={`w-full max-w-[900px] ${myItems.length <= 4 ? 'h-[800px]' : ''} bg-white rounded-xl px-10 pb-10`}>
      <div className="py-5 hidden text-2xl cursor-pointer max-[1200px]:block" onClick={() => setMenuNumber(0)}>
        <RiArrowGoBackFill />
      </div>
      <div className="h-[64px] max-[1200px]:hidden" />
      <div className="text-3xl font-semibold my-2">
        <p>나의 상품</p>
      </div>
      <div className="border-2 border-[#D1B383]" />
      {myItems.map((product) => (
        <div key={product.id} className="flex items-center justify-between border-b last:border-b-0">
          <div className="flex items-center mt-6 mb-4">
            <div className="w-[130px] h-[130px] bg-[gray] object-cover rounded-lg relative overflow-hidden">
              <Image src={product.img ? product.img : '/images/item01.png'} fill sizes="1" className="object-cover" alt="판매이미지" />
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
                <p className="text-sm text-[#868686]">{product.category_id}</p>
              </div>
              <div>
                <div className="flex items-center">
                  <p className="text-sm">시작가</p>
                  <p className="ml-2 text-sm text-[#868686]">{`${product.bid_price.toLocaleString()}원`}</p>
                </div>
                {/* <div className="flex items-center">
                  <p>판매가</p>
                  <p className="ml-2">{product.price}</p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center" >
            {product.status === '검수완료' ? <div className={`w-[150px] h-[50px] flex justify-center items-center mr-1 my-1 bg-blue-600 ${product.status === '검수완료' ? 'cursor-pointer' : ''} text-white rounded-lg`} onClick={() => product.status === '검수완료' ? handleProductCheck(product.id) : null}>
              <p>최종 확인</p>
            </div> : null}
            <div className={`w-[150px] h-[50px] flex justify-center text-white items-center rounded-lg mr-1 ${product.status === '검수중' ? 'bg-red-700' : 'bg-[#D1B383]'}`} onClick={() => product.status === '검수중' ? handleUpdate(product.id) : null}>
              <p>{product.status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyProducts