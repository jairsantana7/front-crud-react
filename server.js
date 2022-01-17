const express = require("express");
const { resolve } = require("path");

const port = process.env.PORT || 4000;

const app = express();

app.use("/", express.static(resolve(__dirname, "./build")));

app.listen(process.env.PORT || 4000, err => {
  if (err) {
    return console.log(err);
  }
  console.log("Funcionando!!");
});
