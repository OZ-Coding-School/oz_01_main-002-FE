import InsertForm from "@/components/community/Insert/InsertForm";
import { db } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function generateStaticParams() {
  let data: { id: any }[] = [];
  const q = query(collection(db, "community"), orderBy("date", "desc"));
  const getData = await getDocs(q);
  if (getData.docs.length > 0) {
    data = getData.docs.map((doc) => ({ id: `update=${doc.data().id}` }));
  }
  data.push({ id: "insert" });

  return data;
}

const CommunityInsert = ({ params }: { params: { id: string } }) => {
  const paramsId = params.id;

  return (
    <>
      <InsertForm paramsId={paramsId} />
    </>
  )
}

export default CommunityInsert