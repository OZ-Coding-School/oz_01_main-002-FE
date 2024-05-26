'use client';

import { useDeleteUserAddress, useGetUserAddress, useUpdateUserAddress } from "@/api/userApi";
import { UserAddress } from "@/type/UserType";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";
import AddressInsert from "../../../components/myPage/menu/address/AddressInsert";

const Address = () => {
  const [userAddressList, setUserAddressList] = useState<UserAddress[]>([])
  const { data, refetch } = useGetUserAddress();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/login');
    }
    setUserAddressList(data?.data.sort((a: UserAddress, b: UserAddress) => {
      if (a.is_main === b.is_main) return 0;
      return a.is_main ? -1 : 1;
    }));
  }, [data]);

  const userUpdateAddress = useUpdateUserAddress();
  const handleUserUpdateAddress = (id: number) => {
    userUpdateAddress({ id, is_main: true }, {
      onSuccess: () => {
        refetch();
      }
    });
  }

  const userDeleteAddress = useDeleteUserAddress();
  const handleDeleteAddress = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    userDeleteAddress(id, {
      onSuccess: () => {
        refetch();
      }
    });
  }

  return (
    <div className="w-full max-w-[900px] bg-white rounded-xl px-10 pb-10">
      <Link href={'/myPage'}>
        <div className="py-5 hidden text-2xl cursor-pointer max-[1200px]:block">
          <RiArrowGoBackFill />
        </div>
      </Link>
      <div className="h-[64px] max-[1200px]:hidden" />
      <div className="text-3xl font-semibold my-2">
        <p>주소 설정</p>
      </div>
      <div className="border-2 border-[#D1B383]" />
      <div className="w-full max-w-[700px] mx-auto my-5">
        {userAddressList && userAddressList.map((address) => (
          <div key={address.id} className={`${!address.is_main ? 'cursor-pointer' : null}`} onClick={() => !address.is_main ? handleUserUpdateAddress(address.id) : null}>
            <div className={`py-4 ${address.is_main ? 'border-b' : null}`}>
              <div>
                <div className="flex items-center">
                  <p className="ml-6 text-xl font-bold">{address.name}</p>
                  {address.is_main ? <div className="border rounded-full text-[#0060ff] bg-[#edf7ff] ml-1 px-1">
                    <p className="text-xs">현재 설정된 주소</p>
                  </div> : null}
                </div>
                <div className=" flex justify-between items-center">
                  <div className="flex items-center">
                    {address.is_main ? <FaHouse className="text-lg" /> : <HiOutlineLocationMarker />}
                    <p className="ml-2 text-lg">{address.address}</p>
                  </div>
                  {address.is_main ? <IoCheckmarkOutline className="text-xl font-bold text-[#D1B383]" /> : <button className="border rounded-lg w-[100px] h-[35px]" onClick={(e) => handleDeleteAddress(e, address.id)}>삭제</button>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddressInsert refetch={refetch} />
      <div className="h-[60px]" />
    </div >
  )
}

export default Address