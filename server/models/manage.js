const mongoose = require('mongoose')

const manages = new mongoose.Schema(
    {
        Dept:{
            type:String,
            required:true
        },
        Sem:{
            type:String,
            required:true,
        },
        Subjects:[]
    }
);


const model = mongoose.model('management',manages)
module.exports = model;