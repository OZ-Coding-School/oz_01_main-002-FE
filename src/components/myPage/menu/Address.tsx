'use client';

import { useMenuNumberStore } from "@/store";
import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import { FaHouse } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";

type Address = {
  address: string,
  created_at: string,
  detail_address: string,
  id: number
  is_main: boolean,
  name: string,
  updated_at: string,
  zip_code: string,
}

const Address = () => {
  const [userAddress, setUserAddress] = useState({
    addressName: '',
    zoneCode: '',
    address: '',
    buildingName: '',
    bname: '',
    detailAddress: '',
  })
  const { setMenuNumber } = useMenuNumberStore();

  const [userAddressList, setUserAddressList] = useState<Address[]>([])

  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data: any) => {
    console.log('주소 데이터', data);
    setUserAddress(
      {
        addressName: '',
        zoneCode: data.zonecode,
        address: data.address,
        buildingName: data.buildingName,
        bname: data.bname,
        detailAddress: ''
      })
  }

  const handleGetAddress = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/address/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      console.log(response);
      const sortedData = response.data.sort((a: Address, b: Address) => {
        if (a.is_main === b.is_main) return 0;
        return a.is_main ? -1 : 1;
      });
      setUserAddressList(sortedData);
    } catch (error) {
    }
  }
  useEffect(() => {
    handleGetAddress();
  }, [])

  const handleClick = () => {
    open({ onComplete: handleComplete });
  }


  const handleUserAddressInsert = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/address/', {
        name: userAddress.addressName,
        address: userAddress.address + userAddress.buildingName + userAddress.bname,
        detail_address: userAddress.detailAddress,
        zip_code: userAddress.zoneCode,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      console.log(response);
      if (response.status === 201) {
        handleGetAddress();
      }
    } catch (error) {

    }
    console.log('주소 등록');
  }

  const handleAddressUpdate = async (id: number) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/address/${id}`, {
        is_main: true,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      console.log(response);
      if (response.status === 200) {
        handleGetAddress();
      }
    } catch (error) {

    }
  }

  const handleAddressDelete = async (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    const deleteAddress = confirm('주소를 삭제하시겠습니까?');
    if (!deleteAddress) return;
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/address/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      console.log(response);
      if (response.status === 200) {
        handleGetAddress();
      }
    } catch (error) {
      console.log(error);
    }

  };

  console.log(userAddressList);
  return (
    <div className="w-full max-w-[900px] bg-white rounded-xl px-10 pb-10">
      <div className="py-5 hidden text-2xl cursor-pointer max-[1200px]:block" onClick={() => setMenuNumber(0)}>
        <RiArrowGoBackFill />
      </div>
      <div className="h-[64px] max-[1200px]:hidden" />
      <div className="text-3xl font-semibold my-2">
        <p>주소 설정</p>
      </div>
      <div className="border-2 border-[#D1B383]" />
      <div className="w-full max-w-[700px] mx-auto my-5">
        {userAddressList.map((address) => (
          <div key={address.id} className={`${!address.is_main ? 'cursor-pointer' : null}`} onClick={() => !address.is_main ? handleAddressUpdate(address.id) : null}>
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
                  {address.is_main ? <IoCheckmarkOutline className="text-xl font-bold text-[#D1B383]" /> : <button className="border rounded-lg w-[100px] h-[35px]" onClick={(e) => handleAddressDelete(e, address.id)}>삭제</button>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col justify-center items-center border border-x-0 mt-[100px]">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[135px] my-2">
            <div className="flex items-center justify-center">
              <div className="flex flex-col">
                <label className="mr-2">명칭</label>
                <input type="text" className="w-[100px] h-[40px] pl-4 border outline-none rounded-lg mt-1" onChange={(e) => setUserAddress({
                  ...userAddress,
                  addressName: e.target.value
                })} />
              </div>
            </div>
          </div>
          <div className="w-full max-w-[600px] flex flex-col justify-center items-center my-2 border-l">
            <div>
              <div className="flex items-end">
                <div className="flex flex-col">
                  <label htmlFor="zip_code">우편번호</label>
                  <input id="zip_code" type="text" disabled className="w-[150px] h-[40px] border pl-4 rounded-lg mr-2 mt-1 bg-white" value={userAddress.zoneCode} />
                </div>
                <button className="w-[80px] h-[40px] border rounded-md" onClick={handleClick}>검색</button>
              </div>
              <div className="my-2 flex items-end">
                <div className="flex flex-col">
                  <label htmlFor="address">주소</label>
                  <input id="address" type="text" disabled className="w-[350px] h-[40px] border pl-4  rounded-lg mr-2 mt-1 bg-white" value={`${userAddress.address} ${userAddress.buildingName}`} />
                </div>
                <div>
                  <input type="text" disabled className="w-[200px] h-[40px] border pl-4  rounded-lg bg-white" value={userAddress.bname} />
                </div>
              </div>
              <div className="my-2 flex items-end">
                <div className="flex flex-col">
                  <label htmlFor="address_detail">상세 주소</label>
                  <input id="address_detail" type="text" className="w-[200px] h-[40px] border pl-4 outline-none  rounded-lg mr-2 mt-1" value={userAddress.detailAddress} onChange={(e) => setUserAddress({
                    ...userAddress,
                    detailAddress: e.target.value
                  })} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 text-center">
        <button className="w-[100px] h-[50px] border text-black rounded-lg" onClick={handleUserAddressInsert}>등록</button>
      </div>
      <div className="h-[60px]" />
    </div >
  )
}

export default Address