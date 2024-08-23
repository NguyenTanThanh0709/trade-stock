const db = require("../models");
const Tradestock = db.tradestock;
// Chèn một bản ghi mới vào cơ sở dữ liệu
exports.create = async (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: "Content can not be empty!" });
    }
    run();
    const tradestock = new Tradestock({
      close: req.body.close,
      date: req.body.date,
      high: req.body.high,
      low: req.body.low,
      open: req.body.open,
      ticker: req.body.ticker,
      vol: req.body.vol
    });
  
    try {
      const data = await tradestock.save();
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tradestock."
      });
    }
};
  
  // Lấy danh sách tất cả các bản ghi
exports.findAll = async (req, res) => {
    try {
      const data = await Tradestock.find();
      await sendData(data);
      res.send(orderInfo);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tradestocks."
      });
    }
};