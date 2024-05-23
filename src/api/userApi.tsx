import { SignUpUser } from "@/type/UserType";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import apiClient from "./baseApi";

export const useSignUpUser = () => {
  const router = useRouter();
  const mutationFn = (userData: SignUpUser) => apiClient.post('/api/v1/users/', userData);
  const mutation = useMutation({
    mutationFn, onSuccess: (data) => {
      console.log('여기 맞지?', data);
      alert('회원가입이 완료되었습니다.');
      router.push('/login');
    },
    onError: (error) => {
      console.log('에러당', error);
    }
  });
  return mutation.mutate;
}

