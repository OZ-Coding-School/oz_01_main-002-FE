'use client';

import { useBiddingStore } from "@/store";
import { useEffect, useState } from "react";

const CountDown = () => {
  const [dDay, setDDay] = useState<string>();
  const day = '2024-05-23 20:00:50';
  const targetDate = new Date(day);
  const { setIsBidding } = useBiddingStore();

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = targetDate.getTime() - currentDate.getTime();

      if (timeDifference <= 0) {
        clearInterval(timer);
        setDDay('0일 0시간 0분 0초');
        if (!localStorage.getItem('isBiddingSet')) {
          setIsBidding(true);
          localStorage.setItem('isBiddingSet', 'true');
        }
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      const countDown = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
      setDDay(countDown);
    }, 1000);
    return () => clearInterval(timer);
  }, [])

  console.log(dDay);
  return <p className="text-4xl text-white">{dDay !== '0일 0시간 0분 0초' ? `입찰까지 ${dDay} 남았습니다.` : '입찰 종료'}</p>;
}

export default CountDown