const cors = require("cors");
const mongoose = require("mongoose");
const itemsRoute = require("./routes/itemsRoute");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/paintings")
  .then(() => console.log("MongoDb connection is establised successfully...."))
  .catch(err => console.error("Failed to connect MongoDb...", err));

app.use(cors());
app.use(express.json());

app.use("/api/items", itemsRoute);

const port = process.env.PORT || 5200;
app.listen(port, () => console.log(`App is listening on PORT ${port}....`));
