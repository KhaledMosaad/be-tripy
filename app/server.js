import mongoose from 'mongoose';
import envs from './config.js';
import express from 'express';

const ServerSetup = async () => {
  await mongoose.connect(`${envs.MONGO_URI}${envs.DATABASE_NAME}`);
  const app = express();

  // setup routers test one
  app.use('/', async (req, res, next) => {
    res.send('Hello World');
  });

  // run the server on configured port 
  const port = envs.PORT;
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
};

export default ServerSetup;
