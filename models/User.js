import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be provided"],
      trim: true,
    },   
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
      default: null,
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    gender: {
      type: String,
      trim: true,
      enum: ["Male", "Female", "Custom"],      
    },
    cell: {
      type: String,      
      trim: true,      
      default: null,
    },

    photo: {
      type: String,
      default: null,
    },

    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//Create User Model
export default mongoose.model("User", userSchema);
