// routes/index.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Welcome to the API!');
});

export default router;
