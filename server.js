const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
require("dotenv").config();
const connectDB = require("./model/connectdb");

//cross origin resource sharing
const whiteList = [
  "http://localhost:3500",
  "https://google-sheets-frontend-teal.vercel.app",
  "http://localhost:3000",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("connected");
  } catch (err) {
    console.log(err);
  }
};

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/users", require("./routes/users"));

app.listen(3500, () => {
  console.log(`server running on port 3500`);
  start();
});
