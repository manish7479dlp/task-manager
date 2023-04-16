
const taskModel = require("../model/task.js");

// get task

const getTask = async (req , res) => {
    const {reference} = req.params;
    if(reference) {
        try {
            const data =  await taskModel.find({"reference" : reference} );
            res.send({status: "success" , "data" : data })
        } catch(error) {
            res.send({"status" : "failed" , "message" : error});
        }
    } else {
          res.send({"status" : "failed" , "message" : "Reference is not mention."})
    }
  
}

// create task

const createTask = async (req , res) => {
    const {reference , title , task} = req.body;

    // console.log(JSON.parse(task));

    if(reference && title) {
        try {
            const taskDetails = new taskModel({
                reference : reference,
                title : title,
                // task : JSON.parse(task)
            })
            await taskDetails.save();
        } catch(error) {
            console.log(error);
            res.send({"status": "failed", "message": error})
        }
    } else {
        res.send({"status": "failed" ,"message": "All Fields are required." });
    }
}

// delete task

const deleteTask = async (req , res) => {
    const _id = req.params;
    if(_id) {
      try {
            await taskModel.findByIdAndDelete(_id);
      } catch(error) {
          res.send({"status" : "failed" , "message" : error});
      }
    } else {
        res.send({"status": "failed" , "message" : "Id is not mention."})
    }
}

//update task

const updateTask = async (req , res) => {
    const _id = req.params;
    if(_id) {
        try {
            const {reference , title , task} = req.body;
            await taskModel.findByIdAndUpdate(_id , {$set: {
                title : title,
                reference : reference
            }})

          res.send({"status" : "sucess" , "message" : "Updated Successfully"});

        } catch(error) {
          res.send({"status" : "failed" , "message" : error});
        }
    } else {
        res.send({"status": "failed" , "message" : "Id is not mention."})
    }
}

module.exports = {createTask , deleteTask , getTask , updateTask};