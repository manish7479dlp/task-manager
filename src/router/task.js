const express = require("express");
const route = express.Router();
const {createTask, deleteTask , getTask , updateTask} = require("../controller/task");

route.get("/get/:reference", getTask);
route.post("/create", createTask);
route.delete("/delete/:_id", deleteTask);
route.patch("/update/:_id" , updateTask);


module.exports = route;