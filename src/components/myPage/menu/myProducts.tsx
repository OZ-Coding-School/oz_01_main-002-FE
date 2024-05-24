'use client';

import { useProductInspection, useUserProducts } from "@/api/productApi";
import { useMenuNumberStore, useProductIdStore } from "@/store";
import { MyProductsType } from "@/type/ProductType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";



const MyProducts = () => {
  const router = useRouter();
  const { setMenuNumber } = useMenuNumberStore();
  const { setProductId } = useProductIdStore();


  const { data, refetch, isLoading } = useUserProducts();

  const { mutate: productInspection } = useProductInspection();
  const handleProduct = async (id: number) => {
    productInspection({ product_id: id, inspector: '관리자' }, {
      onSuccess: () => {
        refetch();
      }
    });
  }

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) router.push('/login');
  }, [])

  const handleProductCheck = (id: number) => {
    setProductId(id);
    router.push('/productInsert/2');
  }

  return (
    <div className={`w-full max-w-[900px] ${data?.data.length <= 4 ? 'h-[800px]' : ''} bg-white rounded-xl px-10 pb-10`}>
      <div className="py-5 hidden text-2xl cursor-pointer max-[1200px]:block" onClick={() => setMenuNumber(0)}>
        <RiArrowGoBackFill />
      </div>
      <div className="h-[64px] max-[1200px]:hidden" />
      <div className="text-3xl font-semibold my-2">
        <p>나의 상품</p>
      </div>
      <div className="border-2 border-[#D1B383]" />
      {!isLoading && data?.data.map((product: MyProductsType) => (
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
            {product.is_approved ? <div className={`w-[150px] h-[50px]  justify-center items-center mr-1 my-1 bg-blue-600 ${product.is_approved ? 'cursor-pointer' : ''} ${product.status === '경매중' ? 'hidden' : 'flex'} text-white rounded-lg`} onClick={() => product.is_approved ? handleProductCheck(product.id) : null}>
              <p>최종 확인</p>
            </div> : null}
            <div className={`w-[150px] h-[50px] flex justify-center text-white items-center rounded-lg mr-1 ${!product.is_approved ? 'bg-red-700' : 'bg-[#D1B383]'}`} onClick={() => !product.is_approved ? handleProduct(product.id) : null}>
              <p>{!product.is_approved ? '검수중' : product.status === '경매중' ? '경매중' : '검수완료'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyProducts