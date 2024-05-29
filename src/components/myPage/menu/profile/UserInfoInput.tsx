'use client';

import { ChangeEvent, Dispatch, SetStateAction } from "react";

type UserInfoInputProps = {
  title: string,
  value: string | number,
  id: string,
  isDisabled?: boolean,
  changeButton?: () => void
  userUpdate?: {
    nickname: string;
    contact: string;
    email: string,
    name: string,
    gender: string,
    age: number,
    address: string,
    content: string
  },
  setUserUpdate?: Dispatch<SetStateAction<{
    nickname: string;
    contact: string;
    email: string,
    name: string,
    gender: string,
    age: number,
    address: string,
    content: string
  }>>;
}

const UserInfoInput = ({ title, id, isDisabled, value, userUpdate, setUserUpdate, changeButton }: UserInfoInputProps) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setUserUpdate && userUpdate) {
      if (title === '닉네임') {
        setUserUpdate({
          ...userUpdate,
          nickname: e.target.value
        });
      } else if (title === '연락처') {
        setUserUpdate({
          ...userUpdate,
          contact: e.target.value
        });
      }
    }
  };
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="my-2">{title}</label>
      <div className="relative w-[500px] max-[650px]:w-full max-[650px]:text-sm">
        <input type="text" id={id} disabled={title === '닉네임' || title === '연락처' ? isDisabled : true} value={value} className="border outline-none w-full h-[50px] rounded-[10px] bg-white px-4" onChange={(e) => handleChange(e)} />
        <button className={`absolute w-[50px] h-[35px] rounded-lg right-2 top-[50%] bg-[#D1B383] text-white transform -translate-y-1/2 ${title === '닉네임' || title === '연락처' || title === '주소' ? 'block' : 'hidden'}`} onClick={changeButton}>{isDisabled || title === '주소' ? '변경' : '취소'}</button>
      </div>
    </div>
  )
}

export default UserInfoInput