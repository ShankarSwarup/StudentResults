import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import API from '../services/api';
import '../styles/theme.css';

const StudentUpload = () => {
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
            const { data } = await API.post('/users/upload-excel', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (data.status === 'ok') {
                setStatus({ msg: 'Batch student enrollment completed successfully!', isErr: false });
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
            { Reg: '23CS101', Name: 'John Smith', Phn: '9876543210', Dept: 'CSE', Gender: 'Male', DOB: 36526, Email: 'john@example.com', year: '2023' }
        ];
        const ws = XLSX.utils.json_to_sheet(templateData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Enrollment_Template");
        XLSX.writeFile(wb, "Student_Enrollment_Template.xlsx");
    };

    return (
        <div className="container-md">
            <div className="glass-card text-center p-3">
                <h2 className="text-2xl mb-1-5">Batch Student Enrollment</h2>
                <p className="text-dim mb-3-5">Enroll multiple students simultaneously using our standardized enrollment template.</p>

                {status.msg && (
                    <div className={`status-banner ${status.isErr ? 'status-error' : 'status-success'}`}>
                        {status.msg}
                    </div>
                )}

                <div className="upload-dropzone">
                    <div className="text-3xl mb-1-5">👨‍👩‍👧‍👦</div>
                    <h3 className="mb-0-5">{fileName || "Drag and drop enrollment sheet"}</h3>
                    <p className="text-dim text-sm">Upload .xlsx or .xls files only.</p>

                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={onFileChange}
                        className="file-input-hidden"
                    />
                </div>

                <button className="btn-primary w-full p-1" onClick={handleUpload} disabled={loading || !fileName}>
                    {loading ? 'Processing Enrollment Batch...' : 'Confirm Bulk Enrollment'}
                </button>
            </div>

            <div className="glass-card mt-2 p-2">
                <div className="flex-between-center mb-1-5">
                    <h3 className="text-lg">Required Data Columns</h3>
                    <button className="btn-secondary text-sm" onClick={downloadTemplate}>Download Template .XLSX</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-compact">
                        <thead>
                            <tr className="text-left border-bottom">
                                <th className="text-dim">Reg</th>
                                <th className="text-dim">Name</th>
                                <th className="text-dim">Phn</th>
                                <th className="text-dim">Dept</th>
                                <th className="text-dim">Gender</th>
                                <th className="text-dim">DOB</th>
                                <th className="text-dim">Email</th>
                                <th className="text-dim">Year</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <p className="mt-1 text-sm text-dim text-italic">
                    * DOB must be in Excel Serial Date format. Default credentials will be generated using phone numbers.
                </p>
            </div>
        </div>
    );
};

export default StudentUpload;
