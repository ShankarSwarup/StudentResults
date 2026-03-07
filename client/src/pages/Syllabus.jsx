import React from 'react';
import '../styles/theme.css';

const Syllabus = () => {
    const syllabuses = [
        {
            dept: 'Computer Science & Engineering',
            code: 'CSE-V24',
            icon: '💻',
            subjects: ['Data Structures', 'Algorithms', 'AI & ML', 'Operating Systems', 'Cloud Computing'],
            link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        },
        {
            dept: 'Electronics & Communication',
            code: 'ECE-V24',
            icon: '📡',
            subjects: ['Digital Electronics', 'VLSI Design', 'Embedded Systems', 'Signal Processing', 'Microprocessors'],
            link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        },
        {
            dept: 'Mechanical Engineering',
            code: 'ME-V24',
            icon: '⚙️',
            subjects: ['Thermodynamics', 'Fluid Mechanics', 'Robotics', 'CAD/CAM', 'Manufacturing Tech'],
            link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        },
        {
            dept: 'Civil Engineering',
            code: 'CE-V24',
            icon: '🏗️',
            subjects: ['Structural Analysis', 'Concrete Tech', 'Urban Planning', 'Geotechnical Eng', 'Surveying'],
            link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        }
    ];

    return (
        <div style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto', background: '#0f172a', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', marginBottom: '1.5rem' }}>ACADEMIC RESOURCES</span>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Syllabus Repository</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
                    Access and download the latest Choice Based Credit System (CBCS) curriculum and academic regulations for all engineering branches.
                </p>
            </div>

            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem' }}>
                {syllabuses.map((item, idx) => (
                    <div key={idx} className="glass-card fade-in" style={{ padding: '3rem', transition: 'transform 0.4s ease', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                            <div style={{ fontSize: '3rem' }}>{item.icon}</div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', color: 'var(--text-dim)' }}>{item.code}</span>
                        </div>

                        <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>{item.dept}</h3>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', fontWeight: 700 }}>Core Modules</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {item.subjects.map((sub, i) => (
                                    <span key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>{sub}</span>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center', flex: 1 }}>Download PDF</a>
                            <button className="btn-secondary" onClick={() => alert("Detailed course objectives updated soon!")} style={{ flex: 1 }}>View Details</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ marginTop: '5rem', padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))' }}>
                <h3 style={{ marginBottom: '1rem' }}>Need a custom curriculum overview?</h3>
                <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Contact the academic department or your faculty advisor for outdated syllabus copies.</p>
                <button className="btn-secondary" style={{ border: '1px solid var(--primary)', color: 'var(--primary)' }}>Contact Support</button>
            </div>
        </div>
    );
};

export default Syllabus;
