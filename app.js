const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const path = require("path");

const User = require("./models/user");
const Transaction = require("./models/transaction");

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/sparks-bank-app", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/show", async (req, res) => {
  const users = await User.find({});
  // console.log(users);
  res.render("showAll.ejs", { users });
});

app.get("/show/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("show", { user });
});

app.get("/show/:id/transact", async (req, res) => {
  const { id } = req.params;
  const currentuser = await User.findById(id);
  const users = await User.find({});
  res.render("transaction.ejs", { currentuser, users });
});

app.post("/transact", async (req, res) => {
  const { from, to, amount } = req.body.transact;
  const fromUser = await User.find({ name: from });
  const toUser = await User.find({ name: to });
  fromUser[0].balance -= amount;
  toUser[0].balance += parseInt(amount);
  await fromUser[0].save();
  await toUser[0].save();

  transaction = new Transaction({
    from: from,
    to: to,
    amount: amount,
  });
  await transaction.save();
  // console.log(fromUser, toUser);
  res.redirect("/history");
});

app.get("/history", async (req, res) => {
  const transactions = await Transaction.find({});
  res.render("history.ejs", { transactions });
});

app.get("*", (req, res) => {
  res.render("pageNotFound.ejs");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
