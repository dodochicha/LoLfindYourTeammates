import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/newUser", async (req, res) => {
  try {
    if (!req.body.username) {
      return res.json({
        message: "Please enter your username.",
        status: "Error",
      });
    } else if (!req.body.password) {
      return res.json({
        message: "Please enter your password.",
        status: "Error",
      });
    } else if (!req.body.password2) {
      return res.json({
        message: "Please enter your confirmation password.",
        status: "Error",
      });
    } else if (req.body.password.length < 8) {
      return res.json({
        message: "Your password should be longer than 8 characters.",
        status: "Error",
      });
    } else if (req.body.password !== req.body.password2) {
      return res.json({
        message: "Your passwords don't match!",
        status: "Error",
      });
    } else {
      let userExist = await User.findOne({ username: req.body.username });
      if (userExist) {
        return res.json({
          message: "This username has already been used!",
          status: "Error",
        });
      } else {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // console.log(hashedPassword)
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        newUser.save();
        return res.json({
          message: `User has been added to the database!`,
          status: "Success",
        });
      }
    }
  } catch (event) {
    res.json({ message: "Database insertion failed", status: "Error" });
    throw new Error("Database insertion failed");
  }
});

router.get("/userLogin", async (req, res) => {
  try {
    if (!req.query.username) {
      return res.json({
        message: "Please enter your username.",
        status: "Error",
      });
    } else if (!req.query.password) {
      return res.json({
        message: "Please enter your password.",
        status: "Error",
      });
    } else {
      let user = await User.findOne({ username: req.query.username });
      if (!user) {
        return res.json({
          message: "This username has not been registered yet!",
          status: "Error",
        });
      }
      if (await bcrypt.compare(req.query.password, user.password)) {
        return res.json({ message: "Password is correct", status: "Success" });
      } else {
        return res.json({ message: "Incorrect password!", status: "Error" });
      }
    }
  } catch (event) {
    res.json({ message: "Database query failed", status: "Error" });
    throw new Error("Database query failed");
  }
});

router.get("/getProfile", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.query.username });
    if (!user.player) {
      return res.json({
        message: "The form has never been filled.",
        status: "NotFilledYet",
      });
    } else {
      return res.json({
        message: "The form has been filled.",
        status: "Filled",
        id: user.player.id,
        name: user.player.name,
        lanes: user.player.lanes,
        heros: user.player.heros,
        rank: user.player.rank,
      });
    }
  } catch (event) {
    res.json({ message: "Database query failed", status: "Error" });
    throw new Error("Database query failed");
  }
});

export default router;