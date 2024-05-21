'use client';

import { useMenuNumberStore } from '@/store';

const ProfileButton = () => {

  const { setMenuNumber } = useMenuNumberStore();

  return (
    <div className="box-border border rounded-[10px] p-4 cursor-pointer font-semibold" onClick={() => setMenuNumber(5)}>프로필 관리</div>
  )
}

export default ProfileButton