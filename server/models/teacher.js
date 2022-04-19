const mongoose = require('mongoose')

const Teacher = new mongoose.Schema(
    {
        Tid:{
            type:String,
            required:true
        },
        Name:{
            type:String,
            required:true,
        },
        Dept:{
            type:String,
            required:true
        },
        Password:{
            type:String,
            required:true
        }
    }
);


const model = mongoose.model('StaffDetails',Teacher)
module.exports = model;