interface ProductNoticeProps {
  content: string;
}

const ProductNotice = ({ content }: ProductNoticeProps) => {
  return (
    <section className="flex items-center w-full max-w-6xl gap-4 p-4">
      <p>{content}</p>
    </section>
  );
};

export default ProductNotice;
