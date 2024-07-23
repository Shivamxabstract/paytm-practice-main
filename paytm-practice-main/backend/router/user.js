const express = require("express");
const { authMiddleware } = require("../middlewares/middleware");
const userSchema = require("../types");
const { User, Account } = require("../db");
const { signJwt } = require("../jwt");
const { getUserId } = require("../utils");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const payload = req.body;
  const payaloadResult = userSchema.safeParse(payload);

  if (!payaloadResult.success) {
    res.status(411).json({
      msg: "Email already taken / Incorrect inputs",
    });
    return;
  }

  const existingUser = await User.findOne({
    userName: payload.userName,
  });

  if (existingUser) {
    res.status(411).json({
      msg: "Email already taken/Incorrect inputs",
    });
    return;
  }

  const user = await User.create({
    firstName: payload.firstName,
    lastName: payload.lastName,
    userName: payload.userName,
    password: payload.password,
  });

  const balance = Math.floor(Math.random() * 1000) + 1;
  const decimalBalance = balance * 100;

  const account = await Account.create({
    user: user._id,
    balance: decimalBalance,
  });

  user.account = account._id;
  user.save();

  const token = signJwt(payload.userName);
  res.json({
    msg: "Successfully Logged In",
    token: token,
  });
});

userRouter.post("/signin", async (req, res) => {
  const payload = req.body;
  const payaloadResult = userSchema.safeParse(payload);
  if (!payaloadResult.success) {
    res.status(401).json({
      msg: "Error while logging in",
    });
    return;
  }

  const user = await User.findOne({
    userName: payload.userName,
    password: payload.password,
  });

  if (!user) {
    res.status(411).json({
      msg: "Wrong Username or password",
    });
    return;
  }

  const token = signJwt(payload.userName);
  res.json({
    msg: "Successfully Logged In",
    token: token,
  });
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { userId, firstName, lastName, userName, password } = req.body;

  const update = {};

  if (firstName) update.firstName = firstName;
  if (lastName) update.lastName = lastName;
  if (userName) update.userName = userName;
  if (password) update.userName = password;

  if (!userSchema.safeParse(update).success) {
    res.status().json({
      msg: "Error while updating information",
    });
    return;
  }

  const newData = await User.findOneAndUpdate(
    { _id: userId }, // filter
    update, // update
    { new: true } // options
  );

  res.json({
    msg: "done",
    newData: newData,
  });
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    users: users,
  });
});

userRouter.get("/", authMiddleware, async (req, res) => {
  const userId = await getUserId(req);
  const user = await User.findOne({ _id: userId });
  res.json(user);
});

userRouter.get("/:id", authMiddleware, (req, res) => {
  const userId = req.params.id;
  const user = User.findOne({ _id: userId });
  res.json(user);
});

module.exports = userRouter;
