const express = require("express");
const app = express();
const port = 3000;

const connectionToDatabase = require("./config/database");

connectionToDatabase()
  .then(() => {
    console.log("connection to database made");
    app.listen(port, () => {
      console.log("server active on port" + " " + port);
    });
  })
  .catch((err) => {
    console.log("error" + " " + err);
  });
