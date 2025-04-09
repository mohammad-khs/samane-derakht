/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.pixabay.com",
      "treeone.liara.run",
      "api.derakhtman.irhttps",
      "api.derakhtman.ir",
      "s3.ir-thr-at1.arvanstorage.ir",
      process.env.NEXT_PUBLIC_API_BASE_URL,
    ],
  },

  reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
