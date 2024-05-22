import Image from "next/image";

const Sale = () => {
  const products = [
    {
      id: 1,
      grade: "S",
      title: "샤넬 가방",
      img: "/images/item03.jpg",
      startPrice: "6,500,000원",
      price: "6,750,000원",
      category: "가방",
    },
    {
      id: 2,
      grade: "A",
      title: "샤넬 라운드티",
      img: "/images/item04.jpg",
      startPrice: "500,000원",
      price: "650,000원",
      category: "옷",
    },
    {
      id: 3,
      grade: "C",
      title: "나이키 신발",
      img: "/images/item05.jpg",
      startPrice: "600,000원",
      price: "640,000원",
      category: "신발",
    },
    {
      id: 4,
      grade: "S",
      title: "로렉스 시계",
      img: "/images/item01.png",
      startPrice: "14,500,000원",
      price: "15,000,000원",
      category: "시계",
    },
  ];
  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between border-b last:border-b-0"
        >
          <div className="flex items-center mt-6 mb-4">
            <div className="w-[130px] h-[130px] bg-[gray] object-cover rounded-lg relative overflow-hidden">
              <Image
                src={product.img}
                fill
                sizes="1"
                className="object-cover"
                alt="판매이미지"
              />
            </div>
            <div className="ml-4">
              <div>
                <div className="flex items-center">
                  <p>등급</p>
                  <p className="ml-2 font-bold">{product.grade}</p>
                </div>
                <p className="font-bold">{product.title}</p>
              </div>
              <div className="my-1">
                <p className="text-sm text-[#868686]">{product.category}</p>
              </div>
              <div>
                <div className="flex items-center">
                  <p className="text-sm">시작가</p>
                  <p className="ml-2 text-sm text-[#868686]">
                    {product.startPrice}
                  </p>
                </div>
                <div className="flex items-center">
                  <p>판매가</p>
                  <p className="ml-2">{product.price}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[150px] h-[50px] border flex justify-center items-center rounded-lg mr-1 cursor-pointer">
            <p>상품 보기</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sale;
