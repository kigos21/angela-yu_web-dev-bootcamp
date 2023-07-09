//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

mongoose.connect("mongodb://localhost:27017/todolistv2");
const itemSchema = new mongoose.Schema({
  name: String,
  listName: String,
});
const Item = mongoose.model("Item", itemSchema);

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async function (req, res) {
  const day = date.getDate();
  const items = await Item.find();
  res.render("list", { day: day, list: items });
});

app.post("/", async function (req, res) {
  const newItem = new Item({
    name: req.body.newItem,
  });
  await newItem.save();
  res.redirect("/");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/delete", async (req, res) => {
  await Item.findByIdAndDelete(req.body.itemId);
  if (req.body.listName) {
    res.redirect(`/${req.body.listName}`);
  } else {
    res.redirect("/");
  }
});

app.get("/:listName", async (req, res) => {
  const listName = req.params.listName.toLowerCase();
  const list = await Item.find({ listName: listName });
  res.render("list", {
    day: date.getDate(),
    list: list,
    listName: listName.charAt(0).toUpperCase() + listName.substring(1),
  });
});

app.post("/:listName", async (req, res) => {
  const newItem = new Item({
    name: req.body.newItem,
    listName: req.body.listName.toLowerCase(),
  });
  await newItem.save();
  res.redirect(`/${req.body.listName}`);
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
