import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import API from '../services/api';
import '../styles/theme.css';

const ResultsUpload = () => {
    const [fileData, setFileData] = useState([]);
    const [fileName, setFileName] = useState("");
    const [status, setStatus] = useState({ msg: '', isErr: false });
    const [loading, setLoading] = useState(false);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            setFileData(data);
        };
        reader.readAsBinaryString(file);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (fileData.length === 0) {
            setStatus({ msg: 'Please select a valid excel file first.', isErr: true });
            return;
        }

        setLoading(true);
        setStatus({ msg: '', isErr: false });
        try {
            const { data } = await API.post('/academic/results-upload', { files: fileData });
            if (data.status === 'ok') {
                setStatus({ msg: 'All results processed and uploaded successfully!', isErr: false });
                setFileData([]);
                setFileName("");
            }
        } catch (err) {
            setStatus({ msg: err.response?.data?.message || 'Upload failed. Check file format.', isErr: true });
        } finally {
            setLoading(false);
        }
    };

    const downloadTemplate = () => {
        const templateData = [
            { regNo: '23CS101', sem: '1-1', dept: 'CSE', grad: '2027', Maths: 'A', Physics: 'O' },
            { regNo: '23CS102', sem: '1-1', dept: 'CSE', grad: '2027', Maths: 'B', Physics: 'A' }
        ];
        const ws = XLSX.utils.json_to_sheet(templateData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Template");
        XLSX.writeFile(wb, "Academic_Results_Template.xlsx");
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Bulk Batch Upload</h2>
                <p style={{ color: 'var(--text-dim)', marginBottom: '3.5rem' }}>Upload student academic records using a standardized Excel template.</p>

                {status.msg && (
                    <div style={{
                        padding: '1.25rem',
                        borderRadius: '12px',
                        marginBottom: '2.5rem',
                        background: status.isErr ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: status.isErr ? 'var(--accent)' : '#10b981',
                        border: `1px solid ${status.isErr ? 'var(--accent)' : '#10b981'}`,
                        textAlign: 'left'
                    }}>
                        {status.msg}
                    </div>
                )}

                <div style={{
                    border: '2px dashed var(--glass-border)',
                    borderRadius: '20px',
                    padding: '4rem 2rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    marginBottom: '3rem',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                }}
                    onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                    onMouseOut={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}
                >
                    <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>📄</div>
                    <h3 style={{ marginBottom: '0.5rem' }}>{fileName || "Drop your Excel file here"}</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>Only .xlsx or .xls files are supported.</p>

                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={onFileChange}
                        style={{
                            position: 'absolute',
                            top: 0, left: 0, width: '100%', height: '100%',
                            opacity: 0, cursor: 'pointer'
                        }}
                    />
                </div>

                <button className="btn-primary" style={{ width: '100%', padding: '16px' }} onClick={handleUpload} disabled={loading || !fileName}>
                    {loading ? 'Processing Batch Data...' : 'Confirm and Upload Results'}
                </button>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                    <span>✅ Automatic Validation</span>
                    <span>✅ Duplication Check</span>
                    <span>✅ Format Verification</span>
                </div>
            </div>

            <div className="glass-card" style={{ marginTop: '2rem', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem' }}>Standardized Template Format</h3>
                    <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px' }} onClick={downloadTemplate}>Download Template .XLSX</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>regNo</th>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>sem</th>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>dept</th>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>grad</th>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>Maths</th>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>Physics</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '12px' }}>23CS101</td>
                                <td style={{ padding: '12px' }}>1-1</td>
                                <td style={{ padding: '12px' }}>CSE</td>
                                <td style={{ padding: '12px' }}>2027</td>
                                <td style={{ padding: '12px' }}>A</td>
                                <td style={{ padding: '12px' }}>O</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px' }}>23CS102</td>
                                <td style={{ padding: '12px' }}>1-1</td>
                                <td style={{ padding: '12px' }}>CSE</td>
                                <td style={{ padding: '12px' }}>2027</td>
                                <td style={{ padding: '12px' }}>B</td>
                                <td style={{ padding: '12px' }}>A</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                    * Column names for subjects (e.g., "Maths", "Physics") should match the subject names registered in the system.
                </p>
            </div>
        </div>
    );
};

export default ResultsUpload;
