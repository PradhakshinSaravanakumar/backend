const http = require('http')
http.createServer((req,res) => {
    let route = req.url
    if(route == "/home"){
        res.end("Home")
    }
    else if(route == "/about"){
        res.end("About")
    }
    else if(route == "/contact"){
        res.end("Contact")
    }
    else{
        res.end("Not Found")
    }
}).listen(8000)