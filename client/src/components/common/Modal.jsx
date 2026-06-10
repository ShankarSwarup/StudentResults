import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

/**
 * Reusable Modal component using React Portals to demonstrate 
 * breakout rendering outside the standard DOM hierarchy.
 */
const Modal = ({ isOpen, onClose, title, children }) => {
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    // Use Portals to render the modal at the end of the body tag
    return ReactDOM.createPortal(
        <div 
            className="modal-overlay fade-in" 
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '1rem'
            }}
        >
            <div 
                className="glass-card modal-content" 
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: '600px',
                    width: '100%',
                    position: 'relative',
                    padding: '2.5rem',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{title}</h3>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-dim)',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            lineHeight: 1
                        }}
                    >
                        &times;
                    </button>
                </div>
                
                <div className="modal-body">
                    {children}
                </div>
                
                <div style={{ marginTop: '2.5rem', textAlign: 'right' }}>
                    <button className="btn-secondary" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
