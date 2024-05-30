import { usePostUserAddress } from "@/api/userApi";
import { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";

const AddressInsert = ({ refetch }: any) => {
  const postUserAddress = usePostUserAddress();
  const [userAddress, setUserAddress] = useState({
    name: '',
    zoneCode: '',
    address: '',
    buildingName: '',
    bname: '',
    detailAddress: '',
  })

  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data: any) => {
    setUserAddress({
      name: '',
      zoneCode: data.zonecode,
      address: data.address,
      buildingName: data.buildingName,
      bname: data.bname,
      detailAddress: ''
    })
  }

  const handleClick = () => {
    open({ onComplete: handleComplete });
  }

  const handleUserAddressInsert = async () => {
    if (!userAddress.name || !userAddress.zoneCode || !userAddress.address || !userAddress.bname || !userAddress.detailAddress) {
      alert('모든 정보를 입력해주세요');
      return;
    }
    postUserAddress({
      name: userAddress.name,
      address: userAddress.address + ' ' + userAddress.buildingName + ' ' + userAddress.bname,
      detail_address: userAddress.detailAddress,
      zip_code: userAddress.zoneCode
    }, {
      onSuccess: () => {
        setUserAddress({
          name: '',
          zoneCode: '',
          address: '',
          buildingName: '',
          bname: '',
          detailAddress: ''
        })
        refetch();
      }
    });
  }

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center border border-x-0 mt-[100px]">
        <div className="flex justify-center  w-full">
          <div className="w-full max-w-[135px] my-2">
            <div className="flex items-center justify-center max-[920px]:justify-end">
              <div className="flex flex-col max-[920px]:items-end max-[920px]:mr-2">
                <label className="">명칭</label>
                <input type="text" className="w-[100px] h-[40px] max-[920px]:w-[70px] max-[500px]:text-sm max-[500px]:w-[60px] px-4 max-[920px]:px-2 border outline-none rounded-lg mt-1" value={userAddress.name} onChange={(e) => setUserAddress({
                  ...userAddress,
                  name: e.target.value
                })} />
              </div>
            </div>
          </div>
          <div className="w-full max-w-[600px] flex flex-col justify-center items-center max-[920px]:items-start my-2 border-l">
            <div className="max-[920px]:ml-2">
              <div className="flex items-end">
                <div className="flex flex-col">
                  <label htmlFor="zip_code" className="">우편번호</label>
                  <input id="zip_code" type="text" disabled className="w-[150px] h-[40px] max-[920px]:w-[100px] max-[500px]:text-sm  border pl-4 rounded-lg mr-2 mt-1 bg-white" value={userAddress.zoneCode} />
                </div>
                <button className="w-[80px] h-[40px] border rounded-md" onClick={handleClick}>검색</button>
              </div>
              <div className="my-2 flex items-end max-[920px]:flex-col max-[920px]:items-start">
                <div className="flex flex-col">
                  <label htmlFor="address" className="">주소</label>
                  <input id="address" type="text" disabled className="w-[350px] h-[40px] max-[500px]:w-[300px] max-[500px]:text-sm  border px-4 rounded-lg mr-2 mt-1 bg-white" value={`${userAddress.address} ${userAddress.buildingName}`} />
                </div>
                <div className="max-[920px]:mt-2">
                  <input type="text" disabled className="w-[200px] h-[40px] border px-4 max-[500px]:text-sm  rounded-lg bg-white" value={userAddress.bname} />
                </div>
              </div>
              <div className="my-2 flex items-end">
                <div className="flex flex-col">
                  <label htmlFor="address_detail" className="">상세 주소</label>
                  <input id="address_detail" type="text" className="w-[200px] h-[40px] max-[500px]:text-sm  border pl-4 outline-none  rounded-lg mr-2 mt-1" value={userAddress.detailAddress} onChange={(e) => setUserAddress({
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
    </>
  )
}

export default AddressInsert