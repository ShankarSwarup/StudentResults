const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/res_format')
var bodyParser = require('body-parser');
var path       = require('path');
var xlsx       = require('xlsx');
var multer     = require('multer');
const xlsxFile = require('read-excel-file/node');
const fs = require("fs");

router.get('/',async(req,res)=>{
    const user = await User.find()
    res.json(user)
})


router.post('/stat',async(req,res) => {
    try{
        const user = await User.findOne(
            { year: req.body.year , sem: req.body.sem , regNo: req.body.regNo } 
        )
        const results = {
            "year" : req.body.year,
            "sem" : req.body.sem,
            "regNo" : req.body.regNo
        }
        for(var x=0;x<user["subject"].length;x++)
        {
            var z=user["subject"][x]["sub"]
            var y=user["subject"][x]["grade"]
            results[z] = y
        }
        // console.log(results)
        return res.json({status:'ok',result:results})
    }
    catch(err){
         return res.json({status:'error' , error:'invalid token'})
    }
})

router.post('/excel',async(req,res) => {
    try{
    // console.log(req.body.files);
    const data = req.body.files;
    // console.log(data);
    const columnsArray = Object.keys(data[0]);

     data.map(async(d)=>{
      var book1 = new User({ year: String(d.year), regNo: String(d.regNo), sem: String(d.sem)});
      book1.save(function (err, book) {
        if (err) return console.error(err);
        console.log("successful");
      });
      for(let i=0;i<columnsArray.length;i++)
      {
        let y=String(columnsArray[i]);
        if(!(y=="year" || y=="regNo" || y=="sem"))
        {
          const filter = {regNo:d.regNo,year:d.year,sem:String(d.sem)};
          const update = { $push: {subject: {sub:y,grade:String(d[y])}}}
          let doc = await User.findOneAndUpdate(filter, update, {
              new: true
            });
        }
      }
      
    });
    return res.json({status:'ok'});
    }
    catch(err){
         return res.json({status:'error' , error:'invalid token'})
    }
})

module.exports = router;