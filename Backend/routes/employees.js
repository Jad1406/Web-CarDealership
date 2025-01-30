import express from 'express';
import pool from '../models/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', async (req,res) =>{
    const selectQuery = 'SELECT * FROM EMPLOYEE ORDER BY employee_last_name';
    pool.query(selectQuery, (err,results)=>{
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

export default router;