import { Category } from "../db/category";
import CustomError from "../errors/CustomError";

export const getAllCategoriesFromDB = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (e) {
    console.log(e);
  }
};

export const addCategoryToDB = async (categoryList: any) => {
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
    throw new CustomError("All category already exists", 409);

  return actualSavedCategories;
};
