const bcrypt = require("bcrypt");
// function utilise pour crypte mdp
const hPassword = async (pwd) => {
  try {
    const hashedPassword = await bcrypt.hash(pwd, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

// function utilise pour inverse crypte mdp
const comparePwd = async (pwd, bdpwd) => {
  const match = await bcrypt.compare(pwd, bdpwd);
  return match;
};
module.exports = { hPassword, comparePwd };
