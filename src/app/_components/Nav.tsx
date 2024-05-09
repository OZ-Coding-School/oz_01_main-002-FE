import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="w-full h-[130px] flex justify-between  items-center my-0 mx-auto px-[100px]">
      <Image
        src="/images/logo.svg"
        width={200}
        height={200}
        className="h-[200px] w-[200px]"
        alt="로고 이미지"
      />
      <div>
        <div className="text-right text-[rgba(0,0,0,0.4)]">
          <Link className="mr-[23px]" href="#">
            고객센터
          </Link>
          <Link className="mr-[23px]" href="#">
            마이페이지
          </Link>
          <Link className="mr-[23px]" href="#">
            관심
          </Link>
          <Link className="mr-[23px]" href="#">
            알림
          </Link>
          <Link className="mr-[23px]" href="#">
            로그인
          </Link>
        </div>
        <div className="w-[550px] my-6 text-2xl">
          <Link className="mr-24" href="/">
            경매
          </Link>
          <Link className="mr-24" href="/productList">
            중고
          </Link>
          <Link href="/productList/id">커뮤니티</Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
