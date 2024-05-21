import { useEffect, useState } from "react";

type CountDownProps = {
  day: string;
}

const useCountDown = ({ day }: CountDownProps) => {
  const [dDay, setDDay] = useState<string>();
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

  return dDay;
}

export default useCountDown