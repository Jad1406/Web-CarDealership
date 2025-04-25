// routes/userRoutes.js
import express from 'express';
import pool from '../models/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/user', async (req, res) => {
    const user_id = req.query.user_id;
    if (!user_id) return res.status(400).json({ error: 'User ID is required' });
    const selectQuery = 'SELECT * FROM orders WHERE user_id = ?';
    pool.query (selectQuery, [user_id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    });
});


router.get('/all', async (req, res) => {
    // const user_id = req.query.user_id;
    // if (!user_id) return res.status(400).json({ error: 'User ID is required' });
    const selectQuery = 'SELECT * FROM orders';
    pool.query (selectQuery, (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    });
});

router.post('/', async (req, res) => {
    const { user_id, order_type, expected_delivery_date, delivery_location, description, total_price, payment_type } = req.body;
    if (!user_id || !order_type || !expected_delivery_date || !description || !total_price || !payment_type) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if(payment_type !== 'cash' && payment_type !== 'card') {
        return res.status(400).json({ message: 'Invalid payment type' });
    }

    if(order_type !== 'delivery' && order_type !== 'pickup') {
        return res.status(400).json({ message: 'Invalid order type' });
    }

    if (order_type === 'delivery' && !delivery_location) {
        return res.status(400).json({ message: 'Delivery location is required for delivery orders' });
        
    }
    const order_date = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

    const insertQuery = 'INSERT INTO orders (user_id, order_type, order_date, expected_delivery_date, delivery_location, description, total_price, payment_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    pool.query(insertQuery, [user_id, order_type, order_date, expected_delivery_date, delivery_location, description, total_price, payment_type], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(201).json({ message: 'Order created successfully', order_id: results.insertId });
    });
});
export default router;