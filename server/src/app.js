const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const config = require('./config/config');
const connectDB = require('./config/db');
const AppError = require('./utils/appError');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const academicRoutes = require('./routes/academicRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Request logging (Only in development)
if (config.env === 'development') {
    app.use(morgan('dev'));
}

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Body limit for security

// Sanitize data against NoSQL query injection
app.use(mongoSanitize());
// Sanitize data against XSS
app.use(xss());
// Prevent HTTP Parameter Pollution
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
    max: config.rateLimitMax,
    windowMs: config.rateLimitWindowMs,
    message: 'Too many requests from this IP, please try again later!'
});
app.use('/api', limiter);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/academic', academicRoutes);
app.use('/api/v1/events', eventRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('Student Results API is running...');
});

// Handle undefined routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (config.env === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        // Production: Don't leak error details
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } else {
            // Programming or other unknown error: don't leak details
            console.error('ERROR 💥', err);
            res.status(500).json({
                status: 'error',
                message: 'Something went very wrong!'
            });
        }
    }
});

module.exports = app;
