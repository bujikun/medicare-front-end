/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "medicare-bucket-001.s3.us-east-1.amazonaws.com",
        port: "",
      },
    ],
  },
};
module.exports = nextConfig
