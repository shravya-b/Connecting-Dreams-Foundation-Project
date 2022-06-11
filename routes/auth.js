const express = require("express");

const router = express.Router();

const auth_controller = require("../controllers/auth");
const auth = require("../middlewares/auth");

router.get("/logout", auth.verify_loggedIn, auth_controller.logout);
router.post("/login", auth_controller.postLogin);
router.get("/login", auth_controller.getLogin);
router.post("/signup", auth_controller.postSignup);

module.exports = router;
