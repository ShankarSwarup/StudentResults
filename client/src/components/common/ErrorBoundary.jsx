import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service here
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ 
                    minHeight: '100vh', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: '2rem', 
                    textAlign: 'center' 
                }}>
                    <div className="glass-card" style={{ maxWidth: '600px', width: '100%' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>Something went wrong.</h2>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>
                            We apologize for the inconvenience. Our system encountered an unexpected error while rendering this page.
                        </p>
                        
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button 
                                className="btn-primary" 
                                onClick={() => window.location.href = '/'}
                            >
                                Return to Dashboard
                            </button>
                            <button 
                                className="btn-secondary" 
                                onClick={() => window.location.reload()}
                            >
                                Reload Page
                            </button>
                        </div>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div style={{ marginTop: '2.5rem', textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px', overflowX: 'auto' }}>
                                <p style={{ color: 'var(--accent)', fontWeight: 'bold', marginBottom: '0.5rem' }}>{this.state.error.toString()}</p>
                                <pre style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{this.state.errorInfo?.componentStack}</pre>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
