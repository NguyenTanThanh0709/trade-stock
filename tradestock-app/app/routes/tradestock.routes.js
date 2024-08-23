module.exports = app => {
  const tradestock = require("../controllers/tradestock.controller.js");

  var router = require("express").Router();

  // Route để chèn một bản ghi mới
  router.post("/", tradestock.create);

  // Route để lấy danh sách tất cả các bản ghi
  router.get("/", tradestock.findAll);

  app.use("/api/tradestock/v1", router);
};
