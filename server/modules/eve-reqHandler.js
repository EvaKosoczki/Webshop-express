const fs = require('fs');
const path = require('path');


class GetHandler {
  constructor(req, res) {
    const filePath = '../json/orders.json';
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
}


class PostHandler {
  constructor(req, res) {
    this.modData = '';
    req.on('data', (chunk) => this.modData += chunk);
    req.on('end', () => {
      this.modData = JSON.parse(this.modData);
      fs.readFile('../json/orders.json', 'utf8', (err, data) => {
        this.ordersArray = JSON.parse(data);
        this.newArray = this.ordersArray.map((item) => {
          if (item.id == this.modData.id) {
            return item = this.modData
          } else {
            return item
          }
        });
        fs.writeFile('../json/orders.json', JSON.stringify(this.newArray, null, 4), 'utf8',
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
      fs.readFile('../json/orders.json', 'utf8', (err, data) => {
        if(err) {
          console.error(err);
        }
        this.ordersArray = JSON.parse(data);
        // this.max = 0
        // this.ordersArray.filter((item) => {
        //   if (item.id > this.max) {
        //     this.max = item.id
        //   }
        //   return this.max
        // })
        // this.modData.id = this.max + 1;
        this.modData = JSON.parse(this.modData);
        this.ordersArray.push(this.modData);
        fs.writeFile('../json/orders.json', JSON.stringify(this.ordersArray, null, 4), 'utf8',
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
              fs.writeFile('../json/orders.json', JSON.stringify(this.JSONparsed, null, 4), 'utf8',
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
