module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      close: { type: Number, required: true },
      date: { type: String, required: true },
      high: { type: Number, required: true },
      low: { type: Number, required: true },
      open: { type: Number, required: true },
      ticker: { type: String, required: true },
      vol: { type: Number, required: true }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tradestock = mongoose.model("tradestock", schema);
  return Tradestock;
};
