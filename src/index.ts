import express from "express";
import bodyParser from "body-parser";

import { connectDB } from "./db/db";
import expense from "./routes/expense";

const app = express();

connectDB();

app.use(bodyParser.json());

app.use("/expenses", expense);

app.listen(3000, () => console.log("Listening on port 3000."));
