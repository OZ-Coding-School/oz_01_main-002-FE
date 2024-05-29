import { useMutation } from "@tanstack/react-query";
import apiClient from "./baseApi";

export const useChatRoom = () => {
  const mutationFn = (chatData: ChatType) => apiClient.post('/api/v1/chat/register_to_room/', chatData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  return useMutation({
    mutationFn, onSuccess: (data) => {
    },
    onError: (error) => {
      console.log('상품 등록 실패', error);
    }
  });
}