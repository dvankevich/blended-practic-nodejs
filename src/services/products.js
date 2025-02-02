import createHttpError from 'http-errors';
import { ProductModel } from '../db/models/products.js';
import { SORT_ORDER } from '../constants/constants.js';

export const getAllProducts = async ({
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const productQuery = ProductModel.find();
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

export const getProductsById = async (id) => await ProductModel.findById(id);

export const createProduct = async (payload) => {
  const product = await ProductModel.create(payload);
  return product;
};

export const updateProduct = async (id, payload, options = {}) => {
  const rawResult = await ProductModel.findOneAndUpdate({ _id: id }, payload, {
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

export const deleteProduct = async (_id) => {
  return await ProductModel.findOneAndDelete({ _id });
};
