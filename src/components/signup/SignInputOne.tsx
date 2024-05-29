
type SignUpUserProps = {
  type: string,
  placeholder: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SignInputOne = ({ type, placeholder, value, onChange }: SignUpUserProps) => {
  return (
    <input
      type={type}
      className="w-[518px] h-[74px] max-[560px]:w-full outline-none focus:border-white border border-[#D1B383] rounded-[10px] bg-[#222] text-white pl-4"
      placeholder={placeholder}
      autoComplete="off"
      value={value}
      onChange={onChange}
    />
  )
}

export default SignInputOne