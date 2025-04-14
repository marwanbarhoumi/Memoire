const { body, validationResult } = require("express-validator");
const customError = (errors) => errors.map((e) => ({ msg: e.msg }));

module.exports.registerRules = [
  body("firstname")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("First name must be more than 3 characters")
    .trim(),

  body("lastName")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Last name must be more than 3 characters")
    .trim(),

  body("email")
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail()
    .trim(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
];
module.exports.loginRules = [
  body("email").isEmail().withMessage("Enter a valid email"),

  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
];
module.exports.AddProductRules = [
  body("name").notEmpty().withMessage("Donne product Name").trim(),
  body("price").notEmpty().withMessage("Donne product Proce").trim(),
  body("qtes")
    .notEmpty()
    .withMessage("please enter how many items you have in stock ")
    .trim(),
  body("descripton")
    .notEmpty()
    .withMessage("please enter a valid description of you product ")
    .trim()
];

module.exports.validator = (req, res, next) => {
  //console.log("Received body:", req.body); // Ajoutez cette ligne pour vérifier les données
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: customError(errors.array()) });
  }
  next();
};
