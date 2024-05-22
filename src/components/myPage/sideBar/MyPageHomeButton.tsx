'use client';
import { useMenuNumberStore } from '@/store';

const MyPageHomeButton = () => {
  const { setMenuNumber } = useMenuNumberStore();
  return (
    <div className="cursor-pointer" onClick={() => setMenuNumber(0)}>
      <p className="text-white text-5xl font-semibold">마이 페이지</p>
    </div>
  )
}

export default MyPageHomeButton