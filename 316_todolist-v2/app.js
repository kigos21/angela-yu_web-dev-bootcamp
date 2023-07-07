const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

/*

I think it is bad to pass a whole user object to a req.session
TODO: pass user [name, tasks] ONLY to sessions

*/

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "b127a896-a96c-4543-bea0-48224a39bee0",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.use(cookieParser());

const connect = async () => {
  await mongoose.connect("mongodb://localhost:27017/taskly", {
    useNewUrlParser: true,
  });
};
connect().catch((err) => console.log(err));

const taskSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: [true, "Please provide a title."],
  },
  details: String,
});
const Task = mongoose.model("task", taskSchema);

const userSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, // to use custom error messages -> [bool, "error msg"]
    minLength: [8, "Password is too short."],
  },
  tasks: {
    type: [mongoose.Types.ObjectId],
    ref: "task",
  },
});
const User = mongoose.model("user", userSchema);

// routes
app.get("/", (req, res) => {
  res.render("pages/index", {
    title: "Taskly",
  });
});

app.get("/signup", (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
    return;
  }

  res.render("pages/signup", {
    title: "Signup | Taskly",
  });
});

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    name: username,
    password: password,
    tasks: [],
  });

  try {
    await newUser.save();
  } catch (e) {
    res.send(e);
    return;
  }

  res.redirect("/");
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
    return;
  }

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

  if (user === null) {
    error = "user not found";
  } else if (user.password !== password) {
    error = "unauthenticated";
  } else {
    req.session.user = user;
    res.redirect(`/home`);
    return;
  }

  // redirect back, send an error to the redirected page
  res.redirect(`/login?error=${encodeURIComponent(error)}`);
});

app.get("/home", async (req, res) => {
  if (!req.session.user) {
    res.redirect(
      `/login?error=${encodeURIComponent("You are not logged in!")}`
    );
    return;
  }

  const user = await User.findById(req.session.user._id).populate("tasks");

  const params = {
    title: "Home | Taskly",
    username: user.name,
    tasks: user.tasks,
  };

  res.render("pages/home", params);
});

app.post("/home", async (req, res) => {
  const title = req.body.taskTitle;
  const details = req.body.taskDetails;

  const newTask = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    details: details,
  });

  await newTask.save();

  // const user = await User.findOne({ name: myuser }).exec();
  let user = req.session.user;
  user = await User.findById(user._id).exec();
  user.tasks.push(newTask._id);
  try {
    await user.save();
  } catch (error) {
    res.send(error);
    return;
  }

  // update the session user object upon save
  req.session.user = await User.findById(user._id).populate("tasks");
  console.log(req.session.user);
  res.redirect(`/home`);
});

app.post("/home/delete", async (req, res) => {
  const taskId = req.body.taskId;
  console.log(taskId);

  let user = await User.findById(req.session.user._id).exec();
  console.log("user is: " + user._id);

  let results = user.tasks.pull({ _id: taskId });
  console.log(`After deleting subdocument: ${results}`);
  results = await Task.findByIdAndDelete(taskId);
  console.log(`After findByIdAndDelete: ${results}`);
  await user.save();

  res.redirect("/home");
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.listen(port, () => {
  console.log("--------------------------------------");
  console.log(`App listening on http://localhost:${port}`);
  console.log("--------------------------------------");
});

// app.get("/sandbox", async (req, res) => {
//   const result = await User.updateOne({ name: "jd2" }, { tasks: [] });
//   console.log(result);
//   res.send(result);
// });
