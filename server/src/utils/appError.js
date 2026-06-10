/**
 * Custom Error Class to handle operational errors in Express.
 * Extends the native Error object to include statusCode and status (fail/error).
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Distinguishes from programming/unknown bugs

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
