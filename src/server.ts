import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/db';
import patientRoutes from './routes/patientRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/patients', patientRoutes);

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Unable to connect to DB:', err));
