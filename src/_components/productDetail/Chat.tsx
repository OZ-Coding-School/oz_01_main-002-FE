'use client';

import Link from "next/link";
import { useState } from "react";

const Chat = () => {
  const [isChat, setIsChat] = useState('');
  const [chats, setChats] = useState<string[]>([]);

  const buttonMenu = [
    { id: 1, name: '관심', link: '/' },
    { id: 2, name: '입찰', link: '/' },
    { id: 3, name: '충전', link: '/payment' },
  ];


  const handleChats = async () => {
    setChats([...chats, isChat]);
    setIsChat('');
  }
  return (
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
  )
}

export default Chat