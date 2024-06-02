/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "mpg-image-bucket.s3.amazonaws.com",
    ],
    unoptimized: true,
  },
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/:path((?!.*\\.html$).*)", // 모든 경로에서 .html이 없는 경우
        destination: "/:path.html", // .html 확장자를 추가
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/:path*.html", // .html 확장자를 포함한 경로
        destination: "/:path*", // 실제 파일 경로에서 .html 제거
      },
    ];
  },
};

export default nextConfig;
