const express = require("express");
const expressLayouts = require("express-ejs-layouts")
const app = express();
const bodyParser = require('body-parser')
var fs = require('fs');
const { type, json } = require("express/lib/response");

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Static files

app.use(express.static("public"))
app.use("/css", express.static(__dirname + "public/css"))
app.use("/js", express.static(__dirname + "public/js"))
app.use("/assets", express.static(__dirname + "public/assets"))

// Set template engine

app.use(expressLayouts)
app.set("layout", "./layouts/main")
app.set("view engine", "ejs")



// Navigation

app.get("/", (req, res) => {
  res.render("index", {voting_panel: "", message:"Please enter your full name and email address", votee_category: "",nominee_name_form: "" })
});
app.get("/nominees", (req, res) => {
  res.render("nominees")
});

app.get("/categories", (req, res) => {
  res.render("categories")
});

app.post("/vote", (req, res) => {

  fs.readFile("tally.json", function(err, tally_data) {
    tally_data = JSON.parse(tally_data);
    processData(tally_data)
  })

  function processData(tally_data) {

    if ((req.body.voter_name.match(/[a-zA-Z]*\s[a-zA-Z]*/) == null) && (req.body.voter_email.match(/[a-zA-Z0-9]*@barnsley.gov.uk/) == null)) {
      console.log("error with username")
      res.render("index", {voting_panel:"active", message: "Please enter your first and last name, and your email ending with @barnsley.gov.uk", votee_category: req.body.votee_category, nominee_name_form: req.body.nominee_name_form })
    }
    if (req.body.voter_name.match(/[a-zA-Z]*\s[a-zA-Z]*/) == null) {
      console.log("error with username")
      res.render("index", {voting_panel:"active", message: "Please enter your first and last name", votee_category: req.body.votee_category , nominee_name_form: req.body.nominee_name_form })
    }
    if (req.body.voter_email.match(/[a-zA-Z0-9]*@barnsley.gov.uk/) == null) {
      console.log("error with email")
      res.render("index", {voting_panel:"active", message: "Please enter your email ending with @barnsley.gov.uk", votee_category: req.body.votee_category, nominee_name_form: req.body.nominee_name_form })
    }
    else {

      let duplicate = false
      for (i in tally_data.voter_info[req.body.votee_category]) {
        if (tally_data.voter_info[req.body.votee_category][i].email == req.body.voter_email) {
          duplicate = true
        }
      }

      if (duplicate == true) {
        console.log("duplicate email")
        res.render("index", {voting_panel:"active", message: "You have already voted for this category", votee_category: req.body.votee_category, nominee_name_form: req.body.nominee_name_form })
      } else {
        tally_data.votee_names[req.body.nominee_name_form] = tally_data.votee_names[req.body.nominee_name_form] + 1;
        
        let voter_info = {"name": req.body.voter_name, "email": req.body.voter_email}
        console.log(typeof tally_data.voter_info)
        tally_data.voter_info[req.body.votee_category].push(voter_info)
        tally_data = JSON.stringify(tally_data);
        fs.writeFile("tally.json", tally_data, function (err) {
          console.log('Saved!');
        });
      }
    } 
    res.render("thank_you")
  }
})

app.listen(process.env.port || 80, () => {
    console.log("Application started and Listening on port 80");
});
