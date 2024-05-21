'use client';

import { useMenuNumberStore } from '@/store';

type SideMenuButtonProps = {
  menu: {
    id: number;
    icon: JSX.Element;
    title: string;
    value: string;
  }
}

const SideMenuButton = ({ menu }: SideMenuButtonProps) => {
  const { menuNumber, setMenuNumber } = useMenuNumberStore();
  return (
    <div className={`box-border my-2 px-8 w-full h-[72px] ${menuNumber === menu.id ? 'bg-white' : ''} cursor-pointer flex items-center rounded-xl hover:bg-white`} onClick={() => setMenuNumber(menu.id)}>
      {menu.icon}
      <p className="text-[#D1B383] text-[24px] leading-none">{menu.title}</p>
    </div>
  )
}

export default SideMenuButton