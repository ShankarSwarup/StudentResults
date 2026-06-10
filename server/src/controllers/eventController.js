const Note = require('../models/nodemodel');
const Event = require('../models/event');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Add Calendar Note (Legacy logic)
const addNote = catchAsync(async (req, res, next) => {
    const { StartTime, Subject } = req.body;
    if (!StartTime || !Subject) {
        return next(new AppError("Fields cannot be empty!", 400));
    }
    const note = new Note({ date: StartTime, title: Subject });
    await note.save();
    res.json({ status: 'ok' });
});

// Add Event
const addEvent = catchAsync(async (req, res, next) => {
    const { StartTime, Subject, Place } = req.body;
    if (!StartTime || !Subject || !Place) {
        return next(new AppError("Fields cannot be empty!", 400));
    }
    const event = new Event({ date: StartTime, title: Subject, place: Place });
    await event.save();
    res.json({ status: 'ok' });
});

// Get All Events
const getEvents = catchAsync(async (req, res, next) => {
    const data = await Event.find({});
    res.json({ status: 'ok', data: data });
});

// Delete Event
const deleteEvent = catchAsync(async (req, res, next) => {
    const { id } = req.body;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
        return next(new AppError("Event not found", 404));
    }
    res.json({ status: 'ok', message: "Event removed" });
});

module.exports = { addNote, addEvent, getEvents, deleteEvent };
