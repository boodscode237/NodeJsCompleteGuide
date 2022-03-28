const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method
    if(url === '/'){
        res.write('<html>' +
            '<head><title>Enter message</title></head>' +
            '' +
            '<body>' +
            '<form action="/message" method="POST"><input type="text" name="message"> <button type="submit">SEND</button></form>' +
            '</body>' +
            '</html>')
        return res.end()
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
        req.on("end", () => {
            const parsebody = Buffer.concat(body).toString()
            const message = parsebody.split('=')[1]
            fs.writeFileSync('message.txt', message, err => {
                res.writeHead(302, {'Location': '/'})
                /*
                res.statusCode = 302
                res.setHeader('Location', '/')
                 */
                return res.end()
            })
        })
    }

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>' +
        '<head><title>My First page</title></head>' +
        '' +
        '<body>' +
        '<h1>Hello from my node js server</h1>' +
        '</body>' +
        '</html>')
    res.end()

};


/**
 function rqListener(req, res){

}

 http.createServer(rqListener)

 // Anonymous function
 http.createServer(function(req, res){

})
 **/


module.exports = requestHandler