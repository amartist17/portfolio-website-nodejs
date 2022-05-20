const mongoose = require("mongoose");

const PersonalDetailsSchema = mongoose.Schema({
  name: {
    type: "string",
    default: "amardeep",
  },
  nameShown: "string",
  occupation: "string",
  homePara: "string",
  address: "string",
  languages: "string",
  phone: "string",
  email: "string",
  yearsOfExp: "number",
  projects: "number",
  customers: "number",
  certificates: "number",
  uploadDate: {
    type: "date",
    default: Date.now,
    select: false,
  },
});

module.exports = mongoose.model("personalDetails", PersonalDetailsSchema);
