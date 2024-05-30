/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
    domains: ["mpg-image-bucket.s3.amazonaws.com"],
  },
  swcMinify: true,
};

export default nextConfig;
