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
  res.render("ngoDashboard/ngoDashboard");
});

app.get("/ngo/form", (req, res) => {
  res.render("forms/forms");
});

app.use(error_controller.get_error_404);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Listening on " + port);
});
