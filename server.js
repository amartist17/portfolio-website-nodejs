const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection established"));

app.listen(process.env.PORT || 3000, function () {
  console.log("listening");
});
