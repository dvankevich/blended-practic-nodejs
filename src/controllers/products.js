import createHttpError from 'http-errors';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
} from '../services/products.js';
import { parseSortParams } from '../utils/parseSortParams.js';

import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getProductsController = async (req, res) => {
  console.log(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  console.log('filter: ', filter);

  const products = await getAllProducts({
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductsByIdController = async (req, res, next) => {
  const { id: _id } = req.params;
  const userId = req.user._id;

  const data = await getProductsById({ _id, userId });

  if (!data) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found product with id ${_id}!`,
    data: data,
  });
};

export const createProductController = async (req, res) => {
  console.log(req.user);

  const product = await createProduct({ ...req.body, userId: req.user._id });

  res.status(201).json({
    status: 201,
    message: `Successfully created a product!`,
    data: product,
  });
};

export const patchProductController = async (req, res, next) => {
  const { id: _id } = req.params;
  const userId = req.user._id;

  const result = await updateProduct({ _id, userId }, req.body);

  if (!result) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a product!`,
    data: result.product,
  });
};

export const deleteProductController = async (req, res) => {
  const { id: _id } = req.params;
  const userId = req.user._id;

  const result = await deleteProduct({ _id, userId });
  if (!result) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(204).send();
};
