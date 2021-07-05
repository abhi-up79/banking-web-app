const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");

const app = express();
const port = 3000;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/transact", (req, res) => {
  res.render("transaction.ejs");
});

app.post("/transact")

app.get("/history", (req, res) => {
  res.render("history.ejs");
});

app.get("*", (req, res) => {
  res.render("pageNotFound.ejs");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
