// app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import userRoutes from './routes/userRoutes.js'
import marketInfo from './routes/marketInfo.js'
import employees from './routes/employees.js'
import appointments from './routes/appointments.js'
import carParts from './routes/carPartsRoute.js'

// Load environment variables
dotenv.config();

// Test the database connection
// db.getConnection((err, connection) => {
//     if (err) {
//       console.error('Database connection failed:', err.message);
//     } else {
//       console.log('Connected to the MySQL database.');
//       connection.release(); // Release the connection back to the pool
//     }
//   });
  
const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes setup
app.use('/api/users', userRoutes);
app.use('/api/market', marketInfo);
app.use('/api/employees', employees);
app.use('/api/appointments', appointments);
app.use('/api/carParts', carParts);

export default app;
