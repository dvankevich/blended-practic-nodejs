import { ProductModel } from '../db/models/products.js';

export const getAllProducts = async () => {
  const products = await ProductModel.find();
  return products;
};
