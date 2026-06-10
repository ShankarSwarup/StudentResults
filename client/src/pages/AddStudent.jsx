import React, { useState } from 'react';
import API from '../services/api';
import '../styles/theme.css';

const AddStudent = () => {
    const [formData, setFormData] = useState({
        name: '', reg: '', dob: '', email: '', phn: '',
        gender: '', address: '', year: '', depart: ''
    });
    const [status, setStatus] = useState({ msg: '', isErr: false });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ msg: '', isErr: false });
        try {
            const { data } = await API.post('/users/add-student', formData);
            if (data.status === 'ok') {
                setStatus({ msg: 'Student added successfully!', isErr: false });
                setFormData({ name: '', reg: '', dob: '', email: '', phn: '', gender: '', address: '', year: '', depart: '' });
            }
        } catch (err) {
            setStatus({ msg: err.response?.data?.message || 'Failed to add student', isErr: true });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Add New Student</h2>

            {status.msg && (
                <div style={{
                    padding: '1rem',
                    borderRadius: '10px',
                    marginBottom: '2rem',
                    background: status.isErr ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                    color: status.isErr ? 'var(--accent)' : '#10b981',
                    border: `1px solid ${status.isErr ? 'var(--accent)' : '#10b981'}`
                }}>
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input name="name" className="input-field" style={{ width: '100%' }} onChange={handleChange} value={formData.name} required />
                </div>
                <div className="form-group">
                    <label>Registration Number</label>
                    <input name="reg" className="input-field" style={{ width: '100%' }} onChange={handleChange} value={formData.reg} required />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input name="email" type="email" className="input-field" style={{ width: '100%' }} onChange={handleChange} value={formData.email} required />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input name="phn" className="input-field" style={{ width: '100%' }} onChange={handleChange} value={formData.phn} required />
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <select name="depart" className="input-field" style={{ width: '100%' }} onChange={handleChange} value={formData.depart} required>
                        <option value="">Select Dept</option>
                        <option value="CSE">Computer Science</option>
                        <option value="ECE">Electronics</option>
                        <option value="ME">Mechanical</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Academic Year</label>
                    <input name="year" className="input-field" style={{ width: '100%' }} onChange={handleChange} value={formData.year} required />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input name="dob" type="date" className="input-field" style={{ width: '100%' }} onChange={handleChange} value={formData.dob} required />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" className="input-field" style={{ width: '100%' }} onChange={handleChange} value={formData.gender} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Residential Address</label>
                    <textarea name="address" className="input-field" style={{ width: '100%', minHeight: '100px' }} onChange={handleChange} value={formData.address} required />
                </div>
                <button className="btn-primary" style={{ gridColumn: 'span 2', marginTop: '1rem' }} disabled={loading}>
                    {loading ? 'Adding...' : 'Enroll Student'}
                </button>
            </form>
        </div>
    );
};

export default AddStudent;
