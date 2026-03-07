import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import '../styles/theme.css';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const isTeacher = user?.tid !== undefined;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '4rem', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%' }}></div>

                <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', marginBottom: '1.5rem', display: 'inline-block', padding: '6px 16px', borderRadius: '20px', fontWeight: 700 }}>SYSTEM ACTIVE</span>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: 800 }}>Welcome, {user?.name.split(' ')[0]}!</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.5rem', maxWidth: '700px', lineHeight: '1.6' }}>
                    {isTeacher
                        ? "Manage academic records, track student performance, and maintain the campus curriculum efficiently from your personalized faculty dashboard."
                        : "Track your academic journey, view transcript records, and stay updated with the latest campus events."}
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem' }}>
                    {isTeacher ? (
                        <>
                            <NavLink to="/add-student" className="btn-primary" style={{ textDecoration: 'none' }}>Enroll Student</NavLink>
                            <NavLink to="/add-results" className="btn-secondary" style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}>Enter Grades</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/view-results" className="btn-primary" style={{ textDecoration: 'none' }}>View Transcript</NavLink>
                            <NavLink to="/calendar" className="btn-secondary" style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}>Campus Events</NavLink>
                        </>
                    )}
                </div>
            </div>

            <div className="grid-3">
                <NavLink to="/calendar" className="glass-card" style={{ textDecoration: 'none', color: 'inherit', transition: 'var(--transition)' }}>
                    <div className="card-icon" style={{ background: 'rgba(99, 102, 241, 0.12)' }}>📅</div>
                    <h3 style={{ marginBottom: '0.85rem', fontWeight: 800 }}>Academic Calendar</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6 }}>Track exams, holidays, and campus events scheduled for the current term.</p>
                </NavLink>

                <NavLink to={isTeacher ? "/view-students" : "/view-results"} className="glass-card" style={{ textDecoration: 'none', color: 'inherit', transition: 'var(--transition)' }}>
                    <div className="card-icon" style={{ background: 'rgba(244, 63, 94, 0.12)' }}>📁</div>
                    <h3 style={{ marginBottom: '0.85rem', fontWeight: 800 }}>{isTeacher ? "Directory" : "Scholar Records"}</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6 }}>{isTeacher ? "Manage student profiles and review department-wide demographics." : "Access semester transcripts and monitor your overall degree progression."}</p>
                </NavLink>

                <NavLink to="/profile" className="glass-card" style={{ textDecoration: 'none', color: 'inherit', transition: 'var(--transition)' }}>
                    <div className="card-icon" style={{ background: 'rgba(16, 185, 129, 0.12)' }}>⚙️</div>
                    <h3 style={{ marginBottom: '0.85rem', fontWeight: 800 }}>Profile Config</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6 }}>Update security settings, manage sessions, and verify personal academic identity.</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Dashboard;
