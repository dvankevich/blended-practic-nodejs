import { ProductModel } from '../db/models/products.js';

export const getAllProducts = async () => {
  const products = await ProductModel.find();
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
