const mongoose = require("mongoose");

const worksSchema = mongoose.Schema({
  name: "string",
  filename: "string",
  type: "string",
  link: "string",
});

module.exports = mongoose.model("works", worksSchema);
