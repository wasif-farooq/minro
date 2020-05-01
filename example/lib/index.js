"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

const Server = () => {
  const server = _http.default.createServer(function (req, res) {
    //console.log("NODE_APP_DATA_URL : ", process.env.NODE_APP_DATA_URL)
    console.log('get the request asd asasdasdsad show asd'), res.end('hello world' + process.env.NODE_APP_DATA_URL);
  });

  server.listen(4002, () => {
    console.log('Listening on port 4000');
  });
};

Server();
var _default = Server;
exports.default = _default;
module.exports = exports.default;