import LoginForm from "@/components/login/LoginForm";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const menu = [
    { id: 1, name: '회원가입', link: '/signup' },
    { id: 2, name: '이메일 찾기', link: '/login' },
    { id: 3, name: '비밀번호 찾기', link: '/login' }
  ]

  return (
    <div className="bg-[#222] w-full ">
      <div className="flex flex-col mx-auto justify-center items-center w-full max-w-[372px]">
        <Image src={'/images/logo.png'} width={500} height={500} className="w-[380px] h-auto mb-5" sizes="1" alt="로고이미지" />
        <LoginForm />
        <div className="h-20" />
        <div className="flex w-full max-w-[350px] items-center justify-between">
          {menu.map((item) => (
            <Link href={item.link} key={item.id}>
              <p className="text-[20px] leading-none text-white">{item.name}</p>
            </Link>
          ))}
        </div>
        <div className="h-20" />
        <div className="flex items-center">
          <div>
            <div className="w-[50px] h-[50px] mx-[33px] bg-[#FEE500] rounded-full flex justify-center items-center">
              <Image src={'/images/kakao.svg'} width={50} height={50} className="w-[30px] h-[30 .3px] " alt="카카오심볼" />
            </div>
            <div className="text-xs text-[#828282] flex flex-col items-center mt-[10px]">
              <p>KakaoTalk으로</p>
              <p>시작하기</p>
            </div>
          </div>
          <div>
            <div className="w-[50px] h-[50px] mx-[33px] bg-white rounded-full flex justify-center items-center">
              <Image src={'/images/google.svg'} width={50} height={50} className="w-[30px] h-[30 .3px] " alt="구글심볼" />
            </div>
            <div className="text-xs text-[#828282] flex flex-col items-center mt-[10px]">
              <p>Google로</p>
              <p>시작하기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login