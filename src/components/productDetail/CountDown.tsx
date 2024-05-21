'use client';

import { useEffect, useState } from "react";

const CountDown = () => {
  const [dDay, setDDay] = useState<string>();

  const day = '2024-05-30';

  const targetDate = new Date(day);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = targetDate.getTime() - currentDate.getTime();

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      const countDown = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
      setDDay(countDown);
    }, 1000);
    return () => clearInterval(timer);
  }, [])

  return <p className="text-4xl text-white">입찰까지 {dDay} 남았습니다.</p>;
}

export default CountDown