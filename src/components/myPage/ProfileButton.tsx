import Link from "next/link"

const ProfileButton = () => {
  return (
    <Link href={'/myPage/profile'}>
      <div className="box-border rounded-[10px] max-[520px]:text-sm p-4  max-[520px]:px-2 cursor-pointer font-semibold bg-[#D1B383] text-white">프로필 관리</div>
    </Link>
  )
}

export default ProfileButton