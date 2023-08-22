const http = require('http');
//req = request, wat komt binnen in de server, res = response wat geeft de server terug
const server = http.createServer((req, res)=>{
    if (req.url === '/') {
        res.end('Hallo, welkom!');
    } else if (req.url === '/contact') {
        res.end('Contact, pagina');
    } else {
        res.end(`<h1>oops, pagina bestaat niet</h1>
        <a href='/'>terug home</a>
        `);
    }
   
})

server.listen(5000);