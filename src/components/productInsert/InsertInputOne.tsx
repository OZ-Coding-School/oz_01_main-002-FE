import { IoIosArrowDown } from "react-icons/io";

type InsertInputOneProps = {
  clicked: boolean,
  devOnclick: () => void,
  ref: any,
  title: string,
  option: { label: string, value: number }[],
  liOnclick: () => void,
}

const InsertInputOne = ({ clicked, devOnclick, ref, title, option, liOnclick }: InsertInputOneProps) => {
  return (
    <div className={`w-[259px] h-[72px] cursor-pointer px-4 text-white border-[#D1B383] focus:border-white flex items-center justify-between rounded-xl border text-center relative ${clicked ? 'border-white' : 'border-[#D1B383]'}`} onClick={devOnclick}>
      <IoIosArrowDown className="opacity-0" />
      {title}
      <IoIosArrowDown />
      {clicked ? <ul className="bg-white absolute border w-[259px] left-0 top-[72px] h-[200px] overflow-auto rounded-xl scrollbar-hide" ref={ref}>
        {option.map((item, index) => (
          <li key={index} className={`w-full box-border hover:bg-[#D1B383] text-black hover:text-white text-lg border-b leading-10 flex items-center justify-center first:rounded-t-xl last:rounded-b-xl last:border-b-0 cursor-pointer`} onClick={liOnclick}>{item.label}</li>
        ))}
      </ul> : null}
    </div>
  )
}

export default InsertInputOne