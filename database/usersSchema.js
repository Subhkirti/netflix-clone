import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    emailOrMobile: { type: String },
    password: { type: String },
    loginSource: { type: String },
    token: { type: String, unique: true },
    userId: { type: String, unique: true },
    watchList: { type: Array },
    movies: { type: Array },
  },
  { timestamps: true }
);

const UsersSchema = mongoose?.models?.Users || mongoose.model("Users", schema);

export default UsersSchema;
