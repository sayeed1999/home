import { Router } from "express";

import {createProduct } from "../../modules/product/controllers/rest";

const router = Router();

router.post("/product/create", createProduct);


export default router;
