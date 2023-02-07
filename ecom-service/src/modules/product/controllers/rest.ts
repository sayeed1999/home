import { catchErrors } from "../../../api/middlewares";
import productService from '../services'



export const createProduct = catchErrors(async (req: any, res: any, next: any) => {
    let { name, price, category_id } = req.body;
    const product = await productService.createProduct({name,price,category_id})
    res.status(201).json({ message: "Product created successfully", data: product });
  });