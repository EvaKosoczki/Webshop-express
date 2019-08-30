const http = require('http');
const Handler = require('./modules/HttpHandler');

const dataPath = './../json/product.json';
const portNumber = 3456;

const httpHandler = new Handler(dataPath);

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  switch (req.method.toLowerCase()) {
    case 'get':
      httpHandler.handleGet(req, res);
      break;
    case 'put':
      httpHandler.handlePut(req, res);
      break;
    case 'post':
      httpHandler.handlePost(req, res);
      break;
    case 'delete':
      httpHandler.handleDel(req, res);
      break;
    default:
      res.end('Session ended.');
  }
});

server.listen(portNumber);
