import express from 'express';
import pool from '../models/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', async (req,res) =>{
    const selectQuery = 'SELECT * FROM APPOINTMENTS';
    pool.query(selectQuery, (err,results)=>{
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/user', async (req,res) =>{
    const user_id = req.query.user_id;
    if (!user_id) return res.status(400).json({ error: 'User ID is required' });
    const selectQuery = 'SELECT * FROM APPOINTMENTS WHERE user_id = ?';
    pool.query(selectQuery, [user_id], (err,results)=>{
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.post('/', async (req, res) => {
    const {appointment_type, appointment_description, appointment_status ,appointment_due_date, car_manufacturer, car_model, car_year, employee_id, user_id} = req.body;
    pool.query(
        'INSERT INTO APPOINTMENTS (appointment_type, appointment_description, appointment_status ,appointment_due_date, car_manufacturer, car_model, car_year, employee_id, user_id) VALUES (?,?,?,?,?,?,?,?,?)',
        [appointment_type, appointment_description, appointment_status ,appointment_due_date, car_manufacturer, car_model, car_year, employee_id, user_id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Appointment created' });
        }
    );
});

export default router;