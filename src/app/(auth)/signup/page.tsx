'use client';

import { useOnclickOutside } from "@/hooks/useOnClickOutSide";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
const SignUp = () => {
  const [gender, setGender] = useState('성별');
  const [isClicked, setIsClicked] = useState(false);
  const [signUpUser, setSignUpUser] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
    gender: 0,
    phoneNumber: '',
    birth: '',
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
  });
  const [checkedPassword, setCheckedPassword] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
    password1: '',
    name: '',
    nickname: '',
    gender: '',
    phoneNumber: '',
    birth: '',
    checked1: '',
    checked2: '',
    checked3: '',
  });

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setError({
        ...error,
        email: ''
      })
    }

    if (e.target.value.length !== 0) {
      setError({
        ...error,
        email: ''
      })
    }

    setSignUpUser({
      ...signUpUser,
      email: e.target.value
    })
  }
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setError({
        ...error,
        password: ''
      })
    }

    if (e.target.value.length !== 0) {
      setError({
        ...error,
        password: ''
      })
    }

    setSignUpUser({
      ...signUpUser,
      password: e.target.value
    })
  }
  const handlePassword1 = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setError({
        ...error,
        password1: ''
      })
    }

    if (e.target.value.length !== 0) {
      setError({
        ...error,
        password1: ''
      })
    }
    setCheckedPassword(e.target.value);
  }
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setError({
        ...error,
        name: ''
      })
    }

    if (e.target.value.length !== 0) {
      setError({
        ...error,
        name: ''
      })
    }
    setSignUpUser({
      ...signUpUser,
      name: e.target.value
    })
  }
  const handleNickname = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setError({
        ...error,
        nickname: ''
      })
    }

    if (e.target.value.length !== 0) {
      setError({
        ...error,
        nickname: ''
      })
    }
    setSignUpUser({
      ...signUpUser,
      nickname: e.target.value
    })
  }
  const handleGender = (gender: number) => {
    if (gender !== 0) {
      setError({
        ...error,
        gender: ''
      })
    }

    setSignUpUser({
      ...signUpUser,
      gender,
    })
  }

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setError({
        ...error,
        phoneNumber: ''
      })
    }

    if (e.target.value.length !== 0) {
      setError({
        ...error,
        phoneNumber: ''
      })
    }

    setSignUpUser({
      ...signUpUser,
      phoneNumber: e.target.value
    })
  }
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setError({
        ...error,
        birth: ''
      })
    }

    if (e.target.value.length !== 0) {
      setError({
        ...error,
        birth: ''
      })
    }

    setSignUpUser({
      ...signUpUser,
      birth: e.target.value
    })
  }

  const handleError = () => {
    const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    const nicknameRegEx = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    const phoneRegEx = /^01([0])-?([0-9]{4})-([0-9]{4})$/;
    if (signUpUser.email === '') {
      setError({
        ...error,
        email: '이메일을 입력해주세요.'
      })
      return true;
    }
    if (!emailRegEx.test(signUpUser.email)) {
      setError({
        ...error,
        email: '이메일 형식이 올바르지 않습니다.'
      })
      return true;
    }

    if (signUpUser.password === '') {
      setError({
        ...error,
        password: '비밀번호를 입력해주세요.'
      })
      return true;
    }

    if (!passwordRegEx.test(signUpUser.password)) {
      setError({
        ...error,
        password: '비밀번호는 8~15자리의 영문, 숫자, 특수문자 조합이어야 합니다.'
      })
      return true;
    }

    if (checkedPassword === '') {
      setError({
        ...error,
        password1: '비밀번호를 입력해주세요.'
      })
      return true;
    }

    if (signUpUser.password !== checkedPassword) {
      setError({
        ...error,
        password1: '비밀번호가 일치하지 않습니다.'
      })
      return true;
    }

    if (signUpUser.name === '') {
      setError({
        ...error,
        name: '이름을 입력해주세요.'
      })
      return true;
    }

    if (signUpUser.name.length < 2) {
      setError({
        ...error,
        name: '이름을 2자 이상 입력해주세요.'
      })
      return true;
    }

    if (signUpUser.nickname === '') {
      setError({
        ...error,
        nickname: '닉네임을 입력해주세요.'
      })
      return true;
    }

    if (signUpUser.nickname.length < 2) {
      setError({
        ...error,
        nickname: '닉네임을 2자 이상 입력해주세요.'
      })
      return true;
    }

    if (!nicknameRegEx.test(signUpUser.nickname)) {
      setError({
        ...error,
        nickname: '닉네임은 한글, 영문, 숫자만 입력 가능합니다.'
      })
      return true;
    }

    if (signUpUser.gender === 0) {
      setError({
        ...error,
        gender: '성별을 선택해주세요.'
      })
      return true;
    }

    if (signUpUser.phoneNumber === '') {
      setError({
        ...error,
        phoneNumber: '휴대폰 번호를 입력해주세요.'
      })
      return true;
    }

    if (!phoneRegEx.test(signUpUser.phoneNumber)) {
      setError({
        ...error,
        phoneNumber: '휴대폰 번호 형식이 올바르지 않습니다.'
      })
      return true;
    }

    if (signUpUser.birth === '') {
      setError({
        ...error,
        birth: '생년월일을 입력해주세요.'
      })
      return true;
    }

    if (!signUpUser.checked1 || !signUpUser.checked2 || !signUpUser.checked3) {
      setError({
        ...error,
        checked1: '필수 항목에 동의해주세요.'
      })
      return true;
    }
    return false;
  }

  const handleSignUp = async () => {
    try {
      const error = handleError();
      if (error) return;
      console.log('회원가입 성공');
    } catch (error) {

    }
  }

  const ref = useRef(null);
  const genderOptions = [
    { id: 1, label: '남자', value: 1 },
    { id: 2, label: '여자', value: 2 },
  ]

  useOnclickOutside(ref, () => {
    setIsClicked(false);
  })

  useEffect(() => {
    if (signUpUser.phoneNumber.length === 11) {
      setSignUpUser({
        ...signUpUser,
        phoneNumber: signUpUser.phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      })
    }
  }, [signUpUser.phoneNumber]);

  console.log(signUpUser)
  return (
    <div className="bg-[#222] flex flex-col justify-center items-center">
      <div className="my-[100px] text-white text-[40px] leading-none">
        <p>회원가입</p>
      </div>
      <div className="w-full max-w-[518px] mx-auto">
        <div className="flex items-center justify-between mb-[10px]">
          <input type="text" className="w-[372px] h-[74px] outline-none focus:border-white border border-[#D1B383] rounded-[10px] bg-[#222] text-white pl-4" placeholder="이메일" value={signUpUser.email} onChange={(e) => handleEmail(e)} />
          <button className="w-[139px] h-[74px] rounded-[10px] bg-[#D1B383] text-white text-[16px] leading-none">이메일 확인</button>
        </div>
        <p className="text-red-700">{error.email}</p>
        <div className="my-[10px]">
          <input type="password" className="w-[518px] h-[74px] outline-none focus:border-white border border-[#D1B383] rounded-[10px] bg-[#222] text-white pl-4" placeholder="비밀번호" value={signUpUser.password} onChange={(e) => handlePassword(e)} />
        </div>
        <p className="text-red-700">{error.password}</p>
        <div className="my-[10px]">
          <input type="password" className="w-[518px] h-[74px] outline-none focus:border-white border border-[#D1B383] rounded-[10px] bg-[#222] text-white pl-4" placeholder="비밀번호 확인" value={checkedPassword} onChange={(e) => handlePassword1(e)} />
        </div>
        <p className="text-red-700">{error.password1}</p>
        <div className="my-[10px]">
          <input type="text" className="w-[518px] h-[74px] outline-none focus:border-white border border-[#D1B383] rounded-[10px] bg-[#222] text-white pl-4" placeholder="이름" value={signUpUser.name} onChange={(e) => handleName(e)} />
        </div>
        <p className="text-red-700">{error.name}</p>
        <div className="flex items-center justify-between my-[10px]">
          <input type="text" className="w-[372px] h-[74px] outline-none focus:border-white border border-[#D1B383] rounded-[10px] bg-[#222] text-white pl-4" placeholder="닉네임" value={signUpUser.nickname} onChange={(e) => handleNickname(e)} />
          <button className="w-[139px] h-[74px] rounded-[10px] bg-[#D1B383] text-white text-[16px] leading-none">닉네임 확인</button>
        </div>
        <p className="text-red-700">{error.nickname}</p>
        <div className={`w-[518px] h-[74px] mt-[10px] flex items-center text-white cursor-pointer ${isClicked ? 'border-white' : 'border-[#D1B383]'} border-[#D1B383] justify-center rounded-xl border text-center relative`} onClick={() => setIsClicked(!isClicked)}>
          <div className="w-full px-4 flex justify-between items-center">
            <IoIosArrowDown className="opacity-0" />
            {gender}
            <IoIosArrowDown />
          </div>
          {isClicked ? <ul className="bg-white absolute border border-[#D1B383] w-[518px] z-10 top-[74px] rounded-xl" ref={ref}>
            {genderOptions.map((gender) => (
              <li key={gender.id} className={`w-full box-border hover:bg-[#D1B383] text-black hover:text-white border-[#D1B383] text-lg border-b leading-10 flex items-center justify-center first:rounded-t-xl last:rounded-b-xl last:border-b-0 cursor-pointer `} onClick={() => {
                setGender(gender.label);
                handleGender(gender.value);
                setIsClicked(false);
              }}>{gender.label}</li>
            ))}
          </ul> : null}
        </div>
        <p className="text-red-700">{error.gender}</p>
        <div className="flex items-center justify-between my-[10px]">
          <input type="text" className="w-[372px] h-[74px] outline-none focus:border-white border border-[#D1B383] rounded-[10px] bg-[#222] text-white pl-4 input_number_arrow_none" placeholder="연락처" maxLength={11} value={signUpUser.phoneNumber} onChange={(e) => handlePhone(e)} />
          <button className="w-[139px] h-[74px] rounded-[10px] bg-[#D1B383] text-white text-[16px] leading-none">휴대폰 인증</button>
        </div>
        <p className="text-red-700">{error.phoneNumber}</p>
        <div className="mt-[10px]">
          <input type="date" className="w-[518px] h-[74px] outline-none focus:border-white border border-[#D1B383] rounded-[10px] bg-[#222] text-white pl-4" placeholder="생년월일" value={signUpUser.birth} onChange={(e) => handleDate(e)} />
        </div>
        <p className="text-red-700">{error.birth}</p>
        <div className="h-[60px]" />
        <div className="text-white">
          <div className="flex items-center my-7">
            <input type="checkbox" className="w-[30px] h-[30px] accent-[#D1B383]" onChange={(e) => setSignUpUser({
              ...signUpUser,
              checked1: e.target.checked,
            })} />
            <p className="ml-5">만 14세 이상 동의(필수)</p>
          </div>
          <div className="flex items-center my-7">
            <input type="checkbox" className="w-[30px] h-[30px] accent-[#D1B383]" onChange={(e) => setSignUpUser({
              ...signUpUser,
              checked2: e.target.checked,
            })} />
            <p className="ml-5">이용약관 동의(필수)</p>
          </div>
          <div className="flex items-center my-7">
            <input type="checkbox" className="w-[30px] h-[30px] accent-[#D1B383]" onChange={(e) => setSignUpUser({
              ...signUpUser,
              checked3: e.target.checked,
            })} />
            <p className="ml-5">정보제공 동의(필수)</p>
          </div>
          <div className="flex items-center my-7">
            <input type="checkbox" className="w-[30px] h-[30px] accent-[#D1B383]" onChange={(e) => setSignUpUser({
              ...signUpUser,
              checked4: e.target.checked,
            })} />
            <p className="ml-5">마케팅 활용 동의(선택)</p>
          </div>
        </div>
        <p className="text-red-700">{error.checked1 || error.checked2 || error.checked3}</p>
        <div className="h-[60px]" />
        <div>
          <button className="w-[518px] h-[74px] rounded-[10px] bg-[#D1B383] text-white text-lg" onClick={handleSignUp}>회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp