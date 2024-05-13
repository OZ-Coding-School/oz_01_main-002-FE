"use client";

const products = [
  {
    id: 1,
    name: "루이비통 가방",
    image: "/images/LuisvitonBag.webp",
    date: "1",
    grade: "A",
    minPrice: "2000000",
    price: "2500000",
    views: "23",
    likes: "12",
  },
  {
    id: 2,
    name: "미우미우 가방",
    image: "/images/miumiuBag.webp",
    date: "4",
    grade: "S",
    minPrice: "100000",
    price: "200000",
    views: "40",
    likes: "30",
  },
  {
    id: 3,
    name: "딥디크 등등",
    image: "/images/pufurm.webp",
    date: "3h",
    grade: "A",
    minPrice: "200000",
    price: "300000",
    views: "10",
    likes: "8",
  },
  {
    id: 4,
    name: "맥북 프로 14인치",
    image: "/images/macBook.webp",
    date: "1",
    grade: "S",
    minPrice: "2000000",
    price: "2500000",
    views: "100",
    likes: "43",
  },
  {
    id: 5,
    name: "플레이 스테이션 5",
    image: "/images/mainImage.png",
    date: "3h",
    grade: "A",
    minPrice: "500000",
    price: "700000",
    views: "25",
    likes: "12",
  },
  {
    id: 6,
    name: "삼성 갤럭시 북",
    image: "/images/mainTopImage01.jpg",
    date: "6",
    grade: "B",
    minPrice: "300000",
    price: "500000",
    views: "10",
    likes: "4",
  },
  {
    id: 7,
    name: "레이카 카메라",
    image: "/images/mainTopImage02.jpeg",
    date: "3",
    grade: "C",
    minPrice: "500000",
    price: "600000",
    views: "23",
    likes: "12",
  },
  {
    id: 8,
    name: "나이키 가방",
    image: "/images/mainTopImage03.png",
    date: "3h",
    grade: "D",
    minPrice: "20000",
    price: "40000",
    views: "200",
    likes: "142",
  },
];

const ProductList = () => {
  return (
    <div className="mx-[350px]">
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const formatPrice = (price) => {
  return new Intl.NumberFormat().format(price);
};

const ProductCard = ({ product }) => {
  const { name, price, minPrice, image, date, grade, views, likes } = product;
  return (
    <div>
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover rounded-lg hover:filter"
        />

        <div className="flex justify-between m-1">
          <h3 className="text-xl font-semibold">{name}</h3>
          <div className=" flex">
            <div
              className={`w-[60px] h-[29px] rounded-[20px] ${
                date === "3h" ? "bg-[red]" : "bg-[#8BF182]"
              } ${
                date === "3h" ? "text-white" : "text-black"
              } flex justify-center items-center mr-[5px]`}
            >
              {date === "3h" ? "단기" : "여유"}
            </div>
            <div
              className={`w-[60px] h-[29px] rounded-[20px] flex justify-center items-center ${
                {
                  S: "bg-[#685BFF] text-white",
                  A: "bg-[#FbcF28] text-black",
                  B: "bg-[#FaaF24] text-black",
                  C: "bg-[#D97706] text-white",
                  D: "bg-gray-400 text-white",
                }[grade]
              }`}
            >
              {grade}
            </div>
          </div>
        </div>
      </div>
      <div className="text-lg mt-1">
        <p>입찰시작가 : {formatPrice(minPrice)}원</p>
        <p>즉시입찰가 : {formatPrice(price)}원</p>
      </div>
      <div className="flex justify-around text-slate-500">
        <p className="text-start">조회수 : {views}</p>
        <p className="text-start">좋아요 : {likes}</p>
      </div>
    </div>
  );
};

export default ProductList;
