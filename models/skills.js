const mongoose = require("mongoose");

const skillsSchema = mongoose.Schema({
  name: "string",
  percentage: "string",
  uploadDate: {
    type: "date",
    default: Date.now,
    select: false,
  },
});

module.exports = mongoose.model("skills", skillsSchema);
