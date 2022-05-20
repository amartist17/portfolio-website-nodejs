const mongoose = require("mongoose");

const teamsSchema = mongoose.Schema({
  name: "string",
  job: "string",
  link: "string",
  image: "string",
  background: "string",
  uploadDate: {
    type: "date",
    default: Date.now,
    select: false,
  },
});

module.exports = mongoose.model("teams", teamsSchema);
