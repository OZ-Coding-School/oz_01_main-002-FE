'use client';

import Image from "next/image";
import { useState } from "react";

const Bidding = () => {
  const [isChat, setIsChat] = useState('');
  const [chats, setChats] = useState<string[]>([]);
  const imageList = [
    { id: 1, image: '/images/mainTopImage01.jpg' },
    { id: 2, image: '/images/mainTopImage02.jpeg' },
    { id: 3, image: '/images/mainTopImage03.png' },
  ]
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
    <div className="w-full max-w-[1072px]  my-3 mx-auto">
      <div>
        <div className="w-full h-[50px] flex items-center justify-center">
          <p className="text-4xl">입찰까지 1시간 34분 남았습니다.</p>
        </div>
        <div className="flex mt-8">
          <div>
            {imageList.map((image, index) => (
              <Image key={image.id} src={image.image} width={200} height={200} className="w-[200px] h-[200px] m-3 object-cover rounded-lg cursor-pointer overflow-auto text-ellipsis" alt={`작은 이미지${index}`} onClick={() => setImages(image.image)} />
            ))}
          </div>
          <div>
            <Image src={images} width={648} height={648} className="w-[624px] h-[624px] my-3 object-cover rounded-lg" alt="메인 이미지" />
          </div>
          <div>
            <div className="w-[200px] h-[460px] bg-white border m-3 rounded-lg p-2 text-center">
              <div className="w-full h-[40px] flex justify-center items-center border">접속자</div>
              <div className="flex h-[410px] flex-col w-full overflow-auto no_scrollbar">
                {people.map((person, index) => (
                  <div key={index} className="w-full leading-10 flex justify-center items-center">{person}</div>
                ))}
              </div>
            </div>
            <div className="w-[200px] h-[70px] bg-[green] m-3 cursor-pointer rounded-xl flex justify-center items-center">
              <p>충전</p>
            </div>
            <div className="w-[200px] h-[70px] bg-[yellow] m-3 cursor-pointer rounded-xl flex justify-center items-center">
              <p>입찰</p>
            </div>
          </div>
        </div>
        <div className="px-[12px]">
          <div className="box-border w-full h-[500px] border border-b-0 mt-10 rounded-t-xl overflow-auto no_scrollbar flex flex-col-reverse">
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
            <input type="text" className="w-full h-[50px] border rounded-bl-xl pl-3" placeholder="입력" value={isChat} onChange={(e) => setIsChat(e.target.value)} onKeyUp={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (isChat.trim() !== '') {
                  handleChats();
                }

              }
            }} />
            <button className="w-[200px] h-[50px] border rounded-br-xl" onClick={() => {
              if (isChat.trim() !== '') {
                handleChats();
              }
            }}>입력</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bidding