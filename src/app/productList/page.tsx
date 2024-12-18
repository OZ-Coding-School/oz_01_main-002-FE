"use client";

import ProductInsertButton from "@/components/product/ProductInsertButton";
import ProductListCategories from "@/components/product/ProductListCategories";
import ProductListForm from "@/components/product/ProductListForm";
import { useSearchParams } from "next/navigation";

// export async function generateStaticParams() {
//   const listIds = ['detail', 'list', '2', '3', '4', '5', '6', '7', '8', '9'];
//   return listIds.map(listId => ({
//     listId: listId.toString(),
//   }));
// }

const ProductList = ({ params }: { params: { listId: string } }) => {
  // const paramsId = params.listId;
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("name")!;
  return (
    <div className="bg-[#222] w-full">
      <div className="h-[40px]" />
      <ProductListCategories />
      <ProductListForm categoryName={categoryName} />
      <ProductInsertButton />
    </div>
  );
};

export default ProductList;
