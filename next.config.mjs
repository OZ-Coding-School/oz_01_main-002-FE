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
  trailingSlash: true,
  swcMinify: true,
};

export default nextConfig;
