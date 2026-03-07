const Note = require('../models/nodemodel');
const Event = require('../models/event');

// Add Calendar Note (Legacy logic)
const addNote = async (req, res) => {
    const { StartTime, Subject } = req.body;
    var note = new Note({ date: StartTime, title: Subject });
    await note.save();
    res.json({ status: 'ok' });
};

// Add Event
const addEvent = async (req, res) => {
    const { StartTime, Subject, Place } = req.body;
    if (!StartTime || !Subject || !Place) {
        return res.status(400).json({ status: 'error', message: "Fields cannot be empty!" });
    }
    var event = new Event({ date: StartTime, title: Subject, place: Place });
    await event.save();
    res.json({ status: 'ok' });
};

// Get All Events
const getEvents = async (req, res) => {
    const data = await Event.find({});
    res.json({ status: 'ok', data: data });
};

// Delete Event
const deleteEvent = async (req, res) => {
    const { id } = req.body;
    await Event.findByIdAndDelete(id);
    res.json({ status: 'ok', message: "Event removed" });
};

module.exports = { addNote, addEvent, getEvents, deleteEvent };
