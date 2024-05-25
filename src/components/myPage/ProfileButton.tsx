import Link from "next/link"

const ProfileButton = () => {
  return (
    <Link href={'/myPage/profile'}>
      <div className="box-border border rounded-[10px] p-4 cursor-pointer font-semibold" >프로필 관리</div>
    </Link>
  )
}

export default ProfileButton