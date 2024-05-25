import Link from "next/link"

const MyPageHomeButton = () => {
  return (
    <Link href="/myPage">
      <div className="cursor-pointer">
        <p className="text-white text-5xl font-semibold">마이 페이지</p>
      </div>
    </Link>
  )
}

export default MyPageHomeButton