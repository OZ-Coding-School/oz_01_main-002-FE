import { useMenuNumberStore } from "@/store";
import { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import Bidding from "./Bidding";
import Sale from "./Sale";

const Orders = () => {
  const [orderIndex, setOrderIndex] = useState(0);
  const { setMenuNumber } = useMenuNumberStore();
  const categories = ['판매', '입찰'];
  return (
    <div className="w-full max-w-[900px] bg-white rounded-xl px-10 pb-10">
      <div className="py-5 hidden text-2xl cursor-pointer max-[1200px]:block" onClick={() => setMenuNumber(0)}>
        <RiArrowGoBackFill />
      </div>
      <div className="h-[64px] max-[1200px]:hidden" />
      <div className="text-3xl font-semibold my-2">
        <p>판매, 입찰 내역</p>
      </div>
      <div className="border-2 border-[#D1B383]" />
      <div className="my-5">
        <div className="flex items-center">
          {categories.map((category, index) => (
            <div key={index} className={`flex justify-center items-center mr-2 w-[70px] h-[35px] cursor-pointer border rounded-2xl last:mr-0 ${orderIndex === index ? 'bg-black text-white' : 'text-black'}`} onClick={() => setOrderIndex(index)}>
              <p>{category}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        {orderIndex === 0 ? <Sale /> : <Bidding />}
      </div>
    </div>
  )
}

export default Orders