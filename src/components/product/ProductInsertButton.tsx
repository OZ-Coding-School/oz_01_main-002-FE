'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const ProductInsertButton = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
  }, [])

  return (
    <>
      {
        token &&
        <Link href={'/productInsert'}>
          <div className="fixed bottom-16 right-40 max-[1260px]:right-10 w-[80px] h-[80px] max-[1260px]:h-[50px]  max-[1260px]:rounded-2xl z-40 flex justify-center items-center hover:scale-105 hover:bg-white hover:text-[#D1B383] rounded-full bg-[#D1B383] text-white transition-all duration-[0.3s] ease-out">물품등록</div>
        </Link>
      }
    </>
  )
}

export default ProductInsertButton