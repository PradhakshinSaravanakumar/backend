const express = require("express")
const mongoose = require("mongoose")

const mongoo = express()
mongoo.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/studenttdb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err))

const studenttSchema = new mongoose.Schema({
    name : String,
    age : Number,
    dept : String,
    regno : String
})

const Student = mongoose.model("Student", studenttSchema)

mongoo.post('/insert', async (ereq, res) => {
    const {name, age, dept, regno} = ereq.body  
    const newStudent = new Student({
        name, age, dept, regno
    })
    try {
        await newStudent.save()
        res.status(201).send("Student inserted")
    } catch(error) {
        res.status(400).send("Error in inserting student")
    }
})

mongoo.get('/getAllStudents', async (req,res) => {
    try{
        const data = await Student.find()
        res.send(data)
    }
    catch(error){
        res.status(500).send("Error In Fetching Students")
    }
})
mongoo.listen(3000)
