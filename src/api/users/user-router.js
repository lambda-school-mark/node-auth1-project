const router = require("express").Router();

const Users = require("./user-model");

router.get("/", (req, res) => {
  Users.getAll()
    .then((users) => {
      res.status(200).json({ message: "you are logged out" });
    })
    .catch((error) => {
      res.status(404).json({ message: "log off failed" });
    });
});

module.exports = router;
