const express = require("express");
const authRouter = require("./routes/auth");
const connectionToDatabase = require("./config/database");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/", authRouter);

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
