'use client';

import { useChatRoom } from "@/api/chatApi";
import useWebSocket from "@/hooks/useWebSocket";
import { useEffect, useState } from "react";

type ChatTypeProps = {
  productId: string,
}

const Chat = ({ productId }: ChatTypeProps) => {
  const [isChat, setIsChat] = useState('');
  const [isBidding, setIsBidding] = useState(5000);
  const buttonMenu = [
    { id: 1, name: '관심' },
    { id: 2, name: '입찰' },
    { id: 3, name: '충전' },
  ];

  const { mutate: userChatRoom } = useChatRoom();
  const { messages, isConnected, sendMessage } = useWebSocket();

  useEffect(() => {

    if (isConnected) {
      userChatRoom({ room_id: productId, user_id: localStorage.getItem('user_id') });
    }
  }, [isConnected])

  const handleButton = (name: string) => {
    if (name === '관심') {
      console.log('관심');
    } else if (name === '입찰') {
      setIsBidding(prev => prev + 5000);
      console.log(isBidding);
    } else if (name === '충전') { }
  }

  return (
    <div className="w-full px-[12px] m-3">
      <div className="box-border w-full h-[430px] bg-white border border-b-0 rounded-t-xl overflow-auto no_scrollbar flex flex-col-reverse">
        <div className=" w-full flex flex-col relative">
          <div className="p-3 h-full">
            {messages.map((chat, index) => (
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