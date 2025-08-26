const express = require('express')
const app = express()
let data = []
app.use(express.json())
app.post('/insert', insertdata) 
app.get('/getAllStudents',(req,res) =>{
    console.log("[INFO]Entered into Get All Students")
    res.send(data)
})
app.get('/getAllStudentbyRegno', getStudentByRegno)
app.delete('/delete', deleteStudent)
function getStudentByRegno(req,res){
    console.log("[INFO]Entered into Get Student by reg no")
    const regno = req.body.regno
    const student = data.find(student => student.regno === regno)
    if(student){
        console.log("[SUCCESS]Student Found")
        res.status(200).send(student)
    }
    else{
        console.log("[ERROR]Student Not Found")
        res.status(404).send("Student Not Found")
    }
}
function insertdata(req,res){
    console.log("[INFO]Entered into Insert Data....")
    let isDuplicate = checkIfDataIsPresent(req.body.regno)
    if(!isDuplicate){
        console.log("[INFO] No Duplicte Found")
        data.push(req.body)
        console.log("[SUCCESS]Data Inserted Successfully")
        res.send("Data Inserted")
    }
    else{
        console.log("[INFO]Duplicte Record Found")
        res.send("Record Already Exists")
    }
}
function  checkIfDataIsPresent(regNo) {
    for(let i of data) {
        if(i.regNo === regNo) {
            return true;
        }
    }
    return false;
}
function deleteStudent(req,res){
    let regno = req.body.regno
    let index = data.findIndex(s=>s.regno===regno)
    if(index !== -1){
        data.splice(index,1)
        res.send("Student Deleted")
    }
    else{
        res.status(404).send("Student Not Found")
    }
}
app.listen(3000)
 