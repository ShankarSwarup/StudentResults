import React, { useState } from 'react';
import API from '../services/api';
import '../styles/theme.css';

const AddSubject = () => {
    const [formData, setFormData] = useState({ subj: '', cod: '' });
    const [status, setStatus] = useState({ msg: '', isErr: false });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ msg: '', isErr: false });
        try {
            const { data } = await API.post('/academic/subject', formData);
            if (data.status === 'ok') {
                setStatus({ msg: 'Course registered successfully!', isErr: false });
                setFormData({ subj: '', cod: '' });
            }
        } catch (err) {
            setStatus({ msg: err.response?.data?.message || 'Failed to add course', isErr: true });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Define Master Course</h2>

                {status.msg && (
                    <div style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '2.5rem',
                        background: status.isErr ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: status.isErr ? 'var(--accent)' : '#10b981',
                        border: `1px solid ${status.isErr ? 'var(--accent)' : '#10b981'}`
                    }}>
                        {status.msg}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label>Course Name</label>
                        <input className="input-field" style={{ width: '100%' }} placeholder="e.g. Distributed Computing" value={formData.subj} onChange={e => setFormData({ ...formData, subj: e.target.value })} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                        <label>Course Code</label>
                        <input className="input-field" style={{ width: '100%' }} placeholder="e.g. CS-4001" value={formData.cod} onChange={e => setFormData({ ...formData, cod: e.target.value })} required />
                    </div>
                    <button className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Registering...' : 'Register Course'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddSubject;
