import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import API from '../services/api';
import '../styles/theme.css';
import { useNavigate } from 'react-router-dom';

const AddResults = () => {
    const [deptOptions, setDeptOptions] = useState([]);
    const [semOptions, setSemOptions] = useState([]);
    const [gradeOptions, setGradeOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [selection, setSelection] = useState({ dep: '', sems: '', year: '', reg: '' });
    const [grades, setGrades] = useState({});
    const [status, setStatus] = useState({ msg: '', isErr: false });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const depths = ['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH', 'ECM', 'IT'].map(d => ({ value: d, label: d }));
        const sems = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'].map(d => ({ value: d, label: d }));
        const gradesArr = ['O', 'A', 'B', 'C', 'D', 'E', 'F'].map(d => ({ value: d, label: d }));

        setDeptOptions(depths);
        setSemOptions(sems);
        setGradeOptions(gradesArr);
    }, []);

    const fetchDetails = async () => {
        if (!selection.dep || !selection.year || !selection.sems) {
            setStatus({ msg: 'Please select Dept, Year and Semester first.', isErr: true });
            return;
        }
        setLoading(true);
        try {
            // Fetch Students
            const studentRes = await API.post('/users/find', { depart: selection.dep, year: selection.year });
            const students = studentRes.data.data.map(d => ({ value: d.Reg, label: d.Reg }));
            setStudentOptions(students);

            // Fetch Subjects
            const subjectRes = await API.post('/academic/find-subjects', { depart: selection.dep, semister: selection.sems });
            setSubjects(subjectRes.data.data);
            setStatus({ msg: 'Data fetched successfully. Now select student and enter grades.', isErr: false });
        } catch (err) {
            setStatus({ msg: err.response?.data?.message || 'Failed to fetch details', isErr: true });
        } finally {
            setLoading(false);
        }
    };

    const handleGradeChange = (subject, grade) => {
        setGrades({ ...grades, [subject]: grade });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultsArray = Object.keys(grades).map(sub => ({ sub, grade: grades[sub] }));

        setLoading(true);
        try {
            await API.post('/academic/update-results-manual', {
                depart: selection.dep,
                semister: selection.sems,
                year: selection.year,
                reg: selection.reg,
                a: resultsArray
            });
            setStatus({ msg: 'Results updated successfully!', isErr: false });
        } catch (err) {
            setStatus({ msg: 'Failed to update results.', isErr: true });
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

    const resetGradeEntry = () => {
        setSelection(() => ({ dep: '', sems: '', year: '', reg: '' }));
        setGrades({});
        setSubjects([]);
        setStudentOptions([]);
        setStatus({ msg: 'Form cleared successfully.', isErr: false });
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Manual Grade Entry</h2>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn-secondary" onClick={() => navigate('/upload-excel')} style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', padding: '10px 20px', borderRadius: '10px', fontSize: '0.85rem' }}>Excel Upload</button>
                        <button className="btn-secondary" onClick={resetGradeEntry} style={{ background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)', color: 'var(--accent)', padding: '10px 20px', borderRadius: '10px', fontSize: '0.85rem' }}>Clear Entries</button>
                    </div>
                </div>

                {status.msg && (
                    <div className="glass-card" style={{
                        padding: '1rem',
                        marginBottom: '2rem',
                        borderLeft: `4px solid ${status.isErr ? 'var(--accent)' : '#10b981'}`,
                        background: 'rgba(255,255,255,0.02)'
                    }}>
                        {status.msg}
                    </div>
                )}

                <div className="form-grid" style={{ marginBottom: '2rem' }}>
                    <div className="form-group">
                        <label>Department</label>
                        <Select 
                            styles={customStyles} 
                            options={deptOptions} 
                            value={deptOptions.find(o => o.value === selection.dep) || null}
                            onChange={v => setSelection(prev => ({ ...prev, dep: v ? v.value : '' }))} 
                            placeholder="Select Dept" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Semester</label>
                        <Select 
                            styles={customStyles} 
                            options={semOptions} 
                            value={semOptions.find(o => o.value === selection.sems) || null}
                            onChange={v => setSelection(prev => ({ ...prev, sems: v ? v.value : '' }))} 
                            placeholder="Select Sem" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Graduation Year</label>
                        <input className="input-field" style={{ width: '100%', height: '38px', marginTop: '1px' }} placeholder="e.g. 2024" value={selection.year} onChange={e => setSelection({ ...selection, year: e.target.value })} />
                    </div>
                </div>

                <button className="btn-primary" style={{ width: '100%', marginBottom: '3rem' }} onClick={fetchDetails} disabled={loading}>
                    {loading ? 'Fetching...' : 'Initialize Grade Entry'}
                </button>

                {subjects.length > 0 && (
                    <div className="fade-in">
                        <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                            <label>Select Student</label>
                            <Select 
                                styles={customStyles} 
                                options={studentOptions} 
                                value={studentOptions.find(o => o.value === selection.reg) || null}
                                onChange={v => setSelection(prev => ({ ...prev, reg: v ? v.value : '' }))} 
                                placeholder="Select Registration Number" 
                            />
                        </div>

                        <div className="form-grid">
                            {subjects.map((sub, idx) => (
                                <div key={idx} style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>{sub}</label>
                                    <Select 
                                        styles={customStyles} 
                                        options={gradeOptions} 
                                        value={gradeOptions.find(o => o.value === grades[sub]) || null}
                                        onChange={v => handleGradeChange(sub, v ? v.value : '')} 
                                        placeholder="Assign Grade" 
                                    />
                                </div>
                            ))}
                        </div>

                        <button className="btn-primary" style={{ width: '100%', marginTop: '3rem', background: 'linear-gradient(135deg, #10b981, #059669)' }} onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Submitting...' : 'Save Academic Records'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddResults;
