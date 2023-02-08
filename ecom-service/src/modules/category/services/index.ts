import CustomError from "../../../utils/errors/custom-error";
import repository from "../repository";

const createCategory = async ({ name }: { [key: string]: any }) => {
  const category = await repository.createCategory({ name });
  return category;
};

const findCategory = async ({ id }: { [key: string]: any }) => {
  const category = await repository.findCategory(id);
  return category;
};

const updateCategoryById = async (id, { name }: { [key: string]: any }) => {
  const exists = await findCategory({ id });
  if (!exists)
    throw new CustomError("Category not found with associated id!", 404);
  const category = await repository.updateCategoryById(id, { name });
  return category;
};

const deleteCategory = async ({ id }: { [key: string]: any }) => {
  const category = await repository.deleteCategory(id);
  return category;
};

export default {
  createCategory,
  findCategory,
  updateCategoryById,
  deleteCategory,
};
