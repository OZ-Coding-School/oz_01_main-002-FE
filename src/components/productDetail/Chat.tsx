'use client';

import { useChatRoom } from "@/api/chatApi";
import { useGetUser } from "@/api/userApi";
import useWebSocket from "@/hooks/useWebSocket";
import { useEffect, useState } from "react";

type ChatTypeProps = {
  productId: string,
  itemPrice: number,
  setItemPrice: (price: number) => void
}

const Chat = ({ productId, itemPrice, setItemPrice }: ChatTypeProps) => {
  const [isChat, setIsChat] = useState('');
  const [isBidding, setIsBidding] = useState(5000);
  const { data } = useGetUser();
  console.log('유저 정보', data);

  const buttonMenu = [
    { id: 1, name: '관심' },
    { id: 2, name: '입찰' },
    { id: 3, name: '충전' },
  ];
  const { mutate: userChatRoom } = useChatRoom();
  const { messages, isConnected, sendMessage } = useWebSocket();
  console.log(messages);
  useEffect(() => {
    if (isConnected) {
      userChatRoom({ room_id: productId, user_id: localStorage.getItem('user_id') });
    }
  }, [isConnected])
  const increasePrice = () => {


  };
  const handleButton = (name: string) => {
    if (name === '관심') {
      console.log('관심');
    } else if (name === '입찰') {
      let increaseAmount = 0;
      if (itemPrice < 300000) {
        increaseAmount = 20000;
      } else if (itemPrice < 1000000) {
        increaseAmount = 50000;
      } else if (itemPrice < 3000000) {
        increaseAmount = 100000;
      } else if (itemPrice < 5000000) {
        increaseAmount = 200000;
      } else if (itemPrice < 10000000) {
        increaseAmount = 5000000;
      } else if (itemPrice < 30000000) {
        increaseAmount = 1000000;
      } else if (itemPrice < 50000000) {
        increaseAmount = 2000000;
      } else if (itemPrice < 200000000) {
        increaseAmount = 5000000;
      } else if (itemPrice < 500000000) {
        increaseAmount = 10000000;
      } else if (itemPrice > 500000000) {
        increaseAmount = 20000000;
      }
      const newPrice = itemPrice + increaseAmount;
      setItemPrice(newPrice);
      sendMessage({ roomId: productId, message: `${increaseAmount.toLocaleString()}원 입찰하였습니다` });
    } else if (name === '충전') { }
  }
  const regex = /입찰하였습니다/;
  return (
    <div className="w-full px-[12px] m-3">
      <div className="box-border w-full h-[430px] bg-white border border-b-0 rounded-t-xl overflow-auto no_scrollbar flex flex-col-reverse">
        <div className="relative">
          <div className="p-3 h-full flex flex-col">
            {messages.map((chat, index) => {
              const mat = chat.match(regex);
              chat = mat ? chat.replace(/:/g, '님') : chat;
              return (
                <div key={index} className={`${chat.includes(data?.data.nickname) ? 'text-end' : 'text-start'} py-4 rounded-xl p-3 my-1`}>
                  <p className={` border ${mat ? 'block text-center bg-[red] text-white' : 'inline-block text-start'} p-4 rounded-lg`}>{chat}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <input type="text" className="w-full outline-none h-[50px] border rounded-bl-xl pl-3" placeholder="입력" value={isChat} onChange={(e) => setIsChat(e.target.value)} onKeyUp={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (isChat.trim() !== '') {
              sendMessage({ roomId: '2', message: isChat });
              setIsChat('');
            }
          }
        }} />
        <button className="w-[200px] h-[50px] bg-[#D1B383] text-white rounded-br-xl" onClick={() => {
          if (isChat.trim() !== '') {
            sendMessage({ roomId: productId, message: isChat });
            setIsChat('');
          }
        }}>입력</button>
      </div>
      <div className="flex justify-between items-center my-4">
        {buttonMenu.map((item) => (
          <div key={item.id} className="w-[170px] h-[48px] bg-[#D1B383] border border-[#D1B383] hover:bg-white hover:text-[#D1B383] flex justify-center items-center text-white rounded-[10px]" onClick={() => handleButton(item.name)}>
            <p className="text-[20px] leading-none">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chat