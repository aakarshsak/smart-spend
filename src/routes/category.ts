import { Request, Response, Router } from "express";
import { Category } from "../db/category";

const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (e) {
    console.log(e);
  }
});

routes.post("/", async (req: Request, res: Response) => {
  const categoryList = req.body;
  console.log(categoryList);
  let existingCategories: any;
  try {
    existingCategories = await Category.find();
  } catch (e) {
    console.log(e);
  }

  const savedCategories = await Promise.all(
    categoryList.map(async ({ name, transactionType }: any) => {
      if (
        existingCategories &&
        existingCategories.length > 0 &&
        existingCategories.filter((c: any) => {
          console.log(c);
          return (
            c.name.toLowerCase().trim() === name.toLowerCase().trim() &&
            c.transactionType.toLowerCase().trim() ===
              transactionType.toLowerCase().trim()
          );
        }).length > 0
      )
        return;

      const category = new Category({
        name: name.toLowerCase(),
        transactionType: transactionType.toLowerCase(),
      });
      return await category.save();
    })
  );

  const actualSavedCategories = savedCategories.filter((c) => c);
  if (actualSavedCategories.length === 0)
    return res
      .status(409)
      .json({ status: 409, msg: "All category already exists." });

  res.json({
    successCount: actualSavedCategories.length,
    entries: actualSavedCategories,
  });
});

export default routes;
