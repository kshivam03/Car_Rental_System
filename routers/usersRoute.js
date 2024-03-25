const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      res.send(user);
    } else {
      res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  const { username, password, cpassword } = req.body;

  try {
    if (password !== cpassword) {
      return res.json({ error: 1 });
    } else if (await User.findOne({ username })) {
      return res.json({ error: 2 });
    } else {
      const newuser = new User(req.body);
      await newuser.save();
      return res.json({ error: 0, user: newuser });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/changepassword", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    user.name = req.body.name;
    user.password = req.body.password;

    await user.save();

    res.send("Password updated successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/deleteuser", async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.body.userid });
    res.send("User deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
