/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "medicare-bucket-001.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/",
      },
      {
        protocol: "https",
        hostname: "www.inspiredtaste.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.sidechef.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "static.onecms.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.allrecipes.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig
