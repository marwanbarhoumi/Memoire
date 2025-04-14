var jwt = require("jsonwebtoken");

function createToken(payload) {
  console.log(payload)
  const token = jwt.sign(payload, process.env.jwtCode,{expiresIn:"1h"});
  console.log(token)
  return token
}
module.exports = createToken;
