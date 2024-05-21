'use client';

import { useMenuNumberStore } from "@/store";
import { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

const Password = () => {
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  const { setMenuNumber } = useMenuNumberStore();
  const handlePasswordChange = () => {
    setIsPasswordChecked(true);
  }
  console.log(isPasswordChecked);
  return (
    <div className="w-full max-w-[900px] h-[674px] bg-white rounded-xl px-10">
      <div className="py-5 hidden text-2xl cursor-pointer max-[1200px]:block" onClick={() => setMenuNumber(0)}>
        <RiArrowGoBackFill />
      </div>
      <div className="h-[64px] max-[1200px]:hidden" />
      <div className="text-3xl font-semibold my-2">
        <p>암호 변경</p>
      </div>
      <div className="border-2 border-[#D1B383]" />
      <div className="flex flex-col justify-center items-center">
        <div className="h-[70px]" />
        <div className="flex items-center justify-center my-3">
          <p>{!isPasswordChecked ? '기존 비밀번호를 입력해주세요' : '새로운 비밀번호를 입력해주세요'}</p>
        </div>
        {!isPasswordChecked ?
          <div className="my-10 flex items-center flex-nowrap">
            <input type="password" className="w-[300px] h-[50px] border rounded-lg outline-none pl-4" placeholder="기존 암호 입력" />
            <button className="w-[100px] h-[50px] border rounded-lg ml-2" onClick={handlePasswordChange}>확인</button>
          </div>
          : <div className="my-10 flex flex-col justify-center items-center">
            <div>
              <div className="flex flex-col">
                <label htmlFor="new_password">새로운 비밀번호</label>
                <input id="new_password" type="password" className="w-[300px] h-[50px] border rounded-lg outline-none pl-4 mt-2" placeholder="새로운 암호 입력" />
              </div>
              <div className="flex flex-col mt-5">
                <label htmlFor="password_check">비밀번호 확인</label>
                <input id="password_check" type="password" className="w-[300px] h-[50px] border rounded-lg outline-none pl-4 mt-2" placeholder="새로운 암호 입력" />
              </div>
            </div>
            <div className="my-10">
              <button className="w-[100px] h-[50px] border rounded-lg">변경하기</button>
            </div>
            <div className="h-[42px]" />
          </div>}
      </div>
    </div>
  )
}

export default Password