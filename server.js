const express = require("express");
const app = express();
const bodyParser = require('body-parser')
var fs = require('fs');
const { type } = require("express/lib/response");

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.listen(80, () => {
  console.log("Application started and Listening on port 80");
});

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.get("/index.html", (req, res) => {                    //     merge / and /index.html?
    res.sendFile(__dirname + "/dist/index.html");
  });

app.get("/categories.html", (req, res) => {
    res.sendFile(__dirname + "/dist/categories.html");
  });
