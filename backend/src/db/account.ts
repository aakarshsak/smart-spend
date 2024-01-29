import { Schema, model } from "mongoose";

const AccountSchema = new Schema({
  name: String,
  color: String,
});

export const Account = model("Account", AccountSchema);
