const fs = require('fs');
const db = require('./evi-db.js')



class GetHandler {
  constructor(req, res) {
    this.DbSmp = new db.DataBase(req.url);
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





class DeleteHandler {
  constructor(req, res) {
    this.DbSmp = new db.DataBase(req.url);
    this.DbSmp.deleteJSON().then(
      data => res.end(JSON.stringify(data)),
      err => res.end(err)
    )
  }

}


module.exports = {
  GetHandler: GetHandler,
  PostHandler: PostHandler,
  DeleteHandler: DeleteHandler,
  PutHandler: PutHandler
}
