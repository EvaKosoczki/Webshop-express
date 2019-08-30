const path = require('path');
const fs = require('fs');


class DataBase {
  constructor(jsonfile) {
    this.splicedPathArr = jsonfile.split('/');
    this.id = this.splicedPathArr[2] || 0;
    this.fileName = this.splicedPathArr[1];
    this.jsonFolderPath = path.join(__dirname, '../..', 'json');
    this.jsonFilePath = path.join(this.jsonFolderPath, `${this.fileName}.json`)
  }
  readJson() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.jsonFilePath, 'utf8', (err, jsonString) => {
        if (err) {
          return reject(JSON.stringify(err))
        }
        if (this.id == 0) {
          resolve(JSON.parse(jsonString))
        } else {
          this.oneJson = JSON.parse(jsonString).filter((item) => item.id == this.id)[0] || {}
          resolve(this.oneJson)
        }
      })
    })
  }
  deleteJSON() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.jsonFilePath, 'utf8', (err, jsonString) => {
        if (err) {
          return reject(JSON.stringify(err))
        } else {
          this.JSONparsed = JSON.parse(jsonString)
          this.index = this.JSONparsed.findIndex(item => item.id == this.id)
          for (let i = 0; i < this.JSONparsed.length; i += 1) {
            if (this.JSONparsed[i].id == this.id) {
              this.JSONparsed.splice(this.index, 1)
              fs.writeFile('../json/product.json', JSON.stringify(this.JSONparsed, null, 4), 'utf8',
                (err) => console.error('Ok')
              )
              resolve(console.log(this.index))
            }
          }
        }
      })
    })
  }
}

module.exports = {
  DataBase: DataBase
}
