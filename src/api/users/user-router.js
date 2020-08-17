const router = require("express").Router();

const Users = require("./user-model");
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 8);
  Users.add({ username, password: hash }).then((user) => {
    res.status(200).json(user);
  });
});

module.exports = router;
