import { Request, Response, Router } from "express";
import { TimePeriod } from "../db/timeperiod";
import logger from "../utility/logger";

const routes = Router();

routes.post("/", async (req: Request, res: Response) => {
  const savedTimePeriods = await Promise.all(
    req.body.map(async (t: any) => {
      const period = new TimePeriod(t);
      return period.save();
    })
  );

  logger.debug(savedTimePeriods);

  res.send("Success");
});

routes.get("/", async (req: Request, res: Response) => {
  try {
    const timeperiods = await TimePeriod.find();
    res.json(timeperiods);
  } catch (e) {
    logger.error(e);
  }
});

export default routes;
