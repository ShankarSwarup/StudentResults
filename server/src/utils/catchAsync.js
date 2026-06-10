/**
 * Wraps async functions to catch errors and pass them to the global error handler.
 * Removes the need for repetitive try/catch blocks in controllers.
 */
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
