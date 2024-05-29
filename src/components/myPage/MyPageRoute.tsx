'use client';

import { usePathname } from 'next/navigation';
import { IoIosArrowForward } from "react-icons/io";

type MyPageContentProps = {
  myPageMenuList: {
    id: number;
    icon: JSX.Element;
    title: string;
    value: string;
    link: string;
  }[]
}

const MyPageRoute = ({ myPageMenuList }: MyPageContentProps) => {
  const path = usePathname();
  return (
    <div className={`-mt-8  ${path === 'myPage' ? 'hidden' : 'block'}`}>
      <div className="flex items-center mb-2">
        <p className="text-[#9f9f9f]">{`myPage`}&nbsp;&nbsp;&nbsp;</p>
        <IoIosArrowForward className="text-[20px] text-[#9f9f9f]" />
        <p>&nbsp;&nbsp;&nbsp;</p>
        <p className="text-white">{path === 'myPage' ? '' : path === '/myPage/myProducts' ? 'MyProducts' : path === '/myPage/order/bidding' ? 'Order' : myPageMenuList.find(menu => menu.link === path)?.value || ''}</p>
      </div>
    </div>
  )
}

export default MyPageRoute