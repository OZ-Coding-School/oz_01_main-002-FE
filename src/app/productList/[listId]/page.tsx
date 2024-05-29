'use client';

import apiClient from "@/api/baseApi";
import { useGetAuctionProducts, useGetAuctionProductsCategories } from "@/api/productApi";
import ProductInsertButton from "@/components/product/ProductInsertButton";
import ProductListCategories from "@/components/product/ProductListCategories";
import ProductListItem from "@/components/product/ProductListItem";
import { ProductListType } from "@/type/ProductType";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductList = ({ params }: { params: { listId: string } }) => {
  const paramsId = params.listId;
  const { data: auctionList, refetch: auctionListFetch } = useGetAuctionProducts();
  const { data, refetch: auctionCategories } = useGetAuctionProductsCategories(paramsId);
  const [productList, setProductList] = useState<ProductListType[] | undefined>();

  const auctionItems = [
    { id: 1, name: '샤넬 가방', img: '/images/item03.jpg', startPrice: '6,500,000원', price: '6,750,000원', category: '가방', like: 12, view: 30, grade: 'A' },
    { id: 2, name: '샤넬 라운드티', img: '/images/item04.jpg', startPrice: '500,000원', price: '650,000원', category: '옷', like: 62, view: 22, grade: 'B' },
    { id: 3, name: '나이키 신발', img: '/images/item05.jpg', startPrice: '600,000원', price: '640,000원', category: '신발', like: 22, view: 150, grade: 'C' },
    { id: 4, name: '로렉스 시계', img: '/images/item01.png', startPrice: '14,500,000원', price: '15,000,000원', category: '시계', like: 22, view: 80, grade: 'S' },
    { id: 5, name: '샤넬 가방', img: '/images/item03.jpg', startPrice: '6,500,000원', price: '6,750,000원', category: '가방', like: 12, view: 30, grade: 'A' },
    { id: 6, name: '샤넬 라운드티', img: '/images/item04.jpg', startPrice: '500,000원', price: '650,000원', category: '옷', like: 62, view: 22, grade: 'B' },
    { id: 7, name: '나이키 신발', img: '/images/item05.jpg', startPrice: '600,000원', price: '640,000원', category: '신발', like: 22, view: 150, grade: 'C' },
    { id: 8, name: '로렉스 시계', img: '/images/item01.png', startPrice: '14,500,000원', price: '15,000,000원', category: '시계', like: 22, view: 80, grade: 'S' },
    { id: 9, name: '샤넬 가방', img: '/images/item03.jpg', startPrice: '6,500,000원', price: '6,750,000원', category: '가방', like: 12, view: 30, grade: 'A' },
    { id: 10, name: '샤넬 라운드티', img: '/images/item04.jpg', startPrice: '500,000원', price: '650,000원', category: '옷', like: 62, view: 22, grade: 'B' },
    { id: 11, name: '나이키 신발', img: '/images/item05.jpg', startPrice: '600,000원', price: '640,000원', category: '신발', like: 22, view: 150, grade: 'C' },
    { id: 12, name: '로렉스 시계', img: '/images/item01.png', startPrice: '14,500,000원', price: '15,000,000원', category: '시계', like: 22, view: 80, grade: 'S' },
    { id: 13, name: '샤넬 가방', img: '/images/item03.jpg', startPrice: '6,500,000원', price: '6,750,000원', category: '가방', like: 12, view: 30, grade: 'A' },
    { id: 14, name: '샤넬 라운드티', img: '/images/item04.jpg', startPrice: '500,000원', price: '650,000원', category: '옷', like: 62, view: 22, grade: 'B' },
    { id: 15, name: '나이키 신발', img: '/images/item05.jpg', startPrice: '600,000원', price: '640,000원', category: '신발', like: 22, view: 150, grade: 'C' },
    { id: 16, name: '로렉스 시계', img: '/images/item01.png', startPrice: '14,500,000원', price: '15,000,000원', category: '시계', like: 22, view: 80, grade: 'S' },
  ];

  useEffect(() => {
    if (paramsId === 'list') {
      const handleAllAuctionList = async () => {
        try {
          const response = await apiClient.get('/api/v1/auctions/');
          setProductList(response.data);
        } catch (error) {
          console.log('error', error);
        }
      }
      handleAllAuctionList();
    } else if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(paramsId)) {
      auctionCategories();
    }
  }, [paramsId]);

  useEffect(() => {
    if (data) {
      setProductList(data.data);
    }
  }, [data])

  return (
    <div className="bg-[#222] w-full">
      <div className="h-[40px]" />
      <ProductListCategories />
      <div className="w-full max-w-[1240px] mx-auto mb-12">
        <div className="my-[25px]">
          <p className="text-[24px] ml-5 leading-[29px] max-[764px]:text-center max-[764px]:pl-0 text-white">인기상품</p>
        </div>
        <div className="w-full flex mx-auto flex-wrap justify-center">
          {auctionItems.slice(0, 5).map((item) => (
            <div key={item.id} className="w-full max-w-[228px] max-[1260px]:w-[180px] max-[1015px]:w-[220px] mb-6 mx-[10px] max-[1015px]:mx-[15px]">
              <div className="w-[228px] h-[228px] max-[1260px]:w-[180px] max-[1260px]:h-[180px] max-[1015px]:w-[220px] max-[1015px]:h-[220px] bg-white mb-2 relative rounded-lg overflow-hidden">
                <Image src={item.img} fill sizes="1" className="object-cover" alt="인기상품 이미지" />
              </div>
              <div className="">
                <p className="text-white text-[20px] leading-[24px] mb-[6px]">{item.name}</p>
                <p className="text-[#868686] text-[20px] leading-[24px] mb-[6px]">{item.category}</p>
                <p className="text-[#D1B383] text-[20px] leading-[24px]">시작가 {item.startPrice}</p>
                <p className="text-[#D1B383] text-[20px] leading-[24px]">현재가 {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[50px]" />
      <div className="w-full max-w-[1240px] mx-auto">
        <div className="my-[25px]">
          <p className="text-[24px] ml-[10px] max-[1150px]:ml-[10%] leading-[29px] text-white">경매상품</p>
        </div>
        <div className="w-full flex flex-wrap mx-auto max-w-[1132px] max-[1150px]:max-w-[850px] max-[865px]:max-w-[566px] max-[585px]:max-w-[450px]">
          {productList && productList.map((item) => (
            <Link key={item.id} href={`/productList/detail/${item.product_id}id=${item.id}`}>
              <ProductListItem item={item} />
            </Link>
          ))}
        </div>
      </div>
      <ProductInsertButton />
    </div>
  )
}

export default ProductList