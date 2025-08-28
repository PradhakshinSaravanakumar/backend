const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())

app.post('./login', (req,res) => {
    let{username, password} = req.body
    if (username == "admin" && password == "admin@123"){
        let token = jwt.sign(username, "SECRETKEY",{
            expiresIn : '1h'
        })
        res.send(token)
    }
})
app.listen(5000)