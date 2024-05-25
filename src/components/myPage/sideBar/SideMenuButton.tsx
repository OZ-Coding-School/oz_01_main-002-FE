import { usePathname } from 'next/navigation';

type SideMenuButtonProps = {
  menu: {
    id: number;
    icon: JSX.Element;
    title: string;
    value: string;
    link: string;
  }
}

const SideMenuButton = ({ menu }: SideMenuButtonProps) => {
  const path = usePathname();
  return (
    <div className={`box-border my-2 px-8 w-full h-[72px] ${path === menu.link ? 'bg-white' : ''} cursor-pointer flex items-center rounded-xl hover:bg-white`}>
      {menu.icon}
      <p className="text-[#D1B383] text-[24px] leading-none">{menu.title}</p>
    </div>
  )
}

export default SideMenuButton