const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userid: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
