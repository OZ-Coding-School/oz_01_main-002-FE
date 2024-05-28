import { AuctionProductDetailType, ProductInsertType1, UpdateProductType, WinnerPostType } from "@/type/ProductType";
import { QueryFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import apiClient from "./baseApi";

export const usePostProduct = () => {
  const mutationFn = (postData: ProductInsertType1) => apiClient.post('/api/v1/products/', postData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  const mutation = useMutation({
    mutationFn, onSuccess: (data) => {
      console.log('상품 등록 성공', data);
    },
    onError: (error) => {
      console.log('상품 등록 실패', error);
    }
  })
  return mutation.mutate;
}

export const useGetAuctionProducts = () => {
  const queryFn = () => apiClient.get('');
  const query = useQuery({ queryKey: ['auctionProducts'], queryFn });
  return query;
}

export const useGetProduct = (id: number) => {
  const queryFn = () => apiClient.get(`/api/v1/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  return useQuery({ queryKey: ['product', id], queryFn });
}

export const useGetAuctionProductDetail = (auctionId: string) => {
  const queryFn: QueryFunction<AuctionProductDetailType> = () => apiClient.get(`/api/v1/auctions/${auctionId}`)
  return useQuery<AuctionProductDetailType>({ queryKey: ['auctionProductDetail', auctionId], queryFn });
}

export const usePostWinner = () => {
  const mutationFn = (winnerData: WinnerPostType) => apiClient.post('/api/v1/winners/', winnerData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  return useMutation({
    mutationFn, onSuccess: (data) => {
      console.log('낙찰 성공', data);
    },
    onError: (error) => {
      console.log('낙찰 실패', error);
    }
  });
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = (updateData: UpdateProductType) => apiClient.put(`/api/v1/products/${updateData.id}`, updateData.updateData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  return useMutation({
    mutationFn, onSuccess: (data) => {
      console.log('상품 업데이트 성공', data);
      alert('상품이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['userProducts'] });
    },
    onError: (error) => {
      console.log('상품 업데이트 실패', error);
    }
  });
}

export const useUserProducts = () => {
  const queryFn = () => apiClient.get('/api/v1/products/user/', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  return useQuery({ queryKey: ['userProducts'], queryFn });
}

export const useProductInspection = () => {
  const mutationFn = (inspectionData: any) => apiClient.post('/api/v1/inspection/', inspectionData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  return useMutation({
    mutationFn, onSuccess: (data) => {
      console.log('상품 검수 성공', data);
    },
    onError: (error) => {
      console.log('상품 검수 실패', error);
    }
  });
}

export const useDeleteProduct = () => {
  const router = useRouter();
  const mutationFn = (productId: number) => apiClient.delete(`/api/v1/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  return useMutation({
    mutationFn, onSuccess: (data) => {
      console.log('상품 삭제 성공', data);
      router.push('/');
    },
    onError: (error) => {
      console.log('상품 삭제 실패', error);
    }
  });
}
