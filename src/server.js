import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getAllProducts } from './services/products.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.get('/products', async (req, res) => {
    const products = await getAllProducts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found products!',
      data: products,
    });
  });

  app.use(express.json());
  app.use(cors());

  //   app.use(productsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
