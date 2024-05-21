import { ChangeEvent, Dispatch, SetStateAction } from "react";

type UserInfoInputProps = {
  title: string,
  id: string,
  isDisabled?: boolean,
  changeButton?: () => void
  userUpdate?: {
    userNickname: string,
    userPhone: string
  },
  setUserUpdate?: Dispatch<SetStateAction<{
    userNickname: string;
    userPhone: string;
  }>>;
}

const UserInfoInput = ({ title, id, isDisabled, userUpdate, setUserUpdate, changeButton }: UserInfoInputProps) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setUserUpdate && userUpdate) {
      if (title === '닉네임') {
        setUserUpdate({
          ...userUpdate,
          userNickname: e.target.value
        });
      } else if (title === '연락처') {
        setUserUpdate({
          ...userUpdate,
          userPhone: e.target.value
        });
      }
    }
  };
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="my-2">{title}</label>
      <div className="relative w-[500px]">
        <input type="text" id={id} disabled={title === '닉네임' || title === '연락처' ? isDisabled : true} value={title === '닉네임' ? userUpdate?.userNickname : title === '연락처' ? userUpdate?.userPhone : ''} className="border outline-none w-full h-[50px] rounded-[10px] bg-white pl-4" onChange={(e) => handleChange(e)} />
        <button className={`absolute w-[50px] h-[35px] rounded-lg right-2 top-[50%] transform -translate-y-1/2 border ${title === '닉네임' || title === '연락처' ? 'block' : 'hidden'}`} onClick={changeButton}>{isDisabled ? '변경' : '취소'}</button>
      </div>
    </div>
  )
}

export default UserInfoInput