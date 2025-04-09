import express from 'express';
import pool from '../models/db.js';

const router = express.Router();

router.get('/', async(req, res)=>{
    
    const selectQuery = 'select * from carparts'
    pool.query(selectQuery, (err, result)=>{
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.json(result);
    })
});

export default router;