const mongoose = require('mongoose')

const subjects = new mongoose.Schema(
    {
        Subject:{
            type:String,
            required:true
        },
        Code:{
            type:String,
            required:true,
        },
    }
);


const model = mongoose.model('Subjects',subjects)
module.exports = model;