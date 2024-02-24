/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "res.cloudinary.com",
      "www.github.com",
      "www.brandsoftheworld.com",
      "d1yjjnpx0p53s8.cloudfront.net",
    ],
  },
};

module.exports = nextConfig;
