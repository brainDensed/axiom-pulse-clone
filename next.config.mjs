/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    experimental: {
        optimizePackageImports: ["@radix-ui/themes", "@radix-ui/react-icons"],
    },
};

export default nextConfig;
