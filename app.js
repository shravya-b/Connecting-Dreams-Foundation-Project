const express = require("express");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const Mysql_store = require("express-mysql-session")(session);
const multer = require("multer");
require("dotenv").config();

const auth_routes = require("./routes/auth");

const error_controller = require("./controllers/error_controller");
const bodyParser = require("body-parser");

const app = express();

let redirectLink;
let ngoName, email, phn, title, tags, description, requirements;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", auth_routes);

app.get("/favicon.ico", (req, res, next) => {
  res.send("No icon present");
});

app.get("/", (req, res, next) => {
  res.render("home/index");
});

app.get("/500", error_controller.get_error_500);

app.get("/ngoDashboard", function (req, res) {
  redirectLink = "/ngoDashboard";
  res.render("ngoDashboard/ngoDashboard", { redirectLink: redirectLink });
});

app.get("/changeMakersDashboard", function (req, res) {
  redirectLink = "/changeMakersDashboard";
  res.render("changeMakersDashboard/changemakersDashboard", {
    redirectLink: redirectLink,
  });
});

app.get("/mentorsDashboard", function (req, res) {
  redirectLink = "/mentorsDashboard";
  res.render("mentorDashboard/mentorsDashboard", {
    redirectLink: redirectLink,
  });
});

app.get("/adminDashboard", function (req, res) {
  redirectLink = "/adminDashboard";
  res.render("adminDashboard/adminDashboard", { redirectLink: redirectLink });
});

app.get("/user/profile", function (req, res) {
  res.render("profile/profile", { redirectLink: redirectLink });
});

app.get("/ngo/form", (req, res) => {
  res.render("forms/forms");
});

app.get("/eventPage", function (req, res) {
  res.render("eventPage", {
    ngoName: ngoName,
    eventTags: tags,
    emailId: email,
    phoneNumber: phn,
    eventTitle: title,
    eventDescription: description,
    eventRequirements: requirements,
  });
});

app.post("/uploaded", (req, res) => {
  ngoName = req.body.ngoName;
  email = req.body.email;
  phn = req.body.phn;
  title = req.body.title;
  tags = req.body.tags;
  description = req.body.description;
  requirements = req.body.requirements;
  res.redirect("/eventPage");
});

app.use(error_controller.get_error_404);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Listening on " + port);
});
