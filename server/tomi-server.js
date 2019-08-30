const http = require('http');
const path = require('path');
const ReqHandler = require('./modules/tomi-reqHandler')

const port = 3310;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  switch (req.method.toLowerCase()) {
    case 'get':
      new ReqHandler.GetHandler(req, res);
      break;
    case 'put':
      new ReqHandler.PutHandler(req, res);
      break;
    default:
      res.end('Invalid method.');
  }
});

server.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
})
