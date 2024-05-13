import Link from "next/link";
import { FC } from "react";

const LoginPage: FC = () => {
  return (
    <div className="flex justify-center items-start h-screen">
      <div className="w-1/5 h-1/5 text-center">
        <img src="/images/logo.svg" className="" alt="logo" />
        <div>
          <input
            className="border-solid border-2 m-1 w-[350px] h-12 rounded-md "
            type="text"
            placeholder="user@email.com"
          ></input>
          <div>
            <input
              className="border-solid border-2 m-1  w-[350px] h-12 rounded-md "
              type="text"
              placeholder="password"
            ></input>
          </div>
          <div>
            <button className=" m-1 border-solid border-2 w-[350px] h-[60px] bg-slate-400 rounded-md ">
              로그인
            </button>
          </div>
          <div className="flex m-8 justify-center">
            <Link href="/signUp">
              <p className="m-2 cursor-pointer">회원가입</p>
            </Link>
            <p className="m-2">이메일찾기</p>
            <p className="m-2">비밀번호 찾기</p>
          </div>
          <div className="flex justify-center">
            <img className="mr-8" src="/images/kakao.png" />
            <img className="ml-8" src="/images/google.png" />
          </div>
          <div className="flex justify-center">
            <div className="mr-8">
              <p>카카오로</p>
              <p>시작하기</p>
            </div>
            <div className="ml-8">
              <p>구글로</p>
              <p>시작하기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
