import express from 'express';
import articleRoutes from './routes/articleRoutes';
// import logging from './config/logging';
import config from './config/config';

const app = express();
const NAMESPACE = 'Server';
const port = 3000;

app.use(express.json());

// Routes
app.use('/articles', articleRoutes);


/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

app.listen(config.server.port, () => console.log(`Server is running ${config.server.hostname}:${config.server.port}`));


export default app;
