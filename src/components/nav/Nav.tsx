'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useOnclickOutside } from "../../hooks/useOnClickOutSide";

const Nav = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const targetRef2 = useRef<HTMLImageElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const prams = usePathname();
  const router = useRouter();
  const ref = useRef(null);
  const [isLogout, setIsLogout] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    setAccessToken(localStorage.getItem('access_token'));
  }, [prams])

  const menu = [
    { id: 1, name: '경매', link: '/productList/list' },
    { id: 2, name: '커뮤니티', link: '/community' },
    { id: 3, name: '마이페이지', link: '/myPage' },
    { id: 4, name: '관심', link: '/' },
    { id: 5, name: accessToken ? '로그아웃' : '로그인', link: !accessToken ? '/login' : '' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsChecked(window.innerWidth >= 1200);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (targetRef.current === null) return;
    if (window.scrollY >= 36.5) {
      targetRef.current.style.position = "fixed";
      targetRef.current.style.top = '0';
    } else {
      targetRef.current.style.position = "relative";
    }
  };


  const handleScroll2 = () => {
    const scrollY = window.scrollY;
    if (targetRef2.current === null) return;
    if (window.scrollY >= 37) {
      targetRef2.current.style.width = "150px";
    } else {
      targetRef2.current.style.width = "200px";
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("scroll", handleScroll2);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll2);
    };
  }, []);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsChecked(!isChecked);
  }

  useOnclickOutside(ref, () => {
    setIsChecked(false)
  }
  );

  return (
    <div>
      <div className="w-full h-[40px] flex justify-end items-center  pr-[150px] bg-[#222] max-[1200px]:hidden">
        <div className="flex text-white">
          {menu.slice(2, accessToken ? 4 : 5).map((item) => (
            <p key={item?.id} className="mx-[10px] cursor-pointer hover:text-[#D1B383]" onClick={() => {
              if (item.name === '마이페이지') {
                if (!localStorage.getItem('access_token')) {
                  alert('로그인이 필요합니다.');
                  router.push('/login');
                } else {
                  router.push(item!.link);
                }
              } else {
                router.push(item!.link);
              }
            }}>{item?.name}</p>
          ))}
        </div>
      </div>
      <div ref={targetRef} className="w-full  items-center relative bg-[#222] z-[999] ">
        <div className="mx-auto flex items-center justify-between ">
          <div className="opacity-0 w-[425px] h-3 bg-gray-500 max-[1200px]:hidden" />
          <div className="w-[40px] h-[40px]  hidden max-[1200px]:block max-[1200px]:opacity-0 ml-[30px]" />
          <Link href={'/'}>
            <Image ref={targetRef2} src={'/images/logo.png'} width={200} height={200} className={`w-[200px] h-auto transition-all duration-[0.3s] ease-out z-0 ${prams === '/login' ? 'opacity-0' : 'opacity-100'}
            `} alt="logo" priority />
          </Link>
          <div className="w-[30px] h-[30px] cursor-pointer hidden max-[1200px]:block mr-[30px] relative">
            <div className={`w-[30px] h-[30px] absolute z-50 ${!isChecked ? 'hidden' : 'block'}`} />
            <div className="absolute">
              <div className="w-[30px] h-[30px]  hidden max-[1200px]:block mr-[30px] relative" onClick={(e) => handleClick(e)} >
                <div className={`w-full h-[3px] absolute rounded-full transform bg-white transition-all duration-[0.3s]  ease-out ${isChecked ? 'top-1/2 -translate-y-1/2 rotate-[45deg]' : 'top-0 rotate-[0deg]'}`}></div>
                <div className={`w-full h-[3px] absolute top-1/2 transform -translate-y-1/2 rounded-full bg-white transition-all duration-[0.3s] ease-out ${isChecked ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`w-full h-[3px] absolute rounded-full transform bg-white transition-all duration-[0.3s] ease-out ${isChecked ? 'bottom-1/2 translate-y-1/2 rotate-[-45deg]' : 'bottom-0 rotate-[0deg]'}`}></div>
              </div>
            </div>
          </div>
          <div className={`absolute left-0 -bottom-[200px] w-full hidden max-[1200px]:${isChecked ? 'block' : 'hidden'}`} ref={ref}>
            <ul className="w-full bg-[#2e2e2e] text-[#D1B383] text-[18px]  text-center">
              {menu.map((item) => (
                <li key={item!.id} className="leading-10 hover:bg-[#D1B383] cursor-pointer hover:text-white" onClick={() => {
                  if (item.name === '로그아웃') {
                    const confirmValue = confirm('로그아웃 하시겠습니까?');
                    if (confirmValue) {
                      localStorage.removeItem('access_token');
                      setAccessToken(null);
                      setIsLogout(false);
                      router.push('/');
                    }
                  } else if (item.name === '마이페이지') {
                    if (!localStorage.getItem('access_token')) {
                      alert('로그인이 필요합니다.');
                      router.push('/login');
                    } else {
                      router.push(item!.link);
                    }
                  } else {
                    router.push(item!.link);
                  }
                  setIsChecked(false)
                }}>{item?.name}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center mt-2 w-[425px] max-[1200px]:hidden">
            {menu.slice(0, 2).map((item) => (
              <Link key={item!.id} href={item!.link}>
                <p className="text-white text-[24px] leading-none mx-[27.5px] hover:text-[#D1B383]">{item!.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav