import { db } from "@/firebase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";

export const useGetCommunity = (communityId: string) => {
  const queryFn = () => getDoc(doc(db, "community", communityId));
  return useQuery({ queryKey: [communityId, 'communityDetail'], queryFn, enabled: false });
}

export const useGetCommunityReply = (communityId: string) => {
  const queryClient = useQueryClient();
  const queryFn = async () => {
    const communityDetail = collection(db, 'community', communityId, 'reply');
    const replyData = query(communityDetail, orderBy('date', 'desc'));
    const snapshot = await getDocs(replyData);
    let replyList: any = [];
    snapshot.forEach((doc) => {
      replyList.push(doc.data());
    });
    return replyList;
  };
  const queryOptions = {
    staleTime: Infinity,
    cacheTime: Infinity,
  };
  const queryResult = useQuery({ queryKey: [communityId, 'communityReply'], queryFn, ...queryOptions });
  useEffect(() => {
    const communityDetail = collection(db, 'community', communityId, 'reply');
    const replyData = query(communityDetail, orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(replyData, (snapshot) => {
      let replyList: any = [];
      snapshot.forEach((doc) => {
        replyList.push(doc.data());
      });
      queryClient.setQueryData([communityId, 'communityReply'], replyList);
    });

    return () => unsubscribe();
  }, [communityId, queryClient]);

  return queryResult;
}
