
type ProductListCategoryProps = {
  name: string;
}
const ProductListCategory = ({ category }: { category: ProductListCategoryProps }) => {
  return (
    <div className="w-[100px] h-[50px] bg-[#D1B383] text-white rounded-full flex justify-center items-center mx-[27.5px]">{category.name}</div>
  )
}

export default ProductListCategory