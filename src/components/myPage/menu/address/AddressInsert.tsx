import { usePostUserAddress } from "@/api/userApi";
import { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";

const AddressInsert = ({ refetch }: any) => {
  const [userAddress, setUserAddress] = useState({
    addressName: '',
    zoneCode: '',
    address: '',
    buildingName: '',
    bname: '',
    detailAddress: '',
  })

  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data: any) => {
    console.log('주소 데이터', data);
    setUserAddress({
      addressName: '',
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
  const postUserAddress = usePostUserAddress();
  const handleUserAddressInsert = async () => {
    postUserAddress({
      name: userAddress.addressName,
      address: userAddress.address + ' ' + userAddress.buildingName + ' ' + userAddress.bname,
      detail_address: userAddress.detailAddress, zip_code: userAddress.zoneCode
    }, {
      onSuccess: () => {
        refetch();
      }
    });
  }

  return (
    <>
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
    </>
  )
}

export default AddressInsert