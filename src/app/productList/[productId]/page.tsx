'use client';

import useCountDown from "@/_components/productDetail/CountDown";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductDetail = () => {
  const [isChat, setIsChat] = useState('');
  const [chats, setChats] = useState<string[]>([]);
  const day = '2024-05-30';

  const dDay = useCountDown({ day });

  const imageList = [
    { id: 1, image: '/images/cate04.jpg' },
    { id: 2, image: '/images/cate05.png' },
    { id: 3, image: '/images/cate06.png' },
  ]

  const buttonMenu = [
    { id: 1, name: '관심', link: '/' },
    { id: 2, name: '입찰', link: '/' },
    { id: 3, name: '충전', link: '/payment' },
  ];

  const [images, setImages] = useState(imageList[0].image);
  const people = [
    '김철수',
    '김영희',
    '김미영',
    '김민수',
    '김영수',
    '김민지',
    '강철수',
    '강영희',
    '강미영',
    '홍민수',
    '홍영수',
    '홍민지',
    '전철수',
  ]
  const handleChats = async () => {
    setChats([...chats, isChat]);
    setIsChat('');
  }

  return (
    <div className="w-full bg-[#222]">
      <div className="w-full max-w-[1240px] mx-auto">
        <div className="h-[32px]" />
        <div>
          <div className="w-full h-[50px] flex items-center justify-center">
            <p className="text-4xl text-white">입찰까지 {dDay} 남았습니다.</p>
          </div>
          <div className="flex justify-between mt-8">
            <div>
              <div className="flex items-center">
                <div>
                  {imageList.map((image, index) => (
                    <div key={image.id} className="w-[150px] h-[120px] m-3 object-cover relative rounded-lg overflow-hidden cursor-pointer">
                      <Image src={image.image} fill sizes="1" className="object-cover" alt={`작은 이미지${index}`} onClick={() => setImages(image.image)} />
                    </div>
                  ))}
                </div>
                <div className="w-[474px] h-[384px] my-3 object-cover rounded-lg relative overflow-hidden">
                  <Image src={images} fill sizes="1" className="object-cover" alt="메인 이미지" />
                </div>
              </div>
              <div className="w-full m-3">
                <div className="flex items-center my-2">
                  <div className="mr-2">
                    <p className="text-4xl text-white">S</p>
                  </div>
                  <div>
                    <p className="text-4xl text-white">나이키 에어 맥스</p>
                  </div>
                </div>
                <div className="w-full border border-[#868686]" />
                <div className="flex justify-between">
                  <div className=" flex items-center my-4">
                    <p className="text-[#D1B383] text-[20px] leading-none">카테고리</p>
                    <p className="text-white text-[20px] leading-none ml-11">옷</p>
                  </div>
                  <div className="m-3">
                    <div className=" flex justify-between  items-center my-4">
                      <p className="text-[#D1B383] text-[20px] leading-none">시작가</p>
                      <p className="text-white text-[20px] leading-none ml-16">12000,000원</p>
                    </div>
                    <div className="flex justify-between items-center my-4">
                      <p className="text-[#D1B383] text-[20px] leading-none">현재가</p>
                      <p className="text-white text-[20px] leading-none ml-16">124,000원</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="w-full px-[12px] m-3">
              <div className="box-border w-full h-[430px] bg-white border border-b-0 rounded-t-xl overflow-auto no_scrollbar flex flex-col-reverse">
                <div className=" w-full flex flex-col relative">
                  <div className="p-3 h-full">
                    {chats.map((chat, index) => (
                      <div key={index} className="w-full h-[50px] border rounded-xl p-3 my-1">
                        <p>{chat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <input type="text" className="w-full outline-none h-[50px] border rounded-bl-xl pl-3" placeholder="입력" value={isChat} onChange={(e) => setIsChat(e.target.value)} onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (isChat.trim() !== '') {
                      handleChats();
                    }
                  }
                }} />
                <button className="w-[200px] h-[50px] bg-[#D1B383] text-white rounded-br-xl" onClick={() => {
                  if (isChat.trim() !== '') {
                    handleChats();
                  }
                }}>입력</button>
              </div>
              <div className="flex justify-between items-center my-4">
                {buttonMenu.map((item) => (
                  <Link key={item.id} href={item.link}>
                    <div className="w-[170px] h-[48px] bg-[#D1B383] border border-[#D1B383] hover:bg-white hover:text-[#D1B383] flex justify-center items-center text-white rounded-[10px]">
                      <p className="text-[20px] leading-none">{item.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* <div>
              <div className="w-[200px] h-[460px] bg-white border m-3 rounded-lg p-2 text-center">
                <div className="w-full h-[40px] flex justify-center items-center border">접속자</div>
                <div className="flex h-[410px] flex-col w-full overflow-auto no_scrollbar">
                  {people.map((person, index) => (
                    <div key={index} className="w-full leading-10 flex justify-center items-center">{person}</div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
          <div className="border border-[#868686] mx-3" />
          <div className="my-3 flex items-center">
            <div className="ml-4 w-[80px] h-[80px] bg-[#868686] rounded-full"></div>
            <div className="ml-4 text-[20px] text-white">
              <p>유저 닉네임</p>
            </div>
          </div>
          <div className="border border-[#868686] mx-3" />
          <div className="h-4" />
          <div></div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail