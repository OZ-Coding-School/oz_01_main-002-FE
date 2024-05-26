'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdTime } from "react-icons/io";
type CardFormProps = {
  item: {
    id: string;
    title: string;
    content: string;
    category: string;
    nickname: string;
    // view: number;
    date: any;
    imageUrl: string;
  }
}

const CardForm = ({ item }: CardFormProps) => {
  const [images, setImages] = useState(0);
  const givenDate: any = new Date(
    item.date.seconds * 1000 + item.date.nanoseconds / 1000000
  );
  // 현재 시간
  const currentDate: any = new Date();
  // 주어진 시간과 현재 시간 사이의 시간 차이 계산 (밀리초 단위)
  const timeDifference = currentDate - givenDate;
  // 밀리초를 분 단위로 변환
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  // 몇 시간 전 또는 몇 분 전인지 판단
  let timeAgo;
  if (minutesDifference < 60) {
    timeAgo = `${minutesDifference}분 전`;
  } else {
    const hoursDifference = Math.floor(minutesDifference / 60);
    if (hoursDifference < 24) {
      timeAgo = `${hoursDifference}시간 전`;
    } else {
      const daysDifference = Math.floor(hoursDifference / 24);
      timeAgo = `${daysDifference}일 전`;
    }
  }

  return (
    <div key={item.title} className="w-[568px] h-[250px] max-[920px]:w-[468px] max-[920px]:h-[200px] flex flex-col justify-between border rounded-lg m-2 px-6 py-3">
      <div className="text-gray-500 max-[920px]:text-[14px]">
        <p>{item.category}</p>
      </div>
      <Link href={`/community/detail/${item.id}`}>
        <div className="flex justify-between items-start">
          <div className="flex flex-col jub">
            <div className="text-[22px] max-[920px]:text-[18px] line-clamp-1 font-bold text-ellipsis overflow-hidden">
              <p>{item.title}</p>
            </div>
            <div className="h-5 max-[920px]:h-3" />
            <div className="text-lg h-[56px] max-[920px]:text-[14px] whitespace-pre-wrap max-[920px]:h-[48px] line-clamp-2 font-bold text-ellipsis overflow-hidden">
              <p>{item.content}</p>
            </div>
          </div>
          {item.imageUrl !== '' ?
            <div className="w-[100px] h-[100px] rounded-md relative overflow-hidden">
              <Image src={item.imageUrl} className="object-cover" fill sizes="1" alt="커뮤이미지" />
            </div>
            : null}
        </div>
      </Link>
      <div>
        <div className="mt-5 max-[920px]:text-[14px]">
          <p>{item.nickname.substring(0, 1) + "*".repeat(Math.max(item.nickname.length - 1, 0))}</p>
        </div>
        <div className="flex justify-between items-center text-gray-500 max-[920px]:text-[12px]">
          <div>
            {/* <p>{item.view}</p> */}
          </div>
          <div className="flex items-center">
            <IoMdTime className="mr-1" />
            <p>{timeAgo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardForm