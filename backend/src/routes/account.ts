import { NextFunction, Request, Response, Router } from "express";
import { addAccounts, getAccounts } from "../controllers/account";

const routes = Router();

routes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await getAccounts());
  } catch (e) {
    next(e);
  }
});

routes.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accounts = req.body;
    const addedAccounts = await addAccounts(accounts);
    res.send({
      successCount: addedAccounts.length,
      entries: addedAccounts,
    });
  } catch (e) {
    next(e);
  }
});

export default routes;
