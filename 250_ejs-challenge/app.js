//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

app.get("/", (req, res) => {
  const params = {
    title: "Home",
    startingContent: homeStartingContent,
    posts: posts,
  };

  res.render("home", params);
});

app.get("/about", (req, res) => {
  const params = {
    title: "About",
    content: aboutContent,
  };

  res.render("about", params);
});

app.get("/contact", (req, res) => {
  const params = {
    title: "Contact us",
    content: contactContent,
  };

  res.render("contact", params);
});

app.get("/compose", (req, res) => {
  const params = {
    title: "Compose a blog",
  };

  res.render("compose", params);
});

app.post("/compose", (req, res) => {
  const post = {
    id: posts.length,
    title: req.body.postTitle,
    details: req.body.postDetails,
  };

  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:id", (req, res) => {
  const post = posts[req.params.id];

  const params = {
    title: post.title,
    post: post,
  };

  res.render("post", params);
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
