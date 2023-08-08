/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "surl.li",
      "assets.nflxext.com",
      "image.tmdb.org",
      "assets.nflxext.com",
      "occ-0-2991-2164.1.nflxso.net"
    ],
  },
};

module.exports = nextConfig;
