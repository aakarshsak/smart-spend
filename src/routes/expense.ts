import { Response, Router } from "express";
import CustomRequest from "../types/CustomRequest";
import { formatDate, retrieveAllData } from "../middlewares/expenseData";
import { Expense } from "../db/expense";

const routes = Router();

routes.get("/", retrieveAllData, async (req: CustomRequest, res: Response) => {
  res.send(req.middlewareRes);
});

routes.post("/", formatDate, (req, res) => {
  const expenseData = { ...req.body };
  //   expenseData.createdAt = new Date();
  console.log(expenseData);

  console.log(new Date(), "");

  const expenseInstance = new Expense(expenseData);
  expenseInstance.save();

  res.send(expenseInstance);
});

// routes.get("/", (req, res) => {
//     try {

//     }
// })

export default routes;
