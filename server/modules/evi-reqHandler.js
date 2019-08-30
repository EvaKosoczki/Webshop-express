const fs = require('fs');
const path = require('path');


class GetHandler {
  constructor(req, res) {
    this.DbSmp = new DataBase(req.url);
    this.DbSmp.readJson().then(
      data => res.end(JSON.stringify(data)),
      err => res.end(err)
    )
  }
}


class PostHandler {
  constructor(req, res) {
    this.modData = '';
    req.on('data', (chunk) => this.modData += chunk);
    req.on('end', () => {
      this.modData = JSON.parse(this.modData);
      fs.readFile('../json/product.json', 'utf8', (err, data) => {
        this.productsArray = JSON.parse(data);
        this.newArray = this.productsArray.map((item) => {
          if (item.id == this.modData.id) {
            return item = this.modData
          } else {
            return item
          }
        });
        fs.writeFile('../json/product.json', JSON.stringify(this.newArray, null, 4), 'utf8',
          (err) => {
            res.end('Köszi')
          })
      });
    })
  }

}

class PutHandler {
  constructor(req, res) {
    this.modData = '';
    req.on('data', (chunk) => this.modData += chunk);
    req.on('end', () => {
      this.modData = JSON.parse(this.modData);
      fs.readFile('../json/product.json', 'utf8', (err, data) => {
        this.productsArray = JSON.parse(data);
        this.max = 0
        this.productsArray.filter((item) => {
          if (item.id > this.max) {
            this.max = item.id
          }
          return this.max
        })
        this.modData.id = this.max + 1;
        this.productsArray.push(this.modData);
        fs.writeFile('../json/product.json', JSON.stringify(this.productsArray, null, 4), 'utf8',
          (err) => {
            res.end('Köszi')
          })
      })
    })
  }
}



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

class DeleteHandler {
  constructor(req, res) {
    this.DbSmp = new DataBase(req.url);
    this.DbSmp.deleteJSON().then(
      data => res.end(JSON.stringify(data)),
      err => res.end(err)
    )
  }

}


module.exports = {
  GetHandler: GetHandler,
  PostHandler: PostHandler,
  DataBase: DataBase,
  DeleteHandler: DeleteHandler,
  PutHandler: PutHandler
}
