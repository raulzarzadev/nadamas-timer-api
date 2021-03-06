"use strict";

var jwt = require("jsonwebtoken");

var isAuthenticated = function isAuthenticated(req, res, next) {
  var headers = req.headers;
  console.log(req.headers);
  var token = req.headers["access-token"];

  if (!token) {
    return res.json({
      ok: false,
      message: "Sin token"
    });
  } //token = token.replace("Bearer ", "");


  jwt.verify(token, process.env.JWT_SECRET_TEXT, function (err, token) {
    if (err) {
      return res.json({
        ok: false,
        message: "Token invalido"
      });
    } else {
      req.token = token;
      next();
    }
  });
};

module.exports = isAuthenticated;