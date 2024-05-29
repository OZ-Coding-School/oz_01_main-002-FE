'use client';

import { useAuctionPutStatus } from "@/api/productApi";
import { useEffect, useState } from "react";

type CountDownProps = {
  endTime: string | undefined;
  productId: number | undefined;
  refetch: () => void;
  auctionId: string | undefined;
  itemRefetch: () => void;
  active: string | undefined;
}

const CountDown = ({ endTime, productId, active, auctionId, refetch, itemRefetch }: CountDownProps) => {
  const [dDay, setDDay] = useState<string>();
  const { mutate: finalStatus } = useAuctionPutStatus();
  const targetDate = new Date(endTime!);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = targetDate.getTime() - currentDate.getTime();

      if (timeDifference <= 0) {
        clearInterval(timer);
        setDDay('0일 0시간 0분 0초');
        if (active !== undefined && active !== "결제대기") {
          finalStatus({ auctionId: auctionId, status: false, isActive: '경매종료' }, {
            onSuccess: () => {
              itemRefetch();
              refetch();
            },
          });
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

  return <>
    {dDay && <p className="text-4xl max-[1255px]:text-3xl max-[640px]:text-[22px] text-white">{dDay !== '0일 0시간 0분 0초' ? `입찰까지 ${dDay} 남았습니다.` : '입찰 종료'}</p>};
  </>
}

export default CountDown