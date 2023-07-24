/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "surl.li",
      "assets.nflxext.com",
      "image.tmdb.org",
      "assets.nflxext.com",
    ],
  },
};

module.exports = nextConfig;
