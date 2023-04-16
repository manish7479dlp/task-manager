const jwt = require("jsonwebtoken");
const userModel = require("../model/user");

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      //get token from header

      token = authorization.split(" ")[1];

      //verify token

      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //get user from token

      // req.user = await userModel.findById(userId).select("-password");

      next();
    } catch (error) {
      res.status(401).send({ status: "failed", message: "Unauthorized User" });
    }
  }

  if (!token) {
    res
      .status(401)
      .send({ status: "failed", message: "Unauthorized User , No Token" });
  }
};

module.exports = checkUserAuth;
