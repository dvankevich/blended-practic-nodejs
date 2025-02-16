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
import {
  patchValidationProductsSchema,
  validationProductsSchema,
} from '../validation/validationProductsSchema.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(getProductsController));

router.get('/:id', isValidId, ctrlWrapper(getProductsByIdController));

router.post(
  '/',
  validateBody(validationProductsSchema),
  ctrlWrapper(createProductController),
);

router.patch(
  '/:id',
  isValidId,
  validateBody(patchValidationProductsSchema),
  ctrlWrapper(patchProductController),
);

router.delete('/:id', isValidId, ctrlWrapper(deleteProductController));

export default router;
