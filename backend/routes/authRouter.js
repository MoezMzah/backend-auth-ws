const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAuthUser,
} = require("../controllers/authController");
const logger = require("../middelwares/logger");
// const isAuth = require("../middelwares/isAuth");
const isAuth = require("../middelwares/passportSetup");

const {
  registerRules,
  loginRules,
  validator,
} = require("../middelwares/bodyValidator");
/**
 * @params POST /api/auth/register
 * @description register user
 * @access PUBLIC
 */

router.post("/register", registerRules(), validator, register);

/**
 * @params POST /api/auth/login
 * @description login user
 * @access PUBLIC
 */

router.post("/login", loginRules(), validator, login);

/**
 * @params GET /api/auth/me
 * @description get auth user
 * @access PRIVATE
 */

 router.get("/me", isAuth(), getAuthUser); //add the keyword Bearer to token when you use passport Middelware
// router.get("/me", isAuth, getAuthUser);
module.exports = router;
