const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(402).json({ message: "username or password missing." });
  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) return res.status(409);

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = {
      username: user,
      password: hashedPwd,
    };
    userDB.setUsers([...userDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.send(userDB.users);
  } catch (err) {
    res.status(500).json({ messsage: err.message });
  }
};

module.exports = { handleNewUser };
