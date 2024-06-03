'use client';


import { useGetUser } from "@/api/userApi";
import { db } from "@/firebase";
import { useOnclickOutside } from "@/hooks/useOnClickOutSide";
import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

import { useGetCommunity, useGetCommunityReply } from "@/api/communityApi";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsEye } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import List from "./List";
import OptionButton from "./OptionButton";
import ReplyInsert from "./ReplyInsert";
import ReplyList from "./ReplyList";

type DetailFormProps = {
  paramsId: string;
};

const DetailForm = ({ paramsId }: DetailFormProps) => {
  const [isDetailClicked, setIsDetailClicked] = useState(false);
  const { data } = useGetUser();
  const { data: communityItem, isLoading, refetch } = useGetCommunity(paramsId);
  const router = useRouter();
  const [date, setdate] = useState('');
  const ref = useRef(null);
  const [token, setToken] = useState<string | null>(null);
  const { data: replyData, isLoading: replyLoading } = useGetCommunityReply(paramsId);
  const loader = ({ src }: { src: string }) => {
    return src;
  };

  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
    refetch();
    if (communityItem?.exists()) {
      const givenDate: any = new Date(
        communityItem.data().date.seconds * 1000 + communityItem.data().date.nanoseconds / 1000000
      );
      const currentDate: any = new Date();
      const timeDifference = currentDate - givenDate;
      const minutesDifference = Math.floor(timeDifference / (1000 * 60));
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
      setdate(timeAgo);
    }
  }, [isLoading])

  const deleteItem = async () => {
    const result = confirm("정말 삭제하시겠습니까?");
    if (result) {
      await deleteDoc(doc(db, "community", paramsId));
      setIsDetailClicked(false);
      router.push("/community");
    } else {
      return;
    }
  };

  useOnclickOutside(ref, () => {
    setIsDetailClicked(false);
  })
  if (!communityItem?.exists()) return <div>
    <div className="w-full h-[20px] bg-[#222]" />
    <div className="w-full max-w-[1200px] h-[679px] mx-auto px-8 rounded-lg flex items-center justify-center bg-white  max-[1200px]:block ">
      <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-t from-[#D1B383] to-white flex justify-center items-center animate-spin">
        <div className="w-[65px] h-[65px] rounded-full bg-white"></div>
      </div>
    </div>
  </div>
  return (
    <>
      <div className="w-full h-[20px] bg-[#222]" />
      <div className="w-full max-w-[1200px] mx-auto rounded-lg bg-white ">
        <div className="w-full max-w-[1200px] mx-auto px-8 rounded-lg bg-white flex max-[1200px]:block justify-center items-start relative">
          <div className="w-[720px] max-[1200px]:w-full">
            <div className="text-[26px] font-bold">
              <div className="h-10" />
              <p>{communityItem?.data().title}</p>
            </div>
            <div className="mt-3">
              <p>{communityItem?.data().nickname.substring(0, 1) + "*".repeat(Math.max(communityItem?.data().nickname.length - 1, 0))}</p>
            </div>
            <div className="flex justify-between items-center pb-10">
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                <IoMdTime className="mr-1" />
                <p>{date}</p>
                <div className="ml-2 flex items-center">
                  <BsEye className="text-sm mr-1" />
                  <p>1000</p>
                </div>
              </div>
              {token && data?.data.nickname === communityItem?.data().nickname ?
                <div className="relative">
                  <div className="cursor-pointer" onClick={() => setIsDetailClicked(!isDetailClicked)} >
                    <SlOptions className="text-sm" />
                  </div>
                  {isDetailClicked &&
                    <div className="border w-[100px] absolute rounded-lg left-1/2 transform -translate-x-1/2" ref={ref} >
                      <ul className="w-full flex flex-col items-center bg-white leading-10">
                        <Link href={`/communityInsert/update=${paramsId}`} className="w-full">
                          <OptionButton title={'수정하기'} />
                        </Link>
                        <OptionButton title={'삭제'} onClick={deleteItem} />
                      </ul>
                    </div>
                  }
                </div>
                : null}
            </div>
            <div className="py-10 border-y-[1px]">
              <div className="flex flex-col whitespace-pre-wrap">
                <p>{communityItem?.data().content}</p>
                {communityItem?.data().imageUrl !== '' &&
                  <div className="w-[600px] h-[500px] max-[650px]:w-[360px] max-[650px]:h-[320px] mt-[30px]  rounded-lg overflow-hidden relative">
                    <Image src={communityItem?.data().imageUrl} fill sizes="1" className="object-cover" alt="게시판 이미지" loader={loader} priority unoptimized />
                  </div>}
              </div>
              <div className="mt-[180px] flex justify-end items-center">
                <div className="w-[50px] h-[50px] rounded-full mx-3 relative cursor-pointer">
                  <Image src={'/images/sns1.png'} fill sizes="1" alt="sns이미지" />
                </div>
                <div className="w-[50px] h-[50px] rounded-full mx-3 relative cursor-pointer">
                  <Image src={'/images/sns2.png'} fill sizes="1" alt="sns이미지" />
                </div>
                <div className="w-[50px] h-[50px] rounded-full mx-3 relative cursor-pointer">
                  <Image src={'/images/sns3.png'} fill sizes="1" alt="sns이미지" />
                </div>
                <div className="w-[55px] h-[55px] rounded-full mx-3 relative border cursor-pointer overflow-hidden">
                  <Image src={'/images/sns4.png'} fill sizes="1" alt="sns이미지" />
                </div>
              </div>
            </div>
            <ReplyInsert replyData={replyData} data={data?.data.nickname} paramsId={paramsId} />
            <ReplyList replyData={replyData} detailNickname={communityItem?.data().nickname} myNickname={data?.data.nickname} paramsId={paramsId} />
          </div>
          <List />
          <div className="max-[1200px]:h-10" />
        </div>
        <div className="m-4 px-4">
          <Link href="/community">
            <button className="w-[80px] h-[35px] bg-[#D1B383] text-white rounded-lg">목록</button>
          </Link>
          <div className="h-10" />
        </div>
      </div>
    </>
  )
}

export default DetailForm