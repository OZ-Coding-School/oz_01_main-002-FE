import ProductInsertButton from "@/components/product/ProductInsertButton";
import ProductListCategories from "@/components/product/ProductListCategories";
import ProductListForm from "@/components/product/ProductListForm";

export async function generateStaticParams() {
  const listIds = ['detail', 'list', '2', '3', '4', '5', '6', '7', '8', '9'];
  return listIds.map(listId => ({
    listId: listId.toString(),
  }));
}

const ProductList = ({ params }: { params: { listId: string } }) => {
  const paramsId = params.listId;

  return (
    <div className="bg-[#222] w-full">
      <div className="h-[40px]" />
      <ProductListCategories />
      <ProductListForm paramsId={paramsId} />
      <ProductInsertButton />
    </div>
  )
}

export default ProductList