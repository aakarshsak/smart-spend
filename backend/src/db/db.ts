import mongoose, { ConnectOptions } from "mongoose";
import logger from "../utility/logger";

export const connectDB = () => {
  const MONGO_URI = "mongodb://127.0.0.1:27017/track-expense";
  const options = {
    useCreateIndex: true,
  } as ConnectOptions;

  mongoose
    .connect(MONGO_URI) //, options)
    .then(() => logger.info("Connected to db..."))
    .catch((e) => logger.error(e));

  // mongoose.set("debug", true);
};
