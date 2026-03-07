const mongoose = require('mongoose');


const calSchema = {
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    }
};

const Evt = mongoose.model("Events",calSchema);

module.exports = Evt;