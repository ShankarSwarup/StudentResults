import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import API from '../services/api';
import '../styles/theme.css';

const ManageSubjects = () => {
    const [allSubjects, setAllSubjects] = useState([]);
    const [deptOptions, setDeptOptions] = useState([]);
    const [semOptions, setSemOptions] = useState([]);

    const [form, setForm] = useState({ subject: '', depart: '', semister: '' });
    const [status, setStatus] = useState({ msg: '', isErr: false });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const { data } = await API.get('/academic/all-subjects');
                setAllSubjects(data.data.map(d => ({ value: d.Subject, label: d.Subject })));
            } catch (err) {
                console.error("Failed to fetch subjects");
            }
        };
        fetchSubjects();

        setDeptOptions(['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH', 'ECM', 'IT'].map(d => ({ value: d, label: d })));
        setSemOptions(['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'].map(d => ({ value: d, label: d })));
    }, []);

    const handleAction = async (action) => {
        setLoading(true);
        setStatus({ msg: '', isErr: false });
        try {
            const { data } = await API.post('/academic/manage', { ...form, action });
            setStatus({ msg: data.message, isErr: false });
        } catch (err) {
            setStatus({ msg: err.response?.data?.message || 'Action failed', isErr: true });
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

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Course Mapping</h2>
                <p style={{ color: 'var(--text-dim)', marginBottom: '3rem' }}>Link registered subjects to specific departments and semesters.</p>

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

                <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label>Select Course / Subject</label>
                    <Select styles={customStyles} options={allSubjects} onChange={v => setForm({ ...form, subject: v.value })} placeholder="e.g. Data Structures" />
                </div>

                <div className="form-grid" style={{ marginBottom: '3rem' }}>
                    <div className="form-group">
                        <label>Department</label>
                        <Select styles={customStyles} options={deptOptions} onChange={v => setForm({ ...form, depart: v.value })} placeholder="Select Dept" />
                    </div>
                    <div className="form-group">
                        <label>Academic Semester</label>
                        <Select styles={customStyles} options={semOptions} onChange={v => setForm({ ...form, semister: v.value })} placeholder="Select Sem" />
                    </div>
                </div>

                <div className="form-grid">
                    <button className="btn-primary" onClick={() => handleAction('add')} disabled={loading} style={{ width: '100%' }}>
                        {loading ? 'Processing...' : 'Assign to Curriculum'}
                    </button>
                    <button className="btn-secondary" onClick={() => handleAction('remove')} disabled={loading} style={{ width: '100%', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid var(--accent)', color: 'var(--accent)' }}>
                        Remove from Curriculum
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageSubjects;
