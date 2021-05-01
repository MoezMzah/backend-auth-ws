const User = require("../models/User");
const jwt = require("jsonwebtoken");
const isAuth = async (req, res, next) => {
  const token = req.headers.authorisation;
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).send({ msg: "Unauthorised" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    res.send(error);
  }

  //   console.log(req.headers.authorisation);
};
module.exports = isAuth;
