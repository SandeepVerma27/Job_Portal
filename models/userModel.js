import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is require"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

// middleware
userSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// JSON WEB TOKENS
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default mongoose.model("User", userSchema);
