import { createProxyMiddleware } from 'http-proxy-middleware';

// Define your backend API URL
const API_URL = 'http://localhost:3005/api'; // Update with your backend URL

const signUpProxy = createProxyMiddleware({
    target: API_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/register': '/api/register', // Assuming /api/signup in Next.js should point to /api/register in your backend
    },
    changeOrigin: true, // Set the log level to your preference
});

export default signUpProxy;