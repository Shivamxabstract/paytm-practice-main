const { User, Account } = require("./db");
const { verifyJwt } = require("./jwt");

module.exports.getUserId = async (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = await User.findOne({
    userName: verifyJwt(token).userName,
  });

  return user._id;
};
