interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <section className="flex items-center w-full max-w-6xl gap-4 p-4">
      <p>{description}</p>
    </section>
  );
};

export default ProductDescription;
