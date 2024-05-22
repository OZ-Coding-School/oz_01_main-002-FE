'use client';

import { useOnclickOutside, useOnclickOutside2 } from "@/hooks/useOnClickOutSide";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const ProductInsert = () => {
  const [images, setImages] = useState<string[]>([]);
  const [postImages, setPostImages] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const [categoryName, setCategoryName] = useState<string>('카테고리');
  const [dateName, setDateName] = useState<string>('기간 선택');
  const imageIndex = [0, 1, 2];
  const [isClicked, setIsClicked] = useState(false);
  const [isDateClicked, setIsDateClicked] = useState(false);
  const params = useParams();
  console.log('파람스 아이디', params.id);

  const ref = useRef(null);
  const ref2 = useRef(null);
  const [error, setError] = useState({
    title: '',
    min_price: '',
    content: '',
  })
  const [productItem, setProductItem] = useState({
    title: '',
    category: 0,
    min_price: 0,
    content: '',
    date: 0,
    grade: '',
  })

  const grade = [
    { value: 'S' },
    { value: 'A' },
    { value: 'B' },
    { value: 'C' },
    { value: 'D' },
  ]

  useEffect(() => {
    const getRandomGrade = () => {
      const randomIndex = Math.floor(Math.random() * grade.length);
      setProductItem({
        ...productItem,
        grade: grade[randomIndex].value
      })
    }
    getRandomGrade();
  }, [])

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
  const categoryOptions = [
    { value: 1, label: '신발' },
    { value: 2, label: '옷' },
    { value: 3, label: '가방' },
    { value: 4, label: '전자기기' },
  ];

  const dateOptions = [
    { value: 1, label: '3시간' },
    { value: 2, label: '1일' },
    { value: 3, label: '2일' },
    { value: 4, label: '3일' },
    { value: 5, label: '4일' },
    { value: 6, label: '5일' },
    { value: 7, label: '6일' },
    { value: 8, label: '7일' },
  ]

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0 || e.target.value.length !== 0) {
      setError({
        ...error,
        title: ''
      })
    }
    setProductItem({
      ...productItem,
      title: e.target.value
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
        min_price: 0
      })
      return;
    }
    setProductItem({
      ...productItem,
      min_price: parseInt(e.target.value)
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
    const titleRegex = /[^ㄱ-ㅎ가-힣a-zA-Z0-9]/;

    if (images.length === 0) {
      alert('이미지를 등록해주세요');
      return true;
    }

    if (productItem.category === 0) {
      alert('카테고리를 선택해주세요');
      return true;
    }

    if (titleRegex.test(productItem.title)) {
      setError({
        ...error,
        title: '특수문자는 사용할 수 없습니다'
      })
      return true;
    }

    if (productItem.title.length <= 2) {
      setError({
        ...error,
        title: '제목은 2글자 이상 입력해주세요',
      })
      return true;
    }

    if (productItem.min_price === 0) {
      setError({
        ...error,
        min_price: '시작가를 입력해주세요'
      })
      return true;
    }

    if (productItem.min_price < 50000) {
      setError({
        ...error,
        min_price: '시작가는 50,000원 이상 입력해주세요'
      })
      return true;
    }

    if (productItem.date === 0) {
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

  const handleSubmit = async () => {
    try {
      const error = handleError();
      if (error) return;

      const formData = new FormData();
      formData.append('name', productItem.title);
      formData.append('category_id', productItem.category.toString());
      formData.append('bid_price', productItem.min_price.toString());
      formData.append('content', productItem.content);
      formData.append('duration', productItem.date.toString());
      formData.append('grade', productItem.grade);
      formData.append('image', JSON.stringify(images));
      // 이미지 수정해야됨.. 생각해보자
      try {
        const response = await axios.post('', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
    }
  }
  // ============================================= 검수 완료 후 =======================================================//
  const handleFinalSubmit = async () => {
    console.log('최종등록');
  }

  const handleUpdate = async () => {
    console.log('수정');
  }

  const handleDelete = async () => {
    console.log('삭제');
  }
  // ============================================= 검수 완료 후 =======================================================//

  useOnclickOutside(ref, () => {
    setIsClicked(false);
  });

  useOnclickOutside2(ref2, () => {
    setIsDateClicked(false);
  });
  console.log(productItem);
  return (
    <div className="w-full bg-[#222]">
      <div className="w-full max-w-[870px] mx-auto">
        <div className="h-[60px]" />
        <div className="text-center my-10">
          <p className="text-white text-[40px] leading-none">{params.id === '1' ? '물품 등록' : '최종 확인'}</p>
        </div>
        <div className="flex justify-center">
          {imageIndex.map(index => (
            <div key={index}>
              {!images[index] ? <div className="w-[250px] h-[250px] flex justify-center items-center border-[#D1B383] rounded-xl border cursor-pointer m-5" onClick={() => handleClick()}>
                <FaCamera className="w-[50px] h-[50px] opacity-50 text-[#D1B383]" />
              </div> :
                <div className="relative">
                  <button className="absolute w-[60px] h-[30px] bottom-3 right-8 rounded-lg bg-[#ff00009c] text-white" onClick={() => handleImageDelete(index)}>삭제</button>
                  <Image src={images[index]} alt="이미지" width={250} height={250} className="w-[250px] h-[250px] m-5 rounded-xl border object-cover" />
                </div>
              }
            </div>
          ))}
          <input type="file" disabled={params.id === '1' ? false : true} id="image_file" ref={fileInput} multiple accept="image/*" className="hidden" onChange={(e) => handleImages(e)} />
        </div>
        <div className="mx-5 mt-8 flex items-center text-white">
          <div className={`w-[259px] h-[72px] flex items-center px-4 cursor-pointer justify-between rounded-xl border text-center relative ${isClicked ? 'border-white' : 'border-[#D1B383]'}`} onClick={() => params.id === '1' ? setIsClicked(!isClicked) : null}>
            <IoIosArrowDown className="opacity-0" />
            {categoryName}
            <IoIosArrowDown />
            {isClicked ? <ul className="bg-white absolute border w-[259px] z-10 left-0 top-[72px] rounded-xl scrollbar-hide" ref={ref}>
              {categoryOptions.map((category, index) => (
                <li key={index} className={`w-full box-border hover:bg-[#D1B383] text-black hover:text-white text-lg border-b leading-10 flex items-center justify-center first:rounded-t-xl last:border-b-0 last:rounded-b-xl cursor-pointer`} onClick={() => {
                  setProductItem({
                    ...productItem,
                    category: category.value
                  });
                  setCategoryName(category.label);
                  setIsClicked(false);
                }}>{category.label}</li>
              ))}
            </ul> : null}
          </div>
        </div>
        <div className=" mx-5 mt-8">
          <div className="flex items-center">
            <input type="text" id="title" disabled={params.id === '1' ? false : true} className="w-[518px] h-[72px] border rounded-xl pl-4 text-white focus:border-white outline-none border-[#D1B383] bg-[#222]" onChange={(e) => handleTitle(e)} placeholder="상품명" />
          </div>
        </div>
        <div className="mx-5 mt-2 text-red-700">
          {error.title}
        </div>
        <div className="flex items-center mx-5 mt-8">
          <input type="number" id="min_price" className="w-[518px] h-[72px] border-[#D1B383] focus:border-white border rounded-xl pl-4 input_number_arrow_none outline-none bg-[#222] text-white" placeholder="시작가" onChange={(e) => handlePrice(e)} />
        </div>
        <div className="mx-5 mt-2 text-red-700">
          {error.min_price}
        </div>
        <div className="flex mx-5 mt-8 items-center">
          <div className={`w-[259px] h-[72px] cursor-pointer px-4 text-white border-[#D1B383] focus:border-white flex items-center justify-between rounded-xl border text-center relative ${isDateClicked ? 'border-white' : 'border-[#D1B383]'}`} onClick={() => setIsDateClicked(!isDateClicked)}>
            <IoIosArrowDown className="opacity-0" />
            {dateName}
            <IoIosArrowDown />
            {isDateClicked ? <ul className="bg-white absolute border w-[259px] left-0 top-[72px] h-[200px] overflow-auto rounded-xl scrollbar-hide" ref={ref2}>
              {dateOptions.map((date, index) => (
                <li key={index} className={`w-full box-border hover:bg-[#D1B383] text-black hover:text-white text-lg border-b leading-10 flex items-center justify-center first:rounded-t-xl last:rounded-b-xl last:border-b-0 cursor-pointer`} onClick={() => {
                  setProductItem({
                    ...productItem,
                    date: date.value
                  });
                  setDateName(date.label);
                  setIsDateClicked(false);
                }}>{date.label}</li>
              ))}
            </ul> : null}
          </div>
        </div>
        <div>
          <textarea className="w-[830px] bg-[#222]  text-white h-[200px] border rounded-xl p-4 resize-none mx-5 mt-8 px-2 outline-none border-[#D1B383] focus:border-white" onChange={(e) => handleContent(e)} placeholder={`상품등급: 자신이 생각하는 등급(검수 후 반영여부 결정)\n상품설명:\n`} />
        </div>
        <div className="mx-5 mt-2 text-red-700">
          {error.content}
        </div>
        {params.id === '1' ? <div className="text-center py-10">
          <button className="w-[518px] h-[72px] bg-[#D1B383] text-white text-[20px] rounded-xl" onClick={() => handleSubmit()}>등록</button>
        </div>
          :
          <div className="flex justify-center items-center py-10">
            <button className="w-[200px] mx-2 h-[72px] bg-[#D1B383] text-white text-[20px] rounded-xl" onClick={() => handleFinalSubmit()}>등록</button>
            <button className="w-[200px] mx-2 h-[72px] bg-[#D1B383] text-white text-[20px] rounded-xl" onClick={() => handleUpdate()}>수정</button>
            <button className="w-[200px] mx-2 h-[72px] bg-red-700 text-white text-[20px] rounded-xl" onClick={() => handleDelete()}>삭제</button>
          </div>}
      </div>
    </div>
  )
}

export default ProductInsert