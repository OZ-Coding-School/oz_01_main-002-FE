'use client';

import { useMenuNumberStore } from '@/store';
import { IoIosArrowForward } from "react-icons/io";

type MyPageContentProps = {
  myPageMenuList: {
    id: number;
    icon: JSX.Element;
    title: string;
    value: string;
  }[]
}

const MyPageRoute = ({ myPageMenuList }: MyPageContentProps) => {
  const { menuNumber } = useMenuNumberStore();
  return (
    <div className={` -mt-8  ${menuNumber === 0 ? 'hidden' : 'block'}`}>
      <div className="flex items-center mb-2">
        <p className="text-[#9f9f9f]">{`myPage`}&nbsp;&nbsp;&nbsp;</p>
        <IoIosArrowForward className="text-[20px] text-[#9f9f9f]" />
        <p>&nbsp;&nbsp;&nbsp;</p>
        <p className="text-white">{menuNumber === 0 ? '' : menuNumber === 6 ? 'MyProducts' : myPageMenuList[menuNumber - 1].value}</p>
      </div>
    </div>
  )
}

export default MyPageRoute