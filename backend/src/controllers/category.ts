import {
  addCategoriesToDB,
  getAllCategoriesFromDB,
} from "../services/category";

export const getAllCategories = async () => await getAllCategoriesFromDB();

export const addCategoryList = async (categoryList: any) =>
  await addCategoriesToDB(categoryList);
