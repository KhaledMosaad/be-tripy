import { Router } from "express";
import UsersController from "../controllers/index.js";

const router = Router();

router.post(
  '/signup',
  // TODO: add validation (to be planned)
  UsersController.signupUser,
);

export default router;
