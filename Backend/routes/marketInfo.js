// routes/userRoutes.js
import express from 'express';
import pool from '../models/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', async (req,res) =>{
    const selectQuery = 'SELECT * FROM CARINVENTORY';
    pool.query(selectQuery, (err,results)=>{
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/sale', async (req,res) =>{
    const selectQuery = 'SELECT * FROM CARINVENTORY WHERE rental = 0 ORDER BY price DESC';
    pool.query(selectQuery, (err,results)=>{
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/sale/alphabet', async (req,res) =>{
    const selectQuery = 'SELECT * FROM CARINVENTORY WHERE rental = 0 ORDER BY production_company';
    pool.query(selectQuery, (err,results)=>{
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/rent', async (req,res) =>{
    const selectQuery = 'SELECT * FROM CARINVENTORY WHERE rental = 1 ORDER BY rating DESC';
    pool.query(selectQuery, (err,results)=>{
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/parts', async (req,res) =>{
    const selectQuery = 'SELECT * FROM CARPARTS ORDER BY car_part_price DESC';
    pool.query(selectQuery, (err,results)=>{
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/repairs', async (req,res) =>{
    const selectQuery = 'SELECT * FROM REPAIROPTIONS ORDER BY requests_completed DESC';
    pool.query(selectQuery, (err,results)=>{
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

export default router;