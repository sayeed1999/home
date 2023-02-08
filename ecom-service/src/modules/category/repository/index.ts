import { Provider } from "../../../models/provider";
const db = Provider.getInstance();

const createCategory = async (body: { [key: string]: any }) => {
  const category = await db.Category.create(body);
  return category;
};

const findCategory = async (id: number) => {
  const category = await db.Category.findOne({ where: { id } });
  return category;
};

/**
 * This only updates documents that matches the 'where' clause,
 * if no matches found, it returns affectedCount: 0, affectedRows: []
 */
const updateCategoryById = async (
  id: number,
  updates: { [key: string]: any }
) => {
  const [affectedCount, affectedRows] = await db.Category.update(updates, {
    where: { id },
  });
  return affectedCount > 0 ? affectedRows[0] : null;
};

const deleteCategory = async (id: number) => {
  const category = await db.Category.destroy({ where: { id } });
  return category;
};

export default {
  createCategory,
  findCategory,
  updateCategoryById,
  deleteCategory,
};
