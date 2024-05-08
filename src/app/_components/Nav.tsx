import Link from "next/link"

const Nav = () => {
  return (
    <div className="w-full h-[130px] flex justify-between max-w-[1200px] items-center my-0 mx-auto">
      <Link href='/'>메인</Link>
      <Link href='/productList'>경매 리스트</Link>
      <Link href='/productList/id'>경매 디테일 페이지</Link>
    </div>
  )
}

export default Nav