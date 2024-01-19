import { Request, Response, Router } from "express";
import { TimePeriod } from "../db/timeperiod";

const routes = Router();

routes.post("/", async (req: Request, res: Response) => {
  const savedTimePeriods = await Promise.all(
    req.body.map(async (t: any) => {
      console.log(t);
      const period = new TimePeriod(t);
      return period.save();
    })
  );

  console.log(savedTimePeriods);

  res.send("Success");
});

routes.get("/", async (req: Request, res: Response) => {
  try {
    const timeperiods = await TimePeriod.find();
    res.json(timeperiods);
  } catch (e) {
    console.log(e);
  }
});

export default routes;
