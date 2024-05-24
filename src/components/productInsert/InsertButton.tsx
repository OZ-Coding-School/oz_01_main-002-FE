
type InsertButtonProps = {
  title: string,
  onClick: () => void
}

const InsertButton = ({ title, onClick }: InsertButtonProps) => {
  return (
    <button className="w-[200px] mx-2 h-[72px] bg-[#D1B383] text-white text-[20px] rounded-xl" onClick={onClick}>{title}</button>
  )
}

export default InsertButton