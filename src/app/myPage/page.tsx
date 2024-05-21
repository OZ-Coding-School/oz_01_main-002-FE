'use client';

import History from "@/_components/myPage/History";
import Address from "@/_components/myPage/menu/Address";
import Password from "@/_components/myPage/menu/Password";
import WishList from "@/_components/myPage/menu/WishList";
import MyProducts from "@/_components/myPage/menu/myProducts";
import Orders from "@/_components/myPage/menu/order/Orders";
import Profile from "@/_components/myPage/menu/profile/Profile";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiShoppingCartLight, PiTruckLight } from "react-icons/pi";
import { RiKey2Line } from "react-icons/ri";
const MyPage = () => {
  const [menuNumber, setMenuNumber] = useState(0);
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
                <div className="box-border border rounded-[10px] p-4 cursor-pointer font-semibold" onClick={() => setMenuNumber(5)}>프로필 관리</div>
              </div>
              <div className="w-full border rounded-xl px-8 py-4 bg-white mb-5">
                <div className="flex items-center">
                  <p className="text-[24px] font-semibold cursor-pointer">관심상품</p>
                  <div className="w-[80px] h-[30px] bg-[#F6F6F6] flex justify-center items-center cursor-pointer rounded-full ml-7" onClick={() => setMenuNumber(2)}>
                    <MdKeyboardArrowRight />
                    <p>더보기</p>
                  </div>
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
              <History title="입찰 내역" setMenuNumber={setMenuNumber} />
              <History title="판매 내역" setMenuNumber={setMenuNumber} />
              <History title="나의 상품" setMenuNumber={setMenuNumber} />
            </div> :
            menuNumber === 1
              ? <Orders setMenuNumber={setMenuNumber} />
              : menuNumber === 2
                ? <WishList setMenuNumber={setMenuNumber} />
                : menuNumber === 3
                  ? <Address setMenuNumber={setMenuNumber} />
                  : menuNumber === 4
                    ? <Password setMenuNumber={setMenuNumber} />
                    : menuNumber === 5
                      ? <Profile setMenuNumber={setMenuNumber} />
                      : <MyProducts setMenuNumber={setMenuNumber} />
          }
        </div>
      </div>
    </div>
  )
}

export default MyPage