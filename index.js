import express from 'express';
import 'dotenv/config';
const app = express();

const port = process.env.PORT;

app.use('/', async (req, res, next) => {
    res.send('Hello World');
});

// up the service on configured port 
const server = app.listen(port, () => {
    console.log(`application now listen to port ${port}`);
});

// graceful shutdown
process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        debug('HTTP server closed')
    });
});