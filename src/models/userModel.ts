import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: [true, "please provide the name"] },
    email: {
      type: String,
      required: [true, "Please provide the email address"],
      unique: true,
      match:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
    },
    password: {
      type: String,
      required: [true, "Please proivide a password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpires: Date,
    verifyToken: String,
    verifyExpires: Date,
  },
  { timestamps: true }
);
const User = mongoose.models.Users || mongoose.model("Users", userSchema);
export default User;
