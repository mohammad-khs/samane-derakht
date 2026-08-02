/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.pixabay.com",
      "treeone.liara.run",
      "api.derakhtman.ir",
      "s3.ir-thr-at1.arvanstorage.ir",
      "placehold.co",
      process.env.NEXT_PUBLIC_API_BASE_URL,
    ],
  },

  reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
