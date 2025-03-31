/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns:[{
      protocol: "https",
      pathname: "/**",
      hostname: "cdn.dummyjson.com"
    }]
  }
};

export default nextConfig;
