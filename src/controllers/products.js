import createHttpError from 'http-errors';
import {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
} from '../services/products.js';

export const getProductsController = async (req, res) => {
  const products = await getAllProducts();

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
    next(createHttpError(404, 'Product not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a product!`,
    data: result.product,
  });
};
