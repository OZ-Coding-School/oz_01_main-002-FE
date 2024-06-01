/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  images: {
    domains: ["firebasestorage.googleapis.com"],
    domains: ["mpg-image-bucket.s3.amazonaws.com"],
    unoptimized: true,
  },
  swcMinify: true,
};

export default nextConfig;
