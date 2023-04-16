const userModel = require("../model/user");
const taskModel = require("../model/task");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// user Registration

const userRegistration = async (req, res) => {
  const { userName, password, confirmPassword } = req.body;

  if (userName && password && confirmPassword) {
    const user = await userModel.findOne({ userName: userName });

    if (!user) {
      if (password === confirmPassword) {
        try {
          const hashPassword = await bcrypt.hash(password, 10);
          const data = await userModel({
            userName: userName,
            password: hashPassword,
          });

          await data.save();

          const token = jwt.sign(
            { userID: data._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );

          res.send({
            status: "Success",
            message: "Registration Successful..",
            userId: data._id,
            token: token,
          });
        } catch (error) {
          res.send({
            status: "Failed",
            message: error,
          });
        }
      } else {
        res.send({
          status: "Failed",
          message: "Password and Confirm-Password are not Matched.",
        });
      }
    } else {
      res.send({ status: "Success", message: "UserName Already Exists." });
    }
  } else {
    res.send({ status: "Failed", message: "All Fields are Required." });
  }
};

// user login

const userLogin = async (req, res) => {
  const { userName, password } = req.body;

  if (userName && password) {
    try {
      const user = await userModel.findOne({ userName: userName });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          res.send({
            status: "Success",
            userTask: await taskModel.find(user._id),
            userId: user._id,
            token: token,
          });
        } else {
          res.send({ status: "Failed", message: "Invalid User." });
        }
      } else {
        res.send({ status: "Failed", message: "Invalid User." });
      }
    } catch (error) {
      res.send({ status: "Failed", message: error });
    }
  } else {
    res.send({ status: "Failed", message: "All Fields are Required." });
  }
};

module.exports = { userLogin, userRegistration };
