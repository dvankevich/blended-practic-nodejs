import createHttpError from 'http-errors';
import { ProductModel } from '../db/models/products.js';
import { SORT_ORDER } from '../constants/constants.js';

export const getAllProducts = async ({
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {
  const productQuery = ProductModel.find({ userId });
  // console.log('productQuery: ', productQuery);

  if (filter.category) {
    productQuery.where('category').equals(filter.category);
  }

  if (filter.minPrice) {
    productQuery.where('price').gte(filter.minPrice);
  }
  if (filter.maxPrice) {
    productQuery.where('price').lte(filter.maxPrice);
  }

  const products = await productQuery.sort({ [sortBy]: sortOrder });
  return products;
};

export const getProductsById = async (filter) =>
  await ProductModel.findOn(filter);

export const createProduct = async (payload) => {
  const product = await ProductModel.create(payload);
  return product;
};

export const updateProduct = async (filter, payload, options = {}) => {
  const rawResult = await ProductModel.findOneAndUpdate(filter, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    product: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteProduct = async (filter) => {
  return await ProductModel.findOneAndDelete(filter);
};
