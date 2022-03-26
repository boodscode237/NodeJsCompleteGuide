const http = require('http')
/**
function rqListener(req, res){

}

http.createServer(rqListener)

// Anonymous function
http.createServer(function(req, res){

})
**/

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers)
    const url = req.url

    if(url === '/'){
        res.write('<html>' +
            '<head><title>Enter message</title></head>' +
            '' +
            '<body>' +
            '<form action="/message" method="POST"><input type="text" name="message"> <button type="submit">SEND</button></form>' +
            '</body>' +
            '</html>')
        res.end()
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
})


server.listen(3000)