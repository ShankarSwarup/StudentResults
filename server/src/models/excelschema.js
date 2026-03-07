const mongoose = require('mongoose')

const excelSchema = new mongoose.Schema({
    "year":{
        type:String,
        required:true
    },
    "regNo":{
        type:String,
        required:true
    },
    "sem":{
        type:String,
        required:true
    },
    "dept":{
        type:String,
        required:true
    },
    "subject":[
        {
            "sub":{
                type:String,
                required:true
            },
            "grade":{
                type:String,
                required:true
            }
        }
    ]
});



const excelModel = mongoose.model('excelData',excelSchema);
module.exports = excelModel;