import React, { useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext';

const NotificationContainer = () => {
    const { notifications, removeNotification } = useContext(NotificationContext);

    if (notifications.length === 0) return null;

    return (
        <div className="notification-container">
            {notifications.map(note => (
                <div key={note.id} className={`notification-toast ${note.isErr ? 'toast-error' : 'toast-success'}`}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.4 }}>{note.msg}</span>
                    <button 
                        onClick={() => removeNotification(note.id)}
                        className="toast-close"
                    >
                        &times;
                    </button>
                </div>
            ))}
            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default NotificationContainer;
