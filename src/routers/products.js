import { Router } from 'express';
import {
  createProductController,
  getProductsByIdController,
  getProductsController,
  patchProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/products', ctrlWrapper(getProductsController));

router.get('/products/:id', ctrlWrapper(getProductsByIdController));

router.post('/products/', ctrlWrapper(createProductController));

router.patch('/products/:id', ctrlWrapper(patchProductController));

export default router;
