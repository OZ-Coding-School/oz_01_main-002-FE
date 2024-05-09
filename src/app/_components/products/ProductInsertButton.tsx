import Link from 'next/link'

const ProductInsertButton = () => {
  return (
    <Link href='/productInsert'>
      <div className="w-[80px] h-[80px] fixed flex items-center justify-center text-white bottom-[50px] right-[150px] cursor-pointer rounded-full 
        bg-[red] hover:scale-105 transition-all duration-[0.3s] ease-out">
        물품등록
      </div>
    </Link>
  )
}

export default ProductInsertButton