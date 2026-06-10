import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { NotificationContext } from '../context/NotificationContext';
import API from '../services/api';
import '../styles/theme.css';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const { notify } = useContext(NotificationContext);
    const [passwords, setPasswords] = useState({ pass: '', password: '', confirm: '' });
    const [loading, setLoading] = useState(false);

    const isTeacher = user?.tid !== undefined;
    const userId = isTeacher ? user.tid : user.reg;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.password !== passwords.confirm) {
            notify('New passwords do not match.', true);
            return;
        }

        setLoading(true);
        try {
            const endpoint = isTeacher ? '/auth/teacher/password' : '/auth/student/password';
            const { data } = await API.post(endpoint, {
                reg: userId,
                pass: passwords.pass,
                password: passwords.password
            });
            if (data.status === 'ok') {
                notify('Password updated successfully!', false);
                setPasswords({ pass: '', password: '', confirm: '' });
            }
        } catch (err) {
            notify(err.response?.data?.message || 'Failed to update password', true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-container">
            <div className="glass-card profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h2 className="profile-name">{user?.name}</h2>
                        <p className="profile-role">{isTeacher ? 'Faculty Member' : 'Student'} — {userId}</p>
                    </div>
                </div>

                <div className="profile-grid-2">
                    <div className="glass-card profile-subcard">
                        <h3 className="profile-h3">Personal Information</h3>
                        <div className="profile-info-stack">
                            <div>
                                <label className="profile-label">Full Name</label>
                                <div className="profile-value">{user?.name}</div>
                            </div>
                            <div>
                                <label className="profile-label">{isTeacher ? 'Teacher ID' : 'Registration No'}</label>
                                <div className="profile-value">{userId}</div>
                            </div>
                            {!isTeacher && (
                                <div>
                                    <label className="profile-label">Department</label>
                                    <div className="profile-value">{user?.dept || 'Engineering'}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="glass-card profile-subcard">
                        <h3 className="profile-h3">Security Settings</h3>

                        <form onSubmit={handleSubmit} className="form-grid">
                            <div className="form-group">
                                <label>Current Password</label>
                                <input type="password" name="pass" className="input-field w-full" placeholder="••••••••" value={passwords.pass} onChange={e => setPasswords({ ...passwords, pass: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" name="password" className="input-field w-full" placeholder="••••••••" value={passwords.password} onChange={e => setPasswords({ ...passwords, password: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" name="confirm" className="input-field w-full" placeholder="••••••••" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} required />
                            </div>
                            <div className="align-self-end">
                                <button className="btn-primary w-full h-42" disabled={loading}>
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
