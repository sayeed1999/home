import { catchErrors } from "../../../api/middlewares";
import categoryService from "../services";

export const createCategory = catchErrors(
  async (req: any, res: any, next: any) => {
    let { name } = req.body;
    const category = await categoryService.createCategory({ name });
    res
      .status(201)
      .json({ message: "Category created successfully", data: category });
  }
);

export const updateCategoryById = catchErrors(
  async (req: any, res: any, next: any) => {
    let { id, name } = req.body;
    const category = await categoryService.updateCategoryById(id, { name });
    res
      .status(200)
      .json({ message: "Category updated successfully", data: category });
  }
);

export const deleteCategory = catchErrors(
  async (req: any, res: any, next: any) => {
    let { id } = req.params;
    const exists = await categoryService.findCategory({ id });
    if (!exists)
      return res
        .status(404)
        .json({ message: "Category not found with associated id !" });
    const category = await categoryService.deleteCategory({ id });
    res.status(204).json({ message: "Category deleted successfully" });
  }
);
