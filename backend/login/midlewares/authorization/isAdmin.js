const isAuth = require("./isAuth");

const isAdmin = async (req, res, next) => {
  try {
    await isAuth()(req, res, () => {

    if (req?.user.role != "admin") {
      return res.status(403).send({ msg: "You are not an admin" });
    }
    next();
  });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = isAdmin;
