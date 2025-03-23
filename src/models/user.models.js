import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: string,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, //this is used when you want to enable search on a field
    },
    email: {
      type: string,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: string,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: string, //cloudinary url
      required: true,
    },
    coverimage: {
      type: string, //cloudinary url
    },
    watchhistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    password: {
      type: string,
      required: [true, "password is required"],
    },
    refreshtoken: {
      type: string,
    },
  },
  {
    timestamps: true, //we get created at and updated at from this.
  },
);

// here we have given password in plain string , so he have to hash the password before it is saved int the db and also check that the password is coorect
// to hash we use pre middleware of mongoose that let us do anything with data before any event

userSchema.pre("save", async function (next) {
  // run this pre middleware only when password in modified
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});

//adding custom methods on this data to vrify if the hashed password is coorect

userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

//methods to generate access and refresh tokens
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_SECRET_TOKEN_EXPIRY,
    },
  );
};

export const User = mongoose.model("User", userSchema);

// ==>> JWT IS A BEARER TOKEN , JO BHI BEARE HOGA I WILL SEND THE DATA TO HIM.
