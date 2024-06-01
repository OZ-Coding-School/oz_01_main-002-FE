'use client';

import apiClient from "@/api/baseApi";
import { useDeleteProduct, useGetCategories, useUpdateProduct } from "@/api/productApi";
import InsertButton from "@/components/productInsert/InsertButton";
import { useOnclickOutside, useOnclickOutside2 } from "@/hooks/useOnClickOutSide";
import { useProductIdStore } from "@/store";
import { ProductInsertType1 } from "@/type/ProductType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const ProductUpdate = ({ params }: { params: { id: string } }) => {
  const [images, setImages] = useState<string[]>([]);
  const [postImages, setPostImages] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const [categoryName, setCategoryName] = useState<string>('카테고리');
  const [dateName, setDateName] = useState<string>('기간 선택');
  const imageIndex = [0, 1, 2];
  const [isClicked, setIsClicked] = useState(false);
  const [isDateClicked, setIsDateClicked] = useState(false);
  const { mutate: userUpdateProduct } = useUpdateProduct();
  const { productId } = useProductIdStore();
  const { mutate: userDeleteProduct } = useDeleteProduct();
  const [categories, setCategories] = useState([]);
  const { data: categoriesData, refetch: categoriesRefetch } = useGetCategories();
  const router = useRouter();
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [error, setError] = useState({
    title: '',
    min_price: '',
    content: '',
  })
  const [productItem, setProductItem] = useState<ProductInsertType1>({
    name: '',
    content: '',
    bid_price: '',
    category_id: 0,
    duration: 0,
    status: '검수중',
    grade: '',
    modify: true,
  })

  const grade = [
    { value: 'S' },
    { value: 'A' },
    { value: 'B' },
    { value: 'C' },
    { value: 'D' },
  ]

  const dateOptions = [
    { value: 1, label: '1일' },
    { value: 2, label: '2일' },
    { value: 3, label: '3일' },
    { value: 4, label: '4일' },
    { value: 5, label: '5일' },
    { value: 6, label: '6일' },
    { value: 7, label: '7일' },
  ]

  const getRandomGrade = () => {
    const randomIndex = Math.floor(Math.random() * grade.length);
    setProductItem({
      ...productItem,
      grade: grade[randomIndex].value
    })
  }
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/login');
    }
    getRandomGrade();
  }, [params.id])

  const handleClick = () => {
    fileInput.current?.click();
  };


  const handleImageDelete = (index: number) => {
    setImages(prevImages => prevImages.filter((image, i) => i !== index));
    setPostImages(prevImages => prevImages.filter((image, i) => i !== index));
  }

  useEffect(() => {
    setCategories(categoriesData?.data);
  }, [categoriesData?.data])

  const handleCategoriesClick = () => {
    setIsClicked(!isClicked);
    categoriesRefetch();
  }

  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0 || e.target.value.length !== 0) {
      setError({
        ...error,
        min_price: ''
      })
    }
    if (e.target.value === '') {
      setProductItem({
        ...productItem,
        bid_price: ''
      })
      return;
    }
    setProductItem({
      ...productItem,
      bid_price: parseInt(e.target.value)
    })
  }

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length === 0 || e.target.value.length !== 0) {
      setError({
        ...error,
        content: ''
      })
    }
    setProductItem({
      ...productItem,
      content: e.target.value
    })
  };


  // ============================================= 검수 완료 후 =======================================================//
  // const { data, isLoading, refetch } = useGetProduct(productId);
  // console.log('데이터', data);

  // useEffect(() => {
  //   if (params.id === '1') return;
  //   if (productId === 0) return;
  //   console.log('productId', productId);
  //   refetch();
  // }, [])

  // useEffect(() => {
  //   if (params.id === '1') return;
  //   if (productId === 0) return;
  //   setProductItem({
  //     name: data?.data.name,
  //     category_id: data?.data.category_id,
  //     bid_price: data?.data.bid_price,
  //     content: data?.data.content,
  //     duration: data?.data.duration,
  //     grade: data?.data.grade,
  //     status: data?.data.status,
  //     modify: data?.data.modify,
  //   })
  //   setImages([data?.data.images[0], data?.data.images[1], data?.data.images[2]]);
  //   setCategoryName(data?.data.category);
  //   switch (data?.data.duration) {
  //     case 1:
  //     case 2: setDateName('1일'); break;
  //     case 3: setDateName('2일'); break;
  //     case 4: setDateName('3일'); break;
  //     case 5: setDateName('4일'); break;
  //     case 6: setDateName('5일'); break;
  //     case 7: setDateName('6일'); break;
  //     case 8: setDateName('7일'); break;
  //     default: setDateName('3시간'); break;
  //   }
  // }, [data])


  const finalProduct = async () => {
    try {
      const response = await apiClient.post('/api/v1/auctions/', {
        product_id: productId,
        charge: 0,
        final_price: productItem.bid_price
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    } catch (error) {
      console.log('최종등록 실패', error);
    }
  }

  const handleGetProduct = async () => {
    try {
      const response = await apiClient.get(`/api/v1/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      switch (response.data.duration) {
        case 1:
        case 2: setDateName('1일'); break;
        case 3: setDateName('2일'); break;
        case 4: setDateName('3일'); break;
        case 5: setDateName('4일'); break;
        case 6: setDateName('5일'); break;
        case 7: setDateName('6일'); break;
        case 8: setDateName('7일'); break;
        default: setDateName('기간 선택'); break;
      }
      setCategoryName(response.data.category);
      setImages([response.data.images[0], response.data.images[1], response.data.images[2]]);
      setProductItem({
        name: response.data.name,
        category_id: response.data.category_id,
        bid_price: response.data.bid_price,
        content: response.data.content,
        duration: response.data.duration,
        grade: response.data.grade,
        status: response.data.status,
        modify: response.data.modify,
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (productId === 0) return;
    handleGetProduct();
  }, [productId])


  const handleUpdate = async (id: number) => {
    userUpdateProduct({
      id: id,
      updateData: {
        content: productItem.content,
        bid_price: productItem.bid_price,
        duration: productItem.duration,
        status: '경매중',
      }
    }, {
      onSuccess: () => {
        finalProduct();
      }
    })
  }

  const handleDelete = async (id: number) => {
    const deleteItem = confirm('정말 삭제하시겠습니까?');
    if (deleteItem) {
      userDeleteProduct(id);
    }
  }
  // ============================================= 검수 완료 후 =======================================================//

  useOnclickOutside(ref, () => {
    setIsClicked(false);
  });

  useOnclickOutside2(ref2, () => {
    setIsDateClicked(false);
  });
  return (
    <div className="w-full bg-[#222]">
      <div className="w-full max-w-[870px] max-[855px]:max-w-[600px] mx-auto">
        <div className="h-[60px]" />
        <div className="text-center my-10">
          <p className="text-white text-[40px] leading-none">최종 확인(수정)</p>
        </div>
        <div className="w-full max-[885px]:max-w-[600px] max-[620px]:max-w-[370px] mx-auto flex justify-center max-[855px]:flex-wrap">
          {imageIndex.map(index => (
            <div key={index}>
              {!images[index] ? <div className="w-[250px] h-[250px] max-[885px]:w-[150px] max-[885px]:h-[150px] max-[620px]:w-[310px] max-[620px]:h-[100px] flex justify-center items-center border-[#D1B383] rounded-xl border cursor-pointer m-5 max-[620px]:m-1" onClick={() => handleClick()}>
                <FaCamera className="w-[50px] h-[50px] opacity-50 text-[#D1B383]" />
              </div> :
                <div className="relative w-[250px] h-[250px] max-[885px]:w-[150px] max-[885px]:h-[150px] max-[620px]:w-[310px] max-[620px]:h-[100px]  m-5 max-[620px]:m-1 rounded-xl border overflow-hidden">
                  <Image src={images[index] ? images[index] : '/images/no_image.png'} alt="이미지" fill sizes="1" className="object-cover" priority />
                </div>
              }
            </div>
          ))}
          <input type="file" disabled id="image_file" ref={fileInput} multiple accept="image/*" className="hidden" />
        </div>
        <div className="w-full max-[885px]:max-w-[600px] max-[620px]:max-w-[350px] mx-auto">
          <div className="mx-5 mt-8 flex items-center text-white max-[620px]:justify-center">
            <div className={`w-[259px] h-[72px] flex items-center px-4 cursor-pointer justify-between rounded-xl border text-center relative ${isClicked ? 'border-white' : 'border-[#D1B383]'}`} onClick={() => params.id === '1' ? handleCategoriesClick() : null}>
              <IoIosArrowDown className="opacity-0" />
              {categoryName}
              <IoIosArrowDown />
              {isClicked && categories && <ul className="bg-white absolute border w-[259px] z-10 left-0 top-[72px] rounded-xl scrollbar-hide" ref={ref}>
                {categories.map((category: any, index) => (
                  <li key={index} className={`w-full box-border hover:bg-[#D1B383] text-black hover:text-white text-lg border-b leading-10 flex items-center justify-center first:rounded-t-xl last:border-b-0 last:rounded-b-xl cursor-pointer`} onClick={() => {
                    setProductItem({
                      ...productItem,
                      category_id: category.id
                    });
                    setCategoryName(category.name);
                    setIsClicked(false);
                  }}>{category.name}</li>
                ))}
              </ul>}
            </div>
          </div>
          <div className=" mx-5 mt-8">
            <div className="flex items-center">
              <input type="text" id="title" disabled value={productItem.name} className="w-[518px] max-[620px]:w-[350px] h-[72px] border rounded-xl pl-4 text-white focus:border-white outline-none border-[#D1B383] bg-[#222]" placeholder="상품명" />
            </div>
          </div>
          <div className="mx-5 mt-2 text-red-700">
            {error.title}
          </div>
          <div className="flex items-center mx-5 mt-8">
            <input type="number" id="min_price" value={productItem.bid_price} className="w-[518px] h-[72px] max-[620px]:w-[350px] border-[#D1B383] focus:border-white border rounded-xl pl-4 input_number_arrow_none outline-none bg-[#222] text-white" placeholder="시작가" onChange={(e) => handlePrice(e)} />
          </div>
          <div className="mx-5 mt-2 text-red-700">
            {error.min_price}
          </div>
          <div className="flex mx-5 mt-8 items-center max-[620px]:justify-center">
            <div className={`w-[259px] h-[72px] cursor-pointer px-4 text-white border-[#D1B383] focus:border-white flex items-center justify-between rounded-xl border text-center relative ${isDateClicked ? 'border-white' : 'border-[#D1B383]'}`} onClick={() => setIsDateClicked(!isDateClicked)}>
              <IoIosArrowDown className="opacity-0" />
              {dateName}
              <IoIosArrowDown />
              {isDateClicked ? <ul className="bg-white absolute border w-[259px] left-0 top-[72px] h-[200px] overflow-auto rounded-xl scrollbar-hide" ref={ref2}>
                {dateOptions.map((date, index) => (
                  <li key={index} className={`w-full box-border hover:bg-[#D1B383] text-black hover:text-white text-lg border-b leading-10 flex items-center justify-center first:rounded-t-xl last:rounded-b-xl last:border-b-0 cursor-pointer`} onClick={() => {
                    setProductItem({
                      ...productItem,
                      duration: date.value
                    });
                    setDateName(date.label);
                    setIsDateClicked(false);
                  }}>{date.label}</li>
                ))}
              </ul> : null}
            </div>
          </div>
          <div className="w-[830px]  max-[885px]:w-[600px] max-[620px]:w-[350px] pl-5 max-[620px]:pl-0 max-[855px]:mx-0 mt-8 ">
            <textarea className="w-full bg-[#222] text-white h-[200px] border rounded-xl p-4 resize-none outline-none border-[#D1B383] focus:border-white" value={productItem.content} onChange={(e) => handleContent(e)} placeholder={`상품등급: 자신이 생각하는 등급(검수 후 반영여부 결정)\n상품설명:\n`} />
          </div>
          <div className="mx-5 mt-2 max-[620px]:mx-0 text-red-700">
            {error.content}
          </div>
          <div className="flex justify-center items-center py-10">
            <InsertButton title={'등록'} onClick={() => handleUpdate(productId)} />
            <InsertButton title={'삭제'} onClick={() => handleDelete(productId)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductUpdate