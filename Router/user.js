const express = require("express");
const Router = express.Router();
const User = require("../modules/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const reviewController = require("../controllers/review.js");
const forgotpassword =require("../controllers/review")
const bcrypt = require('bcrypt');
Router.route("/users/signup")
  .get(reviewController.renderNewFrom)
  .post(
    saveRedirectUrl,
    wrapAsync(reviewController.signup)
  );

Router.route("/users/login")
  .get(reviewController.renderLoginFrom)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/users/login",
      failureFlash: true,
    }),
    reviewController.login
  );
Router.get('/users/forgot',reviewController.renderforgot);


Router.post('/users/forgot',reviewController.forgotpassword);
Router.get('/users/reset', reviewController.renderReset);
Router.get("/logout", reviewController.logout);

module.exports = Router;
