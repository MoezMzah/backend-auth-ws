const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
const connectDB = async () => {
  const opts = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  try {
    await mongoose.connect(process.env.MONGO_URI, opts);
    console.log("the database is connecting");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;

// mongoose
//     .connect(process.env.MONGO_URI, opts)
//     .then(() => console.log("the database is connecting"))
//     .catch((err) => console.log(err));
// };
