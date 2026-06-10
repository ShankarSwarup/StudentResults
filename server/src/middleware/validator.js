const AppError = require('../utils/appError');

/**
 * Generic Joi Validation Middleware
 * Validates request data against a provided schema for a specific location (body, params, query).
 */
const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        
        if (error) {
            const message = error.details.map(detail => detail.message).join(', ');
            return next(new AppError(message, 400));
        }
        
        next();
    };
};

module.exports = validate;
