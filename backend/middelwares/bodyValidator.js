const { body, validationResult } = require("express-validator");
const registerRules = () => [
  body("name", "name is required").notEmpty(),
  body("lastName", "lastName is required").notEmpty(),
  body("email", "email is not valid").isEmail(),
  body("password", "password must contain 6 character").isLength({
    min: 6,
    max: 20,
  }),
];
const customiseError = (arrayError) =>
  arrayError.map((err) => ({
    msg: err.msg,
  }));

const loginRules=()=>[
    body("email", "email is not valid").isEmail(),
  body("password", "password must contain 6 character").isLength({
    min: 6,
    max: 20,
  }),
]
const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(customiseError(errors.array()));
  } else next();
};
module.exports = {
  registerRules,
  validator,
  loginRules,
};
