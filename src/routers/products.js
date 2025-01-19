import { Router } from 'express';
import {
  getProductsByIdController,
  getProductsController,
} from '../controllers/products.js';

const router = Router();

router.get('/products', getProductsController);

router.get('/products/:id', getProductsByIdController);

export default router;
