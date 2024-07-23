const express = require("express");
const { authMiddleware } = require("../middlewares/middleware");
const { User, Account } = require("../db");
const { default: mongoose } = require("mongoose");
const { verify } = require("jsonwebtoken");
const { verifyJwt } = require("../jwt");
const { getUserId } = require("../utils");

const decimalPrecision = 2;
const balanceMultiplier = Math.pow(10, decimalPrecision);

const accountRouter = express.Router();

accountRouter.use(authMiddleware);

async function accountInfo(userName) {
  const user = await User.findOne({ userName: userName });
  try {
    const account = await Account.findOne({ _id: user.account });
    return account;
  } catch (error) {
    return null;
  }
}

accountRouter.get("/balance", async (req, res) => {
  const userId = await getUserId(req);
  const account = await Account.findOne({ user: userId });
  res.json({
    balance: account.balance / balanceMultiplier,
  });
});

accountRouter.post("/transfer", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const senderAccount = await Account.findOne({ user: req.userId });
  const { amount } = req.body;
  const decimalAmount = amount * balanceMultiplier;
  const receiverAccount = await Account.findOne({ user: body._id });

  if (!senderAccount || !receiverAccount) {
    res.status(404).json({
      msg: "Account not found",
    });
    return;
  }

  if (senderAccount.balance < decimalAmount) {
    res.status(404).json({
      msg: "Insufficent Account Balance",
    });
    return;
  }

  senderAccount.balance -= decimalAmount;
  receiverAccount.balance += decimalAmount;

  try {
    await senderAccount.save();
    await receiverAccount.save();
    await session.commitTransaction();
    res.json({
      msg: "Transfer Complete",
      senderAccountBalance: senderAccount.balance,
      receiverAccountBalance: receiverAccount.balance,
    });
    return;
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      msg: "Could not complete Transaction",
    });
  } finally {
    await session.endSession();
  }
});

module.exports = accountRouter;
