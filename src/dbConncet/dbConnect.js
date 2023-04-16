const mongoose = require("mongoose");

const dbConnect = async(DATABASE_URL) => {
    try {
        DB_OPTIONS = {
            dbname : "task-manager"
        }
        await mongoose.connect(DATABASE_URL , DB_OPTIONS);
        console.log("Connected Sucessfully..");
    } catch(error) {
        console.log(error);
    }
}

module.exports = dbConnect;