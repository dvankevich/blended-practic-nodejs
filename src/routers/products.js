import { Router } from 'express';
import {
  getProductsByIdController,
  getProductsController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/products', ctrlWrapper(getProductsController));

router.get('/products/:id', ctrlWrapper(getProductsByIdController));

export default router;
