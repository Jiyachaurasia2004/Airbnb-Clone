const { model } = require("mongoose");
const User = require("../modules/user.js");

module.exports.renderNewFrom = (req, res) => {
  res.render("users/signup");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const Newuser = new User({ email, username });
    const registeredUser = await User.register(Newuser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to wonderlust");
      let redirectUrl = res.locals.redirectUrl || "/listing";
      res.redirect(redirectUrl);
    });
  } catch (err) {
    res.redirect("/users/signup");
  }
};

module.exports.renderLoginFrom = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to wonderlust");
  res.redirect("/listing");
};
module.exports.renderforgot =  (req, res) => {
  res.render('users/forgot');
}
module.exports.forgotpassword =  async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.render('users/forgot', { error: 'Email is required' });
  }
  try {
    console.log(`Sending password reset link to ${email}`);
    return res.render('users/reset', {
      success: 'If an account with that email exists, a reset link has been sent.',
    });
  } catch (err) {
    console.error(err);
    res.render('users/forgot', { error: 'An error occurred. Please try again.' });
  }
}
module.exports.renderReset =  (req, res) => {
  res.render('users/reset');
}
module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out");
    res.redirect("listing");
    
  });
};
