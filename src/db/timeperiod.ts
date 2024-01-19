import { Schema, model } from "mongoose";

const TimePeriodSchema = new Schema({
  timeId: Number,
  abbreviation: String,
  fullName: String,
  firstDay: Number,
  lastDay: Number,
});

export const TimePeriod = model("Timeperiod", TimePeriodSchema);
