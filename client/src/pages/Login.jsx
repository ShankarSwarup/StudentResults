import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import { NotificationContext } from '../context/NotificationContext';
import API from '../services/api';
import '../styles/theme.css';

const Login = () => {
    const [isTeacher, setIsTeacher] = useState(false);
    const [loading, setLoading] = useState(false);
    const { notify } = useContext(NotificationContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (formData) => {
        setLoading(true);
        dispatch(loginStart());
        try {
            const endpoint = isTeacher ? '/auth/teacher/login' : '/auth/student/login';
            const { data } = await API.post(endpoint, formData);
            if (data.status === 'ok') {
                dispatch(loginSuccess(data.data));
                notify('Login successful!');
                navigate(isTeacher ? '/teacher-dashboard' : '/student-dashboard');
            }
        } catch (err) {
            dispatch(loginFailure());
            notify(err.response?.data?.message || 'Login failed. Please try again.', true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="glass-card login-card fade-in">
                <div className="text-center mb-2-5">
                    <h2 className="login-h2">Welcome Back</h2>
                    <p className="login-p">Access your secure academic portal</p>
                </div>

                <div className="tab-header">
                    <button
                        className={`tab-btn ${!isTeacher ? 'active' : ''}`}
                        onClick={() => setIsTeacher(false)}
                    >
                        Student
                    </button>
                    <button
                        className={`tab-btn ${isTeacher ? 'active' : ''}`}
                        onClick={() => setIsTeacher(true)}
                    >
                        Teacher
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-1-5">
                        <label className="login-label">{isTeacher ? 'TEACHER ID' : 'REGISTRATION NUMBER'}</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder={isTeacher ? 'e.g. T-101' : 'e.g. 23CS101'}
                            {...register('lreg', { 
                                required: 'This field is required',
                                validate: (value) => {
                                    if (isTeacher) {
                                        return value.startsWith('T-') || 'Teacher ID must start with "T-"';
                                    }
                                    return value.length >= 5 || 'Registration number must be at least 5 characters';
                                }
                            })}
                        />
                        {errors.lreg && <div style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: '0.5rem' }}>{errors.lreg.message}</div>}
                    </div>
                    <div className="form-group mb-2">
                        <label className="login-label">PASSWORD</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            {...register('lpassword', { 
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                        />
                        {errors.lpassword && <div style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: '0.5rem' }}>{errors.lpassword.message}</div>}
                    </div>
                    <button className="btn-primary w-full p-14" disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In to Portal'}
                    </button>
                </form>

                <div className="login-footer">
                    {isTeacher ? (
                        <p>
                            New faculty member? <Link to="/signup" className="link-primary">Register Account</Link>
                        </p>
                    ) : (
                        <p>
                            Trouble logging in? <span className="link-primary-cursor">Contact Admin</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
