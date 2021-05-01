const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { name, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    //1-check if the user is already exist
    if (user) {
      res.status(400).json({ msg: "this user is already exist" });
    }

    //2-create a new user
    user = new User({ name, lastName, email, password });
    //3-hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // res.send({ user });
    //4-save the user
    await user.save();
    //5-login the user(token)
    const payload = {
      userId: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    //6-Response
    res.send({
      token,
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
      },
    });

    //   res.send({ user: { name, lastName, email, password } });
  } catch (error) {
    res.send(error);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    //1-check if the user is already exist
    if (!user) {
      res.status(400).send({ msg: "bad credentials(email)" });
    }
    //2-compare the password
    const isMath = await bcrypt.compare(password, user.password);
    if (!isMath) {
      return res.status(400).send({ msg: "bad credential (password)" });
    }
    //2- sign in the user(token)

    const payload = {
      userId: user._id,
    };
    const token =jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    //6-Response
    res.send({
      token,
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const getAuthUser = (req, res) => {
  res.send({ user: req.user });
};

module.exports = {
  register,
  login,
  getAuthUser,
};
