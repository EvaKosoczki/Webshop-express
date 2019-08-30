const fs = require('fs');
const path = require('path');

module.exports = class GetHandler {
  static handleGet(req, res, filePath) {
    // EZT KELL MAJD ÁTÍRNI
    // const fileName = req.url === '/' ? '/index.html' : `${req.url}.html`;
    // const filePath = `./view${fileName}`;
    let id = req.url === '/products' ? undefined : path.basename(req.url);
    id = Number.parseInt(id, 10);

    fs.readFile(filePath, 'utf8', (err, fileContent) => {
      if (err) {
        return res.end(JSON.stringify(err));
      }

      if (id) {
        return res.end(JSON.stringify(
          JSON.parse(fileContent).filter(obj => obj.id === id),
        ));
      }
      return res.end(fileContent);
    });
  }
};
