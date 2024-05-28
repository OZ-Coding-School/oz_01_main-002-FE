import Image from "next/image"

const Footer = () => {

  const icons = [
    { src: '/images/sns1.png', alt: '페북 아이콘' },
    { src: '/images/sns2.png', alt: '인스타 아이콘' },
    { src: '/images/sns3.png', alt: '유튜브 아이콘' },
    { src: '/images/sns4.png', alt: '블로그 아이콘' },
  ]

  const footerFirst = [
    { title: '제휴 문의' },
    { title: '광고 문의' },
    { title: 'PR 문의' },
    { title: 'IR 문의' },
  ]

  const footerLast = [
    { title: '이용약관' },
    { title: '개인정보처리방침' },
    { title: '위치기반서비스 이용약관' },
    { title: '이용자보호 비전과 계획' },
    { title: '청소년보호정책' },
  ]

  return (
    <div>
      <div className="h-[155px] bg-[#222]" />
      <div className="bg-gray-100 text-gray-600 w-full h-[300px] flex items-center justify-center">
        <div className="w-full max-w-[70%] max-[1030px]:max-w-[80%] my-[30px] mx-auto">
          <div className="flex justify-between items-center">
            <div className="">
              <strong className="inline-block mt-1">대표&nbsp;</strong>
              <span className="inline-block mt-1">우리동네 경매장</span>
              <span className="text-[rgba(0, 0, 0, 0.2)]">&nbsp;|&nbsp;</span>
              <strong className="inline-block mt-1">사업자번호&nbsp;</strong>
              <span className="inline-block mt-1">010-00-00001</span>
              <br />
              <strong className="inline-block mt-1">직업정보제공사업 신고번호&nbsp;</strong>
              <span className="inline-block mt-1"> M1234567891011</span>
              <br />
              <strong className="inline-block mt-1">주소&nbsp;</strong>
              <span className="inline-block mt-1">서울시 어디구 우리집로 1길 101호</span>
              <br />
              <strong className="inline-block mt-1">전화&nbsp;</strong>
              <span className="inline-block mt-1">010-1234-0001</span>
              <span className="inline-block">&nbsp;|&nbsp;</span>
              <strong className="inline-block mt-1">고객문의&nbsp;</strong>
              <span className="inline-block mt-1">lucxury@boutique.com</span>
            </div>
            <div className="flex justify-between cursor-pointer max-[1030px]:hidden">
              {icons.map((icon, index) => (
                <div key={index} className="w-[50px] h-[50px] rounded-full mr-[30px] relative">
                  <Image src={icon.src} fill sizes="1" alt={icon.alt} />
                </div>
              ))}
            </div>
          </div>
          <br />
          <br />
          <div className="flex font-semibold cursor-pointer">
            {footerFirst.map((item, index) => (
              <div key={index}>
                <p key={index} className={`mr-[20px] hover:underline hover:text-black`}>{item.title}</p>
              </div>
            ))}
          </div>
          <br />
          <div className="flex flex-wrap font-semibold cursor-pointer">
            {footerLast.map((item, index) => (
              <p key={index} className={`mr-[20px] ${item.title === '개인정보처리방침' ? 'text-black' : ''} hover:underline hover:text-black`}>{item.title}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer