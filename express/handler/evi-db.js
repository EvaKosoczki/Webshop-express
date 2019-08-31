const path = require('path');
const fs = require('fs');


class DataBase {
  constructor(urlEntity) {
    this.jsonFolderPath = path.join(__dirname, '../../', 'express', 'json');
    this.jsonFilePath = path.join(this.jsonFolderPath,
      `${urlEntity}.json`)
    console.log(this.jsonFilePath)
  }
  readJson(id = 0) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.jsonFilePath, 'utf8', (err, jsonString) => {
        if (err) {
          return reject(JSON.stringify(err))
        }
        if (id == 0) {
          resolve(JSON.parse(jsonString))
        } else {
          this.oneJson = JSON.parse(jsonString).filter((item) => item.id == id)[0] || {}
          resolve(this.oneJson)
        }
      })
    })
  }
  deleteJSON(id = 0) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.jsonFilePath, 'utf8', (err, jsonString) => {
        if (err) {
          return reject(JSON.stringify(err))
        } else {
          this.JSONparsed = JSON.parse(jsonString)
          this.index = this.JSONparsed.findIndex(item => item.id == id)
          for (let i = 0; i < this.JSONparsed.length; i += 1) {
            if (this.JSONparsed[i].id == id) {
              this.JSONparsed.splice(this.index, 1)
              fs.writeFile(this.jsonFilePath, JSON.stringify(this.JSONparsed, null, 4), 'utf8',
                (err) => console.error('Ok')
              )
              resolve(console.log(this.index))
            }
          }
        }
      })
    })
  }
  editJSON(body) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.jsonFilePath, 'utf8', (err, data) => {
        this.dataArray = JSON.parse(data);
        this.newArray = this.dataArray.map((item) => {
          if (item.id == body.id) {
            return item = body
          } else {
            return item
          }
        });
        fs.writeFile(this.jsonFilePath, JSON.stringify(this.newArray, null, 4), 'utf8',
          (err) => {
            resolve(console.log('Köszi'))
          })
      });
    })
  }
  addJSON(body) {
    return new Promise((resolve, reject) => {
        fs.readFile(this.jsonFilePath, 'utf8', (err, data) => {
          this.productsArray = JSON.parse(data);
          this.max = 0
          this.productsArray.filter((item) => {
            if (item.id > this.max) {
              this.max = item.id
            }
            return this.max
          })
          body.id = this.max + 1;
          this.productsArray.push(body);
          fs.writeFile(this.jsonFilePath, JSON.stringify(this.productsArray, null, 4), 'utf8',
            (err) => {
              reject('Köszke')
            })
        })
      }

    )
  }
}

module.exports = {
  DataBase: DataBase
}
