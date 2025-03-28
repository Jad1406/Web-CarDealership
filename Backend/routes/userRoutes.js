// routes/userRoutes.js
import express from 'express';
import pool from '../models/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  pool.query('SELECT * FROM USERS', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Create a new user
router.post('/', async (req, res) => {
  //Data to be posted to database
  const { first_name, last_name, username, user_email, user_password, user_phone } = req.body;

  //Select the user with the email that is being created
  const checkEmailQuery = 'SELECT * FROM users WHERE user_email = ?';
  pool.query(checkEmailQuery, [user_email], async (err, result) => {

    //if an error occures report a database error
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    //If the result's length is not 0, then more than 0 rows have been returned. Therefore send a result message that says 'email already exists'
    if (result.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

  //Select the users with the provided username 
  const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
  pool.query(checkUsernameQuery, [username], async(err, resultUsername) => {

    //If an error occured then log the error
    if (err) {
      console.error(err);
      return res.status(500).json({message: 'Database error'})
    }

    //Check if the result of the length is not 0, if yes, that means that the username has already been used
    if (resultUsername.length>0) {
      return res.status(400).json({message: 'Username already in use'})
    }

     //Convert the password into HASH before storing it
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user_password, saltRounds);

  //Otherwise, insert the data into the database
  const insertUserQuery = `INSERT INTO users (first_name, last_name, username, user_email, user_password, user_phone) VALUES (?, ?, ?, ?, ?, ?)`;
    pool.query(insertUserQuery, [first_name, last_name, username, user_email, hashedPassword, user_phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    //If the query executed properly, send a result message that displays, "User created successfully"
    res.status(200).json({ 
      message: 'User created successfully',
      user_id: result.insertId,
      username: username

        });
      });
    });
  });
});

//Login to a pre-existing user
router.post('/login', async (req,res)=>{

  const {username, user_password} = req.body;

  //Create the query to be get
  const getUsernameEmailPasswordQuery = 'SELECT * FROM users WHERE username = ?';
  pool.query(getUsernameEmailPasswordQuery, [username], async(err,result) =>{
    if (err) {
      console.error(err);
      return res.status(500).json({message: 'Database error'})
    }

    if (result.length == 0) {
      return res.status(400).json({message: 'Invalid username or password'})
    }

    const hashedPassword = result[0].user_password;

    const isPasswordValid = await bcrypt.compare(user_password, hashedPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({
      message: 'Logged in successfully',
      user_id: result[0].user_id,
      username: result[0].username
    });
  });
});

// Get a user by ID
router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;
  pool.query('SELECT * FROM USERS WHERE user_id = ?', [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});


// Update a user
router.put('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { first_name, last_name, username, user_email, user_password, user_phone } = req.body;
  pool.query(
    'UPDATE USERS SET first_name = ?, last_name = ?, username = ?, user_email = ?, user_password = ?, user_phone = ? WHERE user_id = ?',
    [first_name, last_name, username, user_email, user_password, user_phone, user_id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User updated' });
    }
  );
});

// Delete a user
router.delete('/:user_id', (req, res) => {
  const { user_id } = req.params;
  pool.query('DELETE FROM USERS WHERE user_id = ?', [user_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User deleted' });
  });
});

export default router;
