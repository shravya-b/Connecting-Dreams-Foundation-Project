const credentials = [["NGO", "123@gmail.com", "123"]];

exports.logout = async (req, res, next) => {
  return req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = credentials.find(
    (user) => user[1] === email && user[2] === password
  );
  if (!user) {
    return res.redirect("/auth/login");
  }
  if (user[0] === "NGO") {
    return res.redirect("/ngoDashboard");
  } else if (user[0] === "yct") {
    return res.redirect("/changeMakersDashboard");
  } else if (user[0] === "MENTOR") {
    return res.redirect("/mentorsDashboard");
  }
  return res.redirect("/auth/login");
};

exports.getLogin = async (req, res, next) => {
  res.render("auth/loginpage", {
    page_title: "Home",
  });
};

exports.postSignup = async (req, res, next) => {
  const { members, email, password } = req.body;
  credentials.push([members, email, password]);
  console.log(credentials);
  res.redirect("/auth/login");
  console.log(members);
};
