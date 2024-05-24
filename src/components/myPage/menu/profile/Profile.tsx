'use client';

import { useGetUser, usePutUserUpdate } from "@/api/userApi";
import { useMenuNumberStore } from "@/store";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import SaveButtonComponent from "./SaveButtonComponent";
import UserInfoInput from "./UserInfoInput";

const Profile = () => {
  const { setMenuNumber } = useMenuNumberStore();
  const [isNicknameDisabled, setIsNicknameDisabled] = useState(true);
  const [isPhoneDisabled, setIsPhoneDisabled] = useState(true);
  const [isContentDisable, setIsContentDisable] = useState(true);
  const fileInput = useRef<HTMLInputElement>(null);
  const [userProfile, setUserProfile] = useState<File>();
  const [renderImage, setRenderImage] = useState<string>();
  const { data, isLoading, refetch } = useGetUser();
  const { mutate: updateUser } = usePutUserUpdate();
  const [userUpdate, setUserUpdate] = useState({
    email: '',
    name: '',
    nickname: '',
    gender: '',
    contact: '',
    age: 0,
    address: '',
    content: ''
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      setUserUpdate({
        email: data.data.email,
        name: data.data.name,
        nickname: data.data.nickname,
        gender: data.data.gender,
        contact: data.data.contact,
        age: data.data.age,
        address: data.data.address,
        content: data.data.content
      })
    }
  }, [data])

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
    // const formData = new FormData();
    // if (userProfile) {
    //   formData.append('userImg', userProfile);
    //   updateUser(formData, {
    //     onSuccess: () => {
    //       if (!fileInput.current) return;
    //       fileInput.current.value = '';
    //       setRenderImage('');
    //       refetch();
    //     }
    //   })
    // }
  }

  const handleNicknameChange = () => {
    setIsNicknameDisabled(!isNicknameDisabled);
  };

  const handleUpdateNickname = () => {
    // const formData = new FormData();
    // formData.append('nickname', userUpdate.nickname);
    updateUser({ nickname: userUpdate.nickname }, {
      onSuccess: () => {
        setIsNicknameDisabled(!isNicknameDisabled);
        refetch();
      }
    })
  }

  const handlePhoneChange = () => {
    setIsPhoneDisabled(!isPhoneDisabled);
  };

  const handleUpdatePhone = () => {
    // const formData = new FormData();
    // formData.append('contact', userUpdate.contact);
    updateUser({ contact: userUpdate.contact }, {
      onSuccess: () => {
        setIsPhoneDisabled(!isPhoneDisabled);
        refetch();
      }
    })
  }

  const handleUpdateContent = () => {
    // const formData = new FormData();
    // formData.append('content', userUpdate.content);
    updateUser({ content: userUpdate.content }, {
      onSuccess: () => {
        setIsContentDisable(!isContentDisable);
        refetch();
      }
    })
  }

  console.log(userUpdate);
  console.log(isContentDisable);
  if (isLoading) return <div>로딩중...</div>;
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
            <p className="text-[20px] font-bold">{userUpdate.nickname}</p>
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
        <UserInfoInput title={'이메일'} id={'user_email'} value={userUpdate.email} />
        <UserInfoInput title={'이름'} id={'user_name'} value={userUpdate.name} />
        <UserInfoInput
          title={'닉네임'}
          id={'user_nickname'}
          value={userUpdate.nickname}
          changeButton={handleNicknameChange}
          isDisabled={isNicknameDisabled}
          userUpdate={userUpdate}
          setUserUpdate={setUserUpdate}
        />
        <SaveButtonComponent isDisabled={isNicknameDisabled} saveOnclick={handleUpdateNickname} onClick={() => setIsNicknameDisabled(true)} />
        <UserInfoInput title={'성별'} id={'user_gender'} value={userUpdate.gender} />
        <UserInfoInput
          title={'연락처'}
          id={'user_phone'}
          value={userUpdate.contact}
          changeButton={handlePhoneChange}
          isDisabled={isPhoneDisabled}
          userUpdate={userUpdate}
          setUserUpdate={setUserUpdate}
        />
        <SaveButtonComponent isDisabled={isPhoneDisabled} saveOnclick={handleUpdatePhone} onClick={() => setIsPhoneDisabled(true)} />
        <UserInfoInput title={'생년월일'} id={'user_birth'} value={userUpdate.age} />
        <UserInfoInput title={'주소'} id={'user_address'} value={userUpdate.address} changeButton={() => setMenuNumber(3)} />
        <div className="flex flex-col">
          <div className="my-2">
            <p>나의 소개</p>
          </div>
          <div className="relative">
            <div className={`w-[500px] h-[200px] z-10 absolute rounded-lg ${isContentDisable ? 'cursor-pointer block' : 'hidden'}`} onClick={() => setIsContentDisable(!isContentDisable)} />
            <textarea readOnly={isContentDisable} disabled={isContentDisable} className={`w-[500px] h-[200px] border rounded-[10px] p-3 outline-none resize-none bg-white ${isContentDisable ? 'cursor-pointer' : ''}`} value={userUpdate.content} onChange={(e) =>
              setUserUpdate({
                ...userUpdate,
                content: e.target.value
              })} />
            <SaveButtonComponent isDisabled={isContentDisable} saveOnclick={handleUpdateContent} onClick={() => setIsContentDisable(true)} />
          </div>
        </div>
      </div>
      <div className="h-[100px]" />
    </div>
  )
}

export default Profile