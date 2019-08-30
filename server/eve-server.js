const http = require('http');
const ReqHandler = require('./modules/eve-reqHandler');
const port = 3693;

const jsonServer = http.createServer((req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  switch (req.method.toLowerCase()) {
    case 'get':
      new ReqHandler.GetHandler(req, res)
      break;
    case 'post':
      new ReqHandler.PostHandler(req, res)
      break;
    case 'delete':
      new ReqHandler.DeleteHandler(req, res)
      break;
    case 'put':
      new ReqHandler.PutHandler(req, res)
      break;
    default:
      res.end('Hello');
  }


})


jsonServer.listen(port, () => console.log('Server works'))
