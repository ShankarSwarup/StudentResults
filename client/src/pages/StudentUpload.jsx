import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import API from '../services/api';
import '../styles/theme.css';

const StudentUpload = () => {
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
            const { data } = await API.post('/users/excel-upload', { files: fileData });
            if (data.status === 'ok') {
                setStatus({ msg: 'Batch student enrollment completed successfully!', isErr: false });
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
            { Reg: '23CS101', Name: 'John Smith', Phn: '9876543210', Dept: 'CSE', Gender: 'Male', DOB: 36526, Email: 'john@example.com', year: '2023' }
        ];
        const ws = XLSX.utils.json_to_sheet(templateData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Enrollment_Template");
        XLSX.writeFile(wb, "Student_Enrollment_Template.xlsx");
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Batch Student Enrollment</h2>
                <p style={{ color: 'var(--text-dim)', marginBottom: '3.5rem' }}>Enroll multiple students simultaneously using our standardized enrollment template.</p>

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
                    position: 'relative'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>👨‍👩‍👧‍👦</div>
                    <h3 style={{ marginBottom: '0.5rem' }}>{fileName || "Drag and drop enrollment sheet"}</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>Upload .xlsx or .xls files only.</p>

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
                    {loading ? 'Processing Enrollment Batch...' : 'Confirm Bulk Enrollment'}
                </button>
            </div>

            <div className="glass-card" style={{ marginTop: '2rem', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem' }}>Required Data Columns</h3>
                    <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px' }} onClick={downloadTemplate}>Download Template .XLSX</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>Reg</th>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>Name</th>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>Phn</th>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>Dept</th>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>Gender</th>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>DOB</th>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>Email</th>
                                <th style={{ padding: '12px', color: 'var(--text-dim)' }}>Year</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                    * DOB must be in Excel Serial Date format. Default credentials will be generated using phone numbers.
                </p>
            </div>
        </div>
    );
};

export default StudentUpload;
