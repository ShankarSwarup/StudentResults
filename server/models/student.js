const mongoose = require('mongoose')

const stud = new mongoose.Schema(
    {
        Reg:{
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


const model = mongoose.model('StudentDetails',stud)
module.exports = model;