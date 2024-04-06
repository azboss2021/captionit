/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "captionit.fun",
      },
    ],
  },
};

export default nextConfig;
