import { db } from "@/firebase";
import { useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

const List = () => {
  const [communityList, setCommunityList] = useState<any>([]);
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
    console.log('communityList', communityList);
  }, [])

  return (
    <div className="ml-[50px] max-[1200px]:ml-0 sticky max-[1200px]:static top-[55px] h-fit">
      <div className="h-10 max-[1200px]:h-0" />
      <div className="w-[360px] max-[1200px]:w-full border rounded-lg p-5">
        <p className="text-xl font-bold">게시물 목록</p>
        <div className="w-full mt-3 text-lg border-t pt-3">
          {communityList.map((item: any) => (
            <Link key={item.id} href={`/community/detail/${item.id}`}>
              <div className="flex items-center cursor-pointer">
                <p className="text-[red] text-2xl font-bold">·</p>
                <p className="line-clamp-1 ml-2 text-ellipsis">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default List