import { addCategoryToDB, getAllCategoriesFromDB } from "../services/category";

export const getAllCategories = async () => await getAllCategoriesFromDB();

export const addCategory = async (categoryList: any) =>
  await addCategoryToDB(categoryList);
