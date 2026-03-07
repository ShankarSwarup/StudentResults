import { useState } from 'react';
import Select from 'react-select';
import API from '../services/api';
import '../styles/theme.css';

const SemesterResults = () => {
    const [form, setForm] = useState({ depart: '', sem: '', year: '' });
    const [results, setResults] = useState([]);
    const [status, setStatus] = useState({ msg: '', isErr: false });
    const [loading, setLoading] = useState(false);

    const deptOptions = [
        { value: 'CSE', label: 'CSE' },
        { value: 'ECE', label: 'ECE' },
        { value: 'MECH', label: 'MECH' },
        { value: 'CIVIL', label: 'CIVIL' }
    ];

    const semOptions = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'].map(s => ({ value: s, label: s }));

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!form.depart || !form.sem || !form.year) {
            setStatus({ msg: 'Please fill all filters', isErr: true });
            return;
        }

        setLoading(true);
        setStatus({ msg: '', isErr: false });
        try {
            const { data } = await API.post('/academic/get-semester-results', form);
            setResults(data.data);
        } catch (err) {
            setStatus({ msg: err.response?.data?.message || 'Failed to fetch semester records', isErr: true });
            setResults([]);
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
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '3rem', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Semester Analytics</h2>

                <form onSubmit={handleSearch} className="form-grid" style={{ alignItems: 'flex-end' }}>
                    <div className="form-group">
                        <label>Department</label>
                        <Select styles={customStyles} options={deptOptions} onChange={v => setForm({ ...form, depart: v.value })} placeholder="Dept" />
                    </div>
                    <div className="form-group">
                        <label>Semester</label>
                        <Select styles={customStyles} options={semOptions} onChange={v => setForm({ ...form, sem: v.value })} placeholder="Sem" />
                    </div>
                    <div className="form-group">
                        <label>Graduation Year</label>
                        <input className="input-field" placeholder="e.g. 2027" style={{ height: '38px' }} value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <button className="btn-primary" style={{ width: '100%', height: '42px' }} disabled={loading}>
                            {loading ? 'Searching...' : 'Search Records'}
                        </button>
                    </div>
                </form>

                {status.msg && (
                    <div style={{
                        padding: '1rem',
                        marginTop: '2rem',
                        textAlign: 'center',
                        background: status.isErr ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: status.isErr ? 'var(--accent)' : '#10b981',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        {status.msg}
                    </div>
                )}
            </div>

            {results.length > 0 && (
                <div className="glass-card fade-in" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '2.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Batch Performance Overview</h3>
                            <p style={{ color: 'var(--text-dim)' }}>{results.length} students found for {form.depart} | Semester {form.sem}</p>
                        </div>
                        <button className="btn-secondary" onClick={() => window.print()} style={{ fontSize: '0.8rem' }}>Export PDF</button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.02)', textAlign: 'left' }}>
                                    <th style={{ padding: '20px', color: 'var(--text-dim)', fontWeight: 600 }}>REGISTRATION</th>
                                    {results[0].subject.map((s, i) => (
                                        <th key={i} style={{ padding: '20px', color: 'var(--text-dim)', fontWeight: 600, textAlign: 'center' }}>{s.sub}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((row, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '20px', fontWeight: 700 }}>{row.regNo}</td>
                                        {row.subject.map((s, i) => (
                                            <td key={i} style={{ padding: '20px', textAlign: 'center' }}>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '6px',
                                                    background: s.grade === 'F' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                                    color: s.grade === 'F' ? 'var(--accent)' : '#10b981',
                                                    fontWeight: 800
                                                }}>
                                                    {s.grade}
                                                </span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SemesterResults;
