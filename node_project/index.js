const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer((req,res) => {
  const pathName = url.parse(req.url, true).pathname;
  const id = url.parse(req.url, true).query.id;
  
  if(pathName === 'LAPTOP' || pathName === '/'){
    res.writeHead(200, { "Content-type": "text/html" });
		res.end("this is the the PRODUCTS PAGE");
  }
  else if(pathName === 'laptop' && id < laptopData.length){
    res.writeHead(200, { "Content-type": "text/html" });
    res.end("this is the the LAPTOP PAGE");
  }
  else{
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("Page Not Found");

  }
  
});

server.listen(1337, '127.0.0.1', () => {
  console.log("Listrning for requests now")
});  