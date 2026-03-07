import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <style>{`
                .home-container {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: radial-gradient(circle at top left, rgba(99, 102, 241, 0.15), transparent),
                                radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.15), transparent);
                    position: relative;
                    padding: 2rem;
                    text-align: center;
                }

                .floating-shape {
                    position: absolute;
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    filter: blur(80px);
                    opacity: 0.2;
                    z-index: -1;
                    animation: float 10s ease-in-out infinite;
                }

                .shape-1 { top: 10%; left: 10%; }
                .shape-2 { bottom: 10%; right: 10%; }

                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-40px) scale(1.1); }
                }

                .hero-content {
                    max-width: 900px;
                    z-index: 10;
                }

                .hero-title {
                    font-size: 4rem;
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                    background: linear-gradient(to right, #fff, #94a3b8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: -2px;
                }

                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2.5rem;
                        letter-spacing: -1px;
                    }
                }

                .hero-subtitle {
                    font-size: 1.25rem;
                    color: var(--text-dim);
                    margin-bottom: 3rem;
                    line-height: 1.8;
                }

                .actions {
                    display: flex;
                    gap: 1.5rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .card-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                    width: 100%;
                    max-width: 1200px;
                    margin-top: 5rem;
                }

                .feature-card {
                    padding: 2.5rem;
                    text-align: left;
                    transition: all 0.3s ease;
                    cursor: default;
                }

                .feature-card:hover {
                    transform: translateY(-10px);
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.08);
                }

                .icon-box {
                    width: 50px;
                    height: 50px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                    font-size: 1.5rem;
                    background: var(--glass-bg);
                }

                @media (max-width: 768px) {
                    .hero-title { font-size: 3rem; }
                    .card-grid { margin-top: 3rem; }
                }

                .badge {
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--primary);
                    padding: 0.5rem 1rem;
                    border-radius: 30px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    display: inline-block;
                }
            `}</style>

            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>

            <div className="hero-content">
                <span className="badge">Next Generation Academic Portal</span>
                <h1 className="hero-title">Shaping the Future of <br /> Student Management</h1>
                <p className="hero-subtitle">
                    A sleek, unified platform for real-time results tracking, course management,
                    and academic coordination. Designed for transparency and efficiency.
                </p>
                <div className="actions">
                    <button className="btn-primary" onClick={() => navigate('/login')}>Get Started</button>
                    <button className="btn-secondary" onClick={() => navigate('/syllabus')} style={{
                        background: 'transparent',
                        border: '1px solid var(--glass-border)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        cursor: 'pointer'
                    }}>View Syllabus</button>
                </div>
            </div>

            <div className="card-grid grid-3">
                <div className="glass-card feature-card">
                    <div className="icon-box">📊</div>
                    <h3>Insights</h3>
                    <p style={{ color: 'var(--text-dim)', marginTop: '0.5rem' }}>Get detailed academic reports and visual performance data instantly.</p>
                </div>
                <div className="glass-card feature-card">
                    <div className="icon-box">📅</div>
                    <h3>Calendar</h3>
                    <p style={{ color: 'var(--text-dim)', marginTop: '0.5rem' }}>Never miss an exam or event with our smart scheduling system.</p>
                </div>
                <div className="glass-card feature-card">
                    <div className="icon-box">🔒</div>
                    <h3>Security</h3>
                    <p style={{ color: 'var(--text-dim)', marginTop: '0.5rem' }}>Enterprise-grade security protecting sensitive academic records.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
