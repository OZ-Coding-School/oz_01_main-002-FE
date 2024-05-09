'use client';

import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
const ProductInsert = () => {
  const [images, setImages] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInput.current?.click();
  };

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (!files) {
      return;
    }
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
  }

  const handleSubmit = async () => {
    if (images.length === 0) {
      alert('이미지를 등록해주세요');
      return;
    }
  }

  return (
    <div className="w-full max-w-[870px] my-0 mx-auto">
      <div className="text-center my-10">
        <p className="text-4xl">물품 등록</p>
      </div>
      <div className="flex justify-center">
        {!images[0] ? <div className="w-[250px] h-[250px] flex justify-center items-center rounded-xl border cursor-pointer m-5" onClick={() => handleClick()}>
          <FaCamera className="w-[50px] h-[50px] opacity-50" />
        </div> :
          <div className="relative">
            <button className="absolute w-[100px] h-[50px] bottom-10 right-10 border rounded-lg bg-[#d2d2d2]" onClick={() => handleDelete(0)}>버튼</button>
            <Image src={images[0]} alt="이미지" width={250} height={250} className="w-[250px] h-[250px] m-5 rounded-xl border object-cover" />
          </div>
        }
        {!images[1] ? <div className="w-[250px] h-[250px] flex justify-center items-center rounded-xl border cursor-pointer m-5" onClick={() => handleClick()}>
          <FaCamera className="w-[50px] h-[50px] opacity-50" />
        </div> :
          <div className="relative">
            <button className="absolute w-[100px] h-[50px] bottom-10 right-10 border rounded-lg bg-[#d2d2d2]" onClick={() => handleDelete(1)}>버튼</button>
            <Image src={images[1]} alt="이미지" width={250} height={250} className="w-[250px] h-[250px] m-5 rounded-xl border object-cover" />
          </div>}
        {!images[2] ? <div className="w-[250px] h-[250px] flex justify-center items-center rounded-xl border cursor-pointer m-5" onClick={() => handleClick()}>
          <FaCamera className="w-[50px] h-[50px] opacity-50" />
        </div> :
          <div className="relative">
            <button className="absolute w-[100px] h-[50px] bottom-10 right-10 border rounded-lg bg-[#d2d2d2]" onClick={() => handleDelete(2)}>버튼</button>
            <Image src={images[2]} alt="이미지" width={250} height={250} className="w-[250px] h-[250px] m-5 rounded-xl border object-cover" />
          </div>
        }
        <div></div>
        <div></div>
        <input type="file" id="image_file" ref={fileInput} multiple accept="image/*" className="hidden" onChange={(e) => handleImages(e)} />
      </div>
      <div className=" mx-5 mt-8">
        <div className="w-[500px] flex justify-between items-center">
          <label htmlFor="title" className="text-nowrap">상품명</label>
          <input type="text" id="title" className="w-[430px] h-[50px] border rounded-xl pl-2 outline-[#000]" />
        </div>
      </div>
      <div className=" mt-8">
        <label htmlFor="category" className=" mx-5 mt-8">카테고리</label>
        <select className="w-[250px] h-[50px] border  rounded-xl text-center outline-[#000]" id="category">
          <option value="2">신발</option>
          <option value="3">옷</option>
          <option value="4">가방</option>
          <option value="5">전자기기</option>
        </select>
      </div>
      <div className="w-[500px] flex justify-between  items-center mx-5 mt-8">
        <label htmlFor="min_price" className="text-nowrap">시작가</label>
        <input type="number" id="min_price" className="w-[430px] h-[50px] border rounded-xl pl-2 input_number_arrow_none outline-[#000]" placeholder="시작가" />
      </div>
      <div className="flex justify-between mx-5 mt-8">
        <div className="w-[320px] flex justify-between items-center">
          <label htmlFor="select" className="text-nowrap">경매 기간</label>
          <select id="select" className="w-[250px] h-[50px] border rounded-xl text-center outline-[#000]">
            <option value="1">3시간</option>
            <option value="2">1일</option>
            <option value="3">2일</option>
            <option value="4">3일</option>
            <option value="5">4일</option>
            <option value="5">5일</option>
            <option value="5">6일</option>
            <option value="5">7일</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block mx-5 mt-8">상품 설명</label>
        <textarea id="description" className="w-[830px] h-[200px] border rounded-xl p-3 resize-none mx-5 mt-2 px-2 outline-[#000]" />
      </div>
      <div className="text-center py-10">
        <button className="w-[200px] h-[50px] border rounded-xl" onClick={() => handleSubmit()}>등록</button>
      </div>
    </div>
  )
}

export default ProductInsert