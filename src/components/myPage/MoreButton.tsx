import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
const MoreButton = () => {
  return (
    <Link href={'/myPage/wishList'}>
      <div className="w-[80px] h-[30px] bg-[#F6F6F6] flex justify-center items-center cursor-pointer rounded-full ml-7">
        <MdKeyboardArrowRight />
        <p>더보기</p>
      </div>
    </Link>
  )
}

export default MoreButton