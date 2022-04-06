const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        year:{
            type:String,
            required:true
        },
        regNo:{
            type:String,
            required:true,
        },
        sem:{
            type:String,
            required:true
        },
        subject:[
            {
                sub: String,
                grade: String
            }
        ]

    }
);


const model = mongoose.model('excelData',User)
module.exports = model;