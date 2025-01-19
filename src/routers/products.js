import { Router } from 'express';
import { getAllProducts } from '../services/products.js';

const router = Router();

router.get('/products', async (req, res) => {
  const products = await getAllProducts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
});

export default router;
