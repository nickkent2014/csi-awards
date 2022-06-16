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

app.get("/categories", (req, res) => {
  res.render("categories")
});


app.post("/vote", (req, res) => {

  fs.readFile("tally.json", function(err, tally_data) {
    tally_data = JSON.parse(tally_data);
    processData(tally_data)
  })
    
    // const re_name = /[a-zA-Z]*\s[a-zA-Z]*/;
    // const re_email = /[a-zA-Z0-9]*@barnsley.gov.uk/

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
        // console.log(tally_data.voter_info)
  
  
        tally_data = JSON.stringify(tally_data);
        fs.writeFile("tally.json", tally_data, function (err) {
          console.log('Saved!');
        });
      }


    }



    // console.log(req.body.voter_name.match(/[a-zA-Z]*\s[a-zA-Z]*/))
    // console.log(req.body.voter_email.match(/[a-zA-Z0-9]*@barnsley.gov.uk/))



    
    res.render("thank_you")
  }

})










app.listen(process.env.port || 80, () => {
    console.log("Application started and Listening on port 80");
});

































// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/dist/index.html");
// });

// app.get("/index.html", (req, res) => {                    //     merge / and /index.html?
//     res.sendFile(__dirname + "/dist/index.html");
//   });

// app.get("/categories.html", (req, res) => {
//     res.sendFile(__dirname + "/dist/categories.html");
//   });

//   app.post("/", (req, res)=>{

//     fs.readFile("./dist/tally.json", function(err, json_data) {
//       json_data = JSON.parse(json_data);


//       let voter_name_string = JSON.stringify(req.body.voter_name);
//       let voter_email_string = JSON.stringify(req.body.voter_email);

//       // Validation

//       const re_name = /[a-zA-Z]*\s[a-zA-Z]*/;
//       const re_email = /[a-zA-Z0-9]*@barnsley.gov.uk/

//       let voter_name_string_found = voter_name_string.match(re_name);         // This is now an object
//       let voter_email_string_found = voter_email_string.match(re_email);      // This is now an object
//       voter_name_string = voter_name_string.replaceAll('"', '');
//       voter_email_string = voter_email_string.replaceAll('"', '');

      
//       // if ((voter_name_string != voter_name_string_found) && (voter_email_string != voter_email_string_found)) {
//       //   res.sendFile(__dirname + "/dist/wrong_name_&_email.html");
//       // }

//       // if (voter_name_string != voter_name_string_found) {
//       //   console.log("The name entered is not valid");
//       //   res.sendFile(__dirname + "/dist/wrong_name.html");
//       // }
//       if (voter_email_string != voter_email_string_found) {
//         console.log("The email entered is not valid");
//         res.sendFile(__dirname + "/dist/wrong_email.html");
//       }
//       let voter_info = { "name": voter_name_string_found, "email": voter_email_string_found};    // voter name: voter email input
//       let votee_category = json_data.voter_info[req.body.votee_category];
      


//       voter_email_string_found = JSON.stringify(voter_email_string_found);
//       voter_email_string_found = voter_email_string_found.substring(2, voter_email_string_found.length - 2);

//       let noduplicates = true;

//       for (i in votee_category) {
//           if (votee_category[i].email == voter_email_string_found) {
//             console.log("A duplicate has been entered");
//             res.sendFile(__dirname + "\\dist\\already_voted.html");
//             noduplicates = false;
//           }
          
//         };


//       if ((voter_email_string == voter_email_string_found) && (noduplicates == true)) {
        
//         json_data.votee_names[req.body.nominee_name_form] = json_data.votee_names[req.body.nominee_name_form] + 1;
        
//         votee_category.push(voter_info);
        
//         console.log("A successful vote has been made");

//         json_data = JSON.stringify(json_data);
//         fs.readFile("./dist/tally.json", json_data, function(err) {});
//         res.sendFile(__dirname + "/dist/thank_you.html");
//       }
      
//       else {
//         console.log("Error occured");
        
//       };
//     });
    
//     // res.sendStatus(200);
//   });