const express = require("express");
const app = express();
const passport = require("passport");
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/authRouter");
//Middelwares
app.use(express.json());
app.use(passport.initialize());
//CONNECT THE DB
connectDB();
// app.get("/api/auth/test", (req, res) => res.send("hello"));
app.use("/api/auth", authRouter);

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`the server is Running on PORT ${PORT}`)
);
