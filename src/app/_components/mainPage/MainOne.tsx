'use client';

import { useState } from "react";

const MainOne = () => {
  const [activeItem, setaActiveItem] = useState(1);

  const data = [
    {
      id: 1,
      url: `/images/mainTopImage01.jpg`,
      name: '삼성 노트북',
      topicList: 100,
      shortName: '노트북',
    },
    {
      id: 2,
      url: `/images/mainTopImage02.jpeg`,
      name: '카메라',
      topicList: 120,
      shortName: '카메라',
    },
    {
      id: 3,
      url: '/images/mainTopImage03.png',
      name: '나이키 가방',
      topicList: 150,
      shortName: '가방',
    }
  ]

  const handleHover = (id: number) => {
    if (activeItem === id) {
      return;
    }
    setaActiveItem(id);
  }

  const handleHoverLeave = () => {
    if (activeItem === 1) {
      return;
    }
    setaActiveItem(1);
  }
  return (
    <div className="mt-[3px]">
      <section className="relative w-full h-[calc(100vh-130px)] flex justify-center items-center bg-[#fcfbfb]">
        <div className="w-[1300px]">
          <div className="w-full h-full flex justify-between">
            <div className="text-4xl relative">
              <div className="leading-[80px] text-[80px] text-nowrap">
                <div>오늘의</div>
                <div>경매</div>
                <div>물품</div>
              </div>
              <div className="absolute bottom-[60px] h-[120px] w-[450px] z-10 flex items-center justify-between transition-all duration-[0.4s] ease-out shadow-lg hover:transition-all hover:ease-linear hover:shadow-lg">
                <input className="grow h-[120px] outline-none border-none pl-12 text-xl placeholder:text-xl 
                placeholder:text-[#1e1e2f] placeholder:font-[arial] placeholder:transition-all placeholder:duration-[0.4s]
                focus:placeholder:transition-all focus:placeholder:duration-[0.4s] focus:placeholder:ease-out focus:placeholder:opacity-50
                " placeholder="Find your passion" />
                <button className="h-full aspect-square outline-none border-none text-[34px] font-semibold font-[arial] 
                bg-gradient-to-t from-[#97c680] to-[#feba88] bg-[length:100%_300%] bg-left-top
                transition-all duration-[0.3s] ease-out select-none cursor-pointer
                hover:bg-left-bottom hover:transition-all hover:duration-[0.3s] hover:ease-out">Go</button>
              </div>
            </div>
            <div className="flex flex-row items-stretch overflow-hidden min-w-[600px] max-w-[960px] w-[calc(100%-100px)] h-[70vh]">
              {
                data.map((item) => (
                  <div
                    key={item.id}
                    className={`relative overflow-hidden min-w-[150px] cursor-pointer rounded-[20px] py-0 px-5 ${item.id === activeItem ? 'grow-[4]' : 'grow-[1]'} transition-all duration-[0.3s] ease-out`}
                    onMouseOver={() => handleHover(item.id)}
                    onMouseLeave={() => handleHoverLeave()}
                  >
                    <div style={{ backgroundImage: `url(${item.url})`, backgroundSize: 'cover' }}
                      className={`relative w-full h-full bg-top  ${item.id === activeItem ? 'bg-120-percent' : 'bg-auto-size'} rounded-[20px] transition-all duration-[0.3s] ease-out
                    after:content-[''] after:block after:absolute after:h-1/2 after:w-full after:left-0 after:bottom-0 after:bg-gradient-to-t from-[rgba(0, 0, 0, 0)] to-[rgba(0, 0, 0, 0.7)]
                    `}>
                      <div className={`box-border absolute bottom-20 h-20 w-full flex items-center justify-between z-[1] py-0 px-10 ${item.id === 1 ? 'pl-[130px]' : 'pl-10'}
                      transition-all duration-[0.3s] ease-out ${item.id === activeItem ? 'opacity-100' : 'opacity-0'}
                      `}>
                        <div className="text-[34px] text-[#fff] font-semibold break-keep h-full w-[10vw]">{item.name}</div>
                        <div className="text-center text-[#fff]">
                          <div className="text-[52px] leading-none">{item.topicList}</div>
                          <div className="uppercase">Topics</div>
                        </div>
                      </div>
                      <div className={`w-[120px] h-[120px] bg-[#1e1e2f] text-[#fff] absolute left-0 bottom-[60px] z-[1] transition-all duration-[0.3s] ease-out ${item.id === activeItem ? 'opacity-0' : 'opacity-100'} ${item.id === 1 ? 'hidden' : 'block'}`}>
                        <div className="text-[34px] -rotate-90">{item.shortName}</div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MainOne