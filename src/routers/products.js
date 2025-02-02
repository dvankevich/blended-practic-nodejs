import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getProductsByIdController,
  getProductsController,
  patchProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { patchValidationProductsSchema, validationProductsSchema } from '../validation/validationProductsSchema.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/products', ctrlWrapper(getProductsController));

router.get(
  '/products/:id',
  isValidId,
  ctrlWrapper(getProductsByIdController));

router.post('/products/', validateBody(validationProductsSchema), ctrlWrapper(createProductController));

router.patch(
  '/products/:id',
  isValidId,
  validateBody(patchValidationProductsSchema),
  ctrlWrapper(patchProductController));

router.delete(
  '/products/:id',
  isValidId,
  ctrlWrapper(deleteProductController));

export default router;
