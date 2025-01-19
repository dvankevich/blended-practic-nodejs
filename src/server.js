import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getAllProducts, getProductsById } from './services/products.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/products', async (req, res) => {
    const products = await getAllProducts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found products!',
      data: products,
    });
  });

  app.get('/products/:id', async (req, res, next) => {

    const { id } = req.params;

    const data = await getProductsById(id);

    if (!data) {
      res.status(404).json({
        status: 404,
        message: 'Products is not found'
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found product with id ${id}!`,
      data: data,
    });
  });

  //   app.use(productsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
