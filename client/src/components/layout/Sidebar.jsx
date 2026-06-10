import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import '../../styles/theme.css';

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isTeacher = user?.tid !== undefined;

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <aside className="sidebar-container glass-card">
            <style>{`
                .sidebar-container {
                    padding: 2.5rem;
                }
                .logo-section {
                    margin-bottom: 3.5rem;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-size: 1.6rem;
                    font-weight: 800;
                    font-family: 'Outfit', sans-serif;
                    letter-spacing: -0.01em;
                }
                .nav-group-title {
                    padding: 8px 16px;
                    font-size: 0.7rem;
                    color: var(--primary);
                    font-weight: 800;
                    margin-top: 2rem;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                }
                .bottom-section {
                    margin-top: auto;
                    padding-top: 2.5rem;
                    border-top: 1px solid var(--glass-border);
                }
                .user-badge {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    margin-bottom: 2rem;
                }
                .avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    background: var(--glass-bg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid var(--glass-border);
                    font-weight: 800;
                    font-family: 'Outfit', sans-serif;
                    color: var(--primary);
                }
                .logout-btn {
                    width: 100%;
                    background: rgba(244, 63, 94, 0.08);
                    color: var(--accent);
                    border: 1px solid rgba(244, 63, 94, 0.1);
                    padding: 12px;
                    border-radius: 12px;
                    cursor: pointer;
                    font-weight: 700;
                    transition: var(--transition);
                    font-family: 'Outfit', sans-serif;
                }
                .logout-btn:hover {
                    background: rgba(244, 63, 94, 0.15);
                    transform: translateY(-2px);
                }
            `}</style>

            <div className="logo-section">PORTAL</div>

            <nav className="nav-links" style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1, overflowY: 'auto' }}>
                {isTeacher ? (
                    <>
                        <NavLink to="/teacher-dashboard" className="nav-item">🏠 Overview</NavLink>

                        <div className="nav-group-title">Records</div>
                        <NavLink to="/add-student" className="nav-item">👨‍🎓 Manual Enrollment</NavLink>
                        <NavLink to="/student-upload" className="nav-item">📥 Batch Enrollment</NavLink>
                        <NavLink to="/view-students" className="nav-item">📂 Student Directory</NavLink>

                        <div className="nav-group-title">Academics</div>
                        <NavLink to="/add-subject" className="nav-item">📖 Add Course</NavLink>
                        <NavLink to="/subject-list" className="nav-item">📜 Course Catalog</NavLink>
                        <NavLink to="/manage-subjects" className="nav-item">⛓️ Map Subjects</NavLink>
                        <NavLink to="/view-results" className="nav-item">📜 View Results</NavLink>
                        <NavLink to="/semester-results" className="nav-item">📊 Semester Analytics</NavLink>
                        <NavLink to="/add-results" className="nav-item">📊 Grade Entry</NavLink>
                        <NavLink to="/upload-excel" className="nav-item">📝 Bulk Results</NavLink>
                        <NavLink to="/add-event" className="nav-item">📢 Post Event</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/student-dashboard" className="nav-item">🏠 Dashboard</NavLink>
                        <NavLink to="/view-results" className="nav-item">📜 View Results</NavLink>
                    </>
                )}

                <div className="nav-group-title">Settings</div>
                <NavLink to="/profile" className="nav-item">👤 Profile</NavLink>
                <NavLink to="/calendar" className="nav-item">📅 Calendar</NavLink>
            </nav>

            <div className="bottom-section">
                <div className="user-badge">
                    <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.name}</div>
                        <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: 500 }}>{isTeacher ? 'FACULTY' : 'STUDENT'}</div>
                    </div>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Logout Session</button>
            </div>
        </aside>
    );
};

export default Sidebar;
