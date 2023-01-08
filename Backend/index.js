const express = require("express");

const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = 3030;
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to cointab");
});
app.get("/fetchusers", async (req, res) => {
  let usersres = await fetch("https://randomuser.me/api/?results=50");
  let data = await usersres.json();
  await dataModel.insertMany(data.results);
  res.send("Users fetched successfully");
});

app.get("/getusers", async (req, res) => {
  let { page, limit } = req.query;
  let total = await dataModel.find().count();
  let users = await dataModel
    .find()
    .skip((page - 1) * limit)
    .limit(limit);

  res.send({
    users: users,
    page: +page,
    limit: +limit,
    total: total,
  });
});

app.delete("/deleteusers", async (req, res) => {
  await dataModel.deleteMany();
  res.send("Users deleted successfully");
});

app.listen(3030, async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Pranesh1221:Pranesh1207@cluster0.wlgmktw.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("DB CONNECTION ESTABLISHED");
    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
const dataSchema = mongoose.Schema({}, { strict: false });
const dataModel = mongoose.model("testData", dataSchema);
