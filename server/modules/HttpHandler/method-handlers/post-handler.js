const fs = require('fs');

module.exports = class PostHandler {
  static handlePost(req, res, filePath) {
    let fullData = '';

    req.on('data', (chunk) => {
      fullData += chunk;
    });

    req.on('end', () => {
      fullData = JSON.parse(fullData);
      let dbData;

      fs.readFile(filePath, 'utf8', (err, jsonString) => {
        if (err) {
          return res.end(JSON.stringify(err));
        }
        dbData = JSON.parse(jsonString);
        return 0; // For linter purposes
      });

      dbData.push(fullData);

      fs.writeFile(filePath, JSON.stringify(dbData, null, 4), 'utf8', (err) => {
        if (err) {
          return res.end(JSON.stringify(err));
        }
        res.end('POST request successful');
        return 0; // For linter purposes
      });
    });
  }
};
