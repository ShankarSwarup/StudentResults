const dotenv = require('dotenv');
dotenv.config();

/**
 * Centralized configuration object to manage environment variables safely.
 */
module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5001,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET || 'fallback-secret-for-dev-only',
    jwtExpiresIn: '30d',
    rateLimitMax: 200,
    rateLimitWindowMs: 15 * 60 * 1000 // 15 minutes
};
