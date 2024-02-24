import { Router } from "express";
import UsersRouter from './modules/users/routers/index.js';

const router = Router();

router.use('/users', UsersRouter);


export default router;