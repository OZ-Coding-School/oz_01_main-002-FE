'use client';

import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";
import MyPageHomeButton from "./MyPageHomeButton";
import SideMenuButton from "./SideMenuButton";

type MyPageSideBarProps = {
  myPageMenuList: {
    id: number;
    icon: JSX.Element;
    title: string;
    value: string;
  }[]
}

const MyPageSide = ({ myPageMenuList }: MyPageSideBarProps) => {
  const router = useRouter();
  const handleLogout = () => {
    const logout = confirm('로그아웃 하시겠습니까?');
    if (logout) {
      localStorage.removeItem('access_token');
      router.push('/');
    }
  }

  return (
    <div className="flex flex-col items-center w-[260px]  mr-[40px] max-[1200px]:hidden">
      <MyPageHomeButton />
      <div className="w-full mt-[20px]">
        {myPageMenuList.map((menu) => (
          <SideMenuButton key={menu.id} menu={menu} />
        ))}
        <div className="box-border my-2 px-8 w-full h-[72px] cursor-pointer flex items-center rounded-xl hover:bg-white" onClick={handleLogout}>
          <IoLogOutOutline className="text-[#868686] text-[30px] mr-3" />
          <p className="text-[#D1B383] text-[24px] leading-none">Logout</p>
        </div>
      </div>
    </div>
  )
}

export default MyPageSide