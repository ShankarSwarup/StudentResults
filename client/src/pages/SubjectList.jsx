import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles/theme.css';

const SubjectList = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null); // { Code, Subject }
    const [status, setStatus] = useState({ msg: '', isErr: false });

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const { data } = await API.get('/academic/all-subjects');
                setSubjects(data.data);
            } catch (err) {
                console.error("Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };
        fetchSubjects();
    }, []);

    const handleDelete = async (code) => {
        if (!window.confirm(`Are you sure you want to remove ${code}?`)) return;
        try {
            const { data } = await API.post('/academic/delete-subject', { code });
            if (data.status === 'ok') {
                setSubjects(subjects.filter(s => s.Code !== code));
                alert("Course removed from master database.");
            }
        } catch (err) {
            alert("Failed to delete course.");
        }
    };

    const handleEditToggle = (sub) => {
        setEditing(sub ? { ...sub } : null);
        setStatus({ msg: '', isErr: false });
    };

    const handleUpdate = async () => {
        if (!editing.Code || !editing.Subject) {
            setStatus({ msg: 'Fields cannot be empty!', isErr: true });
            return;
        }
        setLoading(true);
        try {
            const { data } = await API.post('/academic/edit-subject', { subj: editing.Subject, cod: editing.Code });
            if (data.status === 'ok') {
                setSubjects(subjects.map(s => s.Code === editing.Code ? { ...s, Subject: editing.Subject } : s));
                setStatus({ msg: 'Master row updated successfully!', isErr: false });
                setTimeout(() => setEditing(null), 1000);
            }
        } catch (err) {
            setStatus({ msg: 'Update failed', isErr: true });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div className="glass-card fade-in" style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 800 }}>Master Course Catalog</h2>
                    <span className="badge" style={{ background: 'var(--primary)', color: 'white' }}>{subjects.length} REGISTERED COURSES</span>
                </div>

                {loading && !editing ? (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-dim)' }}>
                        <div className="spinner" style={{ margin: '0 auto 1.5rem auto' }}></div>
                        Synchronizing master database...
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--glass-bg)', textAlign: 'left' }}>
                                    <th style={{ padding: '18px', color: 'var(--text-dim)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>COURSE CODE</th>
                                    <th style={{ padding: '18px', color: 'var(--text-dim)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>COURSE NAME</th>
                                    <th style={{ padding: '18px', color: 'var(--text-dim)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map((sub, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.3s ease' }}
                                        onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <td style={{ padding: '18px', fontWeight: 700, color: 'var(--primary)' }}>{sub.Code}</td>
                                        <td style={{ padding: '18px', fontWeight: 500 }}>{sub.Subject}</td>
                                        <td style={{ padding: '18px', textAlign: 'right', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                            <button className="btn-secondary" onClick={() => handleEditToggle(sub)} style={{ fontSize: '0.75rem', padding: '6px 14px', borderRadius: '8px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>Edit</button>
                                            <button className="btn-secondary" onClick={() => handleDelete(sub.Code)} style={{ fontSize: '0.75rem', padding: '6px 14px', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)', color: 'var(--accent)' }}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {subjects.length === 0 && <p style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)', background: 'rgba(255,255,255,0.01)', borderRadius: '15px' }}>Catalog is currently empty.</p>}
                    </div>
                )}
            </div>

            {/* Simulated Edit Modal */}
            {editing && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-card scale-in" style={{ width: '100%', maxWidth: '450px', padding: '3rem', border: '1px solid var(--primary)' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Modify Master Record</h3>

                        {status.msg && (
                            <div style={{ padding: '10px', borderRadius: '8px', marginBottom: '1.5rem', background: status.isErr ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: status.isErr ? 'var(--accent)' : '#10b981', textAlign: 'center' }}>
                                {status.msg}
                            </div>
                        )}

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>COURSE CODE</label>
                            <input className="input-field" value={editing.Code} onChange={e => setEditing({ ...editing, Code: e.target.value })} />
                        </div>
                        <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>COURSE NAME</label>
                            <input className="input-field" value={editing.Subject} onChange={e => setEditing({ ...editing, Subject: e.target.value })} />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn-primary" style={{ flex: 1 }} onClick={handleUpdate}>Save Changes</button>
                            <button className="btn-secondary" style={{ flex: 1 }} onClick={() => handleEditToggle(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubjectList;
