import mongoose from "mongoose";

const UserSchema =new mongoose.Schema({
    userName : {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.models.users || mongoose.model("users", UserSchema)

export default User