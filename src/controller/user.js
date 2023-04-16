const userModel = require("../model/user");
const taskModel = require("../model/task")
const bcrypt = require("bcrypt");

// user Registration

const userRegistration = async (req, res) => {
  const { userName, password, confirmPassword } = req.body;

  if (userName && password && confirmPassword) {
    const user = await userModel.findOne(userName);

    if (!user) {
      if (password === confirmPassword) {
        try {
          const hashPassword = await bcrypt.hash(password, 10);
          const data = await userModel({
            userName: userName,
            password: hashPassword,
          });

          res.send({ status: "Success", message: "Registration Successful.." , userId : data._id });
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
      const user = await userModel.findOne(userName);

      if (user) {
        const isMatch = await bcrypt.compare(user.password, password);
        if (isMatch) {
            res.send({status: "Success" , userTask: await taskModel.find(user._id), userId : user._id})
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


module.exports = {userLogin , userRegistration};