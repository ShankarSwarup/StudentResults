const express= require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = express.Router();
const Student = require("./models/student");
const Staff = require("./models/teacher");
const excelModel = require("./models/excelschema");

dotenv.config();

const port = 3001;

const host = '0.0.0.0';


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECT).then(() => {
    console.log("Connection succesfull")
})


app.listen(process.env.PORT || 5000,host,function(){
    console.log("express server is running on port",process.env.PORT);
})


app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.post('/find', async(req,res) => {
    try{
        const name = req.body.x;
        const user = await Student.findOne({Reg : name});
        // console.log(name,req.body.lpassword);
        if(!user)
        {
            res.json({status : "err",message : "Wrong id !",token : false})
        }
        else
        {
            return res.json({status:'ok',message : "Successful !",data : user});
        }
        
    }
    catch(err){
        res.json({status : "err",message : "Wrong credentials !",token : false})
    }
});

app.post('/results',async(req,res)=>{
    try{
        // console.log(req.body.files);
        const data = req.body.files;
        const key = Object.keys(data[0]);
        data.map(async(d)=>{
            const user = await excelModel.findOne({"year": String(d.year), "regNo": String(d.regNo), "sem": d.sem});
            if(!user)
            {
                var book1 = new excelModel({ "year": String(d.year), "regNo": String(d.regNo), "sem": d.sem});
                book1.save(function (err, book) {
                    if (err) return console.error(err);
                    console.log("successful");
                });
                for(let i=0;i<key.length;i++)
                {
                    let y=String(key[i]);
                    if(!(y=="year" || y=="regNo" || y=="sem"))
                    {
                    const filter = {"regNo":d.regNo,"year":d.year,"sem":d.sem};
                    const update = { $push: {"subject": {sub:y,grade:String(d[y])}}}
                    let doc = await excelModel.findOneAndUpdate(filter, update, {
                        new: true
                        });
                    }
                }
            }
            else
            {
                for(let i=0;i<key.length;i++)
                {
                    let y=String(key[i]);
                    if(!(y=="year" || y=="regNo" || y=="sem"))
                    {
                        if(String(d[y])!='Nill')
                        {
                            const user = await excelModel.findOne({"regNo":d.regNo,"year":d.year,"sem":d.sem});
                            for(var x in user.subject)
                            {
                                if(user.subject[x].sub === y)
                                {
                                    // console.log(d.regNo , user.subject[x].sub , user.subject[x].grade , d[y]);
                                    if(user.subject[x].grade!=d[y])
                                    {
                                        // console.log(d.regNo , user.subject[x].grade , d[y]);
                                        user.subject[x].grade = d[y];
                                        user.save(function (err, book) {
                                            if (err) return console.error(err);
                                            console.log("successful");
                                        });
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        return res.json({status:'ok',message : "Successful !"});
    }
    catch(err)
    {
        // res.json({status : "err",message : "Wrong credentials !",token : false})
    }
})

app.post('/gets',async(req,res)=>{
    try{
        const name = req.body.v;
        // console.log(name);
        const temp = req.body.el;
        let a=temp[0]+"rd";
        let b=temp[2];
        console.log(name,a,b);
        const user = await excelModel.findOne({"regNo":name,"year":a,"sem":b});
        // console.log(user);
        if(!user)
        {
            return  res.json({status : "err",message : "No data !",token : false})
        }
        return res.json({status:'ok',message : "Successful !" , data:user});
    }
    catch{
         res.json({status : "err",message : "Wrong credentials !",token : false})
    }
})

app.post('/studlogin', async(req,res) => {
    try{
        const name = req.body.lreg;
        const user = await Student.findOne({Reg : name});
        // console.log(name,req.body.lpassword);
        if(!user)
        {
            res.json({status : "err",message : "Wrong id !",token : false})
        }
        else if(user.Password == req.body.lpassword)
        {
            return res.json({status:'ok',message : "Successful !",data:user});
        }
        else
        {
            res.json({status : "err",message : "Wrong Password !",token : false})
        }
    }
    catch(err){
        res.json({status : "err",message : "Wrong credentials !",token : false})
    }
});

app.post('/studpass', async(req,res) => {
    try{
        const filter = { Reg: req.body.reg , Password : req.body.pass};
        const update = { Password: req.body.password };
        let x = await Student.findOneAndUpdate(filter, update);
        if(!x)
        {
            res.json({status : "err",message : "Wrong credentials !",token : false});   
        }
        return res.json({status:'ok',message : "Successful !"});
    }
    catch(err){
        res.json({status : "err",message : "Wrong credentials !",token : false})
    }
});


app.post('/stafflogin', async(req,res) => {
    try{
        const name = req.body.lreg;
        const user = await Staff.findOne({Tid : name});
        if(!user)
        {
            res.json({status : "err",message : "Wrong id !",token : false})
        }
        else if(user.Password == req.body.lpassword)
        {
            return res.json({status:'ok',message : "Successful !"});
        }
        else
        {
            res.json({status : "err",message : "Wrong Password !",token : false})
        }
    }
    catch(err){
        res.json({status : "err",message : "Wrong credentials !",token : false})
    }
});

app.post('/passchange', async(req,res) => {
    try{
        const filter = { Tid: req.body.reg , Password : req.body.pass};
        const update = { Password: req.body.password };
        let x = await Staff.findOneAndUpdate(filter, update);
        if(!x)
        {
            res.json({status : "err",message : "Wrong credentials !",token : false});   
        }
        return res.json({status:'ok',message : "Successful !"});
    }
    catch(err){
        res.json({status : "err",message : "Wrong credentials !",token : false})
    }
});

app.post('/excel',async(req,res) => {
    try{
    const data = req.body.files;
    const columnsArray = Object.keys(data[0]);
    data.map(async(d) => {
            var utc_days  = Math.floor(d.DOB - 25569);
            var utc_value = utc_days * 86400;                                        
            var date_info = new Date(utc_value * 1000);
            var x = String(String(date_info.getFullYear())+"-"+String(date_info.getMonth()+1)+"-"+String(date_info.getDate()));
         
        var student = new Student(
            {  Reg: d.Reg ,
               Name : d.Name ,
               Password : d.Phn , 
               Phn : d.Phn ,
               Dept: d.Dept ,
               Gender : d.Gender , 
               DOB : x ,
               Country : d.Country ,
               State : d.State ,
               Email : d.Email ,
               Address : d.Address 
            });
        student.save(function (err, book) {
        if (err) return console.error(err);
                console.log("successful");
        });
    })
    return res.json({status:'ok'});
    }
    catch(err){
         return res.json({status:'error' , error:'invalid token'})
    }
})