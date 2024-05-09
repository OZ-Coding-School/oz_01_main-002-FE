'use client';

import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useOnclickOutside, useOnclickOutside2 } from "../_hooks/useOnClickOutSide";

interface Option {
  value: string;
  label: string;
}

const ProductInsert = () => {
  const [images, setImages] = useState<string[]>([]);
  const [postImages, setPostImages] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const [categoryName, setCategoryName] = useState<string>('카테고리');
  const [dateName, setDateName] = useState<string>('기간 선택');
  const imageIndex = [0, 1, 2];
  const [isClicked, setIsClicked] = useState(false);
  const [isDateClicked, setIsDateClicked] = useState(false);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [productItem, setProductItem] = useState({
    title: '',
    category: 0,
    min_price: 0,
    description: '',
    date: 0,
  })
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

  const handleDelete = (index: number) => {
    setImages(prevImages => prevImages.filter((image, i) => i !== index));
    setPostImages(prevImages => prevImages.filter((image, i) => i !== index));
  }
  const categoryOptions = [
    { value: 1, label: '신발' },
    { value: 2, label: '옷' },
    { value: 3, label: '가방' },
    { value: 4, label: '전자기기' },
  ];

  const handleCategorySelect = (e: any) => {
    setProductItem({
      ...productItem,
      category: e.value
    })

    console.log(e.value);
  };

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

  const handleDateSelect = (e: any) => {
    setProductItem({
      ...productItem,
      date: e.value
    })
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      alert('이미지를 등록해주세요');
      return;
    }
    if (productItem.title === '') {
      alert('상품명을 입력해주세요');
      return;
    }
    if (productItem.category === 0) {
      alert('카테고리를 선택해주세요');
      return;
    }
    if (productItem.min_price === 0) {
      alert('시작가를 입력해주세요');
      return;
    }
    if (productItem.description === '') {
      alert('상품 설명을 입력해주세요');
      return;
    }

    const formData = new FormData();
    formData.append('title', productItem.title);
    formData.append('category', productItem.category.toString());
    formData.append('min_price', productItem.min_price.toString());
    formData.append('description', productItem.description);
    formData.append('date', productItem.date.toString());
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
  }

  useOnclickOutside(ref, () => {
    setIsClicked(false);
  });

  useOnclickOutside2(ref2, () => {
    setIsDateClicked(false);
  });

  console.log(productItem);
  return (
    <div className="w-full max-w-[870px] my-0 mx-auto">
      <div className="text-center my-10">
        <p className="text-4xl">물품 등록</p>
      </div>
      <div className="flex justify-center">
        {imageIndex.map(index => (
          <div key={index}>
            {!images[index] ? <div className="w-[250px] h-[250px] flex justify-center items-center rounded-xl border cursor-pointer m-5" onClick={() => handleClick()}>
              <FaCamera className="w-[50px] h-[50px] opacity-50" />
            </div> :
              <div className="relative">
                <button className="absolute w-[60px] h-[30px] bottom-3 right-8 rounded-lg bg-[#ff00009c] text-white" onClick={() => handleDelete(index)}>삭제</button>
                <Image src={images[index]} alt="이미지" width={250} height={250} className="w-[250px] h-[250px] m-5 rounded-xl border object-cover" />
              </div>
            }
          </div>
        ))}
        <input type="file" id="image_file" ref={fileInput} multiple accept="image/*" className="hidden" onChange={(e) => handleImages(e)} />
      </div>
      <div className=" mx-5 mt-8">
        <div className="flex items-center">
          <label htmlFor="title" className="text-nowrap  mr-9">상품명</label>
          <input type="text" id="title" className="w-[430px] h-[50px] border rounded-xl pl-2 outline-[#000]" onChange={(e) => setProductItem({
            ...productItem,
            title: e.target.value
          })} />
        </div>
      </div>
      <div className="mx-5 mt-8 flex items-center">
        <label className="ext-nowrap mr-6">카테고리</label>
        <div className="w-[250px] h-[50px] flex items-center cursor-pointer justify-center rounded-xl border text-center relative" onClick={() => setIsClicked(!isClicked)}>
          {categoryName}
          {isClicked ? <ul className="bg-white absolute border w-[250px] z-10 top-[50px] rounded-xl" ref={ref}>
            {categoryOptions.map((category, index) => (
              <li key={index} className={`w-full box-border hover:bg-[gray] hover:text-white text-lg border-b leading-10 flex items-center justify-center first:rounded-t-xl last:rounded-b-xl cursor-pointer `} onClick={() => {
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
      <div className="flex items-center mx-5 mt-8">
        <label htmlFor="min_price" className="text-nowrap mr-9">시작가</label>
        <input type="number" id="min_price" className="w-[430px] h-[50px] border rounded-xl pl-2 input_number_arrow_none outline-[#000]" placeholder="시작가" onChange={(e) => setProductItem({
          ...productItem,
          min_price: parseInt(e.target.value)
        })} />
      </div>
      <div className="flex mx-5 mt-8 items-center">
        <label className="text-nowrap mr-4">경매 기간</label>
        <div className="w-[250px] h-[50px] cursor-pointer flex items-center justify-center rounded-xl border text-center relative" onClick={() => setIsDateClicked(!isDateClicked)}>
          {dateName}
          {isDateClicked ? <ul className="bg-white absolute border w-[250px] top-[50px] h-[200px] overflow-auto rounded-xl" ref={ref2}>
            {dateOptions.map((date, index) => (
              <li key={index} className={`w-full box-border hover:bg-[gray] hover:text-white text-lg border-b leading-10 flex items-center justify-center first:rounded-t-xl last:rounded-b-xl cursor-pointer `} onClick={() => {
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
        <label htmlFor="description" className="block mx-5 mt-8">상품 설명</label>
        <textarea id="description" className="w-[830px] h-[200px] border rounded-xl p-3 resize-none mx-5 mt-2 px-2 outline-[#000]" onChange={(e) => setProductItem({
          ...productItem,
          description: e.target.value
        })} />
      </div>
      <div className="text-center py-10">
        <button className="w-[200px] h-[50px] border rounded-xl" onClick={() => handleSubmit()}>등록</button>
      </div>
    </div>
  )
}

export default ProductInsert