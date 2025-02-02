import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
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

router.delete('/products/:id', ctrlWrapper(deleteProductController));

export default router;
