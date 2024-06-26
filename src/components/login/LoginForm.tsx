'use client';

import { useLoginUser } from "@/api/userApi";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const userLogin = useLoginUser();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState({
    email: '',
    password: ''
  });

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setError({
        ...error,
        email: '',
      })
    }

    if (e.target.value.length !== 0) {
      setError({
        ...error,
        email: '',
      })
    }

    setUserInfo({
      ...userInfo,
      email: e.target.value
    })
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setError({
        ...error,
        password: '',
      })
    }

    if (e.target.value.length !== 0) {
      setError({
        ...error,
        password: '',
      })
    }

    setUserInfo({
      ...userInfo,
      password: e.target.value
    })
  }

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      router.push('/');
    }
  }, [])


  const handleError = () => {
    const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (userInfo.email === '') {
      setError({
        ...error,
        email: '이메일을 입력해주세요.'
      })
      return true;
    }

    if (!emailRegex.test(userInfo.email)) {
      setError({
        ...error,
        email: '이메일 형식이 올바르지 않습니다.'
      })
      return true;
    }

    if (userInfo.password === '') {
      setError({
        ...error,
        password: '비밀번호를 입력해주세요.'
      })
      return true;
    }
    return false;

  }


  const handleUserLogin = () => {
    const error = handleError();
    if (error) return;
    userLogin(userInfo);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col mb-[30px]">
        <input type="text" className="w-[372px] h-[74px] rounded-xl text-white focus:border-white outline-none bg-[#222] border border-[#D1B383] mb-[10px] pl-4" placeholder="이메일" value={userInfo.email} onChange={(e) => handleEmail(e)} />
        <div className="text-red-700">
          {error.email}
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="password" autoComplete="off" className="w-[372px] h-[74px] rounded-xl text-white focus:border-white outline-none bg-[#222] border border-[#D1B383] mb-[10px] pl-4" placeholder="비밀번호" value={userInfo.password} onChange={(e) => handlePassword(e)} onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            e.key === "Enter" ? handleUserLogin() : null
          }} />
        </form>
        <div className="text-red-700">
          {error.password}
        </div>
      </div>
      <button className="w-[372px] h-[74px] bg-[#D1B383] text-[24px] text-white rounded-xl" onClick={handleUserLogin}>로그인</button>
    </div>
  )
}

export default LoginForm