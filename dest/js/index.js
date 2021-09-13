(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/asyncToGenerator"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.regenerator, global.asyncToGenerator);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_regenerator, _asyncToGenerator2) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  _regenerator = _interopRequireDefault(_regenerator);
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);

  function sleep(time) {
    return new Promise(function (res) {
      setTimeout(function () {
        res();
      }, time);
    });
  }

  function init() {
    return _init.apply(this, arguments);
  }

  function _init() {
    _init = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return sleep(3000);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _init.apply(this, arguments);
  }

  init();
});