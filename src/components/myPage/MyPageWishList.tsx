import MoreButton from './MoreButton'

const MyPageWishList = () => {
  return (
    <div className="w-full border rounded-xl px-8 py-4 bg-white mb-5">
      <div className="flex items-center">
        <p className="text-[24px] font-semibold">관심상품</p>
        <MoreButton />
      </div>
      <div className="mt-5 ml-7 flex items-center">
        <div className="flex flex-col justify-center items-center mr-5">
          <div className="flex items-center text-[#4078FF] justify-center w-[70px] h-[70px] rounded-[12px] border">0건</div>
          <p className="mt-3">입찰중</p>
        </div>
      </div>
    </div>
  )
}

export default MyPageWishList