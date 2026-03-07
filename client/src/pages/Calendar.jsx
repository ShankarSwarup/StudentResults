import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import API from '../services/api';
import '../styles/theme.css';

const AcademicCalendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await API.get('/events/all');
                if (data.status === 'ok') {
                    const formatted = data.data.map(e => ({
                        title: e.title,
                        start: e.date,
                        extendedProps: { place: e.place }
                    }));
                    setEvents(formatted);
                }
            } catch (err) {
                console.error("Failed to fetch events");
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleEventClick = (info) => {
        setSelectedEvent({
            title: info.event.title,
            start: info.event.start.toLocaleDateString(),
            place: info.event.extendedProps.place
        });
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            <div className="glass-card fade-in" style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Campus Activity Wall</h2>
                    <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>{events.length} UPCOMING SCHEDULES</span>
                </div>

                <style>{`
                    .fc { --fc-border-color: var(--glass-border); --fc-page-bg-color: transparent; }
                    .fc-toolbar-title { color: white !important; font-family: 'Outfit', sans-serif !important; font-weight: 800 !important; }
                    .fc-col-header-cell-cushion { color: var(--text-dim) !important; font-weight: 700 !important; text-transform: uppercase; font-size: 0.8rem; }
                    .fc-daygrid-event { background: var(--primary) !important; border: none !important; padding: 4px 10px !important; border-radius: 6px !important; cursor: pointer !important; transition: transform 0.2s ease !important; }
                    .fc-daygrid-event:hover { transform: scale(1.02); }
                    .fc-day-today { background: rgba(99, 102, 241, 0.05) !important; }
                    .fc-button-primary { background: var(--glass-bg) !important; border: 1px solid var(--glass-border) !important; color: white !important; font-weight: 700 !important; text-transform: capitalize !important; }
                    .fc-button-primary:not(:disabled):hover { background: var(--primary) !important; transform: translateY(-2px); }
                `}</style>

                {loading ? (
                    <div style={{ padding: '6rem', textAlign: 'center' }}>
                        <div className="spinner" style={{ margin: '0 auto 2rem auto' }}></div>
                        Fetching latest event schedules...
                    </div>
                ) : (
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        eventClick={handleEventClick}
                        height="auto"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth'
                        }}
                    />
                )}
            </div>

            {selectedEvent && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-card scale-in" style={{ width: '100%', maxWidth: '450px', padding: '3rem', border: '1px solid var(--primary)', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🗓️</div>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 800 }}>{selectedEvent.title}</h3>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                            Scheduled for <strong>{selectedEvent.start}</strong><br />
                            Venue: 🚀 <strong>{selectedEvent.place}</strong>
                        </p>
                        <button className="btn-primary" style={{ width: '100%' }} onClick={() => setSelectedEvent(null)}>Dismiss Details</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcademicCalendar;
