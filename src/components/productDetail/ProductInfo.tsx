
type ProductInfoProps = {
  productGrade: string
  productName: string
  ProductCategory: string
  ProductBidPrice: number
  ProductFinalPrice: number
}

const ProductInfo = ({ productGrade, productName, ProductCategory, ProductBidPrice, ProductFinalPrice }: ProductInfoProps) => {
  return (
    <div className="w-full m-3 max-[1255px]:m-0 max-[1255px]:pl-3 max-[855px]:pl-0">
      <div className="flex items-center my-2">
        <div className="mr-2">
          <p className="text-4xl text-white">{productGrade}</p>
        </div>
        <div>
          <p className="text-4xl text-white">{productName}</p>
        </div>
      </div>
      <div className="w-full border border-[#868686]" />
      <div className="flex justify-between">
        <div className=" flex items-center my-4">
          <p className="text-[#D1B383] text-[20px] leading-none">카테고리</p>
          <p className="text-white text-[20px] leading-none ml-11 max-[640px]:ml-5 ">{ProductCategory}</p>
        </div>
        <div className="m-3">
          <div className=" flex justify-between  items-center my-4">
            <p className="text-[#D1B383] text-[20px] leading-none">시작가</p>
            <p className="text-white text-[20px] leading-none ml-16">{ProductBidPrice.toLocaleString()}원</p>
          </div>
          <div className="flex justify-between items-center my-4">
            <p className="text-[#D1B383] text-[20px] leading-none">현재가</p>
            <p className="text-white text-[20px] leading-none ml-16">{ProductFinalPrice.toLocaleString()}원</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo