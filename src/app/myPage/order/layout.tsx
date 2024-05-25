'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowGoBackFill } from "react-icons/ri";

type Props = {
  children: React.ReactNode;
};

const OrderLayout = ({ children }: Props) => {
  const path = usePathname();
  const categories = [{ id: 0, name: '판매', link: '/myPage/order/sale' }, { id: 1, name: '입찰', link: '/myPage/order/bidding' }];
  return (
    <div className="w-full max-w-[900px] bg-white rounded-xl px-10 pb-10">
      <Link href={'/myPage'}>
        <div className="py-5 hidden text-2xl cursor-pointer max-[1200px]:block">
          <RiArrowGoBackFill />
        </div>
      </Link>
      <div className="h-[64px] max-[1200px]:hidden" />
      <div className="text-3xl font-semibold my-2">
        <p>판매, 입찰 내역</p>
      </div>
      <div className="border-2 border-[#D1B383]" />
      <div className="my-5">
        <div className="flex items-center">
          {categories.map((category, index) => (
            <Link key={index} href={category.link}>
              <div className={`flex justify-center items-center mr-2 w-[70px] h-[35px] cursor-pointer border rounded-2xl ${path === category.link ? 'bg-black text-white' : 'text-black'}`}>
                <p>{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default OrderLayout