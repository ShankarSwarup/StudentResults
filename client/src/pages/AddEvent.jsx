import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles/theme.css';

const AddEvent = () => {
    const [formData, setFormData] = useState({ Subject: '', StartTime: '', Place: '' });
    const [events, setEvents] = useState([]);
    const [status, setStatus] = useState({ msg: '', isErr: false });
    const [loading, setLoading] = useState(false);

    const fetchEvents = async () => {
        try {
            const { data } = await API.get('/events/all');
            setEvents(data.data);
        } catch (err) {
            console.error("Fetch failed");
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ msg: '', isErr: false });
        try {
            const { data } = await API.post('/events/event', formData);
            if (data.status === 'ok') {
                setStatus({ msg: 'Event successfully published!', isErr: false });
                setFormData({ Subject: '', StartTime: '', Place: '' });
                fetchEvents();
            }
        } catch (err) {
            setStatus({ msg: err.response?.data?.message || 'Failed to post event', isErr: true });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this event?")) return;
        try {
            await API.post('/events/delete', { id });
            setEvents(events.filter(e => e._id !== id));
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <div className="grid-2" style={{ maxWidth: '1000px', margin: '0 auto', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '3rem', height: 'fit-content' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Create Event</h2>

                {status.msg && (
                    <div style={{ padding: '10px', borderRadius: '8px', marginBottom: '1.5rem', background: status.isErr ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: status.isErr ? 'var(--accent)' : '#10b981', textAlign: 'center' }}>
                        {status.msg}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label style={{ fontSize: '0.8rem' }}>Event Title</label>
                        <input className="input-field" placeholder="e.g. Workshop" value={formData.Subject} onChange={e => setFormData({ ...formData, Subject: e.target.value })} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label style={{ fontSize: '0.8rem' }}>Date</label>
                        <input type="date" className="input-field" value={formData.StartTime} onChange={e => setFormData({ ...formData, StartTime: e.target.value })} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ fontSize: '0.8rem' }}>Venue</label>
                        <input className="input-field" placeholder="e.g. Hall 1" value={formData.Place} onChange={e => setFormData({ ...formData, Place: e.target.value })} required />
                    </div>
                    <button className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Publishing...' : 'Publish Event'}
                    </button>
                </form>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Active Bulletins</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {events.map((ev, i) => (
                        <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{ev.title}</div>
                                <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{ev.date} | {ev.place}</div>
                            </div>
                            <button onClick={() => handleDelete(ev._id)} style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', cursor: 'pointer' }}>🗑️</button>
                        </div>
                    ))}
                    {events.length === 0 && <p style={{ color: 'var(--text-dim)', textAlign: 'center' }}>No active events found.</p>}
                </div>
            </div>
        </div>
    );
};

export default AddEvent;
