'use client';

import { useGetCategories, usePostProduct } from "@/api/productApi";
import { useOnclickOutside, useOnclickOutside2 } from "@/hooks/useOnClickOutSide";
import { ProductInsertType1 } from "@/type/ProductType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const ProductInsert = ({ params }: { params: { id: string } }) => {
  const [images, setImages] = useState<string[]>([]);
  const [postImages, setPostImages] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const [categoryName, setCategoryName] = useState<string>('카테고리');
  const [dateName, setDateName] = useState<string>('기간 선택');
  const imageIndex = [0, 1, 2];
  const [isClicked, setIsClicked] = useState(false);
  const [isDateClicked, setIsDateClicked] = useState(false);
  const userPostProduct = usePostProduct();
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

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (!files) {
      return;
    }
    if (images.length + files.length > 3) {
      alert('이미지는 최대 3개까지 선택할 수 있습니다.');
      return;
    }
    setPostImages(prevImages => [...prevImages, ...Array.from(files).slice(0, 3 - images.length)]);
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const file = files[i];

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setImages(prevImages => [...prevImages, result]);
        }
      };
    }
  }

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

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0 || e.target.value.length !== 0) {
      setError({
        ...error,
        title: ''
      })
    }
    setProductItem({
      ...productItem,
      name: e.target.value
    })
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

  const handleError = () => {
    const titleRegex = /[^ㄱ-ㅎ가-힣a-zA-Z0-9\s]/;

    if (images.length === 0) {
      alert('이미지를 등록해주세요');
      return true;
    }

    if (productItem.category_id === 0) {
      alert('카테고리를 선택해주세요');
      return true;
    }

    if (titleRegex.test(productItem.name)) {
      setError({
        ...error,
        title: '특수문자는 사용할 수 없습니다'
      })
      return true;
    }

    if (productItem.name.length <= 2) {
      setError({
        ...error,
        title: '제목은 2글자 이상 입력해주세요',
      })
      return true;
    }

    if (productItem.bid_price === 0) {
      setError({
        ...error,
        min_price: '시작가를 입력해주세요'
      })
      return true;
    }

    if (Number(productItem.bid_price) < 50000) {
      setError({
        ...error,
        min_price: '시작가는 50,000원 이상 입력해주세요'
      })
      return true;
    }


    if (productItem.duration === 0) {
      alert('경매기간을 선택해주세요');
      return true;
    }

    if (productItem.content === '') {
      setError({
        ...error,
        content: '내용을 입력해주세요'
      })
      return true;
    }

    if (productItem.content.length < 6) {
      setError({
        ...error,
        content: '내용은 6글자 이상 입력해주세요',
      })
      return true;
    }
    return false;
  }
  const handlePostProduct = () => {
    const error = handleError();
    if (error) return;
    const formData = new FormData();
    formData.append('name', productItem.name);
    formData.append('category_id', productItem.category_id.toString());
    formData.append('bid_price', productItem.bid_price.toString());
    formData.append('content', productItem.content);
    formData.append('status', productItem.status);
    formData.append('modify', productItem.modify.toString());
    formData.append('duration', productItem.duration.toString());
    formData.append('grade', productItem.grade);
    if (postImages[0]) {
      formData.append('file1', postImages[0]);
    }
    if (postImages[1]) {
      formData.append('file2', postImages[1]);
    }
    if (postImages[2]) {
      formData.append('file3', postImages[2]);
    }

    userPostProduct(formData, {
      onSuccess: () => {
        alert('상품이 등록되었습니다');
        router.push('/myPage/myProducts');
      }
    });
  }


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
          <p className="text-white text-[40px] leading-none">물품 등록</p>
        </div>
        <div className="w-full max-[885px]:max-w-[600px] max-[620px]:max-w-[370px] mx-auto flex justify-center max-[855px]:flex-wrap">
          {imageIndex.map(index => (
            <div key={index}>
              {!images[index] ? <div className="w-[250px] h-[250px] max-[885px]:w-[150px] max-[885px]:h-[150px] max-[620px]:w-[310px] max-[620px]:h-[100px] flex justify-center items-center border-[#D1B383] rounded-xl border cursor-pointer m-5 max-[620px]:m-1" onClick={() => handleClick()}>
                <FaCamera className="w-[50px] h-[50px] opacity-50 text-[#D1B383]" />
              </div> :
                <div className="relative w-[250px] h-[250px] max-[885px]:w-[150px] max-[885px]:h-[150px] max-[620px]:w-[310px] max-[620px]:h-[100px]  m-5 max-[620px]:m-1 rounded-xl border overflow-hidden">
                  <button className="absolute w-[60px] h-[30px] bottom-3 max-[620px]:bottom-1 right-3 max-[885px]:right-3  max-[620px]:right-1 rounded-lg bg-[#ff00009c] z-10 text-white" onClick={() => handleImageDelete(index)}>삭제</button>
                  <Image src={images[index] ? images[index] : '/images/no_image.png'} alt="이미지" fill sizes="1" className="object-cover" priority />
                </div>
              }
            </div>
          ))}
          <input type="file" id="image_file" ref={fileInput} multiple accept="image/*" className="hidden" onChange={(e) => handleImages(e)} />
        </div>
        <div className="w-full max-[885px]:max-w-[600px] max-[620px]:max-w-[350px] mx-auto">
          <div className="mx-5 mt-8 flex items-center text-white max-[620px]:justify-center">
            <div className={`w-[259px] h-[72px] flex items-center px-4 cursor-pointer justify-between rounded-xl border text-center relative ${isClicked ? 'border-white' : 'border-[#D1B383]'}`} onClick={() => handleCategoriesClick()}>
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
              <input type="text" id="title" value={productItem.name} className="w-[518px] max-[620px]:w-[350px] h-[72px] border rounded-xl pl-4 text-white focus:border-white outline-none border-[#D1B383] bg-[#222]" onChange={(e) => handleTitle(e)} placeholder="상품명" />
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
          <div className="text-center py-10">
            <button
              className="w-[518px] h-[72px] bg-[#D1B383] max-[620px]:w-[350px] text-white text-[20px] rounded-xl"
              onClick={
                () =>
                  handlePostProduct()
                // handleSubmit()
              }>등록</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInsert