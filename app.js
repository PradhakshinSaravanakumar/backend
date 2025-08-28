
const express = require('express');
const controller = require('./controller')
const app = express();
app.use(express.json());

app.post('/insert', controller.insertdata);
app.get('/getAllStudents', controller.getAllStudents);
app.get('/getStudentByRollNo', controller.getStudentByRollNo);
app.delete('/deleteStudent', controller.deleteStudent);
app.put('/editStudent', controller.editStudent);

app.get('/paramscheck/:id', (req, res)=>{
    console.log(req.params.id);
    res.send("Params Checked");
})

app.get('/querycheck', (req, res) => {
    console.log(req.query);
    res.send("Query Params Checked");
})

app.listen(3000);
