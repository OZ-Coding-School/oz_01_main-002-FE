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
        <Link href={'/productInsert/1'}>
          <div className="fixed bottom-16 right-40 w-[80px] h-[80px] z-40 flex justify-center items-center hover:scale-105 hover:bg-white hover:text-[#D1B383] rounded-full bg-[#D1B383] text-white transition-all duration-[0.3s] ease-out">물품등록</div>
        </Link>
      }
    </>
  )
}

export default ProductInsertButton