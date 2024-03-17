const express = require("express");
const app=express();
const bcrypt =require("bcrypt");
const mongoose = require("mongoose");
const User = require('./Models/User');
const Item = require('./Models/Item');
const cors = require('cors');
const path=require("path");
const multer = require("multer");
const uploadMiddleware = multer({dest:'uploads/'});
const fs = require("fs");

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:3004', 
    optionsSuccessStatus: 200,
  };

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/uploads',express.static(__dirname+"/uploads"));

const salt = bcrypt.genSaltSync(10);
const secret = "my123Secret456";

mongoose.connect("mongodb+srv://saikumarpeddineni18:TjnhWDE8XiQ5F0d0@jobminar.sykrkd8.mongodb.net/?retryWrites=true&w=majority");

app.post("/register",async (req,res)=>{
    const {username,password}=req.body;
    console.log("Register")
    try{
        const UserDoc=await User.create({username,password:bcrypt.hashSync(password,salt)});
        res.json(UserDoc);
    }catch(e){
        res.status(400).json(e);
    }
});

app.post("/login",async (req,res)=>{
    try{
        const {username,password}=req.body;
    const userDoc = await User.findOne({username});
    const passOk= bcrypt.compareSync(password,userDoc.password);
    if(passOk){
        res.status(200).json("Login Successful");
    }else{
        res.status(400).json('wrong credentials');
    }
    }catch(e){
        res.status(400).json('wrong credentials');
    }
});

app.post('/addItem',uploadMiddleware.single('file'),async (req,res)=>{
    const {originalname,path} = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length-1];
    const newPath = path+'.'+ext;
    fs.renameSync(path,newPath);
    const {item,description,content}=req.body;
    const itemDoc = await Item.create({
    item,description,content,
    cover:newPath
    });
    res.json(itemDoc);
});

app.get('/items',async (req,res)=>{
    res.json(
        await Item.find()
        // .populate('author',['username'])
        // .sort({createdAt:-1})
        // .limit(20)
    );
});

app.listen(4001,()=>{
    console.log("Server listening on port 4001");
});

//mongodb+srv://saikumarpeddineni18:TjnhWDE8XiQ5F0d0@jobminar.sykrkd8.mongodb.net/?retryWrites=true&w=majority

//password:  TjnhWDE8XiQ5F0d0