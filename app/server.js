import mongoose from 'mongoose';
import envs from './config.js';
import express from 'express';
import passport from 'passport';
import router from '../src/router.js';
import { getPassportStrategy } from './middlewares/index.js';
import bodyParser from 'body-parser';

const ServerSetup = async () => {
  try {
    await mongoose.connect(`${envs.MONGO_URI}${envs.DATABASE_NAME}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }


  passport.use(getPassportStrategy());
  const app = express();

  app.use(bodyParser.json());

  app.use(router);

  // Run the server on configured port 
  const port = envs.PORT;
  const server = app.listen(port, () => {
    console.log(`application now listen to port ${port}`);
  });

  // graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
};

export default ServerSetup;
