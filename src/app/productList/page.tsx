import ProductInsertButton from "../_components/products/ProductInsertButton";
import ProductBanner from "../_components/products/productsBanner";
import ProductList from "../_components/products/productsList";

const productPage = () => {
  return (
    <div>
      <ProductInsertButton />
      <ProductBanner />
      <div className="mt-[550px]"></div>
      <ProductList />
    </div>
  );
};

export default productPage;
