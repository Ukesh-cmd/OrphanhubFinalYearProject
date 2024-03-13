/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}

module.exports = nextConfig



module.exports = {
    async rewrites() {
        return [{
            source: '/api/register', // Your Next.js API endpoint for sign-up
            destination: '/api/register', // The proxy middleware you've created
        }, ];
    },
};