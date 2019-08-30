const fs = require('fs');
const DB = require('./tomi-db');

class GetHandler {
  constructor(req, res) {

    const reqParams = req.url.split('/');

    const ordersDB = new DB(reqParams[1]);
    const id = reqParams[2] || 0;
    ordersDB.find(id).then(
      data => res.end(JSON.stringify(data)),
      err => {
        res.statusCode = 404;
        res.end(JSON.stringify(err));
      },
    );
  }
}

class PutHandler {
  constructor(req, res) {
    this.updatedOrder = '';

    req.on('data', (chunk) => this.updatedOrder += chunk);
    req.on('end', () => {
      this.updatedOrder = JSON.parse(this.updatedOrder);
      fs.readFile('../json/orders.json', 'utf8', (err, data) => {
        this.orders = JSON.parse(data);
        this.update = this.orders.map((item) => {
          if (item.id === this.updatedOrder.id) {
            item = this.updatedOrder;
            return this.updatedOrder;
          } else {
            return item
          };
        });
        fs.writeFile('../json/orders.json', JSON.stringify(this.update, null, 4), 'utf8',
          (err) => {
            res.end('Done.')
          })
      });
    });
  }
}

module.exports = {
  GetHandler: GetHandler,
  PutHandler: PutHandler,
}
