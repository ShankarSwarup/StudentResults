import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import API from '../services/api';
import '../styles/theme.css';

const ResultsUpload = () => {
    const [fileObj, setFileObj] = useState(null);
    const [fileName, setFileName] = useState("");
    const [status, setStatus] = useState({ msg: '', isErr: false });
    const [loading, setLoading] = useState(false);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        setFileObj(file);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!fileObj) {
            setStatus({ msg: 'Please select a valid excel file first.', isErr: true });
            return;
        }

        setLoading(true);
        setStatus({ msg: '', isErr: false });
        try {
            const formData = new FormData();
            formData.append('file', fileObj);

            const { data } = await API.post('/academic/upload-results', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (data.status === 'ok') {
                setStatus({ msg: 'All results processed and uploaded successfully!', isErr: false });
                setFileObj(null);
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
        <div className="container-sm">
            <div className="glass-card text-center p-3">
                <h2 className="text-2xl mb-1-5">Bulk Batch Upload</h2>
                <p className="text-dim mb-3">Upload student academic records using a standardized Excel template.</p>

                {status.msg && (
                    <div className={`status-banner ${status.isErr ? 'status-error' : 'status-success'}`}>
                        {status.msg}
                    </div>
                )}

                <div className="upload-dropzone">
                    <div className="text-3xl mb-1-5">📄</div>
                    <h3 className="mb-0-5">{fileName || "Drop your Excel file here"}</h3>
                    <p className="text-dim text-sm">Only .xlsx or .xls files are supported.</p>

                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={onFileChange}
                        className="file-input-hidden"
                    />
                </div>

                <button className="btn-primary w-full p-1" onClick={handleUpload} disabled={loading || !fileName}>
                    {loading ? 'Processing Batch Data...' : 'Confirm and Upload Results'}
                </button>

                <div className="flex-center flex-gap-2 mt-2 text-dim" style={{ fontSize: '0.75rem' }}>
                    <span>✅ Automatic Validation</span>
                    <span>✅ Duplication Check</span>
                    <span>✅ Format Verification</span>
                </div>
            </div>

            <div className="glass-card mt-2 p-2">
                <div className="flex-between-center mb-1-5">
                    <h3 className="text-lg">Standardized Template Format</h3>
                    <button className="btn-secondary text-sm" onClick={downloadTemplate}>Download Template .XLSX</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-compact">
                        <thead>
                            <tr className="text-left border-bottom">
                                <th className="text-dim">regNo</th>
                                <th className="text-dim">sem</th>
                                <th className="text-dim">dept</th>
                                <th className="text-dim">grad</th>
                                <th className="text-dim">Maths</th>
                                <th className="text-dim">Physics</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>23CS101</td>
                                <td>1-1</td>
                                <td>CSE</td>
                                <td>2027</td>
                                <td>A</td>
                                <td>O</td>
                            </tr>
                            <tr>
                                <td>23CS102</td>
                                <td>1-1</td>
                                <td>CSE</td>
                                <td>2027</td>
                                <td>B</td>
                                <td>A</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="mt-1-5 text-sm text-dim text-italic">
                    * Column names for subjects (e.g., "Maths", "Physics") should match the subject names registered in the system.
                </p>
            </div>
        </div>
    );
};

export default ResultsUpload;
