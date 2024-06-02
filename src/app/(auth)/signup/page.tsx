'use client';

import { useSignUpUser, useUserEmailCheck, useUserEmailCodeCheck, useUserNicknameCheck, useUserPhoneCheck } from "@/api/userApi";
import CheckButton from "@/components/\bsignup/CheckButton";
import EmailLoading from "@/components/\bsignup/EmailLoading";
import SignInput from "@/components/\bsignup/SignInput";
import SignInputOne from "@/components/\bsignup/SignInputOne";
import TermCheck from "@/components/\bsignup/TermCheck";
import { useOnclickOutside } from "@/hooks/useOnClickOutSide";
import { SignUpUser } from "@/type/UserType";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Terms = {
  content: string
  created_at: string
  id: number
  is_active: boolean
  is_required: boolean
  name: string
  updated_at: string
}

const SignUp = () => {
  const [gender, setGender] = useState('성별');
  const [isClicked, setIsClicked] = useState(false);
  const [terms, setTerms] = useState<Terms[]>([]);
  const [checkedPassword, setCheckedPassword] = useState('');
  const [useDate, setUseDate] = useState<string>('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const router = useRouter();
  const ref = useRef(null);
  const emailCheck = useUserEmailCheck();
  const [signUpUser, setSignUpUser] = useState<SignUpUser>({
    request_data: {
      email: '',
      password: '',
      name: '',
      nickname: '',
      gender: '',
      contact: '',
      age: 0,
    },
    term_data: []
  });
  const [error, setError] = useState({
    email: '',
    password: '',
    password1: '',
    name: '',
    nickname: '',
    gender: '',
    phoneNumber: '',
    age: '',
    checked1: '',
    checked2: '',
    checked3: '',
  });
  const genderOptions = [
    { id: 1, label: '남자', value: 1 },
    { id: 2, label: '여자', value: 2 },
  ]
  const [emailCode, setEmailCode] = useState<string | undefined>('');
  const [emailCodeInput, setEmailCodeInput] = useState(false);
  const [userChecked, setUserChecked] = useState({
    email: false,
    nickname: false,
    phone: false
  })

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
      request_data: {
        ...signUpUser.request_data,
        email: e.target.value
      }
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
      request_data: {
        ...signUpUser.request_data,
        password: e.target.value
      }
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
      request_data: {
        ...signUpUser.request_data,
        name: e.target.value
      }
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
      request_data: {
        ...signUpUser.request_data,
        nickname: e.target.value
      }
    })
  }
  const handleGender = (gender: string) => {
    if (gender !== '') {
      setError({
        ...error,
        gender: ''
      })
    }

    setSignUpUser({
      ...signUpUser,
      request_data: {
        ...signUpUser.request_data,
        gender
      }
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
      request_data: {
        ...signUpUser.request_data,
        contact: e.target.value
      }
    })
  }
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setUseDate(e.target.value);
    const dateValue = e.target.value;
    if (e.target.value === '') {
      setError({
        ...error,
        age: ''
      })
    }

    if (e.target.value.length !== 0) {
      setError({
        ...error,
        age: ''
      })
    }
    const formattedDate = dateValue.replace(/-/g, ''); // 'yyyy-MM-dd' -> 'yyyyMMdd'
    const numericDate = parseInt(formattedDate, 10);

    setSignUpUser({
      ...signUpUser,
      request_data: {
        ...signUpUser.request_data,
        age: numericDate
      }
    })
  }

  const handleError = () => {
    const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    const nicknameRegEx = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    const phoneRegEx = /^01([0])-?([0-9]{4})-([0-9]{4})$/;
    if (signUpUser.request_data.email === '') {
      setError({
        ...error,
        email: '이메일을 입력해주세요.'
      })
      return true;
    }
    if (!emailRegEx.test(signUpUser.request_data.email)) {
      setError({
        ...error,
        email: '이메일 형식이 올바르지 않습니다.'
      })
      return true;
    }

    if (signUpUser.request_data.password === '') {
      setError({
        ...error,
        password: '비밀번호를 입력해주세요.'
      })
      return true;
    }

    if (!passwordRegEx.test(signUpUser.request_data.password)) {
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

    if (signUpUser.request_data.password !== checkedPassword) {
      setError({
        ...error,
        password1: '비밀번호가 일치하지 않습니다.'
      })
      return true;
    }

    if (signUpUser.request_data.name === '') {
      setError({
        ...error,
        name: '이름을 입력해주세요.'
      })
      return true;
    }

    if (signUpUser.request_data.name.length < 2) {
      setError({
        ...error,
        name: '이름을 2자 이상 입력해주세요.'
      })
      return true;
    }

    if (signUpUser.request_data.nickname === '') {
      setError({
        ...error,
        nickname: '닉네임을 입력해주세요.'
      })
      return true;
    }

    if (signUpUser.request_data.nickname.length < 2) {
      setError({
        ...error,
        nickname: '닉네임을 2자 이상 입력해주세요.'
      })
      return true;
    }

    if (!nicknameRegEx.test(signUpUser.request_data.nickname)) {
      setError({
        ...error,
        nickname: '닉네임은 한글, 영문, 숫자만 입력 가능합니다.'
      })
      return true;
    }

    if (signUpUser.request_data.gender === '') {
      setError({
        ...error,
        gender: '성별을 선택해주세요.'
      })
      return true;
    }

    if (signUpUser.request_data.contact === '') {
      setError({
        ...error,
        phoneNumber: '휴대폰 번호를 입력해주세요.'
      })
      return true;
    }

    if (!phoneRegEx.test(signUpUser.request_data.contact)) {
      setError({
        ...error,
        phoneNumber: '휴대폰 번호 형식이 올바르지 않습니다.'
      })
      return true;
    }

    if (signUpUser.request_data.age === 0) {
      setError({
        ...error,
        age: '생년월일을 입력해주세요.'
      })
      return true;
    }

    if (!signUpUser.term_data[0] || !signUpUser.term_data[1] || !signUpUser.term_data[2]) {
      setError({
        ...error,
        checked1: '필수 항목에 동의해주세요.'
      })
      return true;
    }
    return false;
  }

  const handleEmailCheck = () => {

    const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (signUpUser.request_data.email === '') return alert('이메일을 입력해주세요.');
    if (!emailRegEx.test(signUpUser.request_data.email)) {
      setError({
        ...error,
        email: '이메일 형식이 올바르지 않습니다.'
      })
      return;
    }
    setIsEmailChecked(true);
    emailCheck({ email: signUpUser.request_data.email }, {
      onSuccess: () => {
        setIsEmailChecked(false);
        setEmailCodeInput(true);
      },
      onError: (data: any) => {
        if (data.response.data.detail === 'Email already registered') {
          alert('이미 가입된 이메일입니다.');
        }
        setIsEmailChecked(false);
      }
    });
  }

  const emailCodeCheck = useUserEmailCodeCheck();
  const handleEmailCodeCheck = () => {
    emailCodeCheck({ email: signUpUser.request_data.email, code: Number(emailCode) }, {
      onSuccess: () => {
        setUserChecked({
          ...userChecked,
          email: true
        })
        setEmailCodeInput(false);
      }
    });
  }

  const nicknameCheck = useUserNicknameCheck();
  const handleNickNameCheck = () => {
    nicknameCheck({ nickname: signUpUser.request_data.nickname }, {
      onSuccess: () => {
        setUserChecked({
          ...userChecked,
          nickname: true
        })
      }
    });
  }

  const phoneCheck = useUserPhoneCheck();
  const handlePhoneCheck = () => {
    if (signUpUser.request_data.contact === '') return alert('휴대폰 번호를 입력해주세요.');
    phoneCheck({ contact: signUpUser.request_data.contact }, {
      onSuccess: () => {
        setUserChecked({
          ...userChecked,
          phone: true
        })
      }
    })
  }

  const userSignUp = useSignUpUser();
  const handleSignUpUser = () => {
    const error = handleError();
    if (!error) {
      if (userChecked.email === false || userChecked.nickname === false || userChecked.phone === false) {
        alert('이메일, 닉네임, 휴대폰 인증을 완료해주세요.');
        return;
      }
      userSignUp(signUpUser);
    } else {
      return;
    }
  }

  useOnclickOutside(ref, () => {
    setIsClicked(false);
  })

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      router.push('/');
    }

    if (signUpUser.request_data.contact.length === 11) {
      setSignUpUser({
        ...signUpUser,
        request_data: {
          ...signUpUser.request_data,
          contact: signUpUser.request_data.contact.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
        }
      })
    }
  }, [signUpUser.request_data.contact]);

  return (
    <>
      <div className="bg-[#222] flex flex-col justify-center items-center">
        <div className="mt-[100px] mb-[80px] text-white text-[40px] leading-none">
          <p>회원가입</p>
        </div>
        <div className="w-full max-w-[518px] max-[560px]:max-w-[390px] mx-auto">
          <div className="flex items-center justify-between mb-[10px]">
            <SignInput type={'text'} placeholder={'이메일'} value={signUpUser.request_data.email} onChange={(e) => handleEmail(e)} />
            <CheckButton title={'이메일 확인'} onClick={handleEmailCheck} />
          </div>
          <p className="text-red-700">{error.email}</p>
          <div className={`flex items-center mb-[10px] ${emailCodeInput ? 'block' : 'hidden'}`}>
            <SignInput type={'text'} placeholder={'코드'} value={emailCode} onChange={(e) => setEmailCode(e.target.value)} />
            <button className="w-[80px] h-[40px] rounded-[10px] bg-[#D1B383] text-white text-[16px] leading-none" onClick={handleEmailCodeCheck}>확인</button>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="my-[10px]">
              <SignInputOne type={'password'} placeholder={'비밀번호'} value={signUpUser.request_data.password} onChange={(e) => handlePassword(e)} />
            </div>
            <p className="text-red-700">{error.password}</p>
            <div className="my-[10px]">
              <SignInputOne type={'password'} placeholder={'비밀번호 확인'} value={checkedPassword} onChange={(e) => handlePassword1(e)} />
            </div>
          </form>
          <p className="text-red-700">{error.password1}</p>
          <div className="my-[10px]">
            <SignInputOne type={'text'} placeholder={'이름'} value={signUpUser.request_data.name} onChange={(e) => handleName(e)} />
          </div>
          <p className="text-red-700">{error.name}</p>
          <div className="flex items-center justify-between my-[10px]">
            <SignInput type={'text'} placeholder={'닉네임'} value={signUpUser.request_data.nickname} onChange={(e) => handleNickname(e)} />
            <CheckButton title={'닉네임 확인'} onClick={handleNickNameCheck} />
          </div>
          <p className="text-red-700">{error.nickname}</p>
          <div className={`w-[518px] h-[60px] mt-[10px] max-[560px]:w-full flex items-center text-white cursor-pointer ${isClicked ? 'border-white' : 'border-[#D1B383]'} border-[#D1B383] justify-center rounded-xl border text-center relative`} onClick={() => setIsClicked(!isClicked)}>
            <div className="w-full px-4 flex justify-between items-center">
              <IoIosArrowDown className="opacity-0" />
              {gender}
              <IoIosArrowDown />
            </div>
            {isClicked ? <ul className="bg-white absolute border w-full border-[#D1B383]  z-10 top-[60px] rounded-xl" ref={ref}>
              {genderOptions.map((gender) => (
                <li key={gender.id} className={`w-full box-border hover:bg-[#D1B383] text-black hover:text-white border-[#D1B383] text-lg border-b leading-10 flex items-center justify-center first:rounded-t-xl last:rounded-b-xl last:border-b-0 cursor-pointer `} onClick={() => {
                  setGender(gender.label);
                  handleGender(gender.label);
                  setIsClicked(false);
                }}>{gender.label}</li>
              ))}
            </ul> : null}
          </div>
          <p className="text-red-700">{error.gender}</p>
          <div className="flex items-center justify-between my-[10px]">
            <SignInput type={'text'} placeholder={'연락처'} value={signUpUser.request_data.contact} onChange={(e) => handlePhone(e)} />
            <CheckButton title={'휴대폰 인증'} onClick={handlePhoneCheck} />
          </div>
          <p className="text-red-700">{error.phoneNumber}</p>
          <div className="mt-[10px]">
            <input type="date" className="w-[518px] h-[60px] max-[560px]:w-full outline-none focus:border-white border border-[#D1B383] rounded-[10px] bg-[#222] text-white pl-4" placeholder="생년월일" value={useDate} onChange={(e) => handleDate(e)} />
          </div>
          <p className="text-red-700">{error.age}</p>
          <div className="h-[40px]" />
          <TermCheck setSignUpUser={setSignUpUser} />
          <p className="text-red-700">{error.checked1 || error.checked2 || error.checked3}</p>
          <div className="h-[40px]" />
          <div>
            <button className="w-[518px] h-[74px] max-[560px]:w-full rounded-[10px] bg-[#D1B383] text-white text-lg" onClick={handleSignUpUser}>회원가입</button>
          </div>
        </div>
      </div>
      {isEmailChecked && <EmailLoading />}
    </>
  )
}

export default SignUp