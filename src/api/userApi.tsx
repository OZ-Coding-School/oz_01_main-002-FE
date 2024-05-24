import { AddressInsertType, LoginUser, SignUpUser, UserDataType, updateAddressType, userEmailCheck, userEmailCodeCheck } from "@/type/UserType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import apiClient from "./baseApi";

export const useGetUser = () => {
  const queryFn = () => apiClient.get('/api/v1/users/', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  return useQuery({ queryKey: ['user'], queryFn });
}

export const useUserEmailCheck = () => {
  const mutationFn = (userData: userEmailCheck) => apiClient.post('/api/v1/users/email/send', userData);
  const mutation = useMutation({
    mutationFn, onSuccess: (data) => {
      console.log('이메일 코드', data);
      alert('이메일 코드가 발송되었습니다.');
    },
    onError: (error) => {
      console.log('이메일 코드 보내기 실패', error);
    }
  });
  return mutation.mutate;
}

export const useUserEmailCodeCheck = () => {
  const mutationFn = (userData: userEmailCodeCheck) => apiClient.post('/api/v1/users/email/verify', userData);
  const mutation = useMutation({
    mutationFn, onSuccess: () => {
      alert('인증이 완료되었습니다.');
    },
    onError: (error) => {
      console.log('이메일 코드 보내기 실패', error);
    }
  });
  return mutation.mutate;
}

export const useUserNicknameCheck = () => {
  const mutationFn = (userData: { nickname: string }) => apiClient.post('/api/v1/users/nickname/verify', userData);
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      alert('사용 가능한 닉네임입니다.');
    },
    onError: (error: any) => {
      console.log('닉네임 중복 확인 실패', error);
      if (error.response.data.detail === 'Bad Request - Nickname already registered') {
        alert('이미 사용 중인 닉네임입니다.');
      } else if (error.response.data.detail === 'Bad Request - Nickname must string') {
        alert('닉네임은 문자열 또는 문자와 숫자를 함께 입력해주세요.');
      }
    }
  });
  return mutation.mutate;
}

export const useUserPhoneCheck = () => {
  const mutationFn = (userData: { contact: string }) => apiClient.post('/api/v1/users/contact/verify', userData);
  const mutation = useMutation({
    mutationFn, onSuccess: () => {
      alert('사용 가능한 연락처입니다.');
    },
    onError: (error) => {
      console.log('전화번호 인증번호 발송 실패', error);
    }
  });
  return mutation.mutate;

}

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
      console.log('회원가입 실패', error);
    }
  });
  return mutation.mutate;
}

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutationFn = (userData: LoginUser) => apiClient.post('/api/v1/users/login', userData);
  const mutation = useMutation({
    mutationFn, onSuccess: (data) => {
      console.log('로그인 성공', data);
      router.push('/');
      localStorage.setItem('access_token', data.data.access_token);
      localStorage.setItem('user_id', data.data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.log('로그인 실패', error);
    }
  })
  return mutation.mutate;
}

export const usePutUserUpdate = () => {
  const mutationFn = (userData: UserDataType) => apiClient.put('/api/v1/users/', userData, {
    headers: {
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  return useMutation({
    mutationFn, onSuccess: (data) => {
      console.log('유저 정보 수정 성공', data);
    },
    onError: (error) => {
      console.log('유저 정보 수정 실패', error);
    }
  });
}

export const usePostUserAddress = () => {
  const mutationFn = (addressData: AddressInsertType) => apiClient.post('/api/v1/address/', addressData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  const mutation = useMutation({
    mutationFn, onSuccess: (data) => {
      console.log('주소 저장 성공', data);
      alert('주소가 저장되었습니다.');
    },
    onError: (error) => {
      console.log('주소 저장 실패', error);
    }
  });
  return mutation.mutate;
}

export const useGetUserAddress = () => {
  const queryFn = () => apiClient.get('/api/v1/address/', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const userAddress = useQuery({ queryKey: ['userAddress'], queryFn });
  return userAddress;
}

export const useUpdateUserAddress = () => {
  const mutationFn = (updateData: updateAddressType) => apiClient.put(`/api/v1/address/${updateData.id}`, {
    is_main: updateData.is_main
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  const mutation = useMutation({
    mutationFn, onSuccess: (data) => {
      console.log('주소 업데이트 성공', data);
    },
    onError: (error) => {
      console.log('주소 업데이트 실패', error);
    }
  });
  return mutation.mutate;
}

export const useDeleteUserAddress = () => {
  const mutationFn = (id: number) => apiClient.delete(`/api/v1/address/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  const mutation = useMutation({
    mutationFn, onSuccess: (data) => {
      console.log('주소 삭제 성공', data);
    },
    onError: (error) => {
      console.log('주소 삭제 실패', error);
    }
  });
  return mutation.mutate;
}

export const useRefreshToken = () => {
  const mutationFn = () => apiClient.post('/api/v1/users/refresh', {
    token_type: 'Bearer',
  });
  const mutation = useMutation({
    mutationFn, onSuccess: (data) => {
      console.log('토큰 리프레시 성공', data);
      localStorage.setItem('access_token', data.data.access);
    },
    onError: (error) => {
      console.log('토큰 리프레시 실패', error);
    }
  });
  return mutation.mutate;
}

