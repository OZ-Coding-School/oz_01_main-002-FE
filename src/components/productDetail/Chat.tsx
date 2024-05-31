'use client';

import { useChatRoom } from "@/api/chatApi";
import { usePostWinner } from "@/api/productApi";
import { useGetUser } from "@/api/userApi";
import useWebSocket from "@/hooks/useWebSocket";
import { useEffect, useState } from "react";

type ChatTypeProps = {
  productId: string,
  auctionId: string,
  finalPrice: number,
  refetch: () => void
}

const Chat = ({ productId, auctionId, finalPrice, refetch }: ChatTypeProps) => {
  const [isChat, setIsChat] = useState('');
  const { data, refetch: userRefetch } = useGetUser();
  const { mutate: postBidding } = usePostWinner();

  const buttonMenu = [
    { id: 1, name: '관심' },
    { id: 2, name: '입찰' },
    { id: 3, name: '충전' },
  ];
  const { mutate: userChatRoom } = useChatRoom();
  const { messages, isConnected, sendMessage } = useWebSocket();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) return;
    userRefetch();
  }, [])


  useEffect(() => {
    if (isConnected) {
      setTimeout(() => {
        userChatRoom({ room_id: productId, user_id: localStorage.getItem('user_id') });
      }, 1000);
    }
  }, [isConnected])

  // const handleWinner = async () => {
  //   if (!localStorage.getItem('access_token')) return;
  //   const response = await apiClient.get(`/api/v1/winners/${productId}`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   });
  // }

  const handleButton = async (name: string) => {
    if (!localStorage.getItem('access_token')) {
      alert('로그인이 필요합니다');
      return;
    }
    if (!finalPrice) return;
    if (name === '관심') {
      // handleWinner();
    } else if (name === '입찰') {
      const priceIncrements = [
        { upperLimit: 300000, increase: 20000 },
        { upperLimit: 1000000, increase: 50000 },
        { upperLimit: 3000000, increase: 100000 },
        { upperLimit: 5000000, increase: 200000 },
        { upperLimit: 10000000, increase: 5000000 },
        { upperLimit: 30000000, increase: 1000000 },
        { upperLimit: 50000000, increase: 2000000 },
        { upperLimit: 200000000, increase: 5000000 },
        { upperLimit: 500000000, increase: 10000000 },
      ];
      let increaseAmount = 20000000;

      for (const { upperLimit, increase } of priceIncrements) {
        if (finalPrice < upperLimit) {
          increaseAmount = increase;
          break;
        }
      }

      const newPrice = finalPrice + increaseAmount;
      postBidding({
        product_id: Number(productId),
        auction_id: Number(auctionId),
        bid_price: newPrice,
      }, {
        onSuccess: () => {
          sendMessage({ roomId: productId, message: `${newPrice.toLocaleString()}원 입찰하였습니다` });
          refetch();
        }
      })

    } else if (name === '충전') { }
  }
  const regex = /입찰하였습니다/;


  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && regex.test(latestMessage)) {
      refetch();
    }
  }, [messages]);

  return (
    <div className="w-[568px] max-[1255px]:w-full px-[12px] max-[1255px]:px-0 max-[1255px]:pr-3 max-[855px]:pr-0 m-3 max-[855px]:m-0 max-[855px]:my-3">
      <div className="box-border w-full h-[430px] bg-white border border-b-0 rounded-t-xl overflow-auto scrollbar-hide flex flex-col-reverse">
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
          if (!localStorage.getItem('access_token')) {
            alert('로그인이 필요합니다');
            return;
          };
          if (isChat.trim() !== '') {
            sendMessage({ roomId: productId, message: isChat });
            setIsChat('');
          }
        }}>입력</button>
      </div>
      <div className="flex justify-between max-[1255px]:justify-evenly max-[640px]:justify-between items-center my-4">
        {buttonMenu.map((item) => (
          <div key={item.id} className="w-[170px] h-[48px] max-[640px]:w-[145px] cursor-pointer bg-[#D1B383] border border-[#D1B383] hover:bg-white hover:text-[#D1B383] flex justify-center items-center text-white rounded-[10px]" onClick={() => handleButton(item.name)}>
            <p className="text-[20px] leading-none">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chat