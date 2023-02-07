import { Router } from "express";
import { createProduct } from "../../modules/product/controllers/rest";
import { createCategory, deleteCategory, updateCategory } from './../../modules/category/controllers/rest';


const router = Router();

router.post("/product/create", createProduct);

//Category routes
router.post("/category/create", createCategory);
router.put("/category/update", updateCategory);
router.delete("/category/delete/:id", deleteCategory);






export default router;
