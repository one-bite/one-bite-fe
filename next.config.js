/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
        },
        level: "verbose", // 'error' | 'warn' | 'info' | 'verbose'
    },
};

module.exports = nextConfig;
