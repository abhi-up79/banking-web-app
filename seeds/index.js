const mongoose = require("mongoose");
const User = require("../models/user");
const seedUsers = require("./seedUsers");

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

const seedDB = async () => {
  await User.deleteMany({});

  await User.insertMany(seedUsers);
};

seedDB().then(() => {
  mongoose.connection.close();
});
