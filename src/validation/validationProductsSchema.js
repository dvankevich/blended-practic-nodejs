import Joi from "joi";

export const validationProductsSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required().valid('books', 'electronics', 'clothing', 'other'),
    description: Joi.string(),
});

export const patchValidationProductsSchema = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
    category: Joi.string().valid('books', 'electronics', 'clothing', 'other'),
    description: Joi.string(),
});
