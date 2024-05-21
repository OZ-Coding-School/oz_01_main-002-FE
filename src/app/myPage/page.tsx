import MyPageContent from "@/components/myPage/MyPageContent";
import MyPageSide from "@/components/myPage/MyPageSide";

import { BsPerson } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";

import { PiShoppingCartLight, PiTruckLight } from "react-icons/pi";
import { RiKey2Line } from "react-icons/ri";
const MyPage = () => {
  const myPageMenuList = [
    { id: 1, icon: <PiShoppingCartLight className="text-[#868686] text-[30px] mr-3" />, title: 'Orders', value: 'Order' },
    { id: 2, icon: <CiHeart className="text-[#868686] text-[30px] mr-3" />, title: 'WishList', value: 'WishList' },
    { id: 3, icon: <PiTruckLight className="text-[#868686] text-[30px] mr-3" />, title: 'Address', value: 'Address' },
    { id: 4, icon: <RiKey2Line className="text-[#868686] text-[30px] mr-3" />, title: 'Password', value: 'Password' },
    { id: 5, icon: <BsPerson className="text-[#868686] text-[30px] mr-3" />, title: '프로필 관리', value: 'Profile' },
  ]

  return (
    <div className="w-full bg-[#222]">
      <div className="h-[100px]"></div>
      <div className="flex w-full justify-center max-w-[1200px] mx-auto bg-[#222]">
        <MyPageSide myPageMenuList={myPageMenuList} />
        <MyPageContent myPageMenuList={myPageMenuList} />
      </div>
    </div>
  )
}

export default MyPage