import MyPageMyBidding from "@/components/myPage/MyPageMyBidding";
import MyPageMyProducts from "@/components/myPage/MyPageMyProducts";
import MyPageMySale from "@/components/myPage/MyPageMySale";
import MyPageProfile from "@/components/myPage/MyPageProfile";
import MyPageWishList from "@/components/myPage/MyPageWishList";

const MyPage = () => {
  return (
    <div className="w-[900px]">
      <MyPageProfile />
      <MyPageWishList />
      <MyPageMyBidding />
      <MyPageMySale />
      <MyPageMyProducts />
    </div>
  )
}

export default MyPage