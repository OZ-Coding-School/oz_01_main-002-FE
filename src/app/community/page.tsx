'use client';

import CardForm from "@/components/community/CardForm";
import { db } from "@/firebase";
import { useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

const Community = () => {
  const [communityList, setCommunityList] = useState<any>([]);
  const [token, setToken] = useState<string | null>(null);
  console.log('token', token);
  const queryClient = useQueryClient();
  async function getItemsData() {
    const q = query(collection(db, "community"), orderBy("date", "desc"));
    const getData = await getDocs(q);
    if (getData.docs.length === 0) {
      queryClient.invalidateQueries({ queryKey: ['communityDetail'] });
    } else {
      setCommunityList(getData.docs.map((doc) => doc.data()));
    }
  }

  useEffect(() => {
    getItemsData();
    setToken(localStorage.getItem('access_token'));
    console.log('communityList', communityList);
  }, [])

  return (
    <>
      <div className="w-full h-[20px] bg-[#222]" />
      <div className="w-full max-w-[1200px] h-[1000px] mx-auto box-border overflow-auto scrollbar-hide bg-white rounded-lg px-4 max-[1215px]:max-w-[900px] max-[920px]:max-w-[600px]">
        <div className="text-3xl font-semibold">
          <div className="h-10" />
          <p>커뮤니티</p>
        </div>
        <div className="border-2  my-2" />
        <div className="w-full flex items-center flex-wrap max-[1215px]:justify-center py-4">
          {communityList.map((item: any) => (
            <CardForm key={item.id} item={item} />
          ))}
        </div>
      </div>
      {token &&
        <Link href={'/communityInsert/insert'}>
          <div className="fixed bottom-16 right-40 w-[80px] h-[80px] max-[1535px]:h-[40px] z-40 flex border border-[#D1B383] justify-center items-center hover:scale-105 hover:bg-white hover:text-[#D1B383] rounded-full bg-[#D1B383] text-white transition-all duration-[0.3s] ease-out">글쓰기</div>
        </Link>
      }
    </>
  )
}

export default Community