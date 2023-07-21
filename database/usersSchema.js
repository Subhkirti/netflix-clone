import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    emailOrMobile: { type: String, required: true },
    password: { type: String, required: true },
    loginSource: { type: String },
    token: { type: String, unique: true },
    userId: { type: String, unique: true },
  },
  { timestamps: true }
);

const UsersSchema = mongoose?.models?.Users || mongoose.model("Users", schema);

export default UsersSchema;
