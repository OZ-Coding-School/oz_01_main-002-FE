'use client';

import { useGetUserAddress, useUpdateUserAddress } from "@/api/userApi";
import { useOnclickOutside } from "@/hooks/useOnClickOutSide";
import { UserAddress } from "@/type/UserType";
import { useEffect, useRef, useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";

type PaymentModalProps = {
  setIsClick: (isClick: boolean) => void;
}

const PaymentModal = ({ setIsClick }: PaymentModalProps) => {
  const [userAddressList, setUserAddressList] = useState<UserAddress[]>([])
  const ref = useRef(null);
  const { data, refetch } = useGetUserAddress();

  useEffect(() => {
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

  useOnclickOutside(ref, () => {
    setIsClick(false);
  })

  return (
    <div className="absolute w-full">
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="w-[500px] px-4 rounded-xl bg-white shadow-2xl border py-5 transition-all duration-[0.3s] ease-out animate-scale-up" ref={ref}>
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
                      {address.is_main ? <FaHouse className="text-lg  max-[920px]:text-base" /> : <HiOutlineLocationMarker />}
                      <div className="flex items-center text-lg max-[700px]:flex-col max-[700px]:items-start max-[920px]:text-base max-[580px]:text-sm">
                        <p className="ml-2">{address.address}</p>
                        <p className="ml-2">{address.detail_address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PaymentModal