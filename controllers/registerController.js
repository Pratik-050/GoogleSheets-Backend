const User = require("../model/user");

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(402).json({ message: "username or password missing." });

  try {
    const existingUser = await User.findOne({ username: user });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = new User({
      username: user,
      password: hashedPwd,
    });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
