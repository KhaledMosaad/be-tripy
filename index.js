// Inject env variables
import 'dotenv/config';
import ServerSetup from './app/server.js';

ServerSetup().catch(err => console.log(err));