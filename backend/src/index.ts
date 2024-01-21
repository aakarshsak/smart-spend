import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { connectDB } from "./db/db";
import expense from "./routes/expense";
import category from "./routes/category";
import timeperiod from "./routes/timeperiod";
import globalCatcher from "./middlewares/globalCatcher";

const app = express();

const PORT = 8080;

connectDB();

const allowedOrigins = ["http://localhost:3000"];
const corsOptions = { origin: allowedOrigins };

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/expenses", expense);
app.use("/categories", category);
app.use("/timeperiod", timeperiod);

app.use(globalCatcher);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
