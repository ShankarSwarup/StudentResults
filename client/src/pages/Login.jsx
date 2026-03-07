import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import '../styles/theme.css';

const Login = () => {
    const [isTeacher, setIsTeacher] = useState(false);
    const [credentials, setCredentials] = useState({ lreg: '', lpassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const endpoint = isTeacher ? '/auth/teacher/login' : '/auth/student/login';
            const { data } = await API.post(endpoint, credentials);
            if (data.status === 'ok') {
                login(data);
                navigate(isTeacher ? '/teacher-dashboard' : '/student-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <style>{`
                .login-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--background);
                    padding: 1rem;
                }
                .login-card {
                    width: 100%;
                    max-width: 440px;
                }
                .tab-header {
                    display: flex;
                    margin-bottom: 2.5rem;
                    background: var(--glass-bg);
                    padding: 4px;
                    border-radius: 12px;
                }
                .tab-btn {
                    flex: 1;
                    padding: 10px;
                    border: none;
                    background: transparent;
                    color: var(--text-dim);
                    font-weight: 600;
                    cursor: pointer;
                    border-radius: 8px;
                    transition: var(--transition);
                }
                .tab-btn.active {
                    background: var(--primary);
                    color: white;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                }
                .error-msg {
                    background: rgba(244, 63, 94, 0.1);
                    color: var(--accent);
                    padding: 12px;
                    border-radius: 10px;
                    font-size: 0.875rem;
                    margin-bottom: 1.5rem;
                    border: 1px solid rgba(244, 63, 94, 0.2);
                    text-align: center;
                }
            `}</style>

            <div className="glass-card login-card fade-in">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>Access your secure academic portal</p>
                </div>

                <div className="tab-header">
                    <button
                        className={`tab-btn ${!isTeacher ? 'active' : ''}`}
                        onClick={() => setIsTeacher(false)}
                    >
                        Student
                    </button>
                    <button
                        className={`tab-btn ${isTeacher ? 'active' : ''}`}
                        onClick={() => setIsTeacher(true)}
                    >
                        Teacher
                    </button>
                </div>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>{isTeacher ? 'TEACHER ID' : 'REGISTRATION NUMBER'}</label>
                        <input
                            type="text"
                            name="lreg"
                            className="input-field"
                            placeholder={isTeacher ? 'e.g. T-101' : 'e.g. 23CS101'}
                            value={credentials.lreg}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>PASSWORD</label>
                        <input
                            type="password"
                            name="lpassword"
                            className="input-field"
                            placeholder="••••••••"
                            value={credentials.lpassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="btn-primary" style={{ width: '100%', padding: '14px' }} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In to Portal'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.875rem', color: 'var(--text-dim)' }}>
                    {isTeacher ? (
                        <p>
                            New faculty member? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700 }}>Register Account</Link>
                        </p>
                    ) : (
                        <p>
                            Trouble logging in? <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 700 }}>Contact Admin</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
