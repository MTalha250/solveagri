/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*", // Make sure to match the correct path from Strapi
      },
    ],
  },
};

export default nextConfig;
