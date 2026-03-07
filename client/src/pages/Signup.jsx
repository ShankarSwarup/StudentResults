import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import '../styles/theme.css';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', tid: '', password: '', dept: '' });
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setStatus('');
        try {
            const { data } = await API.post('/auth/teacher/register', formData);
            if (data.status === 'ok') {
                setStatus('Account created successfully! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                    padding: 1.5rem;
                }
                .signup-card {
                    width: 100%;
                    max-width: 480px;
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
                .success-msg {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                    padding: 12px;
                    border-radius: 10px;
                    font-size: 0.875rem;
                    margin-bottom: 1.5rem;
                    border: 1px solid rgba(16, 185, 129, 0.2);
                    text-align: center;
                }
            `}</style>

            <div className="glass-card signup-card fade-in">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Faculty Registration</h2>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>Create your secure teaching profile</p>
                </div>

                {error && <div className="error-msg">{error}</div>}
                {status && <div className="success-msg">{status}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>FULL NAME</label>
                        <input type="text" name="name" className="input-field" placeholder="Dr. Shankar Swarup" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>FACULTY ID</label>
                        <input type="text" name="tid" className="input-field" placeholder="e.g. T-101" value={formData.tid} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>DEPARTMENT</label>
                        <select name="dept" className="input-field" style={{ appearance: 'none', cursor: 'pointer' }} value={formData.dept} onChange={handleChange} required>
                            <option value="" disabled>Select Department</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Information Technology">Information Technology</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>SECURE PASSWORD</label>
                        <input type="password" name="password" className="input-field" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button className="btn-primary" style={{ width: '100%', padding: '14px' }} disabled={loading}>
                        {loading ? 'Processing Registration...' : 'Complete Faculty Setup'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.875rem', color: 'var(--text-dim)' }}>
                    <p>Already registered? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700 }}>Sign In here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
