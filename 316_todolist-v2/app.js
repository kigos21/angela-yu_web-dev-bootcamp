const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const connect = async () => {
  await mongoose.connect("mongodb://localhost:27017/taskly", {
    useNewUrlParser: true,
  });
};

connect().catch((err) => consolerr.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  tasks: [],
});

const User = mongoose.model("user", userSchema);

app.listen(port, () => {
  console.log("--------------------------------------");
  console.log(`App listening on http://localhost:${port}`);
  console.log("--------------------------------------");
});

app.get("/", (req, res) => {
  res.render("pages/index", {
    title: "Taskly",
  });
});

app.get("/signup", (req, res) => {
  res.render("pages/signup", {
    title: "Signup | Taskly",
  });
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    name: username,
    password: password,
    tasks: [],
  });

  newUser.save();

  res.redirect("/");
});

app.get("/login", (req, res) => {
  var params = {
    title: "Login | Taskly",
  };

  if (req.query.error) {
    params.error = decodeURIComponent(req.query.error);
  }

  res.render("pages/login", params);
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  var error;

  const user = await User.findOne({ name: username }).exec();

  console.log(user);

  if (user === null) {
    error = "user not found";
  } else if (user.password !== password) {
    error = "unauthenticated";
  } else {
    res.redirect(`/home?user=${user.name}`);
    return;
  }

  // redirect back, send an error to the redirected page
  res.redirect(`/login?error=${encodeURIComponent(error)}`);
});

app.get("/home", async (req, res) => {
  const username = req.query.user;

  const user = await User.findOne({ name: username });

  const params = {
    title: "Home | Taskly",
    username: user.name,
    tasks: user.tasks,
  };

  res.render("pages/home", params);
});

app.post("/home", async (req, res) => {
  const newTask = req.body.newTask;
  const username = req.body.username;

  const user = await User.findOne({ name: username }).exec();
  user.tasks.push(newTask);
  user.save();

  res.redirect(`/home?user=${username}`);
});

app.get("/logout", (req, res) => {
  // destroy session
  // and cookies

  // only if I know how to do that lol (cannot yet)
  res.redirect("/login");
});
