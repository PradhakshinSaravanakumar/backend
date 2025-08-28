const express = require('express');
const app = express();
const mongooose = require('mongoose');

app.use(express.json());

mongooose.connect("mongodb://127.0.0.1:27017/studentdb")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("DB connection error", err))

const studentSchema = new mongooose.Schema({
    name: String,
    age: Number,
    department: String,
    rollNo: String
});

const Student = mongooose.model("Student", studentSchema);


app.post('/insert',middleware,insert );


async function insert(req, res){
    const { name, age, department, rollNo } = req.body;
    const newStudent = new Student({ name, age, department, rollNo })
    try {
        await newStudent.save();
        res.status(201).send("data inserted")
        console.log(req.body)
    } catch {
        res.status(400).send("error inserting data")
    }
}
function middleware(req,res,next){
    let reqdata = req.body;
    if (reqdata.rollNo && reqdata.name  && reqdata.age && reqdata.department){
        next()
    }else{
        res.send("Missing required params")
    }
}