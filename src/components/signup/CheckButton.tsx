
type CheckButtonProps = {
  title: string,
  onClick: () => void
};

const CheckButton = ({ title, onClick }: CheckButtonProps) => {
  return (
    <button className="w-[139px] h-[74px] rounded-[10px] bg-[#D1B383] text-white text-[16px] leading-none" onClick={onClick}>{title}</button>
  )
}

export default CheckButton