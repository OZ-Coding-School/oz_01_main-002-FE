
type CheckButtonProps = {
  title: string,
  onClick: () => void
};

const CheckButton = ({ title, onClick }: CheckButtonProps) => {
  return (
    <button className="w-[139px] h-[60px] max-[560px]:w-[100px] max-[560px]:text-sm rounded-[10px] bg-[#D1B383] text-white text-[16px] leading-none" onClick={onClick}>{title}</button>
  )
}

export default CheckButton