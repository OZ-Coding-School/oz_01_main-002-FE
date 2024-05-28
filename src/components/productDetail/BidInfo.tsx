
const BidInfo = () => {
  const bidPriceInfo = [
    { info: '30만원 미만', price: 20000 },
    { info: '30만원 ~ 100만원 미만', price: 50000 },
    { info: '100만원 이상 ~ 300만 미만', price: 100000 },
    { info: '300만원 이상 ~ 500만 미만', price: 200000 },
    { info: '500만원 이상 ~ 1,000만 미만', price: 500000 },
    { info: '1,000만원 이상 ~ 3,000만 미만', price: 1000000 },
    { info: '3,000만원 이상 ~ 5,000만 미만', price: 2000000 },
    { info: '5,000만원 이상 ~ 2억 미만', price: 5000000 },
    { info: '2억 이상 ~ 5억 미만', price: 10000000 },
    { info: '5억 이상', price: 20000000 },
  ]

  return (
    <div className=" p-5 bg-white rounded-lg flex justify-center ml-3 mr-6 max-[855px]:ml-0 max-[855px]:mr-0">
      <table className="border-t text-center mr-10 max-[855px]:mr-3">
        <thead >
          <tr className="bg-gray-200 font-bold text-lg  max-[1255px]:text-base max-[855px]:text-sm max-[640px]:text-[11px]">
            <th className="border border-r-white w-[300px] max-[855px]:w-[410px] max-[640px]:w-[360px]">현재가 구간 (원)</th>
            <th className="border w-[200px] h-[40px] max-[640px]:h-[35px] max-[855px]:w-[130px] max-[640px]:w-[80px]">호가 단위 (원)</th>
          </tr>
        </thead>
        <tbody>
          {bidPriceInfo.map((item, index) => (
            <tr key={index} className="border-b h-[40px] max-[640px]:h-[35px] last:border-b-0  max-[1255px]:text-sm max-[640px]:text-[11px]">
              <td className="border-r">{item.info}</td>
              <td>{item.price.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="border-t h-[100px] text-center">
        <thead>
          <tr className="bg-gray-200 font-bold text-lg max-[1255px]:text-base max-[855px]:text-sm max-[640px]:text-[11px]">
            <th className="border border-r-white w-[200px] max-[855px]:w-[130px] max-[640px]:w-[100px]">낙찰가 (원)</th>
            <th className="border w-[300px] h-[40px] max-[640px]:h-[35px] max-[855px]:w-[260px] max-[640px]:w-[275px]">수수료율 (VAT 포함)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b h-[40px] max-[640px]:h-[35px] max-[1255px]:text-sm max-[640px]:text-[11px]">
            <td className="border-r">50,000 ~ </td>
            <td>10%</td>
          </tr>
          <tr className="h-[20px]"></tr>
          <tr className="border-b h-[40px] bg-gray-100 last:border-b-0 text-start max-[1255px]:text-sm max-[640px]:text-[11px]">
            <td colSpan={2} className="p-4">
              <p>{'예시) 낙찰가 5,000만원일 경우'}</p>
              <p className="mt-2">&nbsp;{'· 낙찰 수수료 :'}</p>
              <p>&nbsp;&nbsp;&nbsp;{'50,000,000원 * 10%(0.1) = 5,000,000원'}</p>
              <p className="mt-2">{'· 총 구매대금 :'}</p>
              <p>&nbsp;&nbsp;&nbsp;{'낙찰가 + 낙찰수수료 = 55,000,000원'}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default BidInfo