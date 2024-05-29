import { AuctionProductDetailType, AuctionStatusType, ProductInsertType1, UpdateProductType, WinnerPostType } from "@/type/ProductType";
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
    },
    onError: (error) => {
      console.log('상품 등록 실패', error);
    }
  })
  return mutation.mutate;
}

export const useGetAuctionProducts = () => {
  const queryFn = () => apiClient.get('/api/v1/auctions/');
  const query = useQuery({ queryKey: ['auctionProducts'], queryFn, enabled: false });
  return query;
}

export const useGetAuctionProductsCategories = (categoryId: string) => {
  const queryFn = () => apiClient.get(`/api/v1/auctions/categories/${categoryId}`);
  const query = useQuery({ queryKey: ['useGetAuctionProducts1', categoryId], queryFn, enabled: false });
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
    },
    onError: (error) => {
      console.log('낙찰 실패', error);
    }
  });
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutationFn = (updateData: UpdateProductType) => apiClient.put(`/api/v1/products/${updateData.id}`, updateData.updateData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  return useMutation({
    mutationFn, onSuccess: (data) => {
      alert('상품이 등록(수정)되었습니다.');
      router.push('/');
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
      router.push('/');
    },
    onError: (error) => {
      console.log('상품 삭제 실패', error);
    }
  });
}

export const useAuctionPutStatus = () => {
  const mutationFn = (finalData: AuctionStatusType) => apiClient.put(`/api/v1/auctions/${finalData.auctionId}`, {
    status: finalData.status,
    is_active: finalData.isActive
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  return useMutation({
    mutationFn, onSuccess: (data) => {
    },
    onError: (error) => {
      console.log('경매 상태 변경 실패', error);
    }
  });

}

export const useGetWinnerUser = (productId: string | undefined) => {
  const queryFn = () => apiClient.get(`/api/v1/winners/${productId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  return useQuery({ queryKey: ['winnerUser'], queryFn, enabled: false });
}