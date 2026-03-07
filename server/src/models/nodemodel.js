const mongoose = require('mongoose');


const calSchema = {
    title: String,
    date: String
};

const Note = mongoose.model("Calendars",calSchema);

module.exports = Note;