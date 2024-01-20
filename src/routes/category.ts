import { NextFunction, Request, Response, Router } from "express";
import { Category } from "../db/category";
import { addCategory, getAllCategories } from "../controllers/category";

const routes = Router();

routes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await getAllCategories());
  } catch (e) {
    next(e);
  }
});

routes.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const categoryList = req.body;

  try {
    const savedCategoryReponse = await addCategory(categoryList);
    res.json({
      successCount: savedCategoryReponse.length,
      entries: savedCategoryReponse,
    });
  } catch (e) {
    next(e);
  }
});

export default routes;
