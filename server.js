const http = require('http')
let data = []
http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk
        })
        req.on('end', () => {
            let finalData = JSON.parse(body)
            data.push(finalData)
            console.log(data)
            res.statusCode = 200
            res.end('Data Inserted')
        })
        // data.push(req.body)
        // console.log(data)
        // res.statusCode = 200
        // res.end('Data Inserted')
    }
    // if(req.method == 'GET'){
    //     res.statusCode = 200
    //     res.end(JSON.stringify(data))
    // }
    if (req.method === 'GET') {
        let body = ''
        req.on('data', chunk => {
            body += chunk
        })
        req.on('end', () => {
            if (body) {
                let parsed = JSON.parse(body)

                if (parsed.id) {
                    let result = data.find(s => s.id === parsed.id)
                    res.end(JSON.stringify(result || {}))
                    return
                }
            }

            else {
                res.end(JSON.stringify(data))
            }
        })
    }
    if (req.method === 'DELETE') {
        let body = ''
        req.on('data', chunk => {
            body += chunk
        })
        req.on('end', () => {
            let parsed = JSON.parse(body)
            let index = data.findIndex(s => s.id === parsed.id)
            data.splice(index, 1)
            console.log(data)
            res.end('Data Deleted')
        })
    }
    
    if (req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            let parsed = JSON.parse(body);
            let index = data.findIndex(s => s.id === parsed.id);
            if (index !== -1) {
                data[index] = parsed;
                console.log("Updated data:", data);
                res.end('Data Updated');
            } else {
                res.statusCode = 404;
                res.end('Data not found');
            }
        });
    }
    console.log(req.method)
    // res.end("Server called")
}).listen(3000)