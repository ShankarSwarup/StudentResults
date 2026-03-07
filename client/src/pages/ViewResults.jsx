import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import API from '../services/api';
import '../styles/theme.css';

const ViewResults = () => {
    const [selection, setSelection] = useState({ reg: '', sem: '' });
    const [semOptions, setSemOptions] = useState([]);
    const [results, setResults] = useState(null);
    const [backlogs, setBacklogs] = useState([]);
    const [status, setStatus] = useState({ msg: '', isErr: false });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const sems = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2', 'backlog'].map(d => ({ value: d, label: d }));
        setSemOptions(sems);

        // Auto-fill reg if student is logged in
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.reg) {
            setSelection(s => ({ ...s, reg: user.reg }));
        }
    }, []);

    const fetchResults = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ msg: '', isErr: false });
        try {
            const { data } = await API.post('/academic/get-results', { ten: selection.reg, c: selection.sem });
            if (selection.sem !== 'backlog') {
                setResults(data.data);
                setBacklogs([]);
            } else {
                setResults(data.data);
                setBacklogs(data.back);
            }
        } catch (err) {
            setStatus({ msg: err.response?.data?.message || 'Failed to fetch results', isErr: true });
            setResults(null);
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

    const downloadPDF = () => {
        window.print();
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <style>{`
                @media print {
                    body * { visibility: hidden; background: white !important; color: black !important; }
                    .printable-area, .printable-area * { visibility: visible; }
                    .printable-area { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; }
                    .btn-secondary, .glass-card:first-child { display: none !important; }
                    .glass-card { border: 1px solid #ddd !important; box-shadow: none !important; backdrop-filter: none !important; background: white !important; }
                    table { width: 100%; border-collapse: collapse; margin-top: 2rem; border: 1px solid #eee; }
                    th { background: #f9f9f9 !important; padding: 12px; border: 1px solid #ddd; color: #333 !important; }
                    td { padding: 12px; border: 1px solid #ddd; color: #333 !important; }
                    .status-pass { color: green !important; font-weight: bold; }
                    .status-fail { color: red !important; font-weight: bold; }
                }
            `}</style>

            <div className="glass-card" style={{ padding: '3rem', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Academic Performance Review</h2>

                <form onSubmit={fetchResults} className="form-grid" style={{ alignItems: 'flex-end' }}>
                    <div className="form-group">
                        <label>Registration Number</label>
                        <input className="input-field" style={{ width: '100%', height: '38px', marginTop: '1px' }} placeholder="e.g. 23CS101" value={selection.reg} onChange={e => setSelection({ ...selection, reg: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Select Semester</label>
                        <Select styles={customStyles} options={semOptions} onChange={v => setSelection({ ...selection, sem: v.value })} placeholder="Sem" />
                    </div>
                    <div className="form-group">
                        <button className="btn-primary" style={{ width: '100%', height: '42px' }} disabled={loading}>
                            {loading ? 'Viewing Records...' : 'Access Grades'}
                        </button>
                    </div>
                </form>

                {status.msg && (
                    <div style={{ padding: '1rem', marginTop: '2.5rem', textAlign: 'center', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', borderRadius: '12px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                        {status.msg}
                    </div>
                )}
            </div>

            {results && selection.sem !== 'backlog' && (
                <div className="glass-card fade-in printable-area" style={{ padding: '3rem' }}>
                    <div className="action-row" style={{ justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Semester Transcript</h3>
                            <p style={{ color: 'var(--text-dim)' }}>ID: {results.regNo} | Semester: {results.sem}</p>
                        </div>
                        <button className="btn-primary" onClick={downloadPDF} style={{ padding: '10px 24px' }}>Download PDF</button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ background: 'var(--glass-bg)', textAlign: 'left' }}>
                                <th style={{ padding: '15px', color: 'var(--text-dim)', fontWeight: 600 }}>COURSE NAME</th>
                                <th style={{ padding: '15px', color: 'var(--text-dim)', fontWeight: 600, textAlign: 'center' }}>GRADE</th>
                                <th style={{ padding: '15px', color: 'var(--text-dim)', fontWeight: 600, textAlign: 'center' }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.subject.map((item, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '15px', fontWeight: 500 }}>{item.sub}</td>
                                    <td style={{ padding: '15px', textAlign: 'center', color: item.grade === 'F' ? 'var(--accent)' : '#10b981', fontWeight: 700 }}>{item.grade}</td>
                                    <td style={{ padding: '15px', textAlign: 'center' }}>
                                        <span className={item.grade === 'F' ? 'status-fail' : 'status-pass'} style={{
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            background: item.grade === 'F' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                            color: item.grade === 'F' ? 'var(--accent)' : '#10b981'
                                        }}>
                                            {item.grade === 'F' ? 'FAIL' : 'PASS'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selection.sem === 'backlog' && backlogs.length > 0 && (
                <div className="glass-card fade-in" style={{ padding: '3rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--accent)' }}>🚨 Outstanding Backlogs</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        {backlogs.map((item, idx) => (
                            <div key={idx} style={{ background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)', padding: '1.5rem', borderRadius: '15px' }}>
                                <div style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: '0.5rem' }}>{item[0]}</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>Pending from Semester: {item[1]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewResults;
