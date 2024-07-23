const { default: mongoose, SchemaTypes, Schema } = require("mongoose");

// mongoose.connect("mongodb+srv://flutterydev:Allem%40080603@cohort.3xtdu8e.mongodb.net/?retryWrites=true&w=majority");

// Local deployment setup
mongoose.connect("mongodb://localhost:27017/dummyDB").then(() => {
  console.log("db is connected");
});

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  userName: String,
  account: {
    type: SchemaTypes.ObjectId,
    ref: "Account",
  },
});

const accountSchema = mongoose.Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
  balance: SchemaTypes.Number,
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
