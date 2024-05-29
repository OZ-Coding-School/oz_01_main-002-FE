import MyPageRoute from "@/components/myPage/MyPageRoute";
import MyPageSide from "@/components/myPage/sideBar/MyPageSide";
import { BsPerson } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartLight, PiTruckLight } from "react-icons/pi";
import { RiKey2Line } from "react-icons/ri";

type Props = {
  children: React.ReactNode;
};

const MyPageLayout = ({ children }: Props) => {
  const myPageMenuList = [
    { id: 1, icon: <PiShoppingCartLight className="text-[#868686] text-[30px] mr-3" />, title: 'Orders', value: 'Order', link: '/myPage/order/sale' },
    { id: 2, icon: <CiHeart className="text-[#868686] text-[30px] mr-3" />, title: 'WishList', value: 'WishList', link: '/myPage/wishList' },
    { id: 3, icon: <PiTruckLight className="text-[#868686] text-[30px] mr-3" />, title: 'Address', value: 'Address', link: '/myPage/address' },
    { id: 4, icon: <RiKey2Line className="text-[#868686] text-[30px] mr-3" />, title: 'Password', value: 'Password', link: '/myPage/password' },
    { id: 5, icon: <BsPerson className="text-[#868686] text-[30px] mr-3" />, title: '프로필 관리', value: 'Profile', link: '/myPage/profile' },
  ]

  return (
    <div className="w-full bg-[#222]">
      <div className="h-[100px]"></div>
      <div className="flex w-full justify-center max-w-[1200px] max-[920px]:max-w-[700px] mx-auto bg-[#222]">
        <MyPageSide myPageMenuList={myPageMenuList} />
        <div className="w-[900px] max-[920px]:w-full mx-auto max-[920px]:px-6">
          <MyPageRoute myPageMenuList={myPageMenuList} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default MyPageLayout;