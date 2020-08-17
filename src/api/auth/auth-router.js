const router = require("express").Router();

const Users = require("../users/user-model");
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 8);
  Users.add({ username, password: hash }).then((user) => {
    res.status(200).json(user);
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username }).then(([user]) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.loggedIn = true;
      res.status(200).json({ message: "you are logged in" });
    } else {
      res.status(404).json({ message: "cannot login" });
    }
  });
});

router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({
          error: "could not log you out, please try later",
        });
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(200).json({ message: "already logged out" });
  }
});

module.exports = router;
