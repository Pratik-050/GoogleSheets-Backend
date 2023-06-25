const connectDB = require("./model/connectdb");
const User = require("./model/user");
const userJSON = require("./model/users.json");
require("dotenv").config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await User.create(userJSON);
    console.log("success");
  } catch (err) {
    console.log(err);
  }
};

start();
