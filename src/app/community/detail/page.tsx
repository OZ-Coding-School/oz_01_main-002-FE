'use client';

import DetailForm from "@/components/community/Detail/DetailForm";
import { db } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useSearchParams } from "next/navigation";

// export async function generateStaticParams() {
//   let data: { id: any }[] = [];
//   const q = query(collection(db, "community"), orderBy("date", "desc"));
//   const getData = await getDocs(q);

//   if (getData.docs.length > 0) {
//     data = getData.docs.map((doc) => ({ id: doc.data().id }));
//   }

//   return data;
// }


const CommunityDetail = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const paramsId = searchParams.get('id')!;

  return (
    <DetailForm paramsId={paramsId} />
  )
}
export default CommunityDetail