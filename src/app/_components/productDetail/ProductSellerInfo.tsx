import Image from "next/image";

const ProductSellerInfo = () => {
  return (
    <section className="flex items-center w-full max-w-6xl gap-4 p-4">
      {/* 작성자 프로필 이미지, 작성자 닉네임, 작성자 소개글 */}
      <Image
        src="/images/cat-5183427_1280.jpg"
        alt=""
        width={100}
        height={100}
        className="rounded-full"
      />
      <h3>작성자 닉네임</h3>
      <p>작성자 소개글</p>
    </section>
  );
};

export default ProductSellerInfo;
