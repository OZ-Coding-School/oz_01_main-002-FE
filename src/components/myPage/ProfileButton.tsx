import Link from "next/link"

const ProfileButton = () => {
  return (
    <Link href={'/myPage/profile'}>
      <div className="box-border rounded-[10px] p-4 cursor-pointer font-semibold bg-[#D1B383] text-white">프로필 관리</div>
    </Link>
  )
}

export default ProfileButton