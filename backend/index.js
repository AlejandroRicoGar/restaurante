import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import categoryRoutes from './routes/categoriesRoutes.js'
import recipesRoutes from './routes/recipesRoutes.js'


dotenv.config();

const app = express();

app.use(cors({
    origin: '*'
  }));

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/recipes', recipesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})