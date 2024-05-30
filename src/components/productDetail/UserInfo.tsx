import Image from "next/image";

type UserInfoProps = {
  user: {
    user_nickname: string;
    user_content: string;
    user_image: string;
  }
}

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className="ml-3 mr-6 max-[855px]:ml-0 max-[855px]:mr-0">
      <div className="border border-[#868686] pr-3" />
      <div className=" box-border flex justify-between items-center my-2">
        <div className="flex items-center">
          <div className="w-[60px] h-[60px] bg-[#868686] rounded-full overflow-hidden relative">
            <Image src={user.user_image} fill sizes="1" className="object-cover" alt="프로필 이미지" />
          </div>
          <div className="ml-4 text-[20px] max-[640px]:text-lg text-white">
            <p>{user.user_nickname}</p>
          </div>
        </div>
        <div className="mr-8 text-white">
          <p>{user.user_content}</p>
        </div>
        <div className="w-[127.9px] max-[640px]:hidden" />
      </div>
      <div className="border border-[#868686] pr-3" />
    </div>
  )
}

export default UserInfo