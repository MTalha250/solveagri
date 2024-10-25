import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
       type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    role:{
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;