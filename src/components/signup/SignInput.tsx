
type SignUpInputProps = {
  type: string,
  placeholder: string,
  value: string | number | undefined,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const SignInput = ({ type, placeholder, value, onChange }: SignUpInputProps) => {
  return (
    <input type={type} className={`${placeholder === '코드' ? 'w-[200px] h-[50px] mr-2 max-[560px]:w-[100px]' : 'w-[372px] h-[74px] max-[560px]:w-[280px]'} outline-none focus:border-white border border-[#D1B383] rounded-[10px] bg-[#222] text-white pl-4`} maxLength={placeholder === '연락처' ? 11 : undefined} placeholder={placeholder} value={value} onChange={onChange} />
  )
}

export default SignInput