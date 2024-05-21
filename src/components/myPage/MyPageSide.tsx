'use client';

import { useProductStore } from "@/store";
import { IoLogOutOutline } from "react-icons/io5";

type MyPageSideBarProps = {
  myPageMenuList: {
    id: number;
    icon: JSX.Element;
    title: string;
    value: string;
  }[]
}

const MyPageSide = ({ myPageMenuList }: MyPageSideBarProps) => {
  const { menuNumber, setMenuNumber } = useProductStore();
  return (
    <div className="flex flex-col items-center w-[260px]  mr-[40px] max-[1200px]:hidden">
      <div className="cursor-pointer" onClick={() => setMenuNumber(0)}>
        <p className="text-white text-5xl font-semibold">마이 페이지</p>
      </div>
      <div className="w-full mt-[20px]">
        {myPageMenuList.map((menu) => (
          <div key={menu.id} className={`box-border my-2 px-8 w-full h-[72px] ${menuNumber === menu.id ? 'bg-white' : ''} cursor-pointer flex items-center rounded-xl hover:bg-white`} onClick={() => setMenuNumber(menu.id)}>
            {menu.icon}
            <p className="text-[#D1B383] text-[24px] leading-none">{menu.title}</p>
          </div>
        ))}
        <div className="box-border my-2 px-8 w-full h-[72px] cursor-pointer flex items-center rounded-xl hover:bg-white" >
          <IoLogOutOutline className="text-[#868686] text-[30px] mr-3" />
          <p className="text-[#D1B383] text-[24px] leading-none">Logout</p>
        </div>
      </div>
    </div>
  )
}

export default MyPageSide