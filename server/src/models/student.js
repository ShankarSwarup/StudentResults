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
        },
        Gender:{
            type:String,
            required:true
        },
        DOB:{
            type:String,
            required:true
        },
        Phn:{
            type:String,
            required:true
        },
        Email:{
            type:String,
            required:true
        },
        Address:{
            type:String,
            required:true
        },
        Year:{
            type:String,
            required:true
        },
        Links:[
            {
                "title":{
                    type:String,
                    required:true
                },
                "link":{
                    type:String,
                    required:true
                }
            }
        ]
    }
);


const model = mongoose.model('StudentDetails',stud)
module.exports = model;