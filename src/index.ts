import express from "express";
import bodyParser from "body-parser";

import { connectDB } from "./db/db";
import expense from "./routes/expense";
import category from "./routes/category";
import timeperiod from "./routes/timeperiod";

const app = express();

connectDB();

app.use(bodyParser.json());

app.use("/expenses", expense);
app.use("/categories", category);
app.use("/timeperiod", timeperiod);

app.listen(3000, () => console.log("Listening on port 3000."));
