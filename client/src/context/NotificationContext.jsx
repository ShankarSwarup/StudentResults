import React, { createContext, useReducer, useCallback, useMemo } from 'react';

// 1. Initial State
const initialState = [];

// 2. Reducer Function
const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return [...state, action.payload];
        case 'REMOVE_NOTIFICATION':
            return state.filter(notification => notification.id !== action.payload);
        default:
            return state;
    }
};

// 3. Create Context
export const NotificationContext = createContext();

// 4. Provider Component
export const NotificationProvider = ({ children }) => {
    const [notifications, dispatch] = useReducer(notificationReducer, initialState);

    // Helper to add a notification
    const notify = useCallback((msg, isErr = false) => {
        const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
        
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: { id, msg, isErr }
        });

        // Auto-remove after 4 seconds
        setTimeout(() => {
            dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
        }, 4000);
    }, []);

    const removeNotification = useCallback((id) => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    }, []);

    // Memoize the value to avoid unnecessary re-renders of the entire app
    const contextValue = useMemo(() => ({
        notifications,
        notify,
        removeNotification
    }), [notifications, notify, removeNotification]);

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    );
};
