import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import '../styles/theme.css';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [passwords, setPasswords] = useState({ pass: '', password: '', confirm: '' });
    const [status, setStatus] = useState({ msg: '', isErr: false });
    const [loading, setLoading] = useState(false);

    const isTeacher = user?.tid !== undefined;
    const userId = isTeacher ? user.tid : user.reg;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.password !== passwords.confirm) {
            setStatus({ msg: 'New passwords do not match.', isErr: true });
            return;
        }

        setLoading(true);
        setStatus({ msg: '', isErr: false });
        try {
            const endpoint = isTeacher ? '/auth/teacher/password' : '/auth/student/password';
            const { data } = await API.post(endpoint, {
                reg: userId,
                pass: passwords.pass,
                password: passwords.password
            });
            if (data.status === 'ok') {
                setStatus({ msg: 'Password updated successfully!', isErr: false });
                setPasswords({ pass: '', password: '', confirm: '' });
            }
        } catch (err) {
            setStatus({ msg: err.response?.data?.message || 'Failed to update password', isErr: true });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '3rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '4rem' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', border: '4px solid var(--glass-border)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{user?.name}</h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem' }}>{isTeacher ? 'Faculty Member' : 'Student'} — {userId}</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="glass-card" style={{ padding: '2.5rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>Personal Information</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                                <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{user?.name}</div>
                            </div>
                            <div>
                                <label style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{isTeacher ? 'Teacher ID' : 'Registration No'}</label>
                                <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{userId}</div>
                            </div>
                            {!isTeacher && (
                                <div>
                                    <label style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Department</label>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{user?.dept || 'Engineering'}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '2.5rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>Security Settings</h3>

                        {status.msg && (
                            <div style={{ padding: '1rem', borderRadius: '12px', marginBottom: '2.5rem', background: status.isErr ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: status.isErr ? 'var(--accent)' : '#10b981', border: `1px solid ${status.isErr ? 'var(--accent)' : '#10b981'}` }}>
                                {status.msg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="form-grid">
                            <div className="form-group">
                                <label>Current Password</label>
                                <input type="password" name="pass" className="input-field" style={{ width: '100%' }} placeholder="••••••••" value={passwords.pass} onChange={e => setPasswords({ ...passwords, pass: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" name="password" className="input-field" style={{ width: '100%' }} placeholder="••••••••" value={passwords.password} onChange={e => setPasswords({ ...passwords, password: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" name="confirm" className="input-field" style={{ width: '100%' }} placeholder="••••••••" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} required />
                            </div>
                            <div style={{ alignSelf: 'flex-end' }}>
                                <button className="btn-primary" style={{ width: '100%', height: '42px' }} disabled={loading}>
                                    {loading ? 'Updating Credentials...' : 'Set New Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
