'use client';

import Image from "next/image";
import { useState } from "react";

const DetailImage = () => {

  const imageList = [
    { id: 1, image: '/images/cate04.jpg' },
    { id: 2, image: '/images/cate05.png' },
    { id: 3, image: '/images/cate06.png' },
  ]
  const [images, setImages] = useState(imageList[0].image);

  return (
    <div className="flex items-center flex-wrap-reverse">
      <div className="max-[855px]:flex">
        {imageList.map((image, index) => (
          <div key={image.id} className="w-[150px] h-[120px] max-[1255px]:w-[200px] max-[1255px]:h-[170px] max-[855px]:w-[184.6px] max-[855px]:h-[100px] max-[640px]:w-[134.6px] max-[640px]:h-[80px] max-[855px]:first:ml-0 max-[855px]:last:mr-0  m-3 object-cover relative rounded-lg overflow-hidden cursor-pointer">
            <Image src={image.image} fill sizes="1" className="object-cover" alt={`작은 이미지${index}`} onClick={() => setImages(image.image)} />
          </div>
        ))}
      </div>
      <div className="w-[474px] h-[384px] my-3 max-[1255px]:w-[602px] max-[1255px]:h-[534px] max-[640px]:w-[452px] max-[640px]:h-[384px] object-cover rounded-lg relative overflow-hidden">
        <Image src={images} fill sizes="1" className="object-cover" alt="메인 이미지" />
      </div>
    </div>
  )
}

export default DetailImage