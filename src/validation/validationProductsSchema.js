import Joi from 'joi';
import { CATEGORY_LIST } from '../constants/constants.js';

export const validationProductsSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string()
    .required()
    .valid(...CATEGORY_LIST),
  description: Joi.string(),
});

export const patchValidationProductsSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  category: Joi.string().valid(...CATEGORY_LIST),
  description: Joi.string(),
});
