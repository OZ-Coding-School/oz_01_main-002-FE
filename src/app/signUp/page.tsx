"use client";

import { FC, useEffect, useState } from "react";

const SignUpPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    if (!value.trim()) {
      setNicknameError("");
    } else {
      validateNickname(value);
    }
  };

  const validateNickname = (value: string) => {
    if (!value.trim()) {
      setNicknameError("");
    } else {
      const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
      if (specialCharacters.test(value)) {
        setNicknameError("닉네임에는 특수 기호를 포함할 수 없습니다.");
      } else if (value.length < 2) {
        setNicknameError("닉네임은 최소 2글자 이상이어야 합니다.");
      } else {
        setNicknameError("");
      }
    }
  };

  const validateEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: string) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!value.trim()) {
      setPasswordError("");
    } else if (!passwordPattern.test(value)) {
      setPasswordError(
        "사용불가 : 8~16자의 영문 대소문자, 숫자, 특수문자만 가능합니다."
      );
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    validateEmail(email);
    validatePassword(password);
  }, [email, password]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!value.trim()) {
      setEmailError("");
    } else {
      validateEmail(value);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (!value.trim()) {
      setPasswordError("");
    } else {
      validatePassword(value);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password !== value) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setPhoneNumber(formattedValue);
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  return (
    <div className="flex mt-12 mb-44 justify-center items-center h-screen flex-col">
      <div className="w-1/4">
        <h1 className="text-4xl font-bold mt-4 mb-8">회원가입</h1>
        <form className="space-y-3">
          <div>
            <div className="flex">
              <input
                onChange={handleEmailChange}
                type="email"
                id="email"
                className="w-[300px] border border-gray-300 rounded-md px-4 py-3"
                placeholder="이메일을 입력하세요"
              />
              <button className="w-[120px] bg-slate-400 text-md text-white px-4 py-3 rounded-r-md">
                이메일 확인
              </button>
            </div>
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div>
            <input
              onChange={handlePasswordChange}
              type="password"
              id="password"
              className="w-[420px] border border-gray-300 rounded-md px-4 py-3"
              placeholder="비밀번호를 입력하세요"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div>
            <input
              onChange={handleConfirmPasswordChange}
              type="password"
              id="passwordConfirm"
              className="w-[420px] border border-gray-300 rounded-md px-4 py-3"
              placeholder="비밀번호를 다시 입력하세요"
            />
            {confirmPasswordError && (
              <p className="text-red-500">{confirmPasswordError}</p>
            )}
          </div>
          <div>
            <div className="flex">
              <input
                onChange={handleNicknameChange}
                type="text"
                id="nickname"
                className="w-[300px] border border-gray-300 rounded-l-md px-4 py-3"
                placeholder="닉네임을 입력하세요"
              />
              <button className="w-[120px] bg-slate-400 text-md text-white px-4 py-3 rounded-r-md">
                닉네임 확인
              </button>
            </div>
          </div>
          {nicknameError && <p className="text-red-500">{nicknameError}</p>}
          <div>
            <input
              type="text"
              id="name"
              className="w-[420px] border border-slate-300 rounded-l-md px-4 py-3"
              placeholder="이름을 입력하세요"
            />
          </div>
          <div>
            <select
              id="gender"
              className="w-[420px] border border-gray-300 rounded-md px-4 py-3"
            >
              <option value="">성별을 선택하세요</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>
          <div>
            <div className="flex">
              <input
                onChange={handlePhoneNumberChange}
                type="tel"
                id="phoneNumber"
                className="w-[300px] border border-gray-300 rounded-l-md px-4 py-3"
                placeholder="연락처를 입력하세요"
              />
              <button className="w-[120px] bg-slate-400 text-white px-4 py-3 rounded-r-md">
                휴대폰 인증
              </button>
            </div>
          </div>
          <div>
            <input
              type="date"
              id="birthday"
              className="w-[420px] border border-gray-300 rounded-md px-4 py-3"
            />
          </div>
        </form>
      </div>
      <div className="w-1/6 mt-8 text-xl">
        <div className="flex mt-4">
          <input className="w-4 h-4 m-1 mr-2" type="checkbox" />
          <p> 만 14세 이상 동의(필수)</p>
        </div>

        <div className="flex mt-4">
          <input className="w-4 h-4 m-1 mr-2" type="checkbox" />
          <p> 이용약관 동의(필수)</p>
        </div>

        <div className="flex mt-4">
          <input className="w-4 h-4 m-1 mr-2" type="checkbox" />
          <p> 정보제공 동의 동의(필수)</p>
        </div>
        <div className="flex mt-4">
          <input className="w-4 h-4 m-1 mr-2" type="checkbox" />
          <p> 마케팅 활용 동의(필수)</p>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="mt-8 mr-12 w-[420px] bg-slate-500 text-white rounded-md py-8 :hover-bg-slate-400"
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
