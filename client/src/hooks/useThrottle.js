import { useRef, useCallback } from 'react';

/**
 * Custom hook for throttling a function execution.
 * @param {Function} callback The callback to throttle.
 * @param {number} delay The throttle interval in milliseconds.
 * @returns {Function} The throttled function.
 */
const useThrottle = (callback, delay = 500) => {
    const lastExecuted = useRef(0);
    const timeoutRef = useRef(null);

    const throttledFunction = useCallback((...args) => {
        const now = Date.now();
        const timeSinceLastExecution = now - lastExecuted.current;

        if (timeSinceLastExecution >= delay) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            callback(...args);
            lastExecuted.current = now;
        } else if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
                callback(...args);
                lastExecuted.current = Date.now();
                timeoutRef.current = null;
            }, delay - timeSinceLastExecution);
        }
    }, [callback, delay]);

    return throttledFunction;
};

export default useThrottle;
