import mongoose, { ConnectOptions } from "mongoose";

export const connectDB = () => {
  const MONGO_URI = "mongodb://127.0.0.1:27017/track-expense";
  const options = {
    useCreateIndex: true,
  } as ConnectOptions;

  mongoose
    .connect(MONGO_URI) //, options)
    .then(() => console.log("Connected to db..."))
    .catch((e) => console.log(e));

  // mongoose.set("debug", true);
};
