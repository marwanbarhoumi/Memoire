const userModel = require("../model/User");
const { hPassword, comparePwd } = require("../utils/PasswordFunction");
const createToken = require("../utils/Token");
module.exports.register = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Vérifier si l'utilisateur existe
    const existeUser = await userModel.findOne({ email });
    if (existeUser) {
      return res.status(400).send({ msg: "User already exists" });
    }

    // ✅ Attendre le hachage du mot de passe avant de l'assigner
    const hashedPassword = await hPassword(password);

    // Créer un nouvel utilisateur avec le mot de passe haché
    const user = new userModel({ ...req.body, password: hashedPassword });
    await user.save();

    res.send({ msg: "The user was successfully created" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports.loginuser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // 1)Vérifier si l'utilisateur existe
    const existeUser = await userModel.findOne({ email });

    if (!existeUser) {
      return res.status(400).send({ msg: "bad cridentials(email)" });
    }
    //2) verification de password
    const match = await  comparePwd(password, existeUser.password);
    if (!match) {
      return res.status(400).send({ msg: "bad cridentials(password)" });
    }
    //3)creation de token
    const payload = { userid: existeUser._id };
    const token = createToken(payload);
    existeUser.password = undefined;

    //4)reponse
    res.send({ token, msg: "user successfully logged in", user: existeUser });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
module.exports.getCurrentUser = async (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.send({ users: allUsers });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

