const mongoose = require('mongoose');
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: String,
    password:  String,
    isAdmin: Boolean,
    // role: {type: String, enum: ["Regular", "Employee", "Admin"] }
    // ^ this would be how you would do it if oyu needed more than 2 roles
})



const User = mongoose.model('User', userSchema);



module.exports = User;


