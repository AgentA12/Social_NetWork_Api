const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/network_api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("debug", true);

const PORT = process.env.PORT || 3001;

app.use(routes);

app.listen(PORT, () => {
  console.log(`🌍🚀 Connected on localhost:${PORT}`);
});
