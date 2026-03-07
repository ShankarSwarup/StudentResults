import React, { useState } from 'react';
import Select from 'react-select';
import API from '../services/api';
import '../styles/theme.css';

const ViewStudents = () => {
    const [selection, setSelection] = useState({ depart: '', year: '' });
    const [students, setStudents] = useState([]);
    const [status, setStatus] = useState({ msg: '', isErr: false });
    const [loading, setLoading] = useState(false);

    const deptOptions = ['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH', 'ECM', 'IT'].map(d => ({ value: d, label: d }));

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ msg: '', isErr: false });
        try {
            const { data } = await API.post('/users/find', selection);
            if (data.status === 'ok') {
                setStudents(data.data);
                if (data.data.length === 0) setStatus({ msg: 'No students found in this department/year.', isErr: true });
            }
        } catch (err) {
            setStatus({ msg: err.response?.data?.message || 'Failed to fetch students', isErr: true });
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    const customStyles = {
        control: (base) => ({
            ...base,
            background: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white'
        }),
        menu: (base) => ({
            ...base,
            background: '#1e293b',
            color: 'white'
        }),
        option: (base, state) => ({
            ...base,
            background: state.isFocused ? 'var(--primary)' : 'transparent',
            color: 'white'
        }),
        singleValue: (base) => ({
            ...base,
            color: 'white'
        })
    };

    const [expandedStudent, setExpandedStudent] = useState(null);

    const toggleProfile = (id) => {
        setExpandedStudent(expandedStudent === id ? null : id);
    };

    const handleDelete = async (reg) => {
        if (!window.confirm(`Permanently remove student ${reg}?`)) return;
        try {
            const { data } = await API.post('/users/delete-student', { reg });
            if (data.status === 'ok') {
                setStudents(students.filter(s => s.Reg !== reg));
            }
        } catch (err) {
            alert("Deletion failed.");
        }
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '3rem', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Student Directory</h2>

                <form onSubmit={handleSearch} className="form-grid" style={{ alignItems: 'flex-end' }}>
                    <div className="form-group">
                        <label>Department Selection</label>
                        <Select styles={customStyles} options={deptOptions} onChange={v => setSelection({ ...selection, depart: v.value })} placeholder="Select Dept" />
                    </div>
                    <div className="form-group">
                        <label>Graduation Year</label>
                        <input className="input-field" style={{ width: '100%', height: '38px', marginTop: '1px' }} placeholder="e.g. 2024" value={selection.year} onChange={e => setSelection({ ...selection, year: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <button className="btn-primary" style={{ height: '42px', width: '100%' }} disabled={loading}>
                            {loading ? 'Searching...' : 'Fetch Students'}
                        </button>
                    </div>
                </form>

                {status.msg && (
                    <div style={{ padding: '1rem', marginTop: '2.5rem', textAlign: 'center', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', borderRadius: '12px' }}>
                        {status.msg}
                    </div>
                )}
            </div>

            {students.length > 0 && (
                <div className="glass-card fade-in" style={{ padding: '3rem' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--glass-bg)', textAlign: 'left' }}>
                                    <th style={{ padding: '15px', color: 'var(--text-dim)', fontWeight: 600 }}>REGISTRATION ID</th>
                                    <th style={{ padding: '15px', color: 'var(--text-dim)', fontWeight: 600 }}>STUDENT NAME</th>
                                    <th style={{ padding: '15px', color: 'var(--text-dim)', fontWeight: 600 }}>EMAIL</th>
                                    <th style={{ padding: '15px', color: 'var(--text-dim)', fontWeight: 600, textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, idx) => (
                                    <React.Fragment key={idx}>
                                        <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                            <td style={{ padding: '15px', fontWeight: 600 }}>{student.Reg}</td>
                                            <td style={{ padding: '15px' }}>{student.Name}</td>
                                            <td style={{ padding: '15px', color: 'var(--text-dim)' }}>{student.Email}</td>
                                            <td style={{ padding: '15px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button className="btn-secondary" onClick={() => toggleProfile(student.Reg)} style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
                                                    {expandedStudent === student.Reg ? 'Close' : 'Details'}
                                                </button>
                                                <button className="btn-secondary" onClick={() => handleDelete(student.Reg)} style={{ fontSize: '0.75rem', padding: '6px 12px', background: 'rgba(244, 63, 94, 0.05)', color: 'var(--accent)', border: '1px solid rgba(244, 63, 94, 0.1)' }}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedStudent === student.Reg && (
                                            <tr className="fade-in" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                                <td colSpan="4" style={{ padding: '2rem' }}>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                                                        <div>
                                                            <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Phone Number</div>
                                                            <div style={{ fontWeight: 600 }}>{student.Phn || 'N/A'}</div>
                                                        </div>
                                                        <div>
                                                            <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Gender / DOB</div>
                                                            <div style={{ fontWeight: 600 }}>{student.Gender} | {student.DOB || 'N/A'}</div>
                                                        </div>
                                                        <div>
                                                            <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Address</div>
                                                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{student.Address || 'N/A'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewStudents;
