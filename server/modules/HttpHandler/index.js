const get = require('./method-handlers/get-handler');
const put = require('./method-handlers/put-handler');
const post = require('./method-handlers/post-handler');
const del = require('./method-handlers/post-handler');

module.exports = class HttpHandler {
  constructor(filePath) {
    this.filePath = filePath;
  }

  handleGet(req, res) {
    get.handleGet(req, res, this.filePath);
  }

  handlePut(req, res) {
    put.handlePut(req, res, this.filePath);
  }

  handlePost(req, res) {
    post.handlePost(req, res, this.filePath);
  }

  handleDel(req, res) {
    del.handleDel(req, res, this.filePath);
  }
};
