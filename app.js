const Jimp = require('jimp');
const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req,res) => {

    const params = url.parse(req.url, true).query;
    const {img} = params;

    if(req.url == '/') {
        res.writeHead(200, {'Content-Type': 'text/html'})
        fs.readFile('index.html', (err,data) => {
            res.end(data)
        })
    }
    if(req.url.includes('/style')){
        res.writeHead(200, {'Content-Type': 'text/css'})
        fs.readFile('style.css', (err,data) => {
            res.end(data)
        })
    }
    if(req.url.includes('/imagen')){
        Jimp.read(img, (err, imagen) => {
            imagen
            .resize(350, Jimp.AUTO)
            .greyscale()
            .quality(60)
            .writeAsync('imagen.png')
            .then(() => {
                fs.readFile('/imagen.png', (err, imagenLeida) => {
                    res.writeHead(200, {'Content-Type': 'image/png'})
                    res.end('imagen procesada')
                }) 
            })
        })
    }


}).listen(5000, () => {
    console.log('Servidor arriba');
})