
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
const jwtPassword = JWT_SECRET;

function signJwt(userName){
    const token = jwt.sign({
        userName: userName,
    }, jwtPassword);

    return token;
}
function verifyJwt(token){
    return jwt.verify(token, jwtPassword);
}

function decodeJwt(token){
    return jwt.decode(token).userName;
}

module.exports = {verifyJwt, signJwt, decodeJwt}