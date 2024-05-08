import Image from "next/image";

const ProductDetail = () => {
  return (
    <main>
      <div className="flex justify-center gap-4 p-8">
        {/* 이미지 갤러리 섹션 */}
        <section className="flex flex-col w-3/5 gap-4">
          <div className="w-{10}">
            <Image
              src="/images/cat-5183427_1280.jpg"
              alt=""
              width={500}
              height={300}
            />
            <Image
              src="/images/cat-5183427_1280.jpg"
              alt=""
              width={500}
              height={300}
            />
            <Image
              src="/images/cat-5183427_1280.jpg"
              alt=""
              width={500}
              height={300}
            />
          </div>
          <div className="w-{50}">
            <Image
              src="/images/cat-5183427_1280.jpg"
              alt=""
              width={500}
              height={300}
            />
          </div>
        </section>
        {/* 상품 정보 섹션 */}
        <section>
          {/* 상품등급, 상품명, 카테고리, 시작가, 현재가, 마감시간, 남은 시간 */}
          <div>
            <span>상품등급</span>
            <h2>상품명</h2>

            <ul>
              <li>
                <label htmlFor="category">카테고리:</label>
                <span>신발</span>
              </li>
              <hr />
              <li>
                <label htmlFor="starting-price">시작가:</label>
                <span>100,000원</span>
              </li>
              <li>
                <label htmlFor="current-price">현재가:</label>
                <span>120,000원</span>
              </li>
              <li>
                <label htmlFor="closing-time">마감시간:</label>
                <span>2024년 5월 15일 18시</span>
              </li>
              <li>
                <span>3일 12시간 5분 </span>
                <button>입찰하기</button>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <hr />
      {/* 작성자 정보 섹션 */}
      <section>
        {/* 작성자 프로필 이미지, 작성자 닉네임, 작성자 소개글 */}
        <Image
          src="/images/cat-5183427_1280.jpg"
          alt=""
          width={100}
          height={100}
        />
        <h3>작성자 닉네임</h3>
        <p>작성자 소개글</p>
      </section>
      <hr />
      {/* 상품 설명 섹션 */}
      <section>
        <p>작성자가 작성한 설명</p>
      </section>
      <hr />
      {/* 주의사항 안내 섹션 */}
      <section>
        <p>주의사항 안내</p>
      </section>
    </main>
  );
};

export default ProductDetail;
