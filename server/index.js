const express= require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = express.Router();
const Student = require("./models/student");
const Staff = require("./models/teacher");
const excelModel = require("./models/excelschema");
const Subject = require("./models/subjects");
const manage = require("./models/manage");
const Note = require("./models/nodemodel");

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

app.post('/addsub', async(req,res) => {
    try{
        const subject = req.body.subj;
        const code = req.body.cod;
        const user = await Subject.findOne({"Subject" : subject});
        if(user)
        {
            return res.json({status : "err",message : "Subject already there !",token : false})
        }
        var book1 = new Subject({"Subject": subject , "Code" : code });
        book1.save(function (err, book) {
                    if (err) return console.error(err);
                    // console.log("successful");
        });
        return res.json({status:'ok',message : "Successful !"});
    }
    catch(err){
        res.json({status : "err",message : "Data not send !",token : false})
    }
});

app.post('/mansub', async(req,res) => {
    try{
        const subject = req.body.subject;
        const sem = req.body.semister;
        const dept = req.body.depart;
        const user = await manage.findOne({"Dept" : dept , "Sem":sem});
        if(user)
        {
            if(user["Subjects"].includes(subject))
            {
              return res.json({status : "err",message : "Subject Already there!",token : false});
            }
            else
            {
                user["Subjects"].push(subject)
                user.save()
                return res.json({status:'ok',message : "Successful !"});
            }  
        }
        else
        {
            var x = []
            x.push(subject)
        var book1 = new manage({"Dept" : dept , "Sem":sem , "Subjects":x });
        book1.save(function (err, book) {
                    if (err) return console.error(err);
                    // console.log("successful");
        });
        return res.json({status:'ok',message : "Successful !"});
        }
        
    }
    catch(err){
        res.json({status : "err",message : "Data not send !",token : false})
    }
});

app.post('/mannsub', async(req,res) => {
    try{
        const subject = req.body.subject;
        const sem = req.body.semister;
        const dept = req.body.depart;
        const user = await manage.findOne({"Dept" : dept , "Sem":sem});
        if(user)
        {
            if(user["Subjects"].includes(subject))
            {
                user["Subjects"] = user["Subjects"].filter(item => item !== subject)
                user.save();
                return res.json({status:'ok',message : "Successful !"});
            }
            else
            {
                return res.json({status : "err",message : "Subject Not there!",token : false});
            }  
        }
        else
        {
            var x = []
            x.push(subject)
        var book1 = new manage({"Dept" : dept , "Sem":sem , "Subjects":x });
        book1.save(function (err, book) {
                    if (err) return console.error(err);
                    // console.log("successful");
        });
        return res.json({status:'ok',message : "Successful !"});
        }
        
    }
    catch(err){
        res.json({status : "err",message : "Data not send !",token : false})
    }
});

app.post('/findsub', async(req,res) => {
    try{
        const sem = req.body.semister;
        const dept = req.body.depart;
        const user = await manage.findOne({"Dept" : dept , "Sem":sem});
        if(user)
        {
            if(!user["Subjects"])
            {
               return res.json({status:'err',message : "No Subjects !"});

            }
            else
            {
                return res.json({status:'ok',message : "Successful !",data:user["Subjects"]});
            }
        }
        else
        {
        return res.json({status:'err',message : "No Data !"});
        }
        
    }
    catch(err){
        res.json({status : "err",message : "Data not send !",token : false})
    }
});

app.post('/editsub', async(req,res) => {
    try{
        const subject = req.body.subj;
        const code = req.body.cod;
        const user = await Subject.findOne({"Subject" : subject});
        console.log(user);
        user.Code=code;
        user.save();
        return res.json({status:'ok',message : "Successful !"});
    }
    catch(err){
        res.json({status : "err",message : "Data not edited !",token : false})
    }
});

app.post('/sub', async(req,res) => {
    try{
        Subject.find({}, function(err, users) {
            var userMap = [];
            var i=0;
            users.forEach(function(user) {
              userMap[i] = user;
              i++;
            });

            return res.json({status:'ok',message : "Successful !",data:userMap});
          });
        
    }
    catch(err){
        res.json({status : "err",message : "Wrong credentials !",token : false})
    }
});

app.post('/fileupload', async(req,res) => {
    try{
        const titl = req.body.title;
        const linked = req.body.result;
        const name = req.body.v;
        const user = await Student.findOne({Reg : name});
        // console.log(name,req.body.lpassword);
        if(!user)
        {
            res.json({status : "err",message : "Wrong id !",token : false})
        }
        else
        {
            const li = {
                "title":titl,
                "link":linked
            }
            user["Links"].push(li);
            // console.log(user);
            user.save(function (err, book) {
                if (err) return console.error(err);
                // console.log("successful");
            });
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
        // console.log(key);
        data.map(async(d)=>{
            var xi=String(d.year)+'-'+String(d.sem);
            const user = await excelModel.findOne({"year": String(d.grad), "regNo": String(d.regNo), "sem": xi , "dept":d.dept});
            if(!user)
            {
                const x=[];
                for(let i=0;i<key.length;i++)
                {
                    let y = String(key[i]);
                    if(y!=="year" && y!=="sem" && y!=="regNo" && y!=="dept" && y!="grad")
                    {
                        const te={
                            "sub":y,
                            "grade":d[y]
                        }
                        x.push(te);
                    }
                }
                var book1 = new excelModel({ "year": String(d.grad), "regNo": String(d.regNo), "sem": xi , "subject" : x , "dept":d.dept});
                book1.save(function (err, book) {
                    if (err) return console.error(err);
                    // console.log("successful");
                });
                // console.log(x);
                // console.log(" ");
            }
            else
            {
                for(let i=0;i<key.length;i++)
                {
                    let y=String(key[i]);
                    if(!(y=="year" || y=="regNo" || y=="sem" || y=="dept" || y=="grad"))
                    {
                        if(String(d[y])!='Nill')
                        {
                            var xi=String(d.year)+'-'+String(d.sem);
                            const user = await excelModel.findOne({"regNo":d.regNo,"year":String(d.grad),"sem":xi,"dept":d.dept});
                            for(var x in user.subject)
                            {
                                if(user.subject[x].sub === y)
                                {
                                    if(user.subject[x].grade!=d[y])
                                    {
                                        user.subject[x].grade = d[y];
                                        user.save(function (err, book) {
                                            if (err) return console.error(err);
                                            // console.log("successful");
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

app.post('/decres',async(req,res)=>{
    try{
    const depart = req.body.depart;
    const semister = req.body.semister;
    const year = req.body.year;
    const reg = req.body.reg;
    const a=req.body.a;
    const user = await excelModel.findOne({"year": year, "regNo": reg, "sem": semister ,"dept":depart});
    if(!user)
    {
    var book1 = new excelModel({ "year": year, "regNo": reg, "sem": semister , "subject" : a ,"dept":depart});
    book1.save(function (err, book) {
        if (err) return console.error(err);
        return res.json({status:'ok',message : "Successful"});
    });
    }
    else
    {
        a.map((d)=>{
            user.subject.map((f)=>{
                if(f["sub"] === d["sub"] && d["grade"]!="No Change")
                {
                    f["grade"]=d["grade"];
                }
            })
        })
        user.save();
        return res.json({status:'ok',message : "Successful"});
    }
    }
    catch{
        res.json({status : "err",message : "Data not updated !",token : false})
    }
})
app.post('/finds',async(req,res)=>{
    try{
        const name = req.body.ten;
        const user = await Student.findOne({Reg : name});
        // console.log(name,req.body.lpassword);
        if(!user)
        {
            res.json({status : "err",message : "No user !",token : false})
        }
        else
        {
            return res.json({status:'ok',message : "Successful !",data:user});
        }
    }
    catch{
         res.json({status : "err",message : "No user !",token : false})
    }
})

app.post('/gets',async(req,res)=>{
    try{
        const reg= req.body.ten;
        const temp = req.body.c;
        // console.log(reg,dept,year,temp);
        if(temp!='backlog')
        {
           
            const user = await excelModel.findOne({"regNo":reg,"sem":temp});
            // console.log(user);
            if(!user)
            {
                return  res.json({status : "err",message : "No Student !",token : false})
            }
            // console.log(user);
            return res.json({status:'ok',message : "Successful" , data:user});
        }
        else
        {
            const user = await excelModel.find({"regNo":reg});
            // console.log(user);
            const ans  = [];
            if(!user)
            {
                return  res.json({status : "err",message : "No Student !",token : false})
            }
            else
            {
                // user[0].map((item)=>{
                //     console.log(item);
                // })
                // console.log(user);
                user.map((item)=>{
                    item.subject.map((a)=>{
                        // console.log(a);
                        if(a.grade ==='F')
                        {
                            ans.push(a.sub);
                        }
                    })
                })
                // console.log(ans);
                return res.json({status:'ok',message : "backlogs" , data:user[0] , back:ans});
            }  
        }
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
               Email : d.Email ,
               Address : d.Address,
               Year:String(d.year) 
            });
        student.save(function (err, book) {
        if (err) return console.error(err);
                // console.log("successful");
        });
    })
    return res.json({status:'ok'});
    }
    catch(err){
         return res.json({status:'error' , error:'invalid token'})
    }
})

app.post('/addstud',async(req,res) => {
    try{
       const depart = req.body.depart;
       const name =req.body.name;
       const reg = req.body.reg;
       const dob = req.body.dob;
       const email = req.body.email;
       const phn = req.body.phn;
       const gender = req.body.gender;
       const address = req.body.address;
       const year = req.body.year;
       const user = await Student.findOne({Reg : reg});
       if(user)
       {
        return res.json({status : "err",message : "Student Already there !",token : false})
       }
       else
       {
        var student = new Student(
            {  Reg: reg ,
               Name : name ,
               Password : phn , 
               Phn : phn ,
               Dept: depart ,
               Gender : gender , 
               DOB : dob ,
               Email : email ,
               Address : address,
               Year: year, 
            });
        student.save(function (err, book) {
        if (err) return console.error(err);
                // console.log("successful");
                return res.json({status:'ok',message : "Successful !"});
        });
       }
    }
    catch{
        return res.json({status : "err",message : "Data not updated !",token : false})
    }
})

app.post('/findstudents',async(req,res) => {
    try{
       const depart = req.body.depart;
       const year = req.body.year;
       
           Student.find({Dept:depart,Year:year},function(err,data){
           if(data)
           {
             return res.json({status:'ok',message : "Successful !",data:data});
           }
           else
           {
             return res.json({status : "err",message : "No Students !",token : false})
           }
       })
    }
    catch{
        return res.json({status : "err",message : "No Students !",token : false})
    }
})


app.post('/findstudent',async(req,res) => {
    try{
       const depart = req.body.depart;
       const year = req.body.year;
    //    console.log(depart,year);
       
           Student.find({Dept:depart,Year:year},'Reg',function(err,data){
           if(data)
           {
            //  console.log(data);
             return res.json({status:'ok',message : "Successful !",data:data});
           }
           else
           {
             return res.json({status : "err",message : "No Students !",token : false})
           }
       })
    }
    catch{
        return res.json({status : "err",message : "No Students !",token : false})
    }
})

app.post('/event',async(req,res) => {
    try{
        const date = req.body.StartTime;
            const title = req.body.Subject;
            var notes = new Note({ date : date , title : title});
        notes.save(function (err, book) {
        if (err) return console.error(err);
                console.log("successful");
        });
    return res.json({status:'ok'});
    }
    catch(err){
         return res.json({status:'error' , error:'invalid token'})
    }
})

app.post("/cal",async(req,res)=>{
    try{
        const data = await Note.find();
        return res.json({status:'ok',data:data});
    }
    catch(err){
        return res.json({status : "err",message : "No Data !",token : false})
   }
})