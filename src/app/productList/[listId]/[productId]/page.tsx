import ProductDetailForm from "@/components/productDetail/ProductDetailForm";


export async function generateStaticParams() {
  const listIds = ['detail'];
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auctions/`, { method: 'GET' }).then((res) => res.json()).then((data) => data);
  return response.map((item: any) => (
    {
      listId: listIds.toString(),
      productId: `${item.product_id}id=${item.id}`.toString(),
      fallback: true
    }
  ));
}

const ProductDetail = ({ params }: { params: { listId: string, productId: string } }) => {
  const auctionId = params.productId.split('3D')[1];
  const productId = params.productId.split('id')[0];
  return (
    <>
      <ProductDetailForm auctionId={auctionId} productId={productId} />
    </>
  )
}

export default ProductDetail