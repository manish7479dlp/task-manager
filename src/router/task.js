const express = require("express");
const checkUserAuth = require("../middleware/auth-middleware")
const route = express.Router();
const {createTask, deleteTask , getTask , updateTask} = require("../controller/task");

route.get("/get/:reference", checkUserAuth, getTask);
route.post("/create",checkUserAuth, createTask);
route.delete("/delete/:_id",checkUserAuth, deleteTask);
route.patch("/update/:_id" ,checkUserAuth, updateTask);


module.exports = route;