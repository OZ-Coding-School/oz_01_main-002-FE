import Image from "next/image";

interface ProductSellerInfoProps {
  seller: Seller;
}

type Seller = {
  profileImage: string; // 작성자 프로필 이미지
  nickname: string; // 작성자 닉네임
  content: string; // 작성자 소개글
};

const ProductSellerInfo = ({ seller }: ProductSellerInfoProps) => {
  return (
    <section className="flex items-center w-full max-w-6xl gap-4 p-4">
      {/* 작성자 프로필 이미지, 작성자 닉네임, 작성자 소개글 */}
      <Image
        src={seller.profileImage}
        alt=""
        width={100}
        height={100}
        className="rounded-full"
      />
      <h3>{seller.nickname}</h3>
      <p>{seller.content}</p>
    </section>
  );
};

export default ProductSellerInfo;
