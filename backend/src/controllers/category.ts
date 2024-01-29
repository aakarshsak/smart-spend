import ICategory from "../models/ICategory";
import {
  addCategoriesToDB,
  getAllCategoriesFromDB,
} from "../services/category";

export const getAllCategories = async () => await getAllCategoriesFromDB();

export const addCategoryList = async (categoryList: ICategory[]) =>
  await addCategoriesToDB(categoryList);
