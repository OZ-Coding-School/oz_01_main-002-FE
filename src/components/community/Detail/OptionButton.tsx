
type OptionButtonProps = {
  title: string;
  onClick?: () => void;
}

const OptionButton = ({ title, onClick }: OptionButtonProps) => {
  return (
    <li className={`w-full ${title === '수정하기' ? 'rounded-t-lg' : 'rounded-b-lg'} border ${title === '수정하기' ? 'border-b-0' : ''} border-[#D1B383] text-center cursor-pointer hover:bg-[#D1B383] hover:text-white`} onClick={onClick}>{title}</li>
  )
}

export default OptionButton