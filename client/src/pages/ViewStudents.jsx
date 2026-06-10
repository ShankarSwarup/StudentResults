import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import useDebounce from '../hooks/useDebounce';
import useApi from '../hooks/useApi';
import API from '../services/api';
import Modal from '../components/common/Modal';
import '../styles/theme.css';

const ViewStudents = () => {
    const [selection, setSelection] = useState({ depart: '', year: '' });
    const fetchFunc = useCallback((payload) => API.post('/users/find', payload), []);
    const { loading, execute: fetchStudentsApi } = useApi(fetchFunc);
    const [students, setStudents] = useState([]);
    const [status, setStatus] = useState({ msg: '', isErr: false });
    const [selectedStudent, setSelectedStudent] = useState(null);

    const deptOptions = ['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH', 'ECM', 'IT'].map(d => ({ value: d, label: d }));

    const debouncedSelection = useDebounce(selection, 500);

    useEffect(() => {
        const loadStudents = async () => {
            if (!debouncedSelection.depart && !debouncedSelection.year) return;
            setStatus({ msg: '', isErr: false });
            try {
                const data = await fetchStudentsApi(debouncedSelection);
                if (data.status === 'ok') {
                    setStudents(data.data);
                    if (data.data.length === 0) setStatus({ msg: 'No students found in this department/year.', isErr: true });
                }
            } catch (err) {
                setStatus({ msg: err.response?.data?.message || 'Failed to fetch students', isErr: true });
                setStudents([]);
            }
        };

        loadStudents();
    }, [debouncedSelection, fetchStudentsApi]);

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

    // Memoized handler to prevent unnecessary re-renders of the table rows
    const toggleProfile = useCallback((student) => {
        setSelectedStudent(student);
    }, []);

    // Memoized handler
    const handleDelete = useCallback(async (reg) => {
        if (!window.confirm(`Permanently remove student ${reg}?`)) return;
        try {
            const { data } = await API.post('/users/delete-student', { reg });
            if (data.status === 'ok') {
                setStudents(prev => prev.filter(s => s.Reg !== reg));
            }
        } catch (err) {
            alert("Deletion failed.");
        }
    }, []);

    return (
        <div className="container-1100">
            <div className="glass-card profile-card">
                <h2 className="vs-h2">Student Directory</h2>

                <div className="form-grid form-grid-end">
                    <div className="form-group">
                        <label>Department Selection</label>
                        <Select 
                            styles={customStyles} 
                            options={deptOptions} 
                            value={deptOptions.find(o => o.value === selection.depart) || null}
                            onChange={v => setSelection({ ...selection, depart: v ? v.value : '' })} 
                            placeholder="Select Dept" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Graduation Year</label>
                        <input className="input-field input-h38" placeholder="e.g. 2024" value={selection.year} onChange={e => setSelection({ ...selection, year: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <div className="live-search-text">
                            {loading ? 'Searching live...' : 'Search results update automatically'}
                        </div>
                    </div>
                </div>

                {status.msg && (
                    <div className="vs-error-banner">
                        {status.msg}
                    </div>
                )}
            </div>

            {students.length > 0 && (
                <div className="glass-card fade-in vs-table-card">
                    <div className="overflow-x-auto">
                        <table className="table-w-full">
                            <thead>
                                <tr className="text-left" style={{ background: 'var(--glass-bg)' }}>
                                    <th className="th-base">REGISTRATION ID</th>
                                    <th className="th-base">STUDENT NAME</th>
                                    <th className="th-base">EMAIL</th>
                                    <th className="th-base text-right">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, idx) => (
                                    <tr key={idx} className="border-bottom">
                                        <td className="td-bold">{student.Reg}</td>
                                        <td className="td-base">{student.Name}</td>
                                        <td className="td-dim">{student.Email}</td>
                                        <td className="td-actions">
                                            <button className="btn-secondary btn-small" onClick={() => toggleProfile(student)}>
                                                Details
                                            </button>
                                            <button className="btn-secondary btn-small btn-delete" onClick={() => handleDelete(student.Reg)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Portal-based Modal for Student Details */}
            <Modal 
                isOpen={!!selectedStudent} 
                onClose={() => setSelectedStudent(null)}
                title="Student Profile Details"
            >
                {selectedStudent && (
                    <div className="details-grid">
                        <div>
                            <div className="details-label">Registration ID</div>
                            <div className="font-semibold" style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{selectedStudent.Reg}</div>
                        </div>
                        <div>
                            <div className="details-label">Full Name</div>
                            <div className="font-semibold">{selectedStudent.Name}</div>
                        </div>
                        <div>
                            <div className="details-label">Email Address</div>
                            <div className="font-semibold">{selectedStudent.Email}</div>
                        </div>
                        <div>
                            <div className="details-label">Phone Number</div>
                            <div className="font-semibold">{selectedStudent.Phn || 'N/A'}</div>
                        </div>
                        <div>
                            <div className="details-label">Gender / DOB</div>
                            <div className="font-semibold">{selectedStudent.Gender} | {selectedStudent.DOB || 'N/A'}</div>
                        </div>
                        <div>
                            <div className="details-label">Address</div>
                            <div className="font-semibold text-sm">{selectedStudent.Address || 'N/A'}</div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ViewStudents;
