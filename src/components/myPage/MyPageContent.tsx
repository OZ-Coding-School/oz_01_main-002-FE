'use client';

import History from "@/components/myPage/History";
import Address from "@/components/myPage/menu/Address";
import Password from "@/components/myPage/menu/Password";
import WishList from "@/components/myPage/menu/WishList";
import MyProducts from "@/components/myPage/menu/myProducts";
import Orders from "@/components/myPage/menu/order/Orders";
import Profile from "@/components/myPage/menu/profile/Profile";
import { useProductStore } from "@/store";
import { IoIosArrowForward } from "react-icons/io";

import MoreButton from "./MoreButton";
import ProfileButton from "./ProfileButton";

type MyPageContentProps = {
  myPageMenuList: {
    id: number;
    icon: JSX.Element;
    title: string;
    value: string;
  }[]
}

const MyPageContent = ({ myPageMenuList }: MyPageContentProps) => {
  const { menuNumber } = useProductStore();

  return (
    <div className="w-[900px]">
      <div className={` -mt-8  ${menuNumber === 0 ? 'hidden' : 'block'}`}>
        <div className="flex items-center mb-2">
          <p className="text-[#9f9f9f]">{`myPage`}&nbsp;&nbsp;&nbsp;</p>
          <IoIosArrowForward className="text-[20px] text-[#9f9f9f]" />
          <p>&nbsp;&nbsp;&nbsp;</p>
          <p className="text-white">{menuNumber === 0 ? '' : menuNumber === 6 ? 'MyProducts' : myPageMenuList[menuNumber - 1].value}</p>
        </div>
      </div>
      {menuNumber === 0 ?
        <div className="w-[900px]">
          <div className="flex items-center justify-between w-full border rounded-xl px-8 py-4 bg-white mb-5">
            <div className="flex items-center">
              <div className="w-[100px] h-[100px] rounded-full bg-[#868686]"></div>
              <div className="ml-[16px] leading-9">
                <p className="text-black text-[24px] font-semibold">닉네임</p>
                <p className="text-[#868686] text-[20px]">이메일</p>
              </div>
            </div>
            <ProfileButton />
          </div>
          <div className="w-full border rounded-xl px-8 py-4 bg-white mb-5">
            <div className="flex items-center">
              <p className="text-[24px] font-semibold cursor-pointer">관심상품</p>
              <MoreButton />
            </div>
            <div className="mt-5 ml-7 flex items-center">
              <div className="flex flex-col justify-center items-center mr-5">
                <div className="flex items-center text-[#4078FF] justify-center w-[70px] h-[70px] rounded-[12px] border">2건</div>
                <p className="mt-3">입찰중</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="flex items-center text-[#4078FF] justify-center w-[70px] h-[70px] rounded-[12px] border">1건</div>
                <p className="mt-3">입찰중</p>
              </div>
            </div>
          </div>
          <History title="입찰 내역" />
          <History title="판매 내역" />
          <History title="나의 상품" />
        </div> :
        menuNumber === 1
          ? <Orders />
          : menuNumber === 2
            ? <WishList />
            : menuNumber === 3
              ? <Address />
              : menuNumber === 4
                ? <Password />
                : menuNumber === 5
                  ? <Profile />
                  : <MyProducts />
      }
    </div>
  )
}

export default MyPageContent