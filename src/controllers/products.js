import createHttpError from 'http-errors';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
} from '../services/products.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getProductsController = async (req, res) => {
  console.log(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);
  console.log({ sortBy, sortOrder });

  const products = await getAllProducts({
    sortBy,
    sortOrder,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductsByIdController = async (req, res, next) => {
  const { id } = req.params;

  const data = await getProductsById(id);

  if (!data) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found product with id ${id}!`,
    data: data,
  });
};

export const createProductController = async (req, res) => {
  const product = await createProduct(req.body);
  res.status(201).json({
    status: 201,
    message: `Successfully created a product!`,
    data: product,
  });
};

export const patchProductController = async (req, res, next) => {
  const { id } = req.params;
  const result = await updateProduct(id, req.body);

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
  const { id } = req.params;
  const result = await deleteProduct(id);
  if (!result) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(204).send();
};
