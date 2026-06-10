import { useState, useCallback } from 'react';

/**
 * Generic HOC-style Hook for API calls to demonstrate advanced data fetching patterns.
 * Centralizes loading, error, and data state management.
 */
const useApi = (apiFunc) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const execute = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiFunc(...args);
            setData(response.data);
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Something went wrong';
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiFunc]);

    return {
        data,
        loading,
        error,
        execute,
        setData // Expose for manual updates if needed
    };
};

export default useApi;
