let data = [];
function getStudentByRollNo(req, res) {
    console.log("[INFO] Entered into Get Student By Roll No");
    const rollNo = req.body.rollNo;
    const student = data.find(student => student.rollNo === rollNo);
    if (student) {
        console.log("[SUCCESS] Student Found");
        res.status(200).send(student);
    } else {
        console.log("[ERROR] Student Not Found");
        res.status(404).send("Student Not Found");
    }
}

function getAllStudents(req, res) {
    console.log("[INFO] Entered into Get All Students");
    res.send(data);
}

function insertdata(req, res) {
    console.log("[INFO] Entered into Insert Data");
    let isDuplicate = checkIfDataIsPresent(req.body.rollNo);
    if(!isDuplicate) {
        console.log("[INFO] No Duplicate Found");
        data.push(req.body);
        console.log("[SUCCESS] Data Inserted Successfully");
        res.send('Data Inserted');
    }
    else {
        console.log("[INFO] Duplicate Record Found");
        res.send("Record Already Exists");
    }
}
function  checkIfDataIsPresent(rollNo) {
    for(let i of data) {
        if(i.rollNo === rollNo) {
            return true;
        }
    }
    return false;
}

function deleteStudent(req, res) {
    let rollNo = req.body.rollNo;
    let index = data.findIndex(s => s.rollNo === rollNo);
    if (index !== -1) {
        data.splice(index, 1);
        res.send("Student Deleted");
    } else {
        res.status(404).send("Student Not Found");
    }
}

function editStudent(req, res) {
    let rollNo = req.body.rollNo;
    let index = data.findIndex(s => s.rollNo === rollNo);
    if (index !== -1) {
        data[index] = req.body;
        res.send("Student Updated");
    } else {
        res.status(404).send("Student Not Found");
    }
}

module.exports =
 { getStudentByRollNo, insertdata, deleteStudent, getAllStudents, 
    editStudent
 };