const path = require('path');
const fs = require('fs');

module.exports = class DB {
  constructor(jsonFileName) {
    this.jsonDirectory = path.join('./../json');
    console.log(this.jsonDirectory);

    this.jsonFilePath = path.join(this.jsonDirectory, `${jsonFileName}.json`);
    console.log(this.jsonFilePath);
  }

  find(id = 0) {
    return new Promise((resolve, reject) => {
      if (id === 0) {
        this.getJsonArray().then(
          dataArray => resolve(dataArray),
          err => reject(err)
        );
      } else {
        this.getJsonArray().then(
          dataArray => {
            let found = dataArray.filter(item => item.id == id)[0] || {};
            resolve(found);
          }
        )
      }
    });
  }

  getJsonArray() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.jsonFilePath, 'utf8', (err, jsonString) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(jsonString));
      });
    });
  }
};
