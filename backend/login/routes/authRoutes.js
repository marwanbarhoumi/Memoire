const express = require("express");
const { register, loginuser, getCurrentUser, getAllUsers } = require("../controllers/authControllers");
const {
  registerRules,
  validator,
  loginRules
} = require("../midlewares/validation/bodyValidation");
const isAuth = require("../midlewares/authorization/isAuth");
const isAdmin = require("../midlewares/authorization/isAdmin");
const router = express.Router();
/**
 * @method POST /auth/signup
 *@description registre new user
 *@access  public
 */

router.post("/signup", registerRules, validator, register);

/**
 * @method POST /auth/signup
 *@description login user
 *@access  public
 */

 router.post("/signin",loginRules, validator, loginuser);


 /**
 * @method get /auth/
 *@description authentifie  utilisateur
 *@access  privete
 */

 router.get("/",isAuth(),getCurrentUser);


  /**
 * @method get /auth/allusers
 *@description all users
 *@access  protect (private+role)
 */

 router.get("/all",isAuth(),isAdmin,getAllUsers);

module.exports = router;
