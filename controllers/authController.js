const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(402).json({ message: "username or password missing." });
  try {
    const foundUser = await User.findOne({ username: user });
    if (!foundUser) return res.sendStatus(401);
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      //create jwts
      const accessToken = jwt.sign(
        { username: foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60s" }
      );
      //saving refresh token
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      foundUser.refreshToken = refreshToken;
      await foundUser.save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      res.status(200).json({ message: "loggedin successfully" }).end();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = handleLogin;
