import express from 'express';
import articleRoutes from './routes/articleRoutes';

const app = express();

app.use(express.json());

// Routes
app.use('/articles', articleRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
