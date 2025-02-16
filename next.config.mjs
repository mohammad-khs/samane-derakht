/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.pixabay.com", "treeone.liara.run"],
  },

  reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
