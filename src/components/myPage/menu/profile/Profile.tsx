'use client';

import { useMenuNumberStore } from "@/store";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import UserInfoInput from "./UserInfoInput";

const Profile = () => {
  const { setMenuNumber } = useMenuNumberStore();
  const [isNicknameDisabled, setIsNicknameDisabled] = useState(true);
  const [isPhoneDisabled, setIsPhoneDisabled] = useState(true);
  const fileInput = useRef<HTMLInputElement>(null);
  const [userProfile, setUserProfile] = useState<File>();
  const [renderImage, setRenderImage] = useState<string>();
  const [userUpdate, setUserUpdate] = useState({
    userNickname: '',
    userPhone: ''
  });

  const handleClick = () => {
    fileInput.current?.click();
  };

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    let file = e.target.files[0];
    setUserProfile(file);
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setRenderImage(result);
      }
    };
  }

  const handleUserImageUpdateClose = () => {
    console.log('프로필 이미지 변경 취소');
    if (!fileInput.current) return;
    fileInput.current.value = '';
    setRenderImage('');
  }

  const handleUserImageUpdate = () => {
    console.log('프로필 이미지 변경');
  }

  const handleNicknameChange = () => {
    console.log('닉네임 변경');
    setIsNicknameDisabled(!isNicknameDisabled);
  };

  const handlePhoneChange = () => {
    console.log('연락처 변경');
    setIsPhoneDisabled(!isPhoneDisabled);
  };

  console.log(userUpdate);
  return (
    <div className="w-full max-w-[900px] bg-white rounded-xl px-10">
      <div className="py-5 hidden text-2xl cursor-pointer max-[1200px]:block" onClick={() => setMenuNumber(0)}>
        <RiArrowGoBackFill />
      </div>
      <div className="h-[64px] max-[1200px]:hidden" />
      <div className="text-3xl font-semibold my-2">
        <p>프로필 관리</p>
      </div>
      <div className="border-2 border-[#D1B383]" />
      <div className="flex my-5">
        <div className="flex items-center">
          <div className="w-[90px] h-[90px] rounded-full relative bg-[gray] overflow-hidden">
            <Image src={renderImage ? renderImage : '/images/no_profile.png'} fill sizes="1" alt="유저프로필이미지" />
          </div>
          <div className="ml-5">
            <p className="text-[20px] font-bold">닉네임</p>
            <div className="mt-2">
              <div className="flex items-center">
                <div className="w-[95px] h-[35px] rounded-xl border flex justify-center items-center cursor-pointer" onClick={handleClick}>
                  <p className="text-[16px]">이미지 변경</p>
                </div>
                <button className={`w-[50px] h-[35px] rounded-xl border ml-2 ${renderImage ? 'block' : 'hidden'}`} onClick={handleUserImageUpdate}>저장</button>
                <button className={`w-[50px] h-[35px] rounded-xl border ml-2 ${renderImage ? 'block' : 'hidden'}`} onClick={handleUserImageUpdateClose}>취소</button>
              </div>
              <input type="file" id="user_image" accept="image/*" ref={fileInput} className="w-[100px] h-[35px] rounded-xl border hidden" onChange={(e) => handleProfileChange(e)} />
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-2" />
      <div className="mt-10">
        <p className="text-[18px] leading-none font-bold">프로필 정보</p>
      </div>
      <div className="my-5">
        <UserInfoInput title={'이메일'} id={'user_email'} />
        <UserInfoInput title={'이름'} id={'user_name'} />
        <UserInfoInput
          title={'닉네임'}
          id={'user_nickname'}
          changeButton={handleNicknameChange}
          isDisabled={isNicknameDisabled}
          userUpdate={userUpdate}
          setUserUpdate={setUserUpdate}
        />
        <div className={`flex justify-center items-center w-[500px] mt-2 ${!isNicknameDisabled ? 'flex' : 'hidden'}`}>
          <button className="w-[100px] h-[30px] rounded-lg border">저장</button>
          <button className="w-[100px] h-[30px] rounded-lg border ml-2" onClick={() => setIsNicknameDisabled(true)}>취소</button>
        </div>
        <UserInfoInput title={'성별'} id={'user_gender'} />
        <UserInfoInput
          title={'연락처'}
          id={'user_phone'}
          changeButton={handlePhoneChange}
          isDisabled={isPhoneDisabled}
          userUpdate={userUpdate}
          setUserUpdate={setUserUpdate}
        />
        <div className={`flex justify-center items-center w-[500px] mt-2 ${!isPhoneDisabled ? 'flex' : 'hidden'}`}>
          <button className="w-[100px] h-[30px] rounded-lg border">저장</button>
          <button className="w-[100px] h-[30px] rounded-lg border ml-2" onClick={() => setIsPhoneDisabled(true)}>취소</button>
        </div>
        <UserInfoInput title={'생년월일'} id={'user_birth'} />
        <UserInfoInput title={'주소'} id={'user_address'} />
      </div>
      <div className="h-[100px]" />
    </div>
  )
}

export default Profile