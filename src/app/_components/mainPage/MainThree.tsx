import Image from "next/image"

const MainThree = () => {

  const data = [
    {
      id: 1,
      name: '플스5',
      image: '/images/mainImage.png',
      date: '2',
      grade: 'S',
      minPrice: '400,000',
      price: '450,000',
      views: '52',
      likes: '32',
    },
    {
      id: 2,
      name: '노트북',
      image: '/images/mainTopImage01.jpg',
      date: '1',
      grade: 'A',
      minPrice: '330,000',
      price: '350,000',
      views: '22',
      likes: '12',
    },
    {
      id: 3,
      name: '카메라',
      image: '/images/mainTopImage02.jpeg',
      date: '3',
      grade: 'A',
      minPrice: '730,000',
      price: '820,000',
      views: '32',
      likes: '42',
    },
    {
      id: 4,
      name: '나이키 가방',
      image: '/images/mainTopImage03.png',
      date: '3h',
      grade: 'A',
      minPrice: '30,000',
      price: '40,000',
      views: '12',
      likes: '2',
    },
  ]


  return (
    <div className="w-full flex items-center">
      <div className="w-full max-w-[1200px] my-0 mx-auto">
        <div className="mt-[130px]">
          <p className="text-5xl ml-[14px]">경매 상품</p>
        </div>
        <div className="flex flex-wrap my-[130px]">
          {data.map((item) => (
            <div key={item.id} className="w-[252px] h-[361px] m-[14px]">
              <Image src={item.image} width={252} height={252} className="w-full h-[252px] rounded-xl" alt="경매 아이템 사진" priority />
              <div className="mt-[15px] flex items-center justify-between">
                <p className="text-base">{item.name}</p>
                <div className="flex items-center">
                  <div className={`w-[60px] h-[29px] rounded-[20px] ${item.date === '3h' ? 'bg-[red]' : 'bg-[#8BF182]'} ${item.date === '3h' ? 'text-white' : 'text-black'} flex justify-center items-center mr-[5px]`}>{item.date === '3h' ? '단기' : '여유'}</div>
                  <div className="w-[60px] h-[29px] rounded-[20px] bg-[#685BFF] flex justify-center items-center">{item.grade}</div>
                </div>
              </div>
              <div className="mt-[8px]">
                <p className="leading-none mt-[2px]">최소 입찰가 {item.minPrice}원</p>
                <p className="leading-none  mt-[2px]">현재 입찰가 {item.price}원</p>
              </div>
              <div className="flex items-center text-[#A19C9C]">
                <p className="leading-none mt-[2px]">조회수 {item.views}</p>
                <p className="leading-none mt-[2px]">찜 {item.likes}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default MainThree