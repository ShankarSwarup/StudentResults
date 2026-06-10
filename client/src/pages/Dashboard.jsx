import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import useThrottle from '../hooks/useThrottle';
import '../styles/theme.css';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const isTeacher = user?.tid !== undefined;

    const [showTopBtn, setShowTopBtn] = useState(false);

    const handleScroll = useThrottle(() => {
        if (window.scrollY > 300) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    }, 300);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="container-lg">
            <div className="glass-card dashboard-welcome-card">
                <div className="dashboard-welcome-bg"></div>

                <span className="badge dashboard-system-badge">SYSTEM ACTIVE</span>
                <h1 className="dashboard-title">Welcome, {user?.name.split(' ')[0]}!</h1>
                <p className="dashboard-subtitle">
                    {isTeacher
                        ? "Manage academic records, track student performance, and maintain the campus curriculum efficiently from your personalized faculty dashboard."
                        : "Track your academic journey, view transcript records, and stay updated with the latest campus events."}
                </p>

                <div className="dashboard-btn-group">
                    {isTeacher ? (
                        <>
                            <NavLink to="/add-student" className="btn-primary btn-nav-primary">Enroll Student</NavLink>
                            <NavLink to="/add-results" className="btn-secondary btn-nav-secondary">Enter Grades</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/view-results" className="btn-primary btn-nav-primary">View Transcript</NavLink>
                            <NavLink to="/calendar" className="btn-secondary btn-nav-secondary">Campus Events</NavLink>
                        </>
                    )}
                </div>
            </div>

            <div className="grid-3">
                <NavLink to="/calendar" className="glass-card card-link">
                    <div className="card-icon card-icon-calendar">📅</div>
                    <h3 className="card-h3">Academic Calendar</h3>
                    <p className="card-p">Track exams, holidays, and campus events scheduled for the current term.</p>
                </NavLink>

                <NavLink to={isTeacher ? "/view-students" : "/view-results"} className="glass-card card-link">
                    <div className="card-icon card-icon-directory">📁</div>
                    <h3 className="card-h3">{isTeacher ? "Directory" : "Scholar Records"}</h3>
                    <p className="card-p">{isTeacher ? "Manage student profiles and review department-wide demographics." : "Access semester transcripts and monitor your overall degree progression."}</p>
                </NavLink>

                <NavLink to="/profile" className="glass-card card-link">
                    <div className="card-icon card-icon-profile">⚙️</div>
                    <h3 className="card-h3">Profile Config</h3>
                    <p className="card-p">Update security settings, manage sessions, and verify personal academic identity.</p>
                </NavLink>
            </div>

            {showTopBtn && (
                <button
                    onClick={scrollToTop}
                    className="btn-primary scroll-top-btn"
                >
                    ↑
                </button>
            )}
        </div>
    );
};

export default Dashboard;
